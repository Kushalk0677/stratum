const fs = require("fs");
const src = fs.readFileSync("src/main.jsx", "utf8");

let p = src;

// Helper: insert after a marker string
function insertAfter(marker, insertion) {
	const idx = p.indexOf(marker);
	if (idx === -1) {
		console.log("MARKER NOT FOUND:", JSON.stringify(marker.slice(0, 60)));
		return false;
	}
	p = p.slice(0, idx + marker.length) + insertion + p.slice(idx + marker.length);
	return true;
}

// 1. Hero: insert ThreeBackground after hero opening tag
insertAfter(
	'<section className="hero" onClick={onNavigate}>',
	'\r\n\t\t\t\t<ThreeBackground count={20} opacity={0.25} speed={0.25} baseHue={215} hueRange={25} />'
);

// 2. Features: change class and insert ThreeBackground
const featStart = '<section className="page-section">\r\n\t\t\t\t<div className="page-heading">\r\n\t\t\t\t\t<p className="eyebrow">Features</p>';
const featStartNew = '<section className="page-section three-bg-section">\r\n\t\t\t\t<ThreeBackground count={14} opacity={0.18} speed={0.2} baseHue={200} hueRange={40} />\r\n\t\t\t\t<div className="page-heading">\r\n\t\t\t\t\t<p className="eyebrow">Features</p>';
if (p.includes(featStart)) {
	p = p.replace(featStart, featStartNew);
	console.log("Features patched");
} else {
	console.log("Features MARKER NOT FOUND");
}

// 3. Use cases
const ucStart = '<section className="page-section use-cases-page">\r\n\t\t\t\t<div className="page-heading">\r\n\t\t\t\t\t<p className="eyebrow">Use cases</p>';
const ucStartNew = '<section className="page-section use-cases-page three-bg-section">\r\n\t\t\t\t<ThreeBackground count={16} opacity={0.15} speed={0.18} baseHue={260} hueRange={30} />\r\n\t\t\t\t<div className="page-heading">\r\n\t\t\t\t\t<p className="eyebrow">Use cases</p>';
if (p.includes(ucStart)) {
	p = p.replace(ucStart, ucStartNew);
	console.log("Use cases patched");
} else {
	console.log("Use cases MARKER NOT FOUND");
}

// 4. Evidence section
const evStart = '<section className="section evidence-section">\r\n\t\t\t<div className="section-heading split-heading">\r\n\t\t\t\t<div>\r\n\t\t\t\t\t<p className="eyebrow">Evidence</p>';
const evStartNew = '<section className="section evidence-section three-bg-section">\r\n\t\t\t<ThreeBackground count={12} opacity={0.12} speed={0.15} baseHue={170} hueRange={50} />\r\n\t\t\t<div className="section-heading split-heading">\r\n\t\t\t\t<div>\r\n\t\t\t\t\t<p className="eyebrow">Evidence</p>';
if (p.includes(evStart)) {
	p = p.replace(evStart, evStartNew);
	console.log("Evidence patched");
} else {
	console.log("Evidence MARKER NOT FOUND");
}

fs.writeFileSync("src/main.jsx", p);

const check = fs.readFileSync("src/main.jsx", "utf8");
console.log("ThreeBackground count:", (check.match(/ThreeBackground/g) || []).length);
console.log("three-bg-section count:", (check.match(/three-bg-section/g) || []).length);
