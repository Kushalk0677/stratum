const fs = require("fs");
let js = fs.readFileSync("src/main.jsx", "utf8");

// ============================================================
// 1. Fix the v0-0-7 title back to "Stratum 0.0.7"  
//    (my earlier script changed it to "Stratum 1.0.0" incorrectly)
// ============================================================

// Fix v0-0-3 through v0-0-6 titles (they got changed to "Stratum 1.0.0")
const versionTitles = [
  ["v0-0-3", "Stratum 0.0.3"],
  ["v0-0-4", "Stratum 0.0.4"],
  ["v0-0-5", "Stratum 0.0.5"],
  ["v0-0-6", "Stratum 0.0.6"],
];

for (const [id, title] of versionTitles) {
  // Find the section and fix the title
  const idIdx = js.indexOf(`id: "${id}"`);
  if (idIdx >= 0) {
    const titleIdx = js.indexOf('title:', idIdx);
    const titleEnd = js.indexOf(',', titleIdx);
    const oldTitle = js.substring(titleIdx, titleEnd);
    // Replace whatever title is there with the correct one
    js = js.substring(0, titleIdx) + `title: "${title}"` + js.substring(titleEnd);
  }
}

// For v0-0-7, we need to replace the ENTIRE section with the user's new content
// The user provided new content for v0.0.7 - let me find and replace it

const v007Start = js.indexOf('id: "v0-0-7"');
const v007SectionStart = js.lastIndexOf('{', v007Start - 1);
// Find the end of this section (the next '},' after the points array)
const v007BodyEnd = js.indexOf('],', js.indexOf('body:', v007Start));
const v007PointsEnd = js.indexOf('],', js.indexOf('points:', v007BodyEnd));
const v007SectionEnd = js.indexOf('},', v007PointsEnd) + 2;

// The user's new v0.0.7 content
const newV007 = `{
		id: "v0-0-7",
		title: "Stratum 0.0.7",
		body: [
			"This release introduces a theme system with eight color variants, fixes streaming stutter during long manager thinking sequences, and resolves main-thread freezing under heavy multi-agent load.",
		],
		points: [
			"Theme system — eight color variants switchable live from Settings > Theme and persisted across restarts: Default (the original clean grayscale palette), Stratum (teal/cyan accent with cool-tinted backgrounds), Warm (orange/amber accent with warm cream backgrounds, based on Claude's palette), Vivid Violet (purple accent with violet-tinted surfaces), Synthwave (retro cyberpunk with blue/pink neon accents), Sunset (warm orange/amber tones with deep contrast), Ocean (blue palette derived from marine tones), High Contrast (grey achromatic chrome with bright orange message bubbles for accessibility). Each theme has matching light and dark mode support.",
			"Manager tools — abort_worker(workerId) and refresh_worker(workerId) stop or restart a specific worker without affecting others.",
			"Task dependency chains — workers can specify dependsOn: \"workerId\" to wait for another worker's task to complete. The dependency's lastSummary is automatically injected into the waiting worker's context.",
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

js = js.substring(0, v007SectionStart) + newV007 + js.substring(v007SectionEnd);

// ============================================================
// 2. Add the new v1.0.0 section AFTER v0-0-7
// ============================================================
const newV100 = `,
	{
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

// Find the end of the v0-0-7 section and insert v1-0-0 after it
const v007AfterUpdate = js.indexOf(`id: "v0-0-7"`);
const v007EndNew = js.indexOf('},', js.indexOf('Notes:', v007AfterUpdate)) + 2;
js = js.substring(0, v007EndNew) + newV100 + js.substring(v007EndNew);

// ============================================================
// 3. Move releases (v0-0-3 through v1-0-0) to AFTER the press section
// ============================================================

// Find the press section boundaries
const pressStart = js.indexOf('id: "press"');
const pressSectionStart = js.lastIndexOf('{', pressStart - 1);
const pressBodyEnd = js.indexOf('],', js.indexOf('body:', pressStart));
const pressPointsEnd = js.indexOf('],', pressStart);
const pressSectionEnd = js.indexOf('},', pressPointsEnd + 5) + 2;

// Find the releases section boundaries (v0-0-3 through v1-0-0)
const v003Start = js.indexOf('id: "v0-0-3"');
const v003SectionStart = js.lastIndexOf('{', v003Start - 1);
const v100End = js.indexOf(`id: "v1-0-0"`);
const v100SectionEnd = js.indexOf('},', js.indexOf('Notes:', v100End)) + 2;

// Extract press section and releases section
const pressSection = js.substring(pressSectionStart, pressSectionEnd);
const releasesSection = js.substring(v003SectionStart, v100SectionEnd);

// Remove releases from their current position and insert after press
const beforeReleases = js.substring(0, v003SectionStart);
const afterReleases = js.substring(v100SectionEnd);
const beforePress = beforeReleases + afterReleases;

// Now find the press section in this new string and insert releases after it
const pressStartNew = beforePress.indexOf('id: "press"');
const pressSectionEndNew = beforePress.indexOf('},', beforePress.indexOf('],', pressStartNew) + 5) + 2;

const finalJs = beforePress.substring(0, pressSectionEndNew) + ",\n\t" + releasesSection + beforePress.substring(pressSectionEndNew);

js = finalJs;

// ============================================================
// 4. Update the navigation link for releases
// ============================================================
// The releases nav item currently points to "v0-0-3", keep it that way

// Make sure the navigation has "Releases" pointing to "v0-0-3"
// (which is now the first release section after press)

fs.writeFileSync("src/main.jsx", js);
console.log("Done!");

// Verify ordering
const v = fs.readFileSync("src/main.jsx", "utf8");
const ids = [];
let pos = 0;
while ((pos = v.indexOf('id: "v', pos)) !== -1) {
  const end = v.indexOf('"', pos + 5);
  ids.push(v.substring(pos + 5, end));
  pos = end + 1;
}
console.log("Release sections in order:", ids.join(", "));

// Check press position relative to releases
const pIdx = v.indexOf('id: "press"');
const rIdx = v.indexOf('id: "v0-0-3"');
console.log("Press before v0-0-3:", pIdx < rIdx);
