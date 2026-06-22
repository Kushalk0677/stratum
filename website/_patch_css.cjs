const fs = require("fs");
let css = fs.readFileSync("src/styles.css", "utf8");

const logoStyles = `
/* ── 3D Logo container ── */
.logo-3d-container {
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
}

.logo-3d-container canvas {
	display: block;
	width: 100% !important;
	height: 100% !important;
}

/* ── Hero layout with 3D logo ── */
.hero-layout {
	position: relative;
	z-index: 1;
	display: grid;
	grid-template-columns: 1fr minmax(200px, 340px);
	gap: clamp(20px, 3vw, 48px);
	align-items: center;
	width: 100%;
	max-width: 1400px;
	margin: 0 auto;
}

.hero-logo-3d-wrap {
	position: relative;
	width: 100%;
	aspect-ratio: 1 / 1;
	max-width: 340px;
	justify-self: end;
}

@media (max-width: 920px) {
	.hero-layout {
		grid-template-columns: 1fr;
		justify-items: center;
		text-align: center;
	}
	.hero-logo-3d-wrap {
		max-width: 220px;
		justify-self: center;
	}
}
`;

// Insert before the media query section or at the end of the main rules
// Find a good insertion point - after the download-button styles
const insertPoint = css.indexOf(".download-button {");
const beforeInsert = css.indexOf("/* ── 3D Background container ── */");

if (beforeInsert !== -1) {
	// Insert before the 3D background section
	css = css.slice(0, beforeInsert) + logoStyles + "\n" + css.slice(beforeInsert);
} else {
	// Fallback: append at end before media queries
	const mediaPoint = css.indexOf("@media");
	if (mediaPoint !== -1) {
		css = css.slice(0, mediaPoint) + logoStyles + "\n" + css.slice(mediaPoint);
	} else {
		css += logoStyles;
	}
}

fs.writeFileSync("src/styles.css", css);
console.log("CSS patched with logo styles");
