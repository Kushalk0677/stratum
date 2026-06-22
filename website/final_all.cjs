const fs = require("fs");

// ========== CSS ==========
let css = fs.readFileSync("src/styles.css", "utf8");
if (!css.includes("Scroll-reveal animations")) {
  const block = "\n/* ── Scroll-reveal animations ── */\n@keyframes fadeSlideUp {\n\tfrom { opacity: 0; transform: translateY(18px); }\n\tto { opacity: 1; transform: translateY(0); }\n}\n.reveal.revealed { animation: fadeSlideUp 0.55s cubic-bezier(0.21, 0.6, 0.35, 1) both; }\n.reveal.revealed .stagger { animation: fadeSlideUp 0.45s cubic-bezier(0.21, 0.6, 0.35, 1) both; }\n";
  css = css.slice(0, css.indexOf("@media (prefers-reduced-motion: reduce)")) + block + "\n" + css.slice(css.indexOf("@media (prefers-reduced-motion: reduce)"));
  fs.writeFileSync("src/styles.css", css);
  console.log("CSS ✓");
}

// ========== JS ==========
// Step 1: Reorder sections using line indices
let lines = fs.readFileSync("src/main.jsx", "utf8").split("\n");

// From committed HEAD: changelog=1105, support=1111, v003=1124, press=1234, arrayEnd=1247 (0-indexed)
const reordered = lines.slice(0, 1105).join("\n") + "\n" +
  lines.slice(1105, 1111).join("\n") + ",\n" +
  lines.slice(1111, 1124).join("\n") + ",\n" +
  lines.slice(1234, 1247).join("\n") + ",\n" +
  lines.slice(1124, 1234).join("\n") + "\n" +
  lines.slice(1247).join("\n");

fs.writeFileSync("src/main.jsx", reordered, "utf8");
console.log("Step 1: Reordered ✓");

// Step 2: Apply all text replacements on the reordered file
let j = fs.readFileSync("src/main.jsx", "utf8");

// <main>
j = j.replace('<main onClick={navigate}>', '<main key={route} className="" onClick={navigate}>');

// IntersectionObserver
if (!j.includes("IntersectionObserver")) {
  const obs = "\n\t// Scroll-triggered reveal\n\tReact.useEffect(() => {\n\t\tconst observer = new IntersectionObserver(\n\t\t\t(entries) => {\n\t\t\t\tentries.forEach((entry) => {\n\t\t\t\t\tif (entry.isIntersecting) {\n\t\t\t\t\t\tentry.target.classList.add(\"revealed\");\n\t\t\t\t\t\tobserver.unobserve(entry.target);\n\t\t\t\t\t}\n\t\t\t\t});\n\t\t\t},\n\t\t\t{ threshold: 0.08, rootMargin: \"0px 0px -30px 0px\" }\n\t\t);\n\t\tconst elements = document.querySelectorAll(\".reveal\");\n\t\telements.forEach((el) => observer.observe(el));\n\t\treturn () => observer.disconnect();\n\t}, [route]);\n";
  j = j.replace("const [route, navigate] = useRoute();", "const [route, navigate] = useRoute();" + obs);
}

// .reveal
[
  ['className="hero" onClick={onNavigate}', 'className="hero reveal" onClick={onNavigate}'],
  ['className="metric-strip"', 'className="metric-strip reveal"'],
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
].forEach(([f, t]) => { if (j.includes(f)) j = j.replace(f, t); });

// Stagger
j = j.replace('{productSurfaces.map(([title, body, icon]) => (', '{productSurfaces.map(([title, body, icon], index) => (');
j = j.replace('<article key={title} className="feature-card">', '<article key={title} className="feature-card stagger" style={{ animationDelay: `${index * 0.07}s` }}>');
j = j.replace('<article key={title} className="use-case-card">', '<article key={title} className="use-case-card stagger" style={{ animationDelay: `${index * 0.07}s` }}>');
j = j.replace('{deepUseCases.map(([title, lanes, artifacts]) => (', '{deepUseCases.map(([title, lanes, artifacts], index) => (');
j = j.replace('<article key={title} className="deep-use-card">', '<article key={title} className="deep-use-card stagger" style={{ animationDelay: `${index * 0.07}s` }}>');

// Text cleanup
[
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
].forEach(([f, t]) => { if (j.includes(f)) j = j.replace(f, t); });

// Step 3: Replace v0.0.7 and add v1.0.0 using line-based approach
// After reordering, the file has sections in this order near the end:
// ... changelog, support, press, v0-0-3, v0-0-4, v0-0-5, v0-0-6, v0-0-7, ];

// Split into lines again after all replacements
lines = j.split("\n");

// Find v0-0-7 start line
const v007Line = lines.findIndex(l => l.includes('id: "v0-0-7"'));
console.log("v0-0-7 found at line", v007Line + 1);

// Find where the array ends (the ]; that closes docsSections)
const arrayEndLine = lines.findIndex(l => l.trim() === "];");
console.log("Array close at line", arrayEndLine + 1);

// The v0-0-7 section spans from v007Line to arrayEndLine (inclusive of the section, not the ])
// Actually, v0-0-7 goes from its opening { to its closing }, which is arrayEndLine - 1 (the line before ];)
// Replace lines v007Line to arrayEndLine - 1 with the new v0.0.7 content + new v1.0.0 content

const v0_0_7_new = `\t{
\t\tid: "v0-0-7",
\t\ttitle: "Stratum 0.0.7",
\t\tbody: [
\t\t\t"This release introduces a theme system with eight color variants, fixes streaming stutter during long manager thinking sequences, and resolves main-thread freezing under heavy multi-agent load.",
\t\t],
\t\tpoints: [
\t\t\t"Theme system — eight color variants switchable live from Settings > Theme and persisted across restarts: Default (the original clean grayscale palette), Stratum (teal/cyan accent with cool-tinted backgrounds), Warm (orange/amber accent with warm cream backgrounds, based on Claude's palette), Vivid Violet (purple accent with violet-tinted surfaces), Synthwave (retro cyberpunk with blue/pink neon accents), Sunset (warm orange/amber tones with deep contrast), Ocean (blue palette derived from marine tones), High Contrast (grey achromatic chrome with bright orange message bubbles for accessibility). Each theme has matching light and dark mode support.",
\t\t\t"Manager tools — abort_worker(workerId) and refresh_worker(workerId) stop or restart a specific worker without affecting others.",
\t\t\t"Task dependency chains — workers can specify dependsOn: \\"workerId\\" to wait for another worker's task to complete. The dependency's lastSummary is automatically injected into the waiting worker's context.",
\t\t\t"/compact command — reuses existing compactAgentContext() logic, no LLM call.",
\t\t\t"Fixed: Streaming stutter — MarkdownBlock.render() was calling marked.parse() synchronously on every text delta (~50-100ms per call for long responses), saturating the main thread. Text chunks now render as plain whitespace-pre-wrap during streaming; full markdown rendering only runs once on finalize.",
\t\t\t"Fixed: StreamingMessageContainer overhead — replaced JSON.parse(JSON.stringify()) deep clone on every animation frame with direct reference assignment, avoiding serialization cost for large message objects.",
\t\t\t"Fixed: Main-thread freezing under heavy load — announceStats() was firing synchronously on every agent event (including every streaming chunk), iterating all messages across all 5 agents 10+ times per second. Debounced to 500ms and caches estimateContextTokens() between message ends.",
\t\t\t"Fixed: Update URLs — the app now correctly checks Kushalk0677/startum-mac for releases and downloads stratum-mac-arm64.dmg instead of pointing to a stale repo and .exe file.",
\t\t\t"Changed: Hardcoded orange user-message gradients, slash menu borders, and action dialog colors updated to match the active palette across all eight theme variants.",
\t\t\t"Changed: run-envelope background changed from hardcoded #f8fafc to var(--desktop-subtle) so it responds to theme switching.",
\t\t\t"Changed: Worker panel shows amber blocked status dot and 'waiting for {workerId}' label when a dependency is active.",
\t\t\t"Notes: Windows installer asset: stratum-setup.exe. macOS (Silicon) installer asset: stratum-mac-arm64.dmg.",
\t\t],
\t}`;

const v1_0_0_new = `,\n\t{
\t\tid: "v1-0-0",
\t\ttitle: "Stratum 1.0.0 Latest",
\t\tbody: [
\t\t\t"This release brings Stratum to 1.0.0 across Windows and macOS, syncing the current desktop core and making the app feel much closer to a real multi-agent coding workspace. It adds code indexing, cleaner Manager tool summaries, visible subagent/specialist-agent cards, safer rollback/checkpoint handling, remote Manager groundwork, and major chat UI polish.",
\t\t],
\t\tpoints: [
\t\t\t"Desktop code indexing — project-local indexes under .stratum/index/ for files, symbols, imports/exports, references, edges, and manifest data.",
\t\t\t"Index-backed Manager/Explore tools: refresh_code_index, find_symbol, find_references, find_imports, retrieve_code_context.",
\t\t\t"Code context retrieval — Manager/Explore can retrieve compact code spans from the index before falling back to broad file reads.",
\t\t\t"Manager tool result cards — raw tool calls are grouped into compact expandable summaries instead of flooding the chat.",
\t\t\t"Edited-files review cards — assistant turns can show edited file counts, changed paths, additions/deletions, Undo, and Review.",
\t\t\t"Visible subagent cards — Explore, code analysis, indexing, and specialist-agent work can render as expandable agent-style transcripts.",
\t\t\t"Dynamic specialist agents — Manager can create focused session-only agents with preset tool access.",
\t\t\t"Message hover actions — messages can show timestamp, copy, and edit controls only on hover.",
\t\t\t"Remote Manager API groundwork — desktop can expose current Manager chat state and accept remote Manager messages.",
\t\t\t"Terminal completion notification groundwork — long-running background commands can notify Manager when complete.",
\t\t\t"Queue/steer UX groundwork — follow-up messages can be queued while Manager is still working.",
\t\t\t"Renderer assets — added dedicated icons for edit, tool, terminal, and steering UI.",
\t\t\t"Fixed: Windows and Mac version alignment — both desktop builds now use Stratum 1.0.0.",
\t\t\t"Fixed: Mac release sync — Mac repo now matches the current Windows/main desktop core instead of the older 0.0.7 codebase.",
\t\t\t"Fixed: CI model generation failure — generated model fallback entries now keep legacy test models stable when live model feeds drop them.",
\t\t\t"Fixed: Context compaction visibility — compaction is treated as visible chat context instead of silently hiding prior conversation.",
\t\t\t"Fixed: Manager context limits — compaction behavior is tied to provider/model context pressure rather than simple message count.",
\t\t\t"Fixed: Rollback behavior — rollback work was updated toward restoring both Manager messages and affected files.",
\t\t\t"Fixed: Checkpoint storage pressure — checkpoint blobs moved toward .stratum/checkpoints/... instead of storing large file contents inline in chat JSON.",
\t\t\t"Fixed: Tool log noise — Manager chat now keeps raw inputs/outputs available behind expandable details rather than showing every call inline.",
\t\t\t"Fixed: Subagent display confusion — subagent work is rendered closer to proper agent cards instead of plain tool-call rows.",
\t\t\t"Fixed: Release build failure — v1.0.0 macOS tag was moved to the fixed commit and the macOS installer workflow reran successfully.",
\t\t\t"Changed: Version bumped from the 0.0.x line to 1.0.0.",
\t\t\t"Changed: macOS packaging keeps the Mac-only Electron build flow while sharing the synced current core.",
\t\t\t"Changed: Manager instructions now prefer indexed retrieval before broad file reads.",
\t\t\t"Changed: Worker/subagent model routing now follows the worker-subagent model path.",
\t\t\t"Changed: Tool summaries use lighter, less dominant styling in Manager chat.",
\t\t\t"Changed: Edited-files cards were tightened visually to use less space.",
\t\t\t"Changed: Release asset naming now uses platform-specific 1.0.0 installer names.",
\t\t\t"Notes: Windows installer asset: stratum-setup.exe. macOS Silicon installer asset: stratum-1.0.0-mac-arm64.dmg. Windows version: 1.0.0. macOS version: 1.0.0. GitHub CI: passed. macOS installer workflow: passed.",
\t\t],
\t}`;

// Replace lines from v007Line to arrayEndLine - 1 with the new content
const beforeLines = lines.slice(0, v007Line).join("\n");
const afterLines = lines.slice(arrayEndLine).join("\n"); // everything from ]; onwards

const newContent = v0_0_7_new + v1_0_0_new;

j = beforeLines + "\n" + newContent + "\n" + afterLines;

fs.writeFileSync("src/main.jsx", j);
console.log("Step 3: v0.0.7 + v1.0.0 updated ✓");

// Final build
const { execSync } = require("child_process");
try {
  const out = execSync("npm run build 2>&1", { cwd: ".", timeout: 30000 }).toString();
  if (out.includes("built in")) {
    console.log("BUILD ✓");
  } else {
    console.log("BUILD: check output");
    console.log(out.substring(0, 300));
  }
} catch (e) {
  console.log("BUILD FAILED");
  const stderr = e.stderr ? e.stderr.toString() : e.message;
  console.log(stderr.substring(0, 300));
}

// Verify order
const v = fs.readFileSync("src/main.jsx", "utf8");
let prev = 0;
["admin-quotas", "changelog", "support", "press", "v0-0-3", "v0-0-7", "v1-0-0"].forEach(m => {
  const p = v.indexOf('id: "' + m + '"');
  console.log(m, p >= 0 ? (p > prev ? "OK" : "WRONG ORDER") : "MISSING");
  if (p > prev) prev = p;
});
console.log("Tester refs:", (v.match(/testers?/g) || []).length);
console.log("Unsigned refs:", (v.match(/unsigned/g) || []).length);
