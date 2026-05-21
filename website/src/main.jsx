import React from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const navItems = [
	{ href: "/", label: "Overview" },
	{ href: "/features", label: "Features" },
	{ href: "/local-models", label: "Local models" },
	{ href: "/download", label: "Download" },
];

const tools = [
	["/assets/group-icon.png", "Manager focus", "A cleaner manager-only chat with workflow activity pinned beside it."],
	["/assets/git-review-icon.png", "Git review", "Inspect local changes and hand review tasks back to the manager."],
	["/assets/browser-click-icon.png", "Browser", "Open pages, localhost apps, and screenshots for agent-visible context."],
	["/assets/terminal-icon.png", "Terminal", "A manual terminal overlay for user-visible command sessions."],
	["/assets/tex-icon.png", "LaTeX", "Compile papers, inspect errors, preview PDFs, and jump through the outline."],
	["/assets/note-icon.png", "Notes", "Persistent project notes for decisions, requirements, and commands."],
];

const localProviders = [
	["Ollama", "http://localhost:11434", "phi3, qwen2.5-coder, llama3.2"],
	["LM Studio", "http://localhost:1234/v1", "OpenAI-compatible local server"],
	["llama.cpp", "http://localhost:8080/v1", "GGUF models through server mode"],
	["vLLM", "http://localhost:8000/v1", "Local or LAN inference server"],
];

const demoWorkers = [
	["Runtime Worker", "Implements patch", "Edits files, runs scoped commands, reports blockers."],
	["Review Worker", "Checks behavior", "Reviews diffs, missing tests, and risky assumptions."],
	["Research Worker", "Finds context", "Reads docs, papers, and repo notes without derailing chat."],
];

const demoTimeline = [
	["Manager", "Splits the request into parallel worker tasks."],
	["Runtime", "Runs npm checks and patches the UI failure."],
	["Browser", "Captures a screenshot from the local preview."],
	["Review", "Flags one regression and asks Runtime to fix it."],
	["Memory", "Compacts older context into plan.md and keeps going."],
];

const productMetrics = [
	["5", "parallel agents"],
	["128K", "tracked context"],
	["180M+", "tokens in real projects"],
	["0", "tabs required"],
];

const releaseHighlights = [
	"Manager-only chat mode with workflow column",
	"Project chats grouped by folder",
	"Persistent notes, plan.md memory, and compaction markers",
	"Local model support through Ollama and OpenAI-compatible servers",
];

const screenshots = {
	notes: "/assets/screenshots/notes.png",
	modelSelector: "/assets/screenshots/model-selector.png",
	fileTree: "/assets/screenshots/file-tree.png",
	todoList: "/assets/screenshots/todo-list.png",
	managerWorkflow: "/assets/screenshots/manager-workflow.png",
	workerGrid: "/assets/screenshots/worker-grid.png",
	latex: "/assets/screenshots/latex.png",
	githubDiff: "/assets/screenshots/github-diff.png",
	githubOpen: "/assets/screenshots/github-open.png",
};

function routeFromLocation() {
	const path = window.location.pathname.replace(/\/+$/, "") || "/";
	if (path === "/features") return "features";
	if (path === "/local-models") return "local";
	if (path === "/download") return "download";
	return "home";
}

function useRoute() {
	const [route, setRoute] = React.useState(routeFromLocation);

	React.useEffect(() => {
		const onPopState = () => setRoute(routeFromLocation());
		window.addEventListener("popstate", onPopState);
		return () => window.removeEventListener("popstate", onPopState);
	}, []);

	const navigate = React.useCallback((event) => {
		const anchor = event.target.closest("a[data-route]");
		if (!anchor) return;
		event.preventDefault();
		window.history.pushState({}, "", anchor.getAttribute("href"));
		setRoute(routeFromLocation());
		window.scrollTo({ top: 0, behavior: "smooth" });
	}, []);

	return [route, navigate];
}

function Header({ route, onNavigate }) {
	return (
		<header className="site-header" onClick={onNavigate}>
			<a className="brand" href="/" data-route>
				<img src="/assets/stratum-logo.png" alt="" />
				<span>stratum</span>
			</a>
			<nav aria-label="Primary navigation">
				{navItems.map((item) => (
					<a key={item.href} href={item.href} data-route className={isRouteActive(route, item.href) ? "active" : ""}>
						{item.label}
					</a>
				))}
			</nav>
			<a className="header-download" href="/download" data-route>
				Get Stratum
			</a>
		</header>
	);
}

function isRouteActive(route, href) {
	if (href === "/" && route === "home") return true;
	if (href === "/features" && route === "features") return true;
	if (href === "/local-models" && route === "local") return true;
	return href === "/download" && route === "download";
}

function AppMockup() {
	return (
		<div className="app-mockup" aria-label="Stratum app preview">
			<img className="mock-screenshot" src={screenshots.managerWorkflow} alt="Stratum manager workflow with worker chats and workflow feed" />
		</div>
	);
}

function AnimatedWorkflow() {
	return (
		<section className="demo-section">
			<div className="demo-copy">
				<p className="eyebrow">How it works</p>
				<h2>One prompt becomes a coordinated workflow.</h2>
				<p>
					The manager keeps the main thread readable while workers handle implementation, review, research, browser screenshots, terminal commands, and project memory.
				</p>
			</div>
			<div className="demo-stage" aria-label="Animated Stratum workflow demo">
				<div className="prompt-card">
					<div className="prompt-topline">
						<span>Manager prompt</span>
						<i>auto-route enabled</i>
					</div>
					<div className="typed-prompt">
						Fix the browser panel, verify with a screenshot, update plan.md, then prepare a release.
					</div>
					<div className="prompt-controls">
						<span>5 agents</span>
						<span>ctx 24k/128k</span>
						<b>Run</b>
					</div>
				</div>
				<div className="agent-map">
					<div className="manager-node">
						<img src="/assets/group-icon.png" alt="" />
						<strong>Manager</strong>
						<span>delegates, verifies, retries errors</span>
					</div>
					<div className="connector connector-a" />
					<div className="connector connector-b" />
					<div className="connector connector-c" />
					{demoWorkers.map(([name, status, body], index) => (
						<div key={name} className={`worker-node worker-${index + 1}`}>
							<span>{name}</span>
							<strong>{status}</strong>
							<p>{body}</p>
						</div>
					))}
				</div>
				<div className="tool-rail">
					<div>
						<img src="/assets/terminal-icon.png" alt="" />
						<span>run_project_command</span>
					</div>
					<div>
						<img src="/assets/browser-click-icon.png" alt="" />
						<span>screenshot_localhost</span>
					</div>
					<div>
						<img src="/assets/git-review-icon.png" alt="" />
						<span>git_review</span>
					</div>
					<div>
						<img src="/assets/note-icon.png" alt="" />
						<span>write_plan_md</span>
					</div>
				</div>
				<div className="timeline-strip">
					{demoTimeline.map(([label, body], index) => (
						<div key={label} className={`timeline-item timeline-${index + 1}`}>
							<b>{label}</b>
							<span>{body}</span>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}

function MetricStrip() {
	return (
		<section className="metric-strip" aria-label="Stratum product metrics">
			{productMetrics.map(([value, label]) => (
				<div key={label}>
					<strong>{value}</strong>
					<span>{label}</span>
				</div>
			))}
		</section>
	);
}

function ScreenshotCard({ eyebrow, title, body, src, alt, wide = false }) {
	return (
		<article className={wide ? "screenshot-card screenshot-card-wide" : "screenshot-card"}>
			<div className="card-copy">
				<span>{eyebrow}</span>
				<h3>{title}</h3>
				<p>{body}</p>
			</div>
			<div className="screenshot-frame">
				<img src={src} alt={alt} />
			</div>
		</article>
	);
}

function NotesPanel() {
	return (
		<div className="surface surface-notes">
			<div className="surface-header">
				<div>
					<strong>notes</strong>
					<span>.stratum/notes.md</span>
				</div>
				<div className="surface-actions">
					<button type="button">Refresh</button>
					<button type="button" className="dark-button">
						Save
					</button>
					<button type="button">x</button>
				</div>
			</div>
			<pre>{`# Project Notes

- Research-grade roadmap updated.
- Arduino avr-size integration setup.
- Blocker: platformio CLI is not available.

## Agent Updates
- Manager compacted 42 older messages.
- Runtime verified the build path.
- Review requested one follow-up check.`}</pre>
		</div>
	);
}

function ModelPanel() {
	return (
		<div className="surface surface-model">
			<div className="modal-window">
				<div className="modal-title">
					<strong>Select Manager Model</strong>
					<span>x</span>
				</div>
				<label className="check-row">
					<input type="checkbox" checked readOnly />
					Use same model for worker agents
				</label>
				<div className="search-box">Search models...</div>
				<div className="model-tags">
					<span>Thinking</span>
					<span>Vision</span>
				</div>
				{["gemini-3.1-flash-lite", "amazon.nova-2-lite-v1:0", "anthropic.claude-haiku-4-5"].map((model, index) => (
					<div key={model} className="model-row">
						<div>
							<strong>{model}</strong>
							<span>{index === 0 ? "1M/66K" : "128K/4K"}</span>
						</div>
						<small>{index === 0 ? "google" : "amazon-bedrock"}</small>
					</div>
				))}
			</div>
		</div>
	);
}

function FileTreePanel() {
	return (
		<div className="surface surface-filetree">
			<div className="surface-header compact">
				<div>
					<strong>file tree</strong>
					<span>C:\orchestrator-system\test7</span>
				</div>
				<div className="surface-actions">
					<button type="button">C</button>
					<button type="button">x</button>
				</div>
			</div>
			<div className="filetree-layout">
				<div className="tree-list">
					<strong>project root</strong>
					<span>-p</span>
					<span>.stratum</span>
					<span>arduino_template</span>
					<span>paper</span>
					<span>unonas</span>
					<em>codebase.md</em>
					<em>plan.md</em>
				</div>
				<div className="preview-empty">Select a file to preview it here.</div>
			</div>
		</div>
	);
}

function TodoPanel() {
	return (
		<div className="surface surface-todo">
			<div className="surface-header compact">
				<div>
					<strong>todo list</strong>
					<span>Updated by the manager</span>
				</div>
				<div className="surface-actions">
					<button type="button">Close</button>
				</div>
			</div>
			<div className="todo-items">
				<span>Audit repo structure</span>
				<span>Patch browser overlay</span>
				<span>Verify with screenshot</span>
			</div>
		</div>
	);
}

function WorkerPanel() {
	return (
		<div className="surface surface-workers">
			<div className="workspace-topbar">
				<img src="/assets/stratum-logo.png" alt="" />
				<strong>stratum</strong>
				<span>5 agents</span>
				<span>ctx 114.5K/128.0K</span>
			</div>
			<div className="worker-board">
				<div className="worker-cell">
					<b>Frontend Worker</b>
					<p>Files changed: none. Checks run: structure audit.</p>
				</div>
				<div className="worker-cell">
					<b>Runtime Worker</b>
					<p>Reviewed UnoNAS project and memory constraints.</p>
				</div>
				<div className="workflow-feed">
					<strong>WORKFLOW</strong>
					<span>Manager &rarr; Runtime Worker</span>
					<span>Runtime Worker &rarr; plan.md</span>
					<span>Automatically compacting context</span>
				</div>
			</div>
		</div>
	);
}

function LatexPanel() {
	return (
		<div className="surface surface-latex">
			<div className="latex-left">
				<strong>Files</strong>
				<span>figures</span>
				<span>IEEEtran.cls</span>
				<span>rams_esl.tex</span>
				<hr />
				<strong>Outline</strong>
				<span>Introduction</span>
				<span>Related Work</span>
				<span>System Design</span>
				<span>Results</span>
			</div>
			<div className="latex-editor">
				<div className="tab-label">paper/rams_esl.tex</div>
				<pre>{`\\documentclass[10pt,journal]{IEEEtran}
\\usepackage{amsmath,amssymb}
\\usepackage{graphicx}
\\begin{document}
\\title{RAMS: Resource-Adaptive Model Switching}
\\maketitle`}</pre>
			</div>
			<div className="pdf-preview">
				<div className="pdf-toolbar">Compile   1 / 4</div>
				<div className="paper-page">
					<strong>RAMS: Resource-Adaptive and Detection-Conditioned Model Switching</strong>
					<p>Abstract text and two-column preview rendered beside the editor.</p>
				</div>
			</div>
		</div>
	);
}

function GithubPanel() {
	return (
		<div className="surface surface-github">
			<div className="surface-header compact">
				<div>
					<span>REVIEW AND APPROVE</span>
					<strong>github workspace</strong>
				</div>
				<div className="surface-actions">
					<button type="button">C</button>
					<button type="button">x</button>
				</div>
			</div>
			<div className="git-grid">
				<div className="git-summary">
					<strong>main</strong>
					<span>tracking origin/main</span>
					<div className="git-stats">
						<b>33 files</b>
						<b className="plus">+3455</b>
						<b className="minus">-895</b>
					</div>
				</div>
				<div className="diff-list">
					<span>NEW .stratum/notes.md</span>
					<span>MODIFIED codebase.md</span>
					<span>MODIFIED plan.md</span>
					<span>NEW paper/main.tex</span>
				</div>
				<pre className="diff-view">{`diff --git a/.stratum/notes.md
+ Advanced Research Lab
+ Project Overview
+ Key Features
+ Modern React application`}</pre>
			</div>
		</div>
	);
}

function Showcase() {
	return (
		<section className="showcase-section">
			<div className="section-heading">
				<p className="eyebrow">Complete workspace</p>
				<h2>Show every surface without making the chat messy.</h2>
				<p>
					Stratum keeps project tools close to the agents: model selection, notes, files, todos, LaTeX, Git review, and the manager workflow all stay in one desktop shell.
				</p>
			</div>
			<div className="surface-grid">
				<ScreenshotCard
					eyebrow="Memory"
					title="Notes that survive the chat."
					body="Agents write durable project decisions, blockers, useful commands, and research context into notes and plan files."
					src={screenshots.notes}
					alt="Stratum notes overlay showing project notes and agent updates"
				/>
				<ScreenshotCard
					eyebrow="Models"
					title="Pick one model or split workers."
					body="Choose cloud or local models, filter by capability, and decide whether workers share the manager model."
					src={screenshots.modelSelector}
					alt="Stratum model selector with search, thinking, and vision filters"
				/>
				<ScreenshotCard
					eyebrow="Projects"
					title="Folder-first project memory."
					body="File tree previews let users and agents inspect context without changing active chats or worker state."
					src={screenshots.fileTree}
					alt="Stratum file tree overlay with project folders and preview pane"
				/>
				<ScreenshotCard
					eyebrow="Manager"
					title="Todo state owned by the manager."
					body="Work items can be summarized cleanly instead of buried inside worker transcripts."
					src={screenshots.todoList}
					alt="Stratum todo list overlay updated by the manager"
				/>
			</div>
		</section>
	);
}

function TechnicalShowcase() {
	return (
		<section className="technical-showcase">
			<div className="section-heading">
				<p className="eyebrow">Research-grade workflows</p>
				<h2>From repo audit to paper compile to release review.</h2>
			</div>
			<div className="wide-showcase">
				<ScreenshotCard
					wide
					eyebrow="Manager"
					title="Manager chat beside live workflow state."
					body="The manager stays readable while the right column shows task handoffs, compaction, retries, and worker reports."
					src={screenshots.managerWorkflow}
					alt="Stratum manager workflow with message composer and workflow sidebar"
				/>
				<ScreenshotCard
					wide
					eyebrow="Workers"
					title="Parallel workers stay visible without clutter."
					body="Frontend, runtime, test, and review workers can run together while the manager verifies outputs and redirects failed tasks."
					src={screenshots.workerGrid}
					alt="Stratum multi-worker grid with manager and workflow panel"
				/>
				<ScreenshotCard
					wide
					eyebrow="LaTeX"
					title="Write, compile, preview, and navigate papers."
					body="LaTeX editing includes file lists, outline navigation, syntax highlighting, compile controls, and a PDF preview in one surface."
					src={screenshots.latex}
					alt="Stratum LaTeX workspace with editor, outline, and PDF preview"
				/>
				<ScreenshotCard
					wide
					eyebrow="GitHub"
					title="Review diffs and open work before release."
					body="The GitHub workspace gives users and agents a dedicated review surface for file diffs, open issues, PRs, and CI status."
					src={screenshots.githubDiff}
					alt="Stratum GitHub workspace showing diff review"
				/>
				<ScreenshotCard
					wide
					eyebrow="GitHub"
					title="Keep issue and PR review in the app."
					body="Open GitHub work stays inspectable without switching context away from the running agents."
					src={screenshots.githubOpen}
					alt="Stratum GitHub workspace showing open issues and pull requests"
				/>
			</div>
		</section>
	);
}

function ArchitectureSection() {
	return (
		<section className="architecture-section">
			<div className="section-heading">
				<p className="eyebrow">Architecture</p>
				<h2>Manager in the center. Tools at the edge.</h2>
				<p>
					The user talks to the manager. The manager delegates to workers, watches errors, retries failed subtasks, records memory, and asks for confirmation when needed.
				</p>
			</div>
			<div className="architecture-map">
				<div className="arch-node core">Manager</div>
				<div className="arch-node">Runtime Worker</div>
				<div className="arch-node">Review Worker</div>
				<div className="arch-node">Test Worker</div>
				<div className="arch-node">Browser</div>
				<div className="arch-node">Terminal</div>
				<div className="arch-node">GitHub</div>
				<div className="arch-node">plan.md</div>
			</div>
		</section>
	);
}

function Home({ onNavigate }) {
	return (
		<>
			<section className="hero" onClick={onNavigate}>
				<div className="hero-copy">
					<img className="hero-logo" src="/assets/app-logo.png" alt="Stratum logo" />
					<p className="eyebrow">Manager-led desktop agents for Windows</p>
					<h1>Stratum</h1>
					<p className="hero-text">
						A focused workspace where a manager agent delegates to specialist workers, keeps project memory, and uses the tools around your repository without collapsing everything into one chat.
					</p>
					<div className="hero-actions">
						<a className="primary-action" href="/download" data-route>
							Download for Windows
						</a>
						<a className="secondary-action" href="/features" data-route>
							Explore features
						</a>
					</div>
				</div>
				<AppMockup />
			</section>
			<MetricStrip />
			<AnimatedWorkflow />
			<Showcase />
			<TechnicalShowcase />
			<ArchitectureSection />
			<section className="proof-band">
				<div>
					<strong>Built for long research sessions</strong>
					<span>Context compaction, plan.md carry-forward, workflow tracking, and per-project chat history.</span>
				</div>
				<div>
					<strong>Local or cloud models</strong>
					<span>Use OpenAI-compatible providers, Ollama, LM Studio, llama.cpp, vLLM, and cloud APIs.</span>
				</div>
			</section>
		</>
	);
}

function Features() {
	return (
		<>
			<section className="page-section">
				<div className="page-heading">
					<p className="eyebrow">Features</p>
					<h1>Separate surfaces for serious work.</h1>
					<p>Stratum keeps the manager, workers, project context, and tools visible without forcing every interaction into a single transcript.</p>
				</div>
				<div className="feature-grid">
					{tools.map(([icon, title, body]) => (
						<article key={title} className="feature-card">
							<img src={icon} alt="" />
							<h2>{title}</h2>
							<p>{body}</p>
						</article>
					))}
				</div>
			</section>
			<Showcase />
			<TechnicalShowcase />
		</>
	);
}

function LocalModels() {
	return (
		<section className="page-section local-page">
			<div className="page-heading">
				<p className="eyebrow">Local models</p>
				<h1>Run Stratum against models on your machine.</h1>
				<p>Ollama users can start with Phi-3 today. Stronger coding flows usually benefit from Qwen Coder or another local model with tool-use reliability.</p>
			</div>
			<div className="local-layout">
				<div className="terminal-card">
					<code>ollama pull phi3</code>
					<code>ollama serve</code>
					<code>Base URL: http://localhost:11434</code>
				</div>
				<div className="provider-table">
					{localProviders.map(([name, url, models]) => (
						<div key={name} className="provider-row">
							<strong>{name}</strong>
							<span>{url}</span>
							<small>{models}</small>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}

function Download() {
	return (
		<section className="download-page">
			<div className="download-panel">
				<img src="/assets/app-logo.png" alt="Stratum logo" />
				<p className="eyebrow">Windows installer</p>
				<h1>Download Stratum</h1>
				<p>
					This installer includes the current Stratum desktop build. Windows may show an unsigned-app warning until code signing is configured.
				</p>
				<a className="download-button" href="/downloads/stratum-setup.exe" download>
					Download stratum Setup 0.0.1.exe
				</a>
				<div className="download-notes">
					<span>Platform: Windows x64</span>
					<span>Publisher label: kushalk0677</span>
					<span>Installer type: NSIS</span>
				</div>
				<div className="release-list">
					{releaseHighlights.map((item) => (
						<span key={item}>{item}</span>
					))}
				</div>
			</div>
		</section>
	);
}

function Footer({ onNavigate }) {
	return (
		<footer onClick={onNavigate}>
			<a className="brand" href="/" data-route>
				<img src="/assets/stratum-logo.png" alt="" />
				<span>stratum</span>
			</a>
			<span>Made by Kushal Khemani</span>
		</footer>
	);
}

function App() {
	const [route, navigate] = useRoute();
	return (
		<>
			<Header route={route} onNavigate={navigate} />
			<main>
				{route === "home" ? <Home onNavigate={navigate} /> : null}
				{route === "features" ? <Features /> : null}
				{route === "local" ? <LocalModels /> : null}
				{route === "download" ? <Download /> : null}
			</main>
			<Footer onNavigate={navigate} />
		</>
	);
}

createRoot(document.getElementById("root")).render(<App />);
