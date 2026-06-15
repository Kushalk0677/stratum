import React from "react";

const reducedMotion = () =>
	typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const finePointer = () =>
	typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches;

/**
 * Mounts a three.js scene from scenes.js onto a <canvas> and disposes it on
 * unmount. The module is imported lazily so three.js stays out of the main
 * bundle and never blocks first paint.
 */
export function ThreeCanvas({ scene, className }) {
	const ref = React.useRef(null);
	React.useEffect(() => {
		let dispose;
		let cancelled = false;
		import("./scenes.js").then((module) => {
			if (cancelled || !ref.current) return;
			dispose = module[scene](ref.current);
		});
		return () => {
			cancelled = true;
			dispose?.();
		};
	}, [scene]);
	return <canvas ref={ref} className={className} aria-hidden="true" />;
}

/**
 * Animated count-up for metric values like "5", "128K", "1.2B", "850+".
 * Splits the numeric portion from its suffix and eases it in on first view.
 */
export function Counter({ value, duration = 1600 }) {
	const match = String(value).match(/^([\d.]+)(.*)$/);
	const target = match ? parseFloat(match[1]) : 0;
	const suffix = match ? match[2] : String(value);
	const decimals = match && match[1].includes(".") ? match[1].split(".")[1].length : 0;
	const ref = React.useRef(null);
	const [display, setDisplay] = React.useState(reducedMotion() ? target : 0);

	React.useEffect(() => {
		const node = ref.current;
		if (!node || reducedMotion()) return undefined;
		let frame = 0;
		const observer = new IntersectionObserver(
			([entry]) => {
				if (!entry.isIntersecting) return;
				observer.disconnect();
				const start = performance.now();
				const step = (now) => {
					const progress = Math.min((now - start) / duration, 1);
					const eased = 1 - Math.pow(1 - progress, 4);
					setDisplay(target * eased);
					if (progress < 1) frame = window.requestAnimationFrame(step);
				};
				frame = window.requestAnimationFrame(step);
			},
			{ threshold: 0.4 }
		);
		observer.observe(node);
		return () => {
			observer.disconnect();
			if (frame) window.cancelAnimationFrame(frame);
		};
	}, [target, duration]);

	return (
		<strong ref={ref} className="counter">
			{display.toFixed(decimals)}
			{suffix}
		</strong>
	);
}

/**
 * Card with pointer-tracked 3D tilt and a cursor-following sheen, exposed to
 * CSS through --rx/--ry/--mx/--my custom properties. Inert on touch devices
 * and under reduced motion.
 */
export function TiltCard({ as: Tag = "article", className = "", children, maxTilt = 5, ...rest }) {
	const ref = React.useRef(null);

	const onPointerMove = (event) => {
		const node = ref.current;
		if (!node || reducedMotion() || !finePointer()) return;
		const rect = node.getBoundingClientRect();
		const px = (event.clientX - rect.left) / rect.width;
		const py = (event.clientY - rect.top) / rect.height;
		node.style.setProperty("--rx", `${((0.5 - py) * maxTilt).toFixed(2)}deg`);
		node.style.setProperty("--ry", `${((px - 0.5) * maxTilt).toFixed(2)}deg`);
		node.style.setProperty("--mx", `${(px * 100).toFixed(1)}%`);
		node.style.setProperty("--my", `${(py * 100).toFixed(1)}%`);
	};

	const onPointerLeave = () => {
		const node = ref.current;
		if (!node) return;
		node.style.setProperty("--rx", "0deg");
		node.style.setProperty("--ry", "0deg");
	};

	return (
		<Tag ref={ref} className={`tilt ${className}`} onPointerMove={onPointerMove} onPointerLeave={onPointerLeave} {...rest}>
			<span className="tilt-sheen" aria-hidden="true" />
			{children}
		</Tag>
	);
}

/** Infinite horizontal marquee. Duplicates its items for a seamless loop. */
export function Marquee({ items, render, duration = 36, label, reverse = false }) {
	return (
		<div className="marquee" aria-label={label}>
			<div
				className="marquee-track"
				style={{ animationDuration: `${duration}s`, animationDirection: reverse ? "reverse" : "normal" }}
			>
				{[0, 1].map((copy) => (
					<div key={copy} className="marquee-group" aria-hidden={copy === 1}>
						{items.map((item, index) => (
							<React.Fragment key={`${copy}-${index}`}>{render(item, index)}</React.Fragment>
						))}
					</div>
				))}
			</div>
		</div>
	);
}

/**
 * Custom cursor: a small dot that sticks to the pointer and a trailing ring
 * that eases behind it and swells over interactive elements. Fine pointers
 * only; the native cursor is hidden via CSS when .has-cursor is set on <html>.
 */
export function Cursor() {
	const dotRef = React.useRef(null);
	const ringRef = React.useRef(null);

	React.useEffect(() => {
		if (!finePointer() || reducedMotion()) return undefined;
		document.documentElement.classList.add("has-cursor");
		const dot = dotRef.current;
		const ring = ringRef.current;
		let x = -100;
		let y = -100;
		let rx = -100;
		let ry = -100;
		let frame = 0;
		let hot = false;
		let down = false;
		let scale = 1;

		const paint = () => {
			frame = 0;
			rx += (x - rx) * 0.16;
			ry += (y - ry) * 0.16;
			const targetScale = hot ? 2.1 : down ? 0.8 : 1;
			scale += (targetScale - scale) * 0.18;
			dot.style.transform = `translate(${x}px, ${y}px) scale(${down ? 0.6 : 1})`;
			ring.style.transform = `translate(${rx}px, ${ry}px) scale(${scale.toFixed(3)})`;
			if (Math.abs(x - rx) > 0.2 || Math.abs(y - ry) > 0.2 || Math.abs(targetScale - scale) > 0.01)
				frame = window.requestAnimationFrame(paint);
		};
		const schedule = () => {
			if (!frame) frame = window.requestAnimationFrame(paint);
		};
		const onMove = (event) => {
			x = event.clientX;
			y = event.clientY;
			hot = Boolean(event.target.closest?.("a, button, .tilt, input, [role='menuitem']"));
			ring.classList.toggle("hot", hot);
			schedule();
		};
		const onDown = () => {
			down = true;
			schedule();
		};
		const onUp = () => {
			down = false;
			schedule();
		};
		window.addEventListener("pointermove", onMove, { passive: true });
		window.addEventListener("pointerdown", onDown, { passive: true });
		window.addEventListener("pointerup", onUp, { passive: true });
		return () => {
			document.documentElement.classList.remove("has-cursor");
			if (frame) window.cancelAnimationFrame(frame);
			window.removeEventListener("pointermove", onMove);
			window.removeEventListener("pointerdown", onDown);
			window.removeEventListener("pointerup", onUp);
		};
	}, []);

	if (typeof window !== "undefined" && (!finePointer() || reducedMotion())) return null;
	return (
		<div className="cursor-root" aria-hidden="true">
			<div ref={ringRef} className="cursor-ring" />
			<div ref={dotRef} className="cursor-dot" />
		</div>
	);
}

const GRAIN_URI =
	"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E";

/** Fixed film-grain wash over the whole page. */
export function GrainOverlay() {
	return <div className="grain-overlay" aria-hidden="true" style={{ backgroundImage: `url("${GRAIN_URI}")` }} />;
}

/** Thin gradient beam along the top edge showing scroll progress. */
export function ScrollProgress() {
	const ref = React.useRef(null);
	React.useEffect(() => {
		let frame = 0;
		const paint = () => {
			frame = 0;
			const doc = document.documentElement;
			const max = doc.scrollHeight - window.innerHeight;
			const progress = max > 0 ? window.scrollY / max : 0;
			if (ref.current) ref.current.style.transform = `scaleX(${progress})`;
		};
		const onScroll = () => {
			if (!frame) frame = window.requestAnimationFrame(paint);
		};
		window.addEventListener("scroll", onScroll, { passive: true });
		window.addEventListener("resize", onScroll);
		paint();
		return () => {
			if (frame) window.cancelAnimationFrame(frame);
			window.removeEventListener("scroll", onScroll);
			window.removeEventListener("resize", onScroll);
		};
	}, []);
	return <div className="scroll-progress" aria-hidden="true" ref={ref} />;
}

/**
 * Splits display headings into per-word spans and reveals them with a
 * cascading rise when they enter the viewport. Re-run on every route change;
 * already-split headings are skipped via data-split.
 */
export function useSplitHeadings(route) {
	React.useEffect(() => {
		if (reducedMotion()) return undefined;
		const headings = document.querySelectorAll(
			".hero h1, .section-heading h2, .page-heading h1, .cta-inner h2"
		);
		let wordIndex = 0;
		const splitNode = (node) => {
			const parts = [];
			node.childNodes.forEach((child) => {
				if (child.nodeType === Node.TEXT_NODE) {
					child.textContent.split(/(\s+)/).forEach((piece) => {
						if (!piece) return;
						if (/^\s+$/.test(piece)) {
							parts.push(document.createTextNode(" "));
							return;
						}
						const outer = document.createElement("span");
						outer.className = "w";
						const inner = document.createElement("span");
						inner.className = "wi";
						inner.style.transitionDelay = `${(wordIndex % 12) * 45}ms`;
						inner.textContent = piece;
						wordIndex += 1;
						outer.appendChild(inner);
						parts.push(outer);
					});
				} else {
					splitNode(child);
					parts.push(child);
				}
			});
			node.replaceChildren(...parts);
		};

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (!entry.isIntersecting) return;
					entry.target.classList.add("split-in");
					observer.unobserve(entry.target);
				});
			},
			{ threshold: 0, rootMargin: "0px 0px -40px 0px" }
		);

		headings.forEach((heading) => {
			if (heading.dataset.split) return;
			heading.dataset.split = "true";
			wordIndex = 0;
			splitNode(heading);
			heading.classList.add("split-heading-fx");
			observer.observe(heading);
		});

		return () => observer.disconnect();
	}, [route]);
}

/**
 * Drives a 0→1 CSS variable from an element's progress through the viewport.
 * mode "enter": 0 when the top edge enters at the bottom, 1 once fully risen.
 * mode "pin":   progress through a tall wrapper with a sticky stage inside.
 */
export function useScrollVar(ref, variable = "--sp", mode = "enter") {
	React.useEffect(() => {
		const node = ref.current;
		if (!node) return undefined;
		if (reducedMotion()) {
			node.style.setProperty(variable, "1");
			return undefined;
		}
		let frame = 0;
		const paint = () => {
			frame = 0;
			const rect = node.getBoundingClientRect();
			const vh = window.innerHeight;
			let progress;
			if (mode === "pin") {
				progress = -rect.top / Math.max(rect.height - vh, 1);
			} else {
				progress = (vh - rect.top) / (vh * 0.85);
			}
			node.style.setProperty(variable, String(Math.min(Math.max(progress, 0), 1).toFixed(4)));
		};
		const onScroll = () => {
			if (!frame) frame = window.requestAnimationFrame(paint);
		};
		window.addEventListener("scroll", onScroll, { passive: true });
		window.addEventListener("resize", onScroll);
		paint();
		return () => {
			if (frame) window.cancelAnimationFrame(frame);
			window.removeEventListener("scroll", onScroll);
			window.removeEventListener("resize", onScroll);
		};
	}, [ref, variable, mode]);
}

/** Branded preloader: shown once per session on first paint, then fades. */
export function Preloader() {
	const [phase, setPhase] = React.useState(() =>
		typeof window !== "undefined" && !window.sessionStorage.getItem("stratum-intro") && !reducedMotion()
			? "active"
			: "done"
	);

	React.useEffect(() => {
		if (phase !== "active") return undefined;
		window.sessionStorage.setItem("stratum-intro", "1");
		const exit = window.setTimeout(() => setPhase("leaving"), 1450);
		const gone = window.setTimeout(() => setPhase("done"), 2150);
		return () => {
			window.clearTimeout(exit);
			window.clearTimeout(gone);
		};
	}, [phase]);

	if (phase === "done") return null;
	return (
		<div className={`preloader ${phase === "leaving" ? "leaving" : ""}`} aria-hidden="true">
			<div className="preloader-strata">
				<i />
				<i />
				<i />
			</div>
			<div className="preloader-word">
				{"STRATUM".split("").map((letter, index) => (
					<span key={index} style={{ animationDelay: `${120 + index * 55}ms` }}>
						{letter}
					</span>
				))}
			</div>
		</div>
	);
}

/** Wraps a link/button so it leans toward the cursor. */
export function Magnetic({ children, strength = 8 }) {
	const ref = React.useRef(null);

	const onPointerMove = (event) => {
		const node = ref.current;
		if (!node || reducedMotion() || !finePointer()) return;
		const rect = node.getBoundingClientRect();
		const x = ((event.clientX - rect.left) / rect.width - 0.5) * strength;
		const y = ((event.clientY - rect.top) / rect.height - 0.5) * strength;
		node.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`;
	};

	const onPointerLeave = () => {
		if (ref.current) ref.current.style.transform = "";
	};

	return (
		<span className="magnetic" ref={ref} onPointerMove={onPointerMove} onPointerLeave={onPointerLeave}>
			{children}
		</span>
	);
}
