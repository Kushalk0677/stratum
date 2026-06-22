const fs = require("fs");

let src = fs.readFileSync("src/main.jsx", "utf8");

// 1. Add ThreeBackground import after styles.css import
src = src.replace(
	'import "./styles.css";',
	'import "./styles.css";\nimport ThreeBackground from "./ThreeBackground.jsx";'
);

// 2. Hero section — add ThreeBackground as first child of hero <section>
src = src.replace(
	'<section className="hero" onClick={onNavigate}>\n\t\t\t\t<div className="particle-field"',
	'<section className="hero" onClick={onNavigate}>\n\t\t\t\t<ThreeBackground count={20} opacity={0.25} speed={0.25} baseHue={215} hueRange={25} />\n\t\t\t\t<div className="particle-field"'
);

// 3. Features page-section heading
src = src.replace(
	'<section className="page-section">\n\t\t\t\t<div className="page-heading">\n\t\t\t\t\t<p className="eyebrow">Features</p>',
	'<section className="page-section three-bg-section">\n\t\t\t\t<ThreeBackground count={14} opacity={0.18} speed={0.2} baseHue={200} hueRange={40} />\n\t\t\t\t<div className="page-heading">\n\t\t\t\t\t<p className="eyebrow">Features</p>'
);

// 4. Use Cases page-section heading
src = src.replace(
	'<section className="page-section use-cases-page">\n\t\t\t\t<div className="page-heading">\n\t\t\t\t\t<p className="eyebrow">Use cases</p>',
	'<section className="page-section use-cases-page three-bg-section">\n\t\t\t\t<ThreeBackground count={16} opacity={0.15} speed={0.18} baseHue={260} hueRange={30} />\n\t\t\t\t<div className="page-heading">\n\t\t\t\t\t<p className="eyebrow">Use cases</p>'
);

// 5. Evidence section heading
src = src.replace(
	'<section className="section evidence-section">\n\t\t\t<div className="section-heading split-heading">\n\t\t\t\t<div>\n\t\t\t\t\t<p className="eyebrow">Evidence</p>',
	'<section className="section evidence-section three-bg-section">\n\t\t\t<ThreeBackground count={12} opacity={0.12} speed={0.15} baseHue={170} hueRange={50} />\n\t\t\t<div className="section-heading split-heading">\n\t\t\t\t<div>\n\t\t\t\t\t<p className="eyebrow">Evidence</p>'
);

fs.writeFileSync("src/main.jsx", src);
console.log("main.jsx patched successfully");
