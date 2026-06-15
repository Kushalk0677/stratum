import * as THREE from "three";

const REDUCED_MOTION = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function createRenderer(canvas) {
	const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
	renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
	return renderer;
}

function watchSize(canvas, renderer, camera, render) {
	const resize = () => {
		const { clientWidth, clientHeight } = canvas;
		if (!clientWidth || !clientHeight) return;
		renderer.setSize(clientWidth, clientHeight, false);
		camera.aspect = clientWidth / clientHeight;
		camera.updateProjectionMatrix();
		render();
	};
	const observer = new ResizeObserver(resize);
	observer.observe(canvas);
	resize();
	return () => observer.disconnect();
}

/**
 * Runs the animation loop only while the canvas is on screen and the tab is
 * visible. With reduced motion enabled, renders a single static frame.
 */
function runLoop(canvas, tick) {
	let frame = 0;
	let visible = true;
	let onScreen = true;

	const loop = (time) => {
		frame = 0;
		tick(time);
		schedule();
	};
	const schedule = () => {
		if (frame || !visible || !onScreen || REDUCED_MOTION()) return;
		frame = window.requestAnimationFrame(loop);
	};

	const observer = new IntersectionObserver(([entry]) => {
		onScreen = entry.isIntersecting;
		schedule();
	});
	observer.observe(canvas);

	const onVisibility = () => {
		visible = document.visibilityState === "visible";
		schedule();
	};
	document.addEventListener("visibilitychange", onVisibility);

	tick(0);
	schedule();

	return () => {
		if (frame) window.cancelAnimationFrame(frame);
		observer.disconnect();
		document.removeEventListener("visibilitychange", onVisibility);
	};
}

function trackPointer(target) {
	const pointer = { x: 0, y: 0, lerpX: 0, lerpY: 0 };
	const onMove = (event) => {
		pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
		pointer.y = (event.clientY / window.innerHeight) * 2 - 1;
	};
	target.addEventListener("pointermove", onMove, { passive: true });
	return {
		pointer,
		dispose: () => target.removeEventListener("pointermove", onMove),
		ease(amount = 0.04) {
			pointer.lerpX += (pointer.x - pointer.lerpX) * amount;
			pointer.lerpY += (pointer.y - pointer.lerpY) * amount;
		},
	};
}

function makeParticleTexture() {
	const size = 64;
	const canvas = document.createElement("canvas");
	canvas.width = size;
	canvas.height = size;
	const ctx = canvas.getContext("2d");
	const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
	gradient.addColorStop(0, "rgba(255,255,255,1)");
	gradient.addColorStop(0.4, "rgba(255,255,255,0.6)");
	gradient.addColorStop(1, "rgba(255,255,255,0)");
	ctx.fillStyle = gradient;
	ctx.fillRect(0, 0, size, size);
	const texture = new THREE.CanvasTexture(canvas);
	texture.colorSpace = THREE.SRGBColorSpace;
	return texture;
}

function disposeScene(scene) {
	scene.traverse((object) => {
		object.geometry?.dispose?.();
		const materials = Array.isArray(object.material) ? object.material : [object.material];
		materials.forEach((material) => {
			material?.map?.dispose?.();
			material?.dispose?.();
		});
	});
}

/* ==========================================================================
   Hero scene v2 — GPU strata height-field
   An iridescent topographic surface with glowing animated contour lines,
   shader-displaced wireframe layers above it, and a flowing particle field.
   The terrain bulges under the pointer; the camera dives with scroll.
   ========================================================================== */

const NOISE_GLSL = /* glsl */ `
	float hash(vec2 p) {
		return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
	}
	float noise(vec2 p) {
		vec2 i = floor(p);
		vec2 f = fract(p);
		vec2 u = f * f * (3.0 - 2.0 * f);
		return mix(
			mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
			mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
			u.y
		);
	}
	float fbm(vec2 p) {
		float value = 0.0;
		float amp = 0.5;
		for (int i = 0; i < 4; i++) {
			value += amp * noise(p);
			p *= 2.03;
			amp *= 0.5;
		}
		return value;
	}
`;

const TERRAIN_VERT = /* glsl */ `
	uniform float uTime;
	uniform float uLift;
	uniform vec3 uPointer; /* xy = plane-local coords, z = strength */
	varying float vHeight;
	varying float vBump;
	varying vec2 vUv;
	${NOISE_GLSL}
	void main() {
		vUv = uv;
		vec3 pos = position;
		float broad = fbm(vec2(pos.x * 0.055 - uTime * 0.045, pos.y * 0.07 + uTime * 0.035));
		float detail = fbm(vec2(pos.x * 0.16 + uTime * 0.1, pos.y * 0.2 - uTime * 0.06));
		float height = (broad - 0.5) * 2.6 + (detail - 0.5) * 1.1;
		float dist = distance(pos.xy, uPointer.xy);
		float bump = exp(-dist * dist * 0.14) * uPointer.z;
		pos.z += (height + bump * 1.5) * uLift;
		vHeight = height;
		vBump = bump;
		gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
	}
`;

const TERRAIN_FRAG = /* glsl */ `
	precision highp float;
	uniform float uTime;
	uniform float uFade;
	varying float vHeight;
	varying float vBump;
	varying vec2 vUv;
	void main() {
		vec3 indigo = vec3(0.310, 0.275, 0.898);
		vec3 violet = vec3(0.486, 0.227, 0.929);
		vec3 cyan = vec3(0.024, 0.714, 0.831);
		float t = clamp(vHeight * 0.34 + 0.5, 0.0, 1.0);
		vec3 color = mix(indigo, violet, smoothstep(0.0, 0.62, t));
		color = mix(color, cyan, smoothstep(0.55, 1.0, t));
		/* topographic contour lines drifting through the height field */
		float bands = abs(fract(vHeight * 2.6 - uTime * 0.07) - 0.5);
		float contour = smoothstep(0.10, 0.012, bands);
		/* soft rectangular falloff so the surface melts into the page */
		float edge = smoothstep(0.0, 0.2, vUv.x) * smoothstep(1.0, 0.8, vUv.x)
			* smoothstep(0.0, 0.16, vUv.y) * smoothstep(1.0, 0.74, vUv.y);
		float alpha = (0.05 + contour * 0.55 + vBump * 0.45) * edge * uFade;
		gl_FragColor = vec4(color, alpha);
	}
`;

const WIRE_FRAG = /* glsl */ `
	precision highp float;
	uniform float uFade;
	uniform vec3 uColor;
	uniform float uOpacity;
	varying float vHeight;
	varying float vBump;
	varying vec2 vUv;
	void main() {
		float edge = smoothstep(0.0, 0.22, vUv.x) * smoothstep(1.0, 0.78, vUv.x)
			* smoothstep(0.0, 0.18, vUv.y) * smoothstep(1.0, 0.72, vUv.y);
		gl_FragColor = vec4(uColor, (uOpacity + vBump * 0.4) * edge * uFade);
	}
`;

const PARTICLE_VERT = /* glsl */ `
	uniform float uTime;
	uniform vec3 uPointer;
	attribute float aSeed;
	varying float vSeed;
	varying float vTwinkle;
	void main() {
		vSeed = aSeed;
		vec3 pos = position;
		float drift = uTime * (0.18 + aSeed * 0.22);
		pos.y = mod(pos.y + drift, 6.0) - 0.6;
		pos.x += sin(uTime * 0.4 + aSeed * 6.2831) * 0.45;
		pos.z += cos(uTime * 0.33 + aSeed * 6.2831) * 0.45;
		/* gentle repulsion from the pointer column */
		vec2 away = pos.xz - uPointer.xy * vec2(1.0, -1.0);
		float dist = length(away);
		pos.xz += normalize(away + 0.0001) * exp(-dist * dist * 0.35) * uPointer.z * 1.4;
		vTwinkle = 0.55 + 0.45 * sin(uTime * (1.2 + aSeed * 2.0) + aSeed * 40.0);
		vec4 mv = modelViewMatrix * vec4(pos, 1.0);
		gl_PointSize = clamp((2.0 + aSeed * 5.0) * (8.0 / -mv.z), 1.0, 7.0);
		gl_Position = projectionMatrix * mv;
	}
`;

const PARTICLE_FRAG = /* glsl */ `
	precision highp float;
	uniform float uFade;
	varying float vSeed;
	varying float vTwinkle;
	void main() {
		float dist = length(gl_PointCoord - 0.5);
		if (dist > 0.5) discard;
		float soft = smoothstep(0.5, 0.08, dist);
		vec3 indigo = vec3(0.310, 0.275, 0.898);
		vec3 cyan = vec3(0.024, 0.714, 0.831);
		vec3 violet = vec3(0.486, 0.227, 0.929);
		vec3 color = mix(indigo, cyan, step(0.4, vSeed));
		color = mix(color, violet, step(0.75, vSeed));
		gl_FragColor = vec4(color, soft * vTwinkle * 0.8 * uFade);
	}
`;

export function mountStrataScene(canvas) {
	const renderer = createRenderer(canvas);
	const scene = new THREE.Scene();

	const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 60);
	camera.position.set(0, 2.4, 8.4);
	camera.lookAt(0, 0.3, 0);

	const sharedUniforms = {
		uTime: { value: 0 },
		uPointer: { value: new THREE.Vector3(0, 0, 0) },
		uFade: { value: 1 },
	};

	/* Iridescent contour surface */
	const terrainGeometry = new THREE.PlaneGeometry(26, 14, 220, 120);
	const terrain = new THREE.Mesh(
		terrainGeometry,
		new THREE.ShaderMaterial({
			vertexShader: TERRAIN_VERT,
			fragmentShader: TERRAIN_FRAG,
			uniforms: { ...sharedUniforms, uLift: { value: 1 } },
			transparent: true,
			depthWrite: false,
			side: THREE.DoubleSide,
		})
	);
	terrain.rotation.x = -Math.PI / 2;
	terrain.position.y = -1.0;
	scene.add(terrain);

	/* Two shader-displaced wireframe strata floating above the surface */
	const wires = [
		{ color: new THREE.Color(0x4f46e5), opacity: 0.16, y: 0.0, lift: 0.7 },
		{ color: new THREE.Color(0x06b6d4), opacity: 0.1, y: 1.1, lift: 0.45 },
	].map((layer) => {
		const mesh = new THREE.Mesh(
			new THREE.PlaneGeometry(26, 14, 110, 60),
			new THREE.ShaderMaterial({
				vertexShader: TERRAIN_VERT,
				fragmentShader: WIRE_FRAG,
				uniforms: {
					...sharedUniforms,
					uLift: { value: layer.lift },
					uColor: { value: layer.color },
					uOpacity: { value: layer.opacity },
				},
				transparent: true,
				depthWrite: false,
				wireframe: true,
			})
		);
		mesh.rotation.x = -Math.PI / 2;
		mesh.position.y = layer.y - 1.0;
		scene.add(mesh);
		return mesh;
	});

	/* GPU particle field */
	const PARTICLES = 2400;
	const positions = new Float32Array(PARTICLES * 3);
	const seeds = new Float32Array(PARTICLES);
	for (let i = 0; i < PARTICLES; i += 1) {
		positions[i * 3] = (Math.random() - 0.5) * 22;
		positions[i * 3 + 1] = Math.random() * 6;
		positions[i * 3 + 2] = (Math.random() - 0.5) * 12;
		seeds[i] = Math.random();
	}
	const particleGeometry = new THREE.BufferGeometry();
	particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
	particleGeometry.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));
	const particles = new THREE.Points(
		particleGeometry,
		new THREE.ShaderMaterial({
			vertexShader: PARTICLE_VERT,
			fragmentShader: PARTICLE_FRAG,
			uniforms: sharedUniforms,
			transparent: true,
			depthWrite: false,
		})
	);
	scene.add(particles);

	/* Pointer → world position on the terrain plane (y = -1) */
	const pointerTracker = trackPointer(window);
	const ray = new THREE.Raycaster();
	const ndc = new THREE.Vector2();
	const ground = new THREE.Plane(new THREE.Vector3(0, 1, 0), 1.0);
	const hit = new THREE.Vector3();
	let pointerStrength = 0;

	const tick = (time) => {
		const t = time * 0.001;
		sharedUniforms.uTime.value = t;

		pointerTracker.ease(0.06);
		ndc.set(pointerTracker.pointer.lerpX, -pointerTracker.pointer.lerpY);
		ray.setFromCamera(ndc, camera);
		if (ray.ray.intersectPlane(ground, hit)) {
			/* plane is rotated -90° about X: local x = world x, local y = -world z */
			sharedUniforms.uPointer.value.set(hit.x, -hit.z, 0);
		}
		pointerStrength += (1 - pointerStrength) * 0.025;
		sharedUniforms.uPointer.value.z = pointerStrength;

		/* scroll-linked camera dive + fade */
		const scrollProgress = Math.min(window.scrollY / (window.innerHeight * 0.9), 1);
		camera.position.x = pointerTracker.pointer.lerpX * 0.85;
		camera.position.y = 2.4 + scrollProgress * 2.6 - pointerTracker.pointer.lerpY * 0.4;
		camera.position.z = 8.4 - scrollProgress * 1.8;
		camera.lookAt(0, 0.3 - scrollProgress * 1.2, 0);
		sharedUniforms.uFade.value = 1 - scrollProgress * 0.85;

		scene.rotation.y = Math.sin(t * 0.05) * 0.04 + pointerTracker.pointer.lerpX * 0.02;

		renderer.render(scene, camera);
	};

	const stopSize = watchSize(canvas, renderer, camera, () => renderer.render(scene, camera));
	const stopLoop = runLoop(canvas, tick);

	return () => {
		stopLoop();
		stopSize();
		pointerTracker.dispose();
		disposeScene(scene);
		renderer.dispose();
	};
}

/* ==========================================================================
   Download scene — wireframe orb with orbit rings and a particle halo
   ========================================================================== */

export function mountOrbScene(canvas) {
	const renderer = createRenderer(canvas);
	const scene = new THREE.Scene();

	const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 40);
	camera.position.set(0, 0, 7);

	const orb = new THREE.Group();
	scene.add(orb);

	const core = new THREE.Mesh(
		new THREE.IcosahedronGeometry(1.7, 1),
		new THREE.MeshBasicMaterial({ color: 0x4f46e5, wireframe: true, transparent: true, opacity: 0.4 })
	);
	orb.add(core);

	const inner = new THREE.Mesh(
		new THREE.IcosahedronGeometry(1.12, 0),
		new THREE.MeshBasicMaterial({ color: 0x06b6d4, wireframe: true, transparent: true, opacity: 0.5 })
	);
	orb.add(inner);

	const ringMaterial = new THREE.MeshBasicMaterial({ color: 0x8b5cf6, transparent: true, opacity: 0.34, side: THREE.DoubleSide });
	const ringA = new THREE.Mesh(new THREE.TorusGeometry(2.6, 0.012, 8, 140), ringMaterial);
	ringA.rotation.x = Math.PI / 2.25;
	orb.add(ringA);
	const ringB = new THREE.Mesh(new THREE.TorusGeometry(3.05, 0.008, 8, 140), ringMaterial.clone());
	ringB.material.color.set(0x06b6d4);
	ringB.rotation.x = Math.PI / 1.8;
	ringB.rotation.y = Math.PI / 5;
	orb.add(ringB);

	const PARTICLES = 140;
	const positions = new Float32Array(PARTICLES * 3);
	for (let i = 0; i < PARTICLES; i += 1) {
		const radius = 2.4 + Math.random() * 1.8;
		const theta = Math.random() * Math.PI * 2;
		const elevation = (Math.random() - 0.5) * Math.PI * 0.7;
		positions[i * 3] = radius * Math.cos(theta) * Math.cos(elevation);
		positions[i * 3 + 1] = radius * Math.sin(elevation);
		positions[i * 3 + 2] = radius * Math.sin(theta) * Math.cos(elevation);
	}
	const particleGeometry = new THREE.BufferGeometry();
	particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
	const halo = new THREE.Points(
		particleGeometry,
		new THREE.PointsMaterial({
			color: 0x6366f1,
			size: 0.06,
			map: makeParticleTexture(),
			transparent: true,
			opacity: 0.6,
			depthWrite: false,
		})
	);
	scene.add(halo);

	const pointerTracker = trackPointer(window);

	const tick = (time) => {
		const t = time * 0.001;
		orb.rotation.y = t * 0.18;
		orb.rotation.x = Math.sin(t * 0.12) * 0.18;
		inner.rotation.y = -t * 0.3;
		inner.rotation.z = t * 0.14;
		halo.rotation.y = -t * 0.05;

		pointerTracker.ease(0.05);
		camera.position.x = pointerTracker.pointer.lerpX * 0.7;
		camera.position.y = -pointerTracker.pointer.lerpY * 0.5;
		camera.lookAt(0, 0, 0);

		renderer.render(scene, camera);
	};

	const stopSize = watchSize(canvas, renderer, camera, () => renderer.render(scene, camera));
	const stopLoop = runLoop(canvas, tick);

	return () => {
		stopLoop();
		stopSize();
		pointerTracker.dispose();
		disposeScene(scene);
		renderer.dispose();
	};
}
