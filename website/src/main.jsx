import React from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const navItems = [
	{ href: "/", label: "Overview" },
	{ href: "/features", label: "Features" },
	{ href: "/use-cases", label: "Use cases" },
	{ href: "/local-models", label: "Local models" },
	{ href: "/download", label: "Download" },
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

const screenshotEvidence = [
	["Manager workflow", screenshots.managerWorkflow, "Manager-only chat beside a live workflow feed for handoffs, compaction events, retries, and worker reports."],
	["Worker grid", screenshots.workerGrid, "Parallel frontend, runtime, test, and review workers stay visible while the manager verifies their outputs."],
	["LaTeX workspace", screenshots.latex, "LaTeX editor with files, outline navigation, compile controls, syntax highlighting, and PDF preview."],
	["GitHub review", screenshots.githubDiff, "Diff review surface for local changes, release checks, file summaries, and approval workflow."],
	["Notes", screenshots.notes, "Persistent project memory for decisions, blockers, useful commands, and context that should outlive the chat."],
	["Model selector", screenshots.modelSelector, "Manager and worker model selection across cloud and local providers with capability filters."],
];

const proofMetrics = [
	["5", "parallel agents"],
	["128K", "tracked context"],
	["180M+", "tokens used in real projects"],
	["850+", "model definitions"],
];

const heroRailItems = [
	["Project memory", "plan.md, notes.md"],
	["Models", "manager + worker routing"],
	["Files", "repo tree and preview"],
	["LaTeX", "compile, outline, PDF"],
];

const heroTasks = [
	["01", "Inspect repository state", "Review project files and current release path."],
	["02", "Delegate implementation", "Runtime Worker patches the website surface."],
	["03", "Verify locally", "Browser Worker checks responsive routes."],
	["04", "Persist context", "Manager writes decisions back to plan.md."],
];

const heroEvents = [
	["Manager", "created run envelope", "active"],
	["Runtime Worker", "editing website/src", "active"],
	["Browser Worker", "waiting for preview", "queued"],
	["Review Worker", "checks after build", "queued"],
	["Memory", "plan.md writeback armed", "ready"],
];

const envelopeStats = [
	["ctx", "42k / 128k"],
	["retry", "on worker error only"],
	["tools", "browser, git, terminal, latex"],
	["state", "auditable"],
];

const lifecycleSteps = [
	["User prompt", "The user gives the manager a project goal, not a list of shell commands."],
	["Manager plan", "The manager decomposes the run, defines acceptance checks, and chooses worker lanes."],
	["Worker delegation", "Runtime, Review, Browser, Research, and Test workers receive scoped tasks."],
	["Tool execution", "Workers use repo files, terminal, browser capture, Git review, LaTeX, and notes surfaces."],
	["Error retry", "Retries are triggered only when a worker reports a failure, busy server, or token limit."],
	["Memory writeback", "Long context is compacted into plan.md and notes so future turns keep the project state."],
];

const productSurfaces = [
	["Manager", "A readable manager-only chat with workflow state pinned beside it.", "/assets/group-icon.png"],
	["Workers", "Parallel agent panes stay visible, but the manager remains the source of truth.", "/assets/skills-icon.png"],
	["LaTeX", "Edit, compile, inspect logs, navigate outline, and preview PDF output.", "/assets/tex-icon.png"],
	["GitHub", "Review local diffs, open work, CI state, and release readiness.", "/assets/git-review-icon.png"],
	["Notes", "Persistent project decisions, blockers, commands, and research memory.", "/assets/note-icon.png"],
	["Browser", "Agent-visible browsing, screenshots, and localhost verification.", "/assets/browser-click-icon.png"],
];

const architectureLayers = [
	["User", "Sets intent and approves boundaries."],
	["Manager", "Plans, delegates, verifies, and records memory."],
	["Workers", "Execute scoped work in parallel lanes."],
	["Tools", "Terminal, browser, GitHub, LaTeX, files, notes."],
	["Memory", "plan.md, notes.md, compacted context, chat history."],
];

const useCases = [
	[
		"Research-grade project execution",
		"Turn an open-ended research goal into scoped worker tasks, verification loops, and persistent project memory.",
		"https://images.pexels.com/photos/34804002/pexels-photo-34804002.jpeg?auto=compress&cs=tinysrgb&w=1200",
		["Manager decomposes the research plan", "Workers inspect, implement, test, and review", "plan.md keeps decisions after context compaction"],
		"Build a publishable cache-reuse benchmark, write the paper outline, and keep experiments reproducible.",
		"The manager splits literature review, baseline implementation, benchmark runs, LaTeX drafting, and review into separate workers, then writes accepted decisions into project memory.",
	],
	[
		"Long LaTeX writing sessions",
		"Edit source, compile PDFs, navigate outlines, and keep the manager aware of paper structure without leaving the workspace.",
		"https://images.pexels.com/photos/12899153/pexels-photo-12899153.jpeg?auto=compress&cs=tinysrgb&w=1200",
		["LaTeX editor, files, figures, outline, and PDF preview", "Compile progress and logs stay visible", "Notes preserve reviewer comments and paper decisions"],
		"Convert experiment notes into a conference-style LaTeX paper with figures, citations, and a clean compile.",
		"The manager assigns a writing worker, a figure/log checker, and a review worker while the LaTeX surface exposes source, outline, compile progress, and PDF output.",
	],
	[
		"Codebase migration and cleanup",
		"Assign parallel workers to isolated modules while the manager keeps scope, acceptance checks, and follow-through in one place.",
		"https://images.pexels.com/photos/5926382/pexels-photo-5926382.jpeg?auto=compress&cs=tinysrgb&w=1200",
		["Runtime workers patch bounded areas", "Review workers verify changed behavior", "Retries only happen after reported worker errors"],
		"Migrate a prototype into typed modules, preserve behavior, and remove dead paths without losing intent.",
		"The manager creates bounded work packets per module, workers patch independently, and review workers inspect diffs before the manager accepts the run.",
	],
	[
		"Release and installer validation",
		"Use browser, terminal, Git review, and workflow history to verify a release path before handing binaries to testers.",
		"https://images.pexels.com/photos/12903173/pexels-photo-12903173.jpeg?auto=compress&cs=tinysrgb&w=1200",
		["Local preview and route verification", "GitHub diff and CI review", "Installer link and release notes tracked as explicit checks"],
		"Build a Windows installer, verify the download page, and check that the release asset resolves for testers.",
		"The manager drives terminal build checks, browser route checks, GitHub diff review, and release notes verification as one auditable workflow.",
	],
	[
		"Local model workstations",
		"Route routine worker tasks to local Ollama or OpenAI-compatible servers while reserving stronger cloud models for manager planning.",
		"https://images.pexels.com/photos/1148820/pexels-photo-1148820.jpeg?auto=compress&cs=tinysrgb&w=1200",
		["Manager and worker model routing", "Ollama, LM Studio, llama.cpp, and vLLM support", "Token usage remains visible during the run"],
		"Use a local coding model for worker edits while a stronger manager model plans and reviews expensive decisions.",
		"Stratum keeps model routing visible, tracks token use, and lets routine workers run locally while the manager remains responsible for orchestration.",
	],
	[
		"Agent-visible browser workflows",
		"Let agents inspect local previews, capture screenshots, and report UI problems without turning the browser into hidden state.",
		"https://images.pexels.com/photos/12899185/pexels-photo-12899185.jpeg?auto=compress&cs=tinysrgb&w=1200",
		["Browser panel for preview work", "Screenshot-backed verification", "Workflow feed records what was checked"],
		"Ask an agent to open a local preview, inspect a route, capture a screenshot, and report layout defects.",
		"The browser worker verifies the page visually, the manager records the finding, and the runtime worker receives a scoped UI fix instead of a vague follow-up.",
	],
];

const chatOnlyLimits = [
	["No durable project memory by default", "A normal GPT or Claude chat can summarize, but it does not automatically maintain plan.md, notes.md, compacted context, and project-scoped chat history inside your folder."],
	["No visible multi-worker control plane", "A single model conversation does not give you separate manager, runtime, review, browser, and test lanes with statuses and handoff history."],
	["No built-in run envelope", "Chat-only workflows do not natively show context use, token totals, retry policy, worker failures, and completed tool events as part of one workspace."],
	["No dedicated technical surfaces", "You still have to stitch together terminal, browser screenshots, Git diff review, LaTeX compile output, file tree, notes, and todos yourself."],
	["No manager-only retry discipline", "Stratum retries failed subtasks only when a worker reports an error, server busy state, or token limit instead of blindly resending every response."],
];

const localProviders = [
	["Ollama", "http://localhost:11434", "phi3, qwen2.5-coder, llama3.2"],
	["LM Studio", "http://localhost:1234/v1", "OpenAI-compatible local server"],
	["llama.cpp", "http://localhost:8080/v1", "GGUF models through server mode"],
	["vLLM", "http://localhost:8000/v1", "Local or LAN inference server"],
];

const releaseHighlights = [
	"Manager-only chat mode with workflow column",
	"Project chats grouped by folder",
	"Persistent notes, plan.md memory, and compaction markers",
	"Local model support through Ollama and OpenAI-compatible servers",
];

function routeFromLocation() {
	const path = window.location.pathname.replace(/\/+$/, "") || "/";
	if (path === "/features") return "features";
	if (path === "/use-cases") return "useCases";
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

function isRouteActive(route, href) {
	if (href === "/" && route === "home") return true;
	if (href === "/features" && route === "features") return true;
	if (href === "/use-cases" && route === "useCases") return true;
	if (href === "/local-models" && route === "local") return true;
	return href === "/download" && route === "download";
}

function Header({ route, onNavigate }) {
	return (
		<header className="site-header" onClick={onNavigate}>
			<a className="brand" href="/" data-route>
				<img src="/assets/stratum-logo.png" alt="" />
				<span>Stratum</span>
			</a>
			<nav aria-label="Primary navigation">
				{navItems.map((item) => (
					<a key={item.href} href={item.href} data-route className={isRouteActive(route, item.href) ? "active" : ""}>
						{item.label}
					</a>
				))}
			</nav>
			<a className="header-download" href="/download" data-route>
				Download
			</a>
		</header>
	);
}

function ProductOS() {
	return (
		<div className="product-os" aria-label="Animated Stratum product operating surface">
			<div className="desktop-topbar">
				<div className="desktop-brandline">
					<img src="/assets/stratum-logo.png" alt="" />
					<img src="/assets/file-tree-icon.png" alt="" />
					<img src="/assets/note-icon.png" alt="" />
					<strong>stratum</strong>
				</div>
				<div className="desktop-status">
					<span>5 agents</span>
					<span>180M tokens</span>
					<span>ctx 42k/128k</span>
				</div>
				<span className="desktop-path">C:\research\shadowkv</span>
			</div>
			<div className="os-body">
				<aside className="os-rail">
					<div className="rail-project">
						<span>project</span>
						<strong>Research Lab</strong>
					</div>
					{heroRailItems.map(([title, detail]) => (
						<div key={title} className="rail-item">
							<strong>{title}</strong>
							<span>{detail}</span>
						</div>
					))}
				</aside>
				<section className="os-manager">
					<div className="manager-panel-header">
						<div>
							<strong>Manager / Orchestrator</strong>
							<span>User input enabled</span>
						</div>
						<b>Done</b>
					</div>
					<div className="manager-thread">
						<div className="chat-bubble user-bubble">
							<span>User prompt</span>
							<p>Prepare the release website, verify routes, keep the installer link unchanged, and document any blockers.</p>
						</div>
						<div className="chat-bubble manager-bubble">
							<span>Manager plan</span>
							<p>Split into website implementation, browser verification, build validation, and release readiness checks.</p>
							<div className="plan-progress">
								<i />
							</div>
						</div>
						<div className="task-grid">
							{heroTasks.map(([number, title, body], index) => (
								<article key={title} className={`task-card task-card-${index + 1}`}>
									<b>{number}</b>
									<strong>{title}</strong>
									<span>{body}</span>
								</article>
							))}
						</div>
					</div>
					<div className="desktop-composer">
						<span>Type a message...</span>
						<div>
							<img src="/assets/note-icon.png" alt="" />
							<b>gemini-3.1-flash-lite</b>
							<i />
						</div>
					</div>
				</section>
				<aside className="os-workflow">
					<div className="workflow-header">
						<span>workflow</span>
						<b>live</b>
					</div>
					{heroEvents.map(([actor, event, status], index) => (
						<div key={`${actor}-${event}`} className={`event-row event-row-${index + 1}`}>
							<i className={status} />
							<div>
								<strong>{actor}</strong>
								<span>{event}</span>
							</div>
						</div>
					))}
				</aside>
				<aside className="desktop-tool-rail" aria-label="Stratum tool rail">
					<img src="/assets/group-icon.png" alt="" />
					<img src="/assets/git-review-icon.png" alt="" />
					<img src="/assets/browser-click-icon.png" alt="" />
					<img src="/assets/terminal-icon.png" alt="" />
					<img src="/assets/tex-icon.png" alt="" />
					<img src="/assets/note-icon.png" alt="" />
				</aside>
			</div>
			<div className="run-envelope">
				{envelopeStats.map(([label, value]) => (
					<div key={label}>
						<span>{label}</span>
						<strong>{value}</strong>
					</div>
				))}
			</div>
		</div>
	);
}

function MetricStrip() {
	return (
		<section className="metric-strip" aria-label="Stratum product metrics">
			{proofMetrics.map(([value, label]) => (
				<div key={label}>
					<strong>{value}</strong>
					<span>{label}</span>
				</div>
			))}
		</section>
	);
}

function RunLifecycle() {
	return (
		<section className="section lifecycle-section">
			<div className="section-heading split-heading">
				<div>
					<p className="eyebrow">Run lifecycle</p>
					<h2>Every long run is visible, bounded, and recoverable.</h2>
				</div>
				<p>
					Stratum is built around evidence: who was assigned, which tool ran, why a retry happened, and what memory was written for the next session.
				</p>
			</div>
			<div className="lifecycle-grid">
				<div className="lifecycle-timeline">
					{lifecycleSteps.map(([title, body], index) => (
						<article key={title} className={`lifecycle-step lifecycle-step-${index + 1}`}>
							<b>{String(index + 1).padStart(2, "0")}</b>
							<div>
								<strong>{title}</strong>
								<span>{body}</span>
							</div>
						</article>
					))}
				</div>
				<div className="run-console">
					<div className="console-top">
						<span>run envelope</span>
						<strong>research-paper / release</strong>
					</div>
					<div className="console-line active-line">
						<b>manager.plan</b>
						<span>acceptance checks: build, routes, mobile, reduced motion</span>
					</div>
					<div className="console-line">
						<b>runtime.worker</b>
						<span>patch website/src without touching GitHub deployment repo</span>
					</div>
					<div className="console-line warning-line">
						<b>review.worker</b>
						<span>retry condition: only on explicit worker error</span>
					</div>
					<div className="console-line">
						<b>memory.write</b>
						<span>plan.md updated after compaction threshold is reached</span>
					</div>
					<div className="console-meter">
						<span>context used</span>
						<strong>42k / 128k</strong>
						<i />
					</div>
				</div>
			</div>
		</section>
	);
}

function ProductSurfaces() {
	return (
		<section className="section surface-section">
			<div className="section-heading">
				<p className="eyebrow">Product surfaces</p>
				<h2>Tools become first-class workspace panels.</h2>
				<p>
					The agent loop stays legible because each capability has a dedicated surface instead of becoming hidden transcript text.
				</p>
			</div>
			<div className="surface-matrix">
				{productSurfaces.map(([title, body, icon]) => (
					<article key={title} className="surface-card">
						<img src={icon} alt="" />
						<h3>{title}</h3>
						<p>{body}</p>
					</article>
				))}
			</div>
		</section>
	);
}

function ScreenshotEvidence() {
	return (
		<section className="section evidence-section">
			<div className="section-heading split-heading">
				<div>
					<p className="eyebrow">Evidence</p>
					<h2>Real Stratum surfaces, below the product narrative.</h2>
				</div>
				<p>Hover a screenshot to see what part of the desktop workflow it represents.</p>
			</div>
			<div className="evidence-grid">
				{screenshotEvidence.map(([title, src, body]) => (
					<ScreenshotCard key={title} title={title} src={src} body={body} />
				))}
			</div>
		</section>
	);
}

function ScreenshotCard({ title, src, body }) {
	return (
		<article className="evidence-card">
			<div className="evidence-title">{title}</div>
			<img src={src} alt={`${title} screenshot`} />
			<div className="evidence-hover">
				<strong>{title}</strong>
				<p>{body}</p>
			</div>
		</article>
	);
}

function ArchitectureSection() {
	return (
		<section className="section architecture-section">
			<div className="section-heading split-heading">
				<div>
					<p className="eyebrow">Architecture</p>
					<h2>A manager-directed execution layer for project work.</h2>
				</div>
				<p>
					The interface is organized around one control plane: the manager can delegate, verify, retry failed subtasks, and preserve useful state.
				</p>
			</div>
			<div className="architecture-stack">
				{architectureLayers.map(([title, body], index) => (
					<div key={title} className={`architecture-layer architecture-layer-${index + 1}`}>
						<strong>{title}</strong>
						<span>{body}</span>
					</div>
				))}
			</div>
		</section>
	);
}

function DownloadCTA({ onNavigate }) {
	return (
		<section className="download-cta" onClick={onNavigate}>
			<div>
				<p className="eyebrow">Windows desktop</p>
				<h2>Install the agent workspace designed for long-running research work.</h2>
			</div>
			<a className="primary-action" href="/download" data-route>
				Download Stratum
			</a>
		</section>
	);
}

function HeroIntro({ onNavigate }) {
	return (
		<div className="hero-copy" onClick={onNavigate}>
			<img className="hero-logo" src="/assets/app-logo.png" alt="Stratum logo" />
			<p className="eyebrow">Product OS for manager-led agents</p>
			<h1>Enter the next generation of AI workspace.</h1>
			<p className="hero-text">
				Stratum is a Windows workspace where a manager agent plans the run, workers execute scoped tasks, tools stay visible, and project memory carries forward.
			</p>
			<div className="hero-actions">
				<a className="primary-action" href="/download" data-route>
					Download for Windows
				</a>
				<a className="secondary-action" href="/features" data-route>
					Explore the system
				</a>
			</div>
		</div>
	);
}

function Home({ onNavigate }) {
	return (
		<>
			<section className="hero" onClick={onNavigate}>
				<div className="particle-field" aria-hidden="true" />
				<HeroIntro onNavigate={onNavigate} />
				<ProductOS />
			</section>
			<MetricStrip />
			<RunLifecycle />
			<ProductSurfaces />
			<ArchitectureSection />
			<ScreenshotEvidence />
			<DownloadCTA onNavigate={onNavigate} />
		</>
	);
}

function Features() {
	return (
		<>
			<section className="page-section">
				<div className="page-heading">
					<p className="eyebrow">Features</p>
					<h1>Dedicated surfaces for serious agent work.</h1>
					<p>Stratum keeps the manager, workers, project context, and tools visible without forcing every interaction into one transcript.</p>
				</div>
				<div className="feature-grid">
					{productSurfaces.map(([title, body, icon]) => (
						<article key={title} className="feature-card">
							<img src={icon} alt="" />
							<h2>{title}</h2>
							<p>{body}</p>
						</article>
					))}
				</div>
			</section>
			<ScreenshotEvidence />
		</>
	);
}

function UseCases() {
	return (
		<>
			<section className="page-section use-cases-page">
				<div className="page-heading">
					<p className="eyebrow">Use cases</p>
					<h1>Where manager-led agents hold up under real project pressure.</h1>
					<p>
						Stratum is designed for work that needs planning, execution, verification, and memory across long runs instead of one-off chat responses.
					</p>
				</div>
				<div className="use-case-grid">
					{useCases.map(([title, body, image, checks, example, agentPath], index) => (
						<article key={title} className="use-case-card">
							<img src={image} alt="" />
							<div>
								<b>{String(index + 1).padStart(2, "0")}</b>
								<h2>{title}</h2>
								<p>{body}</p>
								<section className="use-case-example">
									<strong>Example task</strong>
									<span>{example}</span>
								</section>
								<section className="use-case-example">
									<strong>How Stratum solves it</strong>
									<span>{agentPath}</span>
								</section>
								<div className="use-case-checks">
									{checks.map((check) => (
										<span key={check}>{check}</span>
									))}
								</div>
							</div>
						</article>
					))}
				</div>
			</section>
			<section className="section comparison-section">
				<div className="section-heading split-heading">
					<div>
						<p className="eyebrow">Why not just chat?</p>
						<h2>GPT and Claude are models. Stratum is the workspace around the run.</h2>
					</div>
					<p>
						A strong chat model can reason through a task. Stratum adds the operating layer needed when that task becomes a long project with files, workers, tools, retries, and memory.
					</p>
				</div>
				<div className="comparison-grid">
					{chatOnlyLimits.map(([title, body]) => (
						<article key={title}>
							<strong>{title}</strong>
							<p>{body}</p>
						</article>
					))}
				</div>
			</section>
		</>
	);
}

function LocalModels() {
	return (
		<section className="page-section local-page">
			<div className="page-heading">
				<p className="eyebrow">Local models</p>
				<h1>Run Stratum against models on your machine.</h1>
				<p>Ollama users can start with Phi-3. Stronger coding flows usually benefit from Qwen Coder or another local model with reliable tool use.</p>
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
				<a className="download-button" href="https://github.com/Kushalk0677/stratum/releases/latest/download/stratum-setup.exe">
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
		<footer className="site-footer" onClick={onNavigate}>
			<div className="footer-brand">
				<a className="brand" href="/" data-route>
					<img src="/assets/stratum-logo.png" alt="" />
					<span>Stratum</span>
				</a>
				<p>Manager-led AI workspace for long-running research, coding, LaTeX, browser verification, Git review, and persistent project memory.</p>
			</div>
			<nav aria-label="Footer product navigation">
				<strong>Product</strong>
				<a href="/" data-route>
					Overview
				</a>
				<a href="/features" data-route>
					Features
				</a>
				<a href="/use-cases" data-route>
					Use cases
				</a>
				<a href="/local-models" data-route>
					Local models
				</a>
			</nav>
			<nav aria-label="Footer use case navigation">
				<strong>Workflows</strong>
				<a href="/use-cases" data-route>
					Research projects
				</a>
				<a href="/use-cases" data-route>
					LaTeX writing
				</a>
				<a href="/use-cases" data-route>
					Release validation
				</a>
				<a href="/use-cases" data-route>
					Browser checks
				</a>
			</nav>
			<div className="footer-cta">
				<strong>Windows desktop</strong>
				<p>Download the current Stratum installer for testing.</p>
				<a className="primary-action" href="/download" data-route>
					Download
				</a>
			</div>
			<div className="footer-bottom">
				<span>Made by Stratum for Stratum</span>
				<span>Built for manager-led agent runs.</span>
			</div>
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
				{route === "useCases" ? <UseCases /> : null}
				{route === "local" ? <LocalModels /> : null}
				{route === "download" ? <Download /> : null}
			</main>
			<Footer onNavigate={navigate} />
		</>
	);
}

createRoot(document.getElementById("root")).render(<App />);
