const fs = require("fs");

// ========== CSS ==========
let css = fs.readFileSync("src/styles.css", "utf8");
if (!css.includes("Scroll-reveal animations")) {
  const block = `\n/* ── Scroll-reveal animations ── */\n@keyframes fadeSlideUp {\n\tfrom { opacity: 0; transform: translateY(18px); }\n\tto { opacity: 1; transform: translateY(0); }\n}\n.reveal.revealed { animation: fadeSlideUp 0.55s cubic-bezier(0.21, 0.6, 0.35, 1) both; }\n.reveal.revealed .stagger { animation: fadeSlideUp 0.45s cubic-bezier(0.21, 0.6, 0.35, 1) both; }\n`;
  const idx = css.indexOf("@media (prefers-reduced-motion: reduce)");
  css = css.slice(0, idx) + block + "\n" + css.slice(idx);
  fs.writeFileSync("src/styles.css", css);
  console.log("CSS ✓");
}

// ========== JS ==========
const lines = fs.readFileSync("src/main.jsx", "utf8").split("\n");
const L = lines.length;

// --- Step 1: All text-based replacements ---
let j = lines.join("\n");

// <main>
j = j.replace('<main onClick={navigate}>', '<main key={route} className="" onClick={navigate}>');

// IntersectionObserver
if (!j.includes("IntersectionObserver")) {
  const obs = `\n\t// Scroll-triggered reveal\n\tReact.useEffect(() => {\n\t\tconst observer = new IntersectionObserver(\n\t\t\t(entries) => {\n\t\t\t\tentries.forEach((entry) => {\n\t\t\t\t\tif (entry.isIntersecting) {\n\t\t\t\t\t\tentry.target.classList.add("revealed");\n\t\t\t\t\t\tobserver.unobserve(entry.target);\n\t\t\t\t\t}\n\t\t\t\t});\n\t\t\t},\n\t\t\t{ threshold: 0.08, rootMargin: "0px 0px -30px 0px" }\n\t\t);\n\t\tconst elements = document.querySelectorAll(".reveal");\n\t\telements.forEach((el) => observer.observe(el));\n\t\treturn () => observer.disconnect();\n\t}, [route]);\n`;
  j = j.replace("const [route, navigate] = useRoute();", "const [route, navigate] = useRoute();" + obs);
}

// .reveal
const reveals = [
  ['className="hero" onClick={onNavigate}', 'className="hero reveal" onClick={onNavigate}'],
  ['className="metric-strip" aria-label="Stratum product metrics"', 'className="metric-strip reveal" aria-label="Stratum product metrics"'],
  ['className="section anatomy-section"', 'className="section anatomy-section reveal"'],
  ['className="section lifecycle-section"', 'className="section lifecycle-section reveal"'],
  ['className="section manager-led-section"', 'className="section manager-led-section reveal"'],
  ['className="section control-layer-section"', 'className="section control-layer-section reveal"'],
  ['className="section artifact-section"', 'className="section artifact-section reveal"'],
  ['className="section surface-section"', 'className="section surface-section reveal"'],
  ['className="section artifact-discipline-section"', 'className="section artifact-discipline-section reveal"'],
  ['className="section evidence-section"', 'className="section evidence-section reveal"'],
  ['className="section architecture-section"', 'className="section architecture-section reveal"'],
  ['className="download-cta" onClick={onNavigate}', 'className="download-cta reveal" onClick={onNavigate}'],
  ['className="page-section">\n\t\t\t\t<div className="page-heading">\n\t\t\t\t\t<p className="eyebrow">Features</p>', 'className="page-section reveal">\n\t\t\t\t<div className="page-heading">\n\t\t\t\t\t<p className="eyebrow">Features</p>'],
  ['className="section run-modes-section"', 'className="section run-modes-section reveal"'],
  ['className="section supervision-section"', 'className="section supervision-section reveal"'],
  ['className="section surface-groups-section"', 'className="section surface-groups-section reveal"'],
  ['className="section feature-spotlight-section"', 'className="section feature-spotlight-section reveal"'],
  ['className="page-section use-cases-page"', 'className="page-section use-cases-page reveal"'],
  ['className="section deep-use-section"', 'className="section deep-use-section reveal"'],
  ['className="section comparison-section"', 'className="section comparison-section reveal"'],
  ['className="section differentiation-section"', 'className="section differentiation-section reveal"'],
  ['className="page-section local-page"', 'className="page-section local-page reveal"'],
  ['className="section model-routing-section"', 'className="section model-routing-section reveal"'],
  ['className="download-page">\n\t\t\t<div className="download-panel">', 'className="download-page reveal">\n\t\t\t<div className="download-panel">'],
  ['className="documentation-page"', 'className="documentation-page reveal"'],
];
for (const [f, t] of reveals) { if (j.includes(f)) j = j.replace(f, t); }

// stagger
j = j.replace('{productSurfaces.map(([title, body, icon]) => (', '{productSurfaces.map(([title, body, icon], index) => (');
j = j.replace('<article key={title} className="feature-card">', '<article key={title} className="feature-card stagger" style={{ animationDelay: `${index * 0.07}s` }}>');
j = j.replace('<article key={title} className="use-case-card">', '<article key={title} className="use-case-card stagger" style={{ animationDelay: `${index * 0.07}s` }}>');
j = j.replace('{deepUseCases.map(([title, lanes, artifacts]) => (', '{deepUseCases.map(([title, lanes, artifacts], index) => (');
j = j.replace('<article key={title} className="deep-use-card">', '<article key={title} className="deep-use-card stagger" style={{ animationDelay: `${index * 0.07}s` }}>');

// text
const texts = [
  ["help testers move to the right desktop build", "help users move to the right desktop build"],
  ["hosted tester workflows remain inspectable", "hosted team workflows remain inspectable"],
  ["Support hosted tester workflows", "Support hosted team workflows"],
  ["testers know which build belongs to the current", "users know which build belongs to the current"],
  ["installer and desktop build state for testers", "installer and desktop build state for users"],
  ["before handing binaries to testers", "before releasing binaries to users"],
  ["resolves for testers", "resolves for users"],
  ["when a tester skipped the tour", "when a user skipped the tour"],
  ["notify testers when a newer installer", "notify users when a newer installer"],
  ["send the installer to testers", "share the installer with users"],
  ["so testers know what changed", "so users know what changed"],
  ["tell testers which desktop build", "tell users which desktop build"],
  ["workflows for testers", "workflows for development teams"],
  ["Recommended for testers using Windows", "Recommended for users on Windows"],
  ["Recommended for testers using DeepSeek", "Recommended for users on DeepSeek"],
  ["Current testing releases focus on", "The latest release focuses on"],
  ["Download the current Stratum installer for testing.", "Download Stratum for Windows & Mac."],
  ["Windows may show an unsigned-app warning until code signing is configured.", "Windows and Mac installers are ready for daily use."],
  ["Unsigned installers may still show platform warnings until code signing is configured.", ""],
  ["API key migration from dev storage to installed storage.", "API key management moved to Settings with multi-key support."],
  ["(Mac builds were not yet available in this release)", ""],
];
for (const [f, t] of texts) { if (j.includes(f)) j = j.replace(f, t); }

// --- Step 2: Docs reordering (using the non-text-replaced lines for accurate line counting) ---
// Actually since we already did text replacements, the file has changed.
// Let me re-split into lines for the reordering.
const modLines = j.split("\n");

// Identify the sections by their line content (after text replacements)
const changelogStart = modLines.findIndex(l => l.includes('id: "changelog"')) - 1;
const supportStart = modLines.findIndex(l => l.includes('id: "support"')) - 1;
const v003Start = modLines.findIndex(l => l.includes('id: "v0-0-3"')) - 1;
const pressStart = modLines.findIndex(l => l.includes('id: "press"')) - 1;
const v007Start = modLines.findIndex(l => l.includes('id: "v0-0-7"')) - 1;
const arrayEnd = modLines.findIndex(l => l.trim() === "];" && l.includes("function routeFromLocation") === false) + 1;

// Find the end of each section
const changelogEnd = supportStart; // changelog ends where support starts
const supportEnd = v003Start; // support ends where v0-0-3 starts
const pressEnd = v007Start; // press ends where v0-0-7 starts
const releasesEnd = pressStart + 1; // releases end right before press starts (but after v0-0-7)

// Extract sections
const changelogSection = modLines.slice(changelogStart, changelogEnd).join("\n");
const supportSection = modLines.slice(supportStart, supportEnd).join("\n");
const releasesSection = modLines.slice(v003Start, releasesEnd).join("\n"); // v0-0-3 through v0-0-7
const pressSection = modLines.slice(pressStart, pressEnd).join("\n");

// Reconstruct: ...everything before changelog, then changelog, support, press, releases, ]; everything after
const beforeSection = modLines.slice(0, changelogStart).join("\n");
const afterSection = modLines.slice(arrayEnd).join("\n");

const newDocsEnd = changelogSection + ",\n" + supportSection + ",\n" + pressSection + ",\n" + releasesSection;

j = beforeSection + "\n" + newDocsEnd + "\n" + afterSection;
console.log("Sections reordered ✓");

// --- Step 3: Update v0.0.7 content ---
const v007New = `\t{
		id: "v0-0-7",
		title: "Stratum 0.0.7",
		body: [
			"This release introduces a theme system with eight color variants, fixes streaming stutter during long manager thinking sequences, and resolves main-thread freezing under heavy multi-agent load.",
		],
		points: [
			"Theme system — eight color variants switchable live from Settings > Theme and persisted across restarts: Default (the original clean grayscale palette), Stratum (teal/cyan accent with cool-tinted backgrounds), Warm (orange/amber accent with warm cream backgrounds, based on Claude's palette), Vivid Violet (purple accent with violet-tinted surfaces), Synthwave (retro cyberpunk with blue/pink neon accents), Sunset (warm orange/amber tones with deep contrast), Ocean (blue palette derived from marine tones), High Contrast (grey achromatic chrome with bright orange message bubbles for accessibility). Each theme has matching light and dark mode support.",
			"Manager tools — abort_worker(workerId) and refresh_worker(workerId) stop or restart a specific worker without affecting others.",
			"Task dependency chains — workers can specify dependsOn: \\\"workerId\\\" to wait for another worker's task to complete. The dependency's lastSummary is automatically injected into the waiting worker's context.",
			"/compact command — reuses existing compactAgentContext() logic, no LLM call.",
			"Fixed: Streaming stutter — MarkdownBlock.render() was calling marked.parse() synchronously on every text delta (~50-100ms per call for long responses), saturating the main thread. Text chunks now render as plain whitespace-pre-wrap during streaming; full markdown rendering only runs once on finalize.",
			"Fixed: StreamingMessageContainer overhead — replaced JSON.parse(JSON.stringify()) deep clone on every animation frame with direct reference assignment, avoiding serialization cost for large message objects.",
			"Fixed: Main-thread freezing under heavy load — announceStats() was firing synchronously on every agent event (including every streaming chunk), iterating all messages across all 5 agents 10+ times per second. Debounced to 500ms and caches estimateContextTokens() between message ends.",
			"Fixed: Update URLs — the app now correctly checks Kushalk0677/startum-mac for releases and downloads stratum-mac-arm64.dmg instead of pointing to a stale repo and .exe file.",
			"Changed: Hardcoded orange user-message gradients, slash menu borders, and action dialog colors updated to match the active palette across all eight theme variants.",
			"Changed: run-envelope background changed from hardcoded #f8fafc to var(--desktop-subtle) so it responds to theme switching.",
			"Changed: Worker panel shows amber blocked status dot and 'waiting for {workerId}' label when a dependency is active.",
			"Notes: Windows installer asset: stratum-setup.exe. macOS (Silicon) installer asset: stratum-mac-arm64.dmg.",
		],
	}`;

// Find v0-0-7 section in the reordered content
const v007Pos = j.indexOf('\tid: "v0-0-7"');
const v007SectionStart = j.lastIndexOf("\n\t{", v007Pos);
const v007SectionEnd = j.indexOf("\n\t},\n", v007Pos) + 5;

if (v007SectionStart >= 0 && v007SectionEnd > v007SectionStart) {
  j = j.substring(0, v007SectionStart) + "\n" + v007New + j.substring(v007SectionEnd);
  console.log("v0.0.7 updated ✓");
}

// --- Step 4: Add v1.0.0 after v0.0.7 ---
const v100New = `,\n\t{
		id: "v1-0-0",
		title: "Stratum 1.0.0 Latest",
		body: [
			"This release brings Stratum to 1.0.0 across Windows and macOS, syncing the current desktop core and making the app feel much closer to a real multi-agent coding workspace. It adds code indexing, cleaner Manager tool summaries, visible subagent/specialist-agent cards, safer rollback/checkpoint handling, remote Manager groundwork, and major chat UI polish.",
		],
		points: [
			"Desktop code indexing — project-local indexes under .stratum/index/ for files, symbols, imports/exports, references, edges, and manifest data.",
			"Index-backed Manager/Explore tools: refresh_code_index, find_symbol, find_references, find_imports, retrieve_code_context.",
			"Code context retrieval — Manager/Explore can retrieve compact code spans from the index before falling back to broad file reads.",
			"Manager tool result cards — raw tool calls are grouped into compact expandable summaries instead of flooding the chat.",
			"Edited-files review cards — assistant turns can show edited file counts, changed paths, additions/deletions, Undo, and Review.",
			"Visible subagent cards — Explore, code analysis, indexing, and specialist-agent work can render as expandable agent-style transcripts.",
			"Dynamic specialist agents — Manager can create focused session-only agents with preset tool access.",
			"Message hover actions — messages can show timestamp, copy, and edit controls only on hover.",
			"Remote Manager API groundwork — desktop can expose current Manager chat state and accept remote Manager messages.",
			"Terminal completion notification groundwork — long-running background commands can notify Manager when complete.",
			"Queue/steer UX groundwork — follow-up messages can be queued while Manager is still working.",
			"Renderer assets — added dedicated icons for edit, tool, terminal, and steering UI.",
			"Fixed: Windows and Mac version alignment — both desktop builds now use Stratum 1.0.0.",
			"Fixed: Mac release sync — Mac repo now matches the current Windows/main desktop core instead of the older 0.0.7 codebase.",
			"Fixed: CI model generation failure — generated model fallback entries now keep legacy test models stable when live model feeds drop them.",
			"Fixed: Context compaction visibility — compaction is treated as visible chat context instead of silently hiding prior conversation.",
			"Fixed: Manager context limits — compaction behavior is tied to provider/model context pressure rather than simple message count.",
			"Fixed: Rollback behavior — rollback work was updated toward restoring both Manager messages and affected files.",
			"Fixed: Checkpoint storage pressure — checkpoint blobs moved toward .stratum/checkpoints/... instead of storing large file contents inline in chat JSON.",
			"Fixed: Tool log noise — Manager chat now keeps raw inputs/outputs available behind expandable details rather than showing every call inline.",
			"Fixed: Subagent display confusion — subagent work is rendered closer to proper agent cards instead of plain tool-call rows.",
			"Fixed: Release build failure — v1.0.0 macOS tag was moved to the fixed commit and the macOS installer workflow reran successfully.",
			"Changed: Version bumped from the 0.0.x line to 1.0.0.",
			"Changed: macOS packaging keeps the Mac-only Electron build flow while sharing the synced current core.",
			"Changed: Manager instructions now prefer indexed retrieval before broad file reads.",
			"Changed: Worker/subagent model routing now follows the worker-subagent model path.",
			"Changed: Tool summaries use lighter, less dominant styling in Manager chat.",
			"Changed: Edited-files cards were tightened visually to use less space.",
			"Changed: Release asset naming now uses platform-specific 1.0.0 installer names.",
			"Notes: Windows installer asset: stratum-setup.exe. macOS Silicon installer asset: stratum-1.0.0-mac-arm64.dmg. Windows version: 1.0.0. macOS version: 1.0.0. GitHub CI: passed. macOS installer workflow: passed.",
		],
	}`;

const v007After = j.indexOf('\tid: "v0-0-7"');
const v007Close = j.indexOf("\n\t},\n];", v007After) + 5;

if (v007Close > 5) {
  j = j.substring(0, v007Close) + v100New + "\n" + j.substring(v007Close);
  console.log("v1.0.0 added ✓");
}

fs.writeFileSync("src/main.jsx", j);

// Final verification
const v = fs.readFileSync("src/main.jsx", "utf8");
const checkOrder = ["admin-quotas", "changelog", "support", "press", "v0-0-3", "v0-0-7", "v1-0-0"];
let prevPos = 0;
let ok = true;
for (const m of checkOrder) {
  const p = v.indexOf('\t\tid: "' + m + '"');
  if (p < 0) { console.log("MISSING:", m); ok = false; }
  else if (p < prevPos) { console.log("OUT OF ORDER:", m); ok = false; }
  else prevPos = p;
}
console.log("Order:", ok ? "OK ✓" : "FAIL ✗");
console.log("Tester refs:", (v.match(/testers?/g) || []).length);

// Build
const { execSync } = require("child_process");
try {
  const r = execSync("npm run build 2>&1", { cwd: ".", timeout: 30000 });
  const out = r.toString();
  console.log(out.includes("built in") ? "BUILD ✓" : "BUILD ? (check output)");
} catch (e) {
  console.log("BUILD FAILED");
  console.log(e.stderr.toString().substring(0, 200));
}
