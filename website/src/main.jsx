import React from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const navItems = [
	{ href: "/", label: "Overview" },
	{ href: "/features", label: "Features" },
	{ href: "/use-cases", label: "Use cases" },
	{ href: "/local-models", label: "Models & routing" },
];

const resourceItems = [
	{ href: "/documentation", label: "Documentation", detail: "Install, configure, run agents, and understand project memory." },
	{ href: "/documentation#changelog", label: "Changelog", detail: "Current release highlights and what changed." },
	{ href: "/documentation#support", label: "Support", detail: "How to report bugs, auth issues, quota problems, and crashes." },
	{ href: "/documentation#press", label: "Press", detail: "Product description, positioning, and launch notes." },
	{ href: "/documentation#releases", label: "Releases", detail: "Installer, signed update flow, and GitHub release assets." },
];

const screenshots = {
	accountInformation: "/assets/screenshots/account-information.png",
	agentPermissions: "/assets/screenshots/agent-permissions.png",
	codeReview: "/assets/screenshots/code-review.png",
	notes: "/assets/screenshots/notes.png",
	modelSelector: "/assets/screenshots/model-selector.png",
	fileTree: "/assets/screenshots/file-tree.png",
	todoList: "/assets/screenshots/todo-list.png",
	managerWorkflow: "/assets/screenshots/manager-workflow.png",
	multipleTokens: "/assets/screenshots/multiple-tokens.png",
	otaUpdates: "/assets/screenshots/ota-updates.png",
	projectDashboard: "/assets/screenshots/project-dashboard.png",
	workerGrid: "/assets/screenshots/worker-grid.png",
	latex: "/assets/screenshots/latex.png",
	githubDiff: "/assets/screenshots/github-diff.png",
	githubOpen: "/assets/screenshots/github-open.png",
};

const screenshotEvidence = [
	["Manager workflow", screenshots.managerWorkflow, "Manager-only chat beside a live workflow feed for handoffs, compaction events, retries, and worker reports."],
	["Project dashboard", screenshots.projectDashboard, "Project chats, status, and workspace context stay grouped around the selected folder instead of drifting across separate sessions."],
	["Worker grid", screenshots.workerGrid, "Parallel frontend, runtime, test, and review workers stay visible while the manager verifies their outputs."],
	["Code review", screenshots.codeReview, "Changed files, diffs, review actions, and release checks are gathered into a dedicated approval surface."],
	["Agent permissions", screenshots.agentPermissions, "Tool access, file writes, commands, network behavior, and risky operations can be reviewed before workers act."],
	["Multiple token pools", screenshots.multipleTokens, "Provider keys and token pools stay visible so teams can route work, manage quotas, and recover from key-specific failures."],
	["Account information", screenshots.accountInformation, "Account state, plan details, and usage context are visible without leaving the workspace settings flow."],
	["OTA updates", screenshots.otaUpdates, "Update checks and release notices help testers move to the right desktop build without manual coordination."],
	["LaTeX workspace", screenshots.latex, "LaTeX editor with files, outline navigation, compile controls, syntax highlighting, and PDF preview."],
	["GitHub review", screenshots.githubDiff, "Diff review surface for local changes, release checks, file summaries, and approval workflow."],
	["Notes", screenshots.notes, "Persistent project memory for decisions, blockers, useful commands, and context that should outlive the chat."],
	["Model selector", screenshots.modelSelector, "Manager and worker model selection across cloud and local providers with capability filters."],
];

const featureSpotlights = [
	[
		"Project dashboard",
		screenshots.projectDashboard,
		"Folder-scoped project chats prove that active work, recent runs, and project state stay attached to the selected workspace.",
		["Open the right project context quickly", "Keep long-running work inside its folder"],
	],
	[
		"Code review surface",
		screenshots.codeReview,
		"Changed files, diffs, and approval actions show how generated work becomes reviewable before handoff.",
		["Inspect implementation evidence", "Catch release blockers before handoff"],
	],
	[
		"Agent permissions",
		screenshots.agentPermissions,
		"Permission controls make worker autonomy explicit for file edits, commands, network work, and sensitive operations.",
		["Tune agent autonomy per project", "Keep high-risk actions reviewable"],
	],
	[
		"Multiple token pools",
		screenshots.multipleTokens,
		"Provider key pools and token state show how model routing stays visible during long manager/worker runs.",
		["Rotate provider credentials", "Separate manager and worker capacity"],
	],
	[
		"Account information",
		screenshots.accountInformation,
		"Account and plan details sit beside usage and access context so hosted tester workflows remain inspectable.",
		["See account state in place", "Support hosted tester workflows"],
	],
	[
		"OTA updates",
		screenshots.otaUpdates,
		"Desktop update checks keep release state visible so testers know which build belongs to the current project workflow.",
		["Notify users about available builds", "Reduce manual release coordination"],
	],
];

const proofMetrics = [
	["5", "visible workers"],
	["128K", "tracked context"],
	["180M+", "project tokens tracked"],
	["850+", "model definitions"],
];

const heroRailItems = [
	["Project goal", "research/build run"],
	["Manager plan", "phases + acceptance checks"],
	["Worker lanes", "runtime, browser, review"],
	["Artifacts", "notes, diffs, screenshots"],
];

const heroTasks = [
	["01", "Capture project goal", "Turn the user's outcome into a bounded run."],
	["02", "Plan the run", "Manager defines phases, workers, and checks."],
	["03", "Delegate scoped work", "Workers handle repo, browser, review, and artifact tasks."],
	["04", "Verify and record", "Manager checks evidence and preserves durable memory."],
];

const heroEvents = [
	["User goal", "accepted as project run", "active"],
	["Manager", "plan and run envelope created", "active"],
	["Worker lanes", "scoped tasks assigned", "queued"],
	["Verification", "checks and review waiting", "queued"],
	["Memory", "artifacts ready for writeback", "ready"],
];

const envelopeStats = [
	["ctx", "42k / 128k"],
	["retry", "on worker error only"],
	["tools", "browser, git, terminal, latex"],
	["state", "auditable"],
];

const lifecycleSteps = [
	["User goal", "The user gives the manager a project outcome that may take many steps."],
	["Manager-owned plan", "The manager defines phases, acceptance checks, and the right worker lanes."],
	["Scoped workers", "Runtime, review, browser, research, and test workers receive bounded tasks."],
	["Tool execution", "Workers use files, terminal, browser capture, Git review, LaTeX, notes, and todos."],
	["Verification", "The manager reviews diffs, logs, screenshots, summaries, and blockers before accepting work."],
	["Project memory", "Durable facts move into plan.md, notes, chat history, and project artifacts."],
];

const productSurfaces = [
	["Manager", "A manager-only chat owns planning, delegation, verification, recovery, and final reporting.", "/assets/group-icon.png"],
	["Workers", "Parallel worker lanes stay visible while each task remains scoped to the manager's run.", "/assets/skills-icon.png"],
	["Project memory", "Plans, notes, chat history, workflow events, and artifacts keep project state durable.", "/assets/note-icon.png"],
	["Browser", "Agent-visible browsing, localhost checks, screenshots, and page evidence.", "/assets/browser-click-icon.png"],
	["GitHub/code review", "Review changed files, diffs, CI context, release readiness, and approval steps.", "/assets/git-review-icon.png"],
	["LaTeX", "Edit, compile, inspect logs, navigate outline, and preview PDF output.", "/assets/tex-icon.png"],
	["Notes/todos", "Persistent decisions, blockers, commands, research memory, and active task state.", "/assets/note-icon.png"],
	["Terminal", "Supervised commands, dev servers, watchers, build checks, and execution logs.", "/assets/terminal-icon.png"],
	["Permissions/settings", "Tool access, provider keys, account state, quotas, updates, and worker boundaries.", "/assets/permissions-icon.svg"],
];

const controlLayerCards = [
	["Manager-owned run", "One manager chat controls planning, delegation, verification, recovery, and final reporting.", "/assets/group-icon.png"],
	["Scoped worker lanes", "Frontend, runtime, test, browser, and review workers execute bounded tasks with visible status.", "/assets/skills-icon.png"],
	["Project memory", "Plans, notes, chat history, workflow events, and artifacts preserve decisions after context compaction.", "/assets/note-icon.png"],
	["Reviewable artifacts", "Diffs, screenshots, logs, PDFs, todos, and release checks stay inspectable before handoff.", "/assets/git-review-icon.png"],
];

const runAnatomySteps = [
	["Goal", "The user describes the project outcome, constraints, and acceptance target."],
	["Plan", "The manager turns the goal into phases, worker lanes, checks, and likely artifacts."],
	["Delegate", "Workers receive bounded prompts for implementation, research, browser, review, or tests."],
	["Execute", "Dedicated surfaces expose terminal output, files, browser state, LaTeX, notes, and diffs."],
	["Verify", "The manager inspects evidence before accepting the worker result or retrying a failed lane."],
	["Remember", "Accepted facts, decisions, artifacts, and blockers are written back into the project."],
];

const projectArtifacts = [
	["plan.md", "Run phases, assignments, compaction summaries, accepted decisions."],
	["codebase.md", "Architecture, commands, conventions, important files, project map."],
	[".stratum/notes.md", "User-facing requirements, blockers, reminders, useful commands."],
	["Todos", "Active manager-maintained task state for long runs."],
	["Screenshots", "Browser and UI evidence attached to the project review trail."],
	["Diffs and logs", "Code review, terminal output, build checks, and release blockers."],
	["PDFs and papers", "LaTeX output, figures, compile logs, outlines, and review notes."],
	["Workflow events", "Delegations, retries, completions, compactions, and memory writes."],
];

const supervisionControls = [
	["File writes", "Allow, ask, or deny project edits before worker output touches disk."],
	["Commands", "Keep short checks and long-running dev processes visible and interruptible."],
	["Git actions", "Review changed files, commits, pushes, and release steps before handoff."],
	["Network", "Expose when agents rely on external docs, pages, or hosted services."],
	["Deletes", "Treat destructive operations as explicit boundaries, not routine edits."],
	["Provider keys", "Route manager and workers across key pools with visible error state."],
	["Quotas", "Track token usage and hosted limits while project runs continue."],
	["Updates", "Surface installer and desktop build state for testers inside the app flow."],
];

const slashCommands = [
	["/goal", "Run until the task is completely finished, delegating to workers, verifying results, and retrying only when a worker reports a real failure."],
	["/build", "Implement the requested change end to end, inspect the code first, run required checks, fix failures, and report the result."],
	["/plan", "Create a concrete plan first, ask clarifying questions if needed, and wait for user approval before implementation."],
	["/grill-me", "Ask focused alignment questions before implementation so scope, constraints, and acceptance criteria are clear."],
	["/refer", "Search older chat history as a focused reference instead of loading or assuming the full transcript is active context."],
	["/schedule", "Treat the request as a one-time or recurring scheduling task and capture what will run and when."],
];

const surfaceGroups = [
	["Inspect", [screenshots.fileTree, screenshots.projectDashboard, screenshots.notes], ["File tree", "Project dashboard", "Notes"]],
	["Build", [screenshots.workerGrid, screenshots.latex, screenshots.projectDashboard], ["Workers", "LaTeX", "Project dashboard"]],
	["Review", [screenshots.codeReview, screenshots.githubDiff, screenshots.agentPermissions], ["Code review", "GitHub diff", "Permissions"]],
	["Operate", [screenshots.modelSelector, screenshots.multipleTokens, screenshots.otaUpdates], ["Models", "Token pools", "Updates"]],
];

const managerReasons = [
	["Clear ownership", "The manager owns plan quality, worker scope, verification, recovery, and final reporting."],
	["Visible execution", "Workers can run in parallel, but their status and summaries remain inspectable."],
	["Evidence before trust", "The manager checks diffs, logs, screenshots, PDFs, and blockers before accepting work."],
	["Memory after context", "Durable facts move into project files and history so future runs do not restart cold."],
];

const modelRoutingDiagram = [
	["Manager", "Stronger cloud or compatible model", "Planning, decomposition, risk calls, final review."],
	["Workers", "Local or lower-cost compatible endpoint", "Routine edits, search, bounded implementation, repetitive checks."],
	["Review", "Stronger reviewer model", "Diff risk, release blockers, paper claims, test interpretation."],
	["Fallback", "Additional provider keys or local runtime", "Quota recovery, rate-limit handling, cost control."],
];

const artifactReviewCards = [
	["Outputs are evidence", "Generated files, screenshots, PDFs, logs, and diffs are treated as review objects, not hidden byproducts."],
	["Review happens in context", "Artifacts stay beside the project, worker summaries, workflow feed, and manager decisions."],
	["Handoff is explicit", "The manager explains what changed, what was checked, and what still needs attention."],
];

const architectureLayers = [
	["User", "Sets intent and approves boundaries."],
	["Manager", "Owns the control plane for planning, delegation, verification, and recovery."],
	["Workers", "Execute scoped work in parallel lanes."],
	["Tools", "Terminal, browser, GitHub, LaTeX, files, notes."],
	["Memory", "Durable record across plan.md, notes, compacted context, chat history, and artifacts."],
];

const useCases = [
	[
		"Supervised research/build runs",
		"Turn an open-ended research or build goal into scoped worker tasks, verification loops, and persistent project memory.",
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

const deepUseCases = [
	[
		"Research/build run",
		["Research Worker gathers sources", "Runtime Worker implements baselines", "Test Worker runs experiments", "Review Worker checks claims"],
		["plan.md", "benchmark logs", "LaTeX outline", "review notes"],
	],
	[
		"Release validation",
		["Runtime Worker builds", "Browser Worker verifies routes", "Review Worker inspects diffs", "Manager confirms release blockers"],
		["installer link", "route checks", "Git diff", "release notes"],
	],
	[
		"LaTeX paper production",
		["Writing Worker edits sections", "Figure Worker checks assets", "Compile Worker reads logs", "Review Worker audits structure"],
		["PDF preview", "compile log", "figures", "paper notes"],
	],
	[
		"Codebase migration",
		["Manager splits modules", "Runtime Workers patch bounded areas", "Test Worker verifies behavior", "Review Worker audits risk"],
		["changed files", "test output", "migration notes", "rollback checkpoints"],
	],
];

const chatOnlyLimits = [
	["Chat-only memory limits", "A normal GPT or Claude chat can summarize, but it does not automatically maintain plan.md, notes, compacted context, and project-scoped history inside your folder."],
	["No visible manager/worker control", "A single model conversation does not give you separate manager, runtime, review, browser, and test lanes with statuses and handoff history."],
	["Missing run envelope", "Chat-only workflows do not natively show context use, token totals, retry policy, worker failures, and completed tool events as part of one workspace."],
	["Missing dedicated technical surfaces", "You still have to stitch together terminal, browser screenshots, Git diff review, LaTeX compile output, file tree, notes, and todos yourself."],
	["Weak artifact and review discipline", "Generated outputs, diffs, screenshots, logs, and release checks often drift away from the project unless the workspace keeps them inspectable."],
];

const differentiationRows = [
	[
		"Product center",
		"Manager-led project workspace where one manager supervises visible worker lanes and every artifact stays tied to the selected project.",
		"Standalone agent command center for launching, monitoring, and orchestrating agents across Projects, with the IDE split into a separate surface.",
		"Coding agent across cloud, CLI, app, IDE, and GitHub surfaces for repository tasks, reviews, fixes, and delegated implementation.",
	],
	[
		"Agent model",
		"Manager-owned run with scoped workers for implementation, browser checks, review, tests, research, and artifact work.",
		"Dynamic subagents can be defined and invoked by the main agent for parallel parts of complex tasks.",
		"Cloud tasks can run independently and in parallel; CLI subagents are available when the user explicitly asks for them.",
	],
	[
		"Project memory",
		"plan.md, codebase.md, notes, todos, chat history, workflow events, screenshots, logs, diffs, and generated files remain inside or beside the project.",
		"Projects can span multiple folders with scoped settings and permissions; artifacts and knowledge items support task progress and review.",
		"AGENTS.md supplies project guidance; cloud tasks run in isolated environments and return evidence, diffs, commits, or pull requests for review.",
	],
	[
		"Technical surfaces",
		"Browser, terminal, GitHub/code review, LaTeX, file tree, notes/todos, permissions, model routing, quotas, and updates are first-class workspace panels.",
		"Agents can use system commands, file operations, web search, skills, MCP servers, Chrome/browser automation, artifacts, and implementation plans.",
		"CLI, cloud, app, IDE extension, GitHub review, shell, web search, image input/generation, computer use, and configurable environments cover coding workflows.",
	],
	[
		"Supervision style",
		"The user supervises the manager; the manager plans, delegates, verifies, records memory, and only retries when worker or tool state justifies it.",
		"Users manage synchronous and asynchronous agents through a command-center UI, scheduled tasks, artifacts, feedback, and project-level guardrails.",
		"Users monitor cloud progress, inspect terminal/test citations, request revisions, apply diffs, open PRs, or use CLI approval modes locally.",
	],
	[
		"Best fit",
		"Long-running research/build projects where visible teamwork, durable project memory, artifact review, and mixed technical surfaces matter.",
		"Broad agent-first knowledge and coding work, especially when dynamic subagents, schedules, Chrome automation, Gemini, and Google integrations are priorities.",
		"Software engineering work that benefits from OpenAI coding models, isolated cloud execution, GitHub/Slack/IDE workflows, and strong code-review loops.",
	],
];

const localProviders = [
	["Manager and worker routing", "Cloud or local", "Use stronger manager models and cheaper or scoped worker models"],
	["GPT / OpenAI", "https://api.openai.com/v1", "Cloud model option for manager, workers, review, or routing"],
	["Claude / Anthropic", "Anthropic or compatible providers", "Cloud model option where configured through provider support"],
	["OpenAI-compatible", "Custom base URL", "Hosted, LAN, or local endpoints using compatible APIs"],
	["Ollama", "http://localhost:11434", "Local workers and routine edits"],
	["LM Studio / llama.cpp / vLLM", "Local or LAN server", "OpenAI-compatible local inference runtimes"],
];

const releaseHighlights = [
	"Manager-only chat mode with workflow column",
	"Project chats grouped by folder",
	"Persistent notes, plan.md memory, and compaction markers",
	"Model routing through cloud, local, and OpenAI-compatible providers",
];

const docsNavigation = [
	{
		title: "Core",
		items: [
			["Overview", "overview"],
			["Getting started", "getting-started"],
			["Onboarding", "onboarding-tour"],
			["Core workflow", "core-workflow"],
			["Run anatomy", "run-anatomy-docs"],
			["Why manager-led", "why-manager-led-docs"],
			["Context and memory", "context-memory-deep"],
			["Agent supervision", "agent-supervision-deep"],
			["Permissions", "permissions-deep"],
		],
	},
	{
		title: "Features",
		items: [
			["Feature index", "feature-index"],
			["Manager and workers", "manager-workers"],
			["Models and API keys", "models-keys"],
			["Models and routing", "local-models-docs"],
			["Slash commands", "run-modes-docs"],
			["Project memory", "project-memory"],
			["Project artifacts", "project-artifacts-docs"],
			["Artifact review", "artifact-review-docs"],
			["Manager-only chat", "manager-chat-docs"],
			["Worker lanes", "worker-lanes-docs"],
			["Run reliability", "run-reliability"],
			["Supervision controls", "supervision-controls-docs"],
			["Onboarding and settings", "onboarding-settings"],
			["Updates", "updates-docs"],
			["Admin and quotas", "admin-quotas"],
		],
	},
	{
		title: "Dev tools",
		items: [
			["Tools and surfaces", "tools-surfaces"],
			["Surface groups", "surface-groups-docs"],
			["File tree", "file-tree-docs"],
			["Browser", "browser-docs"],
			["Terminal", "terminal-docs"],
			["LaTeX", "latex-docs"],
			["LaTeX workflow", "latex-workflow-deep"],
			["GitHub review", "github-review-docs"],
			["GitHub workflow", "github-workflow-deep"],
			["Notes and todos", "notes-todos-docs"],
			["Rollback and fork", "rollback-docs"],
			["GitHub and releases", "github-releases"],
		],
	},
	{
		title: "Resources",
		items: [
			["Changelog", "changelog"],
			["Support", "support"],
			["Press", "press"],
			["Releases", "releases"],
		],
	},
];

const docsSections = [
	{
		id: "overview",
		title: "Stratum Documentation",
		body: [
			"Stratum is a manager-led AI workspace for supervised, long-running research/build work, where the user supervises a visible team of agents and every artifact stays inside the project.",
			"The user talks to one manager agent. The manager plans, delegates, verifies, retries only when appropriate, records memory, and keeps worker output visible. Workers execute scoped tasks in their own lanes so the run can be inspected instead of hidden inside one transcript.",
			"Everything surrounding the agent loop is part of the product: project chats, model routing, API key pools, browser verification, terminal supervision, LaTeX editing, GitHub review, rollback checkpoints, notes, todos, usage visibility, quotas, updates, and project memory.",
		],
		points: [
			"One manager chat controls the run.",
			"Worker chats remain visible for auditability.",
			"Run anatomy stays visible from goal to plan, delegation, execution, verification, and memory.",
			"Project memory is written into plan.md, codebase.md, notes, chat history, and workflow events.",
			"Artifacts such as screenshots, diffs, logs, PDFs, todos, and release checks remain reviewable.",
			"Tools are represented as workspace panels instead of hidden transcript fragments.",
			"Research artifacts, generated files, logs, notes, plans, and screenshots stay inside or beside the selected project.",
		],
	},
	{
		id: "getting-started",
		title: "Getting started",
		body: [
			"Install Stratum on Windows, open a project folder, choose a manager model, and send a goal. Stratum creates the manager and worker lanes for that project.",
			"For first-run testing, use a cloud model for the manager and a cheaper or local model for workers. This keeps planning strong while reducing token spend.",
		],
		steps: [
			"Download the Windows installer from the Download page.",
			"Open Stratum and sign in if account gating is enabled.",
			"Create or open a project chat from the left panel.",
			"Select a manager model.",
			"Add provider keys when prompted, or manage them from Settings.",
			"Send a concrete project goal such as: review this repo, create a release website, verify the installer link, and list blockers.",
		],
	},
	{
		id: "onboarding-tour",
		title: "Onboarding",
		body: [
			"Onboarding is the guided tour for first-time users. It should explain Stratum by opening real Stratum controls instead of showing a disconnected slideshow. A new user should see the left project panel, the model selector, the manager input, the right tool rail, the browser, notes, terminal, LaTeX, GitHub review, permissions, and settings in the same places they will use them during real work.",
			"Onboarding can be restarted from Settings. The setting is useful when a tester skipped the tour, when a new build changes the workflow, or when a team member wants to learn the interface again without deleting their project data. The restart action should not erase chats, project folders, provider keys, quotas, notes, or saved settings. It only resets the guided-tour completion state.",
			"The tour opens real Stratum controls, but keeps native browser content closed so the tour controls stay clickable. This matters because embedded browser views can sit above normal web UI layers and make the next, back, skip, or close buttons impossible to click. When the tour reaches browser-related steps, it should explain the browser surface with the browser panel closed or with a controlled mock state rather than letting a native webview cover the tour card.",
			"The onboarding flow should teach the main mental model: the user supervises a manager-led team. The user does not need to understand every tool before the first task. They only need to know that the manager owns the run, workers execute scoped work, every surface is visible, and durable facts should be written into the project. The tour should also make it clear that Stratum is not just a model picker. It is a project workspace where artifacts, memory, changed files, and verification steps remain tied to the selected folder.",
		],
		points: [
			"Step one should introduce project chats and explain that chats are grouped by folder.",
			"Model selection should appear early because the first message often requires a provider key.",
			"The API key step should explain that keys can be added from Settings and that additional keys create a provider pool.",
			"The right-side tool rail should be demonstrated one tool at a time, then closed before moving to the next tool.",
			"The permissions step should explain ask/allow/deny defaults for file writes, commands, Git, network, delete, and SSH-like operations.",
			"The context step should explain visible context usage, compaction, plan.md, codebase.md, notes, and chat history search.",
			"The completion step should tell the user to start with a concrete goal and let the manager run until a meaningful phase is complete.",
		],
	},
	{
		id: "core-workflow",
		title: "Core workflow",
		body: [
			"Stratum runs as a manager-led loop. The manager turns a user goal into work packets, assigns them to workers, waits for summaries, verifies the result, and records what matters.",
		],
		points: [
			"User prompt: the goal enters through the manager chat.",
			"Manager plan: the run is split into phases and acceptance checks.",
			"Delegation: worker lanes receive scoped prompts.",
			"Execution: workers use files, terminal, browser, GitHub, LaTeX, and notes tools.",
			"Verification: the manager reviews summaries, diffs, checks, and blockers.",
			"Memory writeback: durable facts are stored for future runs.",
		],
	},
	{
		id: "run-anatomy-docs",
		title: "Run anatomy",
		body: [
			"A Stratum run should be inspectable as a sequence: user goal, manager plan, worker delegation, tool execution, verification, and memory writeback. The user should be able to understand the state of the project without reading every token in every lane.",
			"The run anatomy is also the product story. It explains why Stratum has a manager chat, worker lanes, workflow events, dedicated tools, review surfaces, and durable project records instead of a single model transcript.",
		],
		points: [
			"Goal: capture the outcome, constraints, and acceptance target.",
			"Plan: define phases, worker lanes, checks, and expected artifacts.",
			"Delegate: assign bounded work to implementation, browser, research, test, or review workers.",
			"Execute: use visible tools such as files, terminal, browser, GitHub, LaTeX, notes, and todos.",
			"Verify: inspect diffs, logs, screenshots, PDFs, summaries, and blockers before accepting work.",
			"Remember: write durable facts and artifacts back into the project.",
		],
	},
	{
		id: "why-manager-led-docs",
		title: "Why manager-led",
		body: [
			"Manager-led does not mean the manager is decorative. The manager is accountable for planning, delegation, verification, recovery, memory updates, and final reporting. Workers execute scoped tasks and return structured summaries.",
			"This separation matters because long-running work needs a stable control plane. The user supervises the manager, the manager supervises workers, and every accepted result should be supported by visible evidence or a recorded decision.",
		],
		points: [
			"Clear ownership: one manager owns the shape and quality of the run.",
			"Visible execution: workers stay inspectable instead of becoming hidden background calls.",
			"Evidence before trust: accepted work should be checked through the right surface.",
			"Memory after context: project records preserve decisions after compaction or restart.",
		],
	},
	{
		id: "context-memory-deep",
		title: "Context and memory",
		body: [
			"Context in Stratum has two jobs. The first job is the immediate model context: the messages, tool results, recent files, and instructions needed for the current response. The second job is project memory: the durable record that should survive a model context window, an app restart, or a future chat in the same folder. A normal chat product treats these as one thing. Stratum separates them so long-running work can continue without stuffing every old message back into the model.",
			"The visible context meter tells the user how much context is being used, for example 24k/128k. This number should reflect actual active context rather than lifetime token spend. Lifetime token spend still matters, but it answers a different question: how expensive has this project been? Context usage answers: how close is this chat to needing compaction or search instead of direct recall?",
			"Compaction should not make chat disappear. The user should still see the full conversation. Compaction is only a model-context operation. When the active context grows too large, Stratum should write a clear summary into plan.md and keep the recent messages active. Later, when the threshold is reached again, it can compact again. It should not repeatedly compact every turn after one threshold event.",
			"Agents should use old chat history through search when the user asks to refer back. The /refer command exists for this reason: it tells the manager to search older chat history like a project file, return small snippets, and use only the relevant findings. This avoids loading the whole transcript into context while still letting old decisions, bug reports, or user preferences influence the current run.",
			"Project memory lives in multiple places because each file has a different responsibility. plan.md records the run history, phases, assignments, compaction summaries, and accepted decisions. codebase.md records architecture, important files, commands, conventions, and project structure. .stratum/notes.md records user-facing requirements, reminders, blockers, open questions, and useful commands. Chat history records what was said. The workflow feed records what happened between manager and workers.",
		],
		points: [
			"Use plan.md for run state, manager decisions, worker summaries, and compaction summaries.",
			"Use codebase.md for durable technical understanding, verified commands, architecture, and conventions.",
			"Use .stratum/notes.md for user-facing project notes, decisions, blockers, reminders, and commands.",
			"Use chat history search when the user asks to refer to older conversation details.",
			"Keep compaction visible with a clear marker so users understand why the manager has summarized older context.",
			"Do not use notes or plan files for private hidden chain-of-thought.",
		],
	},
	{
		id: "agent-supervision-deep",
		title: "Agent supervision",
		body: [
			"Stratum is built around supervised autonomy. The user gives the manager a goal, but the manager does not become an invisible daemon. It must keep work legible through visible plans, worker assignments, workflow entries, run envelope state, and final summaries. The user should be able to step away while the run continues, then return and understand what happened without reading every token from every worker.",
			"The manager is responsible for the shape of the run. It decides whether the task needs one worker or several, when to inspect files itself, when to ask a worker to perform implementation, when to ask a review worker to check work, and when to stop. The manager should also know when to ask the user a question. If the user used /goal, the manager should bias toward completing the task without intermediate input. If the user used /grill-me, the manager should ask clarifying questions before implementation.",
			"Workers are scoped executors. They should not take over the whole project unless assigned a broad audit. A worker prompt should include the relevant goal, files or areas to inspect, expected output, restrictions, and required summary format. The worker should end with status, task completed, files changed, checks run, problems found, and follow-up needed. This gives the manager something structured enough to verify.",
			"The workflow feed is the user-facing event stream. It should show delegation, worker completions, compaction events, failed subtasks, repairs, notes writes, and relevant tool outcomes. It should not become a duplicate of the entire chat. It should compress the run into a series of auditable events so the user can see the state of the system at a glance.",
			"Good supervision means the manager verifies, not just delegates. For code, it should inspect diffs, run appropriate checks, or ask a review worker. For UI, it should use the browser panel and screenshots. For LaTeX, it should compile and inspect logs or PDFs. For GitHub work, it should open the Git review panel before asking for approval. For research writing, it should preserve assumptions and open questions in notes or plan files.",
		],
		points: [
			"The user supervises the team through one manager chat.",
			"The manager owns planning, delegation, verification, memory, and final reporting.",
			"Workers own scoped execution and structured summaries.",
			"The workflow feed is a compact event log, not a duplicate transcript.",
			"Verification should use the appropriate surface: browser, terminal, Git review, LaTeX, file tree, or notes.",
			"Final summaries should explain what changed, what was checked, and what remains risky.",
		],
	},
	{
		id: "permissions-deep",
		title: "Permissions",
		body: [
			"Permissions define what agents can do without interrupting the user. Stratum should make these defaults visible because project agents can read files, write files, run commands, use network access, operate Git, delete files, or interact with SSH-like commands depending on the project. Users need to understand which operations are automatic and which operations require approval.",
			"The main permission modes are allow, ask, and deny. Allow means the agent can proceed when the task requires that capability. Ask means the agent should stop and request approval before using the capability. Deny means the agent should treat the operation as unavailable and adapt the task. This is not only a UI preference. The manager and workers should receive a permissions summary in their system context so their behavior matches the user's selected policy.",
			"Read access is usually allowed because agents need to inspect the project. Write access can be ask-first or allowed depending on how much autonomy the user wants. Commands are riskier because they can run scripts, start servers, modify generated files, or consume local resources. Git commit and push should be especially explicit because they change source-control state and may publish work. Delete operations should be treated carefully because they can remove user files or generated artifacts.",
			"Network access is useful for official documentation, GitHub references, public repos, and web verification. It should still be visible when a task relies on external sources. The manager should prefer official documentation, source repositories, and current web results for unstable information. When it uses a downloaded public repository as reference, it should store it under .stratum/references so the user can inspect what was used.",
			"The permissions model should be consistent with the run envelope. If a run is blocked because a permission is denied or requires approval, that should show as a blocked or waiting state rather than a vague failure. Permission denied is not a mechanical retry condition. The manager should adapt the task, ask the user for approval, or explain what cannot be done under the current settings.",
		],
		points: [
			"Read files: usually allowed so agents can inspect the selected project.",
			"Write files: can be allowed for trusted runs or ask-first for safer operation.",
			"Run commands: useful for checks and builds, but should be supervised for long-running commands.",
			"Git commit and push: should be approval-driven and preceded by review.",
			"Delete files: should be explicit because it can remove project artifacts.",
			"Network access: useful for docs and references, but external sources should be cited or stored.",
			"Permission denied should cause manager adaptation, not blind retry.",
		],
	},
	{
		id: "feature-index",
		title: "Feature index",
		body: [
			"Stratum is not only a chat UI. It is the operating surface around supervised long-running research/build work. Each feature exists to keep the user in control while allowing agents to continue through multi-step project runs.",
		],
		points: [
			"Manager orchestration: one agent owns planning, delegation, verification, recovery, and final reporting.",
			"Visible workers: frontend, runtime, test, and review workers remain inspectable while the manager coordinates them.",
			"Project chats: chats are grouped under the selected folder so multiple runs can belong to the same project.",
			"Project memory: plan.md, codebase.md, notes, todos, and chat history preserve facts after compaction or restart.",
			"Run envelope: active state, assigned workers, retries, active tool, timeout, changed files, and failures are tracked as structured run state.",
			"Slash commands: /goal, /build, /plan, /grill-me, /refer, and /schedule express how the manager should handle the prompt.",
			"Model routing: manager and workers can use different models across cloud, local, and OpenAI-compatible providers.",
			"API key pools: multiple keys per provider can rotate when limits, rate errors, or quota failures occur.",
			"Local models: Ollama, LM Studio, llama.cpp, and vLLM can be used for worker lanes or full local workflows.",
			"File tree: project files can be inspected without changing the current agent conversation.",
			"Browser panel: agents can open pages, inspect text, verify routes, and capture screenshots.",
			"Terminal supervision: short commands and long-running servers are separated so dev processes do not steal the UI.",
			"LaTeX workspace: source, files, outline, syntax highlighting, compile progress, logs, and PDF preview live together.",
			"GitHub workspace: issues, PRs, CI, pull/push, release readiness, and diff review are visible before approval.",
			"Rollback review: file changes after a user message can be inspected, rolled back, forked, or transcript-deleted.",
			"Artifact review: screenshots, logs, diffs, PDFs, generated files, and release checks remain tied to the run.",
			"Admin and quotas: hosted access can enforce roles, revocation, monthly token limits, and user visibility.",
			"Updates: GitHub release checks can notify testers when a newer installer is available.",
		],
	},
	{
		id: "manager-workers",
		title: "Manager and workers",
		body: [
			"The manager is the control plane. Workers are execution lanes. This separation is the main difference between Stratum and a normal single chat window.",
		],
		points: [
			"Frontend Worker: UI, Lit components, shared styling, responsive layout.",
			"Runtime Worker: orchestration, tools, IPC, command execution, app behavior.",
			"Test Worker: checks, build failures, regressions, verification.",
			"Review Worker: risks, code review, changed files, release readiness.",
			"Workers should end with status, files changed, checks run, errors, and next step.",
		],
	},
	{
		id: "models-keys",
		title: "Models and API keys",
		body: [
			"Stratum treats models as routing choices for a supervised project run. The manager and worker lanes can use different providers where configured, including GPT/OpenAI, Claude/Anthropic, custom OpenAI-compatible endpoints, and local runtimes.",
			"API keys are added through Settings or the manager key prompt when a provider is first required. When multiple keys exist for a provider, Stratum can rotate between usable keys and keep quota or error state visible.",
		],
		points: [
			"Manager and workers can use different models.",
			"GPT/OpenAI and Claude/Anthropic can be configured as cloud provider choices.",
			"Custom OpenAI-compatible endpoints cover hosted, LAN, and local runtimes.",
			"Provider keys show status: usable, idle, in use, or errored.",
			"Legacy keys are migrated into labeled key entries.",
			"Invalid keys are not retried blindly.",
			"Local Ollama and user-owned keys can remain outside hosted quota enforcement.",
		],
	},
	{
		id: "local-models-docs",
		title: "Models and routing",
		body: [
			"Model routing lets the manager and worker lanes use different providers for different parts of the run. A stronger cloud model can own planning and review while local or lower-cost compatible endpoints handle scoped worker tasks.",
		],
		code: ["Manager: GPT / Claude / compatible cloud model", "Workers: local or lower-cost compatible endpoint", "OpenAI-compatible base URL: http://localhost:11434/v1"],
		points: [
			"GPT/OpenAI and Claude/Anthropic are model/provider choices where configured.",
			"Custom OpenAI-compatible endpoints can point at local or hosted runtimes.",
			"Ollama works well for quick local setup.",
			"LM Studio, llama.cpp, and vLLM can be used through OpenAI-compatible local endpoints.",
			"API key pools and quota visibility help keep long project runs inspectable.",
		],
	},
	{
		id: "run-modes-docs",
		title: "Slash commands",
		body: [
			"Slash commands let the user express supervision intent directly in the manager prompt. Stratum expands the command into manager instructions before the run starts, so the same input box can drive completion, implementation, planning, clarification, reference lookup, or scheduling.",
			"Commands are only interpreted when placed at the start of the prompt. The rest of the prompt is still the user's task, scope, or scheduling instruction.",
		],
		code: [
			"/goal Review this repo, identify release blockers, fix safe website issues, run the build, and summarize changed files.",
			"/build Add a screenshots section using public/assets/screenshots, keep the current styling, and run npm.cmd run build.",
			"/plan Migrate settings to support token pools. Give me phases, files, risks, and checks before editing.",
			"/grill-me I want onboarding improved for new researchers. Ask me the scope and acceptance questions first.",
			"/refer What did we decide earlier about model routing, API key pools, and local endpoints?",
			"/schedule Every weekday at 9 AM, open this project and check whether the release download still resolves.",
		],
		points: [
			"/goal: run the user's task until it is complete. Delegate to workers, verify results, retry failed subtasks only when a worker reports an error, and finish with a concise completion summary.",
			"/build: implement the requested change end to end. Inspect the code first, make edits, run required checks, fix failures, and report the final result. Do not stop at a plan unless blocked.",
			"/plan: create a concrete plan first. Ask clarifying questions if needed, then wait for user approval before implementation.",
			"/grill-me: ask focused questions needed to align on scope, constraints, and acceptance criteria. Do not edit files or run implementation commands until the user answers.",
			"/refer: search older chat history as a focused reference. Use returned snippets, do not load the entire transcript, and ask one clarifying question if the reference target is unclear.",
			"/schedule: treat the task as a scheduling request. If time, recurrence, or action is missing, ask for those details first; otherwise create the scheduled workflow and state what will run and when.",
			"All slash-command runs still respect permissions, quotas, model routing, and the selected project folder.",
		],
	},
	{
		id: "project-memory",
		title: "Project memory",
		body: [
			"Project memory is what lets Stratum keep context across long runs without forcing the model to reread everything each time.",
		],
		points: [
			"plan.md records current phases, decisions, assignments, and compaction summaries.",
			"codebase.md stores the project map, commands, architecture, and conventions.",
			".stratum/notes.md stores durable requirements, decisions, reminders, blockers, and useful commands.",
			"Chat history remains visible to the user and searchable by agents without loading the full transcript into context.",
			"Compaction should happen once when the threshold is reached, then later only after the threshold is reached again.",
		],
	},
	{
		id: "project-artifacts-docs",
		title: "Project artifacts",
		body: [
			"Project artifacts are the durable outputs and evidence that remain inside or beside the selected folder. They include memory files, screenshots, diffs, logs, PDFs, notes, todos, chat history, and workflow events.",
			"The manager should treat artifacts as part of the run record. A final summary is stronger when it can point to what changed, what was checked, and where the durable record lives.",
		],
		points: [
			"plan.md stores phases, assignments, compaction summaries, accepted decisions, and run history.",
			"codebase.md stores architecture, commands, conventions, important files, and project map.",
			".stratum/notes.md stores user-facing requirements, blockers, reminders, and useful commands.",
			"Todos track active task state across long runs.",
			"Screenshots, logs, diffs, PDFs, and generated files should stay reviewable before handoff.",
			"Workflow events record delegations, retries, completions, compactions, and memory writes.",
		],
	},
	{
		id: "artifact-review-docs",
		title: "Artifact review",
		body: [
			"Artifact review is the discipline of treating generated outputs as evidence. Stratum should not hide artifacts inside a final response. The user should be able to inspect files, screenshots, logs, diffs, PDFs, release checks, and notes before accepting the run.",
		],
		points: [
			"Generated files should be tied to the project folder and the worker or manager action that produced them.",
			"Code artifacts should pass through diff review before commit, push, release, or PR approval.",
			"Browser artifacts should include screenshot-backed verification when layout or route behavior matters.",
			"LaTeX artifacts should include compile output and PDF preview for paper work.",
			"Final summaries should state what changed, what was checked, and which artifacts still need attention.",
		],
	},
	{
		id: "tools-surfaces",
		title: "Tools and surfaces",
		body: [
			"Stratum exposes tools as panels instead of hiding them behind model text. The goal is simple: the user should be able to see what the agent can see, what it changed, what it verified, and what state will survive the current conversation.",
			"Each surface has a different responsibility. The manager decides when a surface matters. Workers can use the same underlying tools, but the visible UI keeps the run inspectable by the user.",
		],
		points: [
			"File tree is for project inspection and file previews without changing the active chat.",
			"Browser is for web and localhost verification, page inspection, and screenshot-backed reports.",
			"Terminal is for command execution, dev servers, watchers, and long-running project processes.",
			"LaTeX is for paper editing, outline navigation, compile progress, logs, and PDF preview.",
			"GitHub is for issues, PRs, CI, pull/push, release review, and local diff approval.",
			"Notes, todos, and plan files are the durable project memory layer.",
			"Rollback review is for understanding and reversing changes made after a chosen user message.",
		],
	},
	{
		id: "surface-groups-docs",
		title: "Surface groups",
		body: [
			"Stratum surfaces are easiest to explain by the job they perform inside a run. Some surfaces help inspect, some help build, some help review, and some help operate the workspace.",
		],
		points: [
			"Inspect: file tree, browser, project dashboard, notes, and chat history help the manager understand state.",
			"Build: worker lanes, terminal, LaTeX, and project files help agents produce concrete outputs.",
			"Review: code review, GitHub diff, permissions, logs, screenshots, and PDFs help the user evaluate work.",
			"Operate: model selector, token pools, account state, quotas, OTA updates, and settings keep the workspace healthy.",
			"Surfaces should remain visible enough that users can verify what an agent saw or changed.",
		],
	},
	{
		id: "manager-chat-docs",
		title: "Manager-only chat",
		body: [
			"The manager-only chat is the primary control surface. The user sends goals to the manager, not to every worker. This keeps accountability clear: the manager owns planning, delegation, verification, memory updates, and final reporting.",
			"In manager-only mode, the workflow column stays visible beside the manager conversation. This removes worker clutter while preserving the run trace: who was assigned, what came back, what failed, and what the manager did next.",
			"The manager can still delegate to workers exactly as before. The UI change is only organizational; it does not reduce worker capability.",
		],
		points: [
			"Use it for broad project goals, research tasks, release work, and long multi-step edits.",
			"The query bar stays attached to the manager chat and moves naturally when messages exist.",
			"The workflow feed records handoffs, compaction, retries, failures, and plan writes.",
			"Slash commands are only interpreted when placed at the start of the prompt.",
			"The manager is expected to update plan.md and codebase.md when new durable facts are learned.",
		],
	},
	{
		id: "worker-lanes-docs",
		title: "Worker lanes",
		body: [
			"Worker lanes are full visible chats controlled by the manager. They are not separate user conversations. Each worker receives scoped instructions, works inside the selected project folder, and reports back with a structured summary.",
			"This separation makes parallel work safer. A runtime worker can patch orchestration logic while a review worker audits the result and a browser worker verifies the UI. The manager decides whether the combined result is acceptable.",
			"Workers should not invent broad scope. Their job is to complete the assigned task and explain exactly what changed.",
		],
		points: [
			"Frontend Worker handles UI, layout, icons, styling, and responsive polish.",
			"Runtime Worker handles orchestration, IPC, storage, tool behavior, command execution, and app logic.",
			"Test Worker runs checks, reproduces failures, and reports exact errors.",
			"Review Worker inspects risks, changed files, regressions, and release readiness.",
			"Every worker summary should include status, files changed, checks run, errors, and next step.",
		],
	},
	{
		id: "file-tree-docs",
		title: "File tree and preview",
		body: [
			"The file tree is a project overlay for inspecting the selected folder. It is intentionally separate from the active chat so the user can browse files without interrupting the manager or workers.",
			"Agents can use project file tools directly, while the user can use the overlay to inspect what is in the folder, confirm generated files, and preview content before approving follow-up work.",
		],
		points: [
			"Shows folders and files under the selected project root.",
			"Supports refresh when agents create, edit, or delete files.",
			"Preview area lets the user inspect a selected file without changing chat state.",
			"Useful for validating that generated artifacts landed in the expected folder.",
			"The overlay does not change current chats or agent work by itself.",
		],
	},
	{
		id: "browser-docs",
		title: "Browser panel",
		body: [
			"The browser panel is the shared web inspection surface. It is useful for local previews, public sites, release pages, documentation pages, and any task where visual verification matters.",
			"Agents can open pages, inspect page text, take screenshots, and report layout or navigation problems. The user browser remains separate from agent work unless the user explicitly asks to use it.",
			"The browser is most valuable when paired with a browser worker or review worker. The manager can ask for a screenshot-backed report, then send a focused repair prompt to a runtime or frontend worker.",
		],
		points: [
			"Use it for localhost previews, deployed websites, download pages, and docs routes.",
			"Agents can verify whether a page loaded, whether key text is visible, and whether controls are usable.",
			"Screenshot evidence makes UI review more concrete than a text-only summary.",
			"Browser navigation timeouts are mechanical failures and can be retried.",
			"Layout, copy, or design problems should be repaired by adapting the prompt, not blind retry.",
		],
	},
	{
		id: "terminal-docs",
		title: "Terminal",
		body: [
			"Terminal access is split between short-lived project commands and long-running supervised sessions. Normal checks should use project command execution. Dev servers, watchers, REPLs, and interactive commands should use the terminal.",
			"The terminal overlay should not open automatically every time an agent runs a command. It stays available for the user or agent to open explicitly when inspection is needed.",
			"This keeps command output useful without constantly stealing focus from the main workspace.",
		],
		points: [
			"Use project commands for quick checks such as lint, typecheck, file listing, and one-shot scripts.",
			"Use terminal for npm dev servers, preview servers, watchers, and interactive shells.",
			"Long-running commands need supervised mode so the app can track the process and abort it.",
			"Transient command failures can be retried when the error is mechanical, such as file locks.",
			"Permission denied, missing dependency, and real compile errors should be reported to the manager for adaptation.",
		],
	},
	{
		id: "latex-docs",
		title: "LaTeX workspace",
		body: [
			"The LaTeX workspace is built for research-paper work inside the project root paper folder. It brings source editing, file navigation, outline awareness, compile controls, logs, and PDF preview into one surface.",
			"The manager should use this surface when the task involves papers, figures, outlines, compile errors, citations, or PDF inspection. Workers can edit source files while the manager uses compile output and the preview to verify progress.",
		],
		points: [
			"Files panel shows paper sources, figures, class files, logs, aux files, and PDFs.",
			"Outline panel extracts headings from the selected TeX file for fast navigation.",
			"Syntax highlighting makes commands, braces, options, and text easier to inspect.",
			"Compile controls run LaTeX checks and surface progress in the output area.",
			"PDF preview keeps the rendered paper visible beside the source.",
			"The manager should record paper decisions, figure requirements, and reviewer notes in project memory.",
		],
	},
	{
		id: "latex-workflow-deep",
		title: "LaTeX workflow",
		body: [
			"LaTeX work in Stratum should be treated like a full document workflow, not just text editing. The manager should understand the paper goal, the current source layout, the target format, the compile command, figure dependencies, and what kind of review is needed. A good paper run may involve writing, source cleanup, figure generation, BibTeX or citation repair, PDF inspection, and a review pass for structure or claims.",
			"All LaTeX sources should live under the project root paper folder unless the user explicitly asks for a different layout. This makes the file tree, compile tooling, and project memory predictable. The file panel should show TeX files, figures, class files, logs, aux files, and PDFs. The manager should use list_latex_files to choose the correct main file instead of guessing when multiple TeX files exist.",
			"The outline panel turns the selected TeX file into a navigable structure. This matters for long research papers where the user cares about section flow, related work placement, methodology structure, results, limitations, and conclusion. The outline should be collapsible, light themed, and use the same expansion arrow style as the rest of Stratum. If the selected file has no headings, the panel should say so clearly rather than showing a broken outline.",
			"Syntax highlighting is important because LaTeX is dense. Commands, options, braces, math, comments, and plain text should be visually distinct enough that the user can read source quickly. The editor does not need to become a full IDE, but it should make structural errors easier to spot. A compile loading bar belongs in the output area so the user can see that pdflatex or another configured compiler is running.",
			"Compile output should be useful to agents and users. A failed compile should surface the key error, line area, and log path. The manager should not blindly retry a compile error. Missing packages, undefined control sequences, broken references, and figure path problems require a repair prompt. A transient file lock or interrupted compiler can be retried because that is mechanical. When compilation succeeds, the PDF preview should update and the manager should record major paper decisions in plan.md or notes.",
		],
		points: [
			"Use paper/ as the default source root for research paper work.",
			"Choose the main TeX file through the LaTeX file list before compiling.",
			"Use the outline to verify paper structure and section hierarchy.",
			"Use compile output to distinguish mechanical failures from source errors.",
			"Use PDF preview for visual checks such as layout, figures, tables, and title pages.",
			"Record durable paper decisions, reviewer notes, figure requirements, and open questions in notes or plan.md.",
			"Do not fabricate citations, results, or claims; use placeholders or ask the user when evidence is missing.",
		],
	},
	{
		id: "github-review-docs",
		title: "GitHub review",
		body: [
			"GitHub review is the approval surface for repository work. It combines local file diffs, changed-file summaries, branch state, CI visibility, issues, PRs, and release readiness checks.",
			"Stratum should open Git review before asking the user to approve commits, pushes, or release actions. This keeps source control decisions visible and prevents agents from hiding important changes in a final summary.",
		],
		points: [
			"Pull / Push view shows branch, ahead/behind state, files changed, added lines, and removed lines.",
			"Diff view shows file-level changes for user inspection.",
			"Open Issues & PRs view lets the manager triage GitHub work without leaving the app.",
			"CI results help the manager decide whether a change is release-ready.",
			"GitHub tools should be preferred over raw terminal commands for issues, PRs, comments, merges, and CI queries.",
			"Rollback review is separate from Git review and should work even when a folder is not a Git repository.",
		],
	},
	{
		id: "github-workflow-deep",
		title: "GitHub workflow",
		body: [
			"GitHub workflow in Stratum has two related surfaces: the GitHub workspace and the Git review panel. The GitHub workspace is for remote collaboration state: issues, PRs, CI runs, open work, pull/push state, and release context. The Git review panel is for local change approval: what files changed, what was added, what was removed, and whether the user is comfortable with the next source-control action.",
			"The manager should prefer GitHub-specific tools over raw terminal commands for issues, pull requests, CI queries, comments, closing, creating, or merging. Raw terminal commands are still useful for local Git inspection or project-specific scripts, but GitHub tools create a cleaner audit trail and reduce command parsing mistakes. Before creating issues, PRs, or comments, the manager should draft the title and body and ask for explicit approval unless the user requested immediate creation.",
			"When working on a GitHub issue, the manager should first inspect the issue content and decide whether the task is workable. It should identify likely files, risk, test requirements, and acceptance criteria before delegating. Workers can then inspect or patch scoped areas. A review worker should inspect the changed files and risks. The manager should open Git review before asking the user to commit, push, or prepare a PR.",
			"The Pull / Push page should show branch name, upstream tracking, ahead/behind counts, file count, additions, and removals. This gives the user a release-readiness snapshot without reading terminal output. The Open Issues & PRs page should show issues, PRs, CI results, and selected item details. The app should not require the user to leave Stratum for routine triage.",
			"Release workflows should treat the installer as an artifact. If the website download points to GitHub Releases, the release must include the installer asset with the expected filename. The manager should verify that the URL resolves, that release notes are useful, and that the app version and icon look correct before telling the user to send the installer to testers. Update prompts inside Stratum should also read release metadata from GitHub so testers know what changed.",
		],
		points: [
			"Use GitHub tools for issues, PRs, CI, comments, and merges when possible.",
			"Use Git review before commit, push, release, or PR approval.",
			"Keep remote GitHub state and local diff review visually separate.",
			"Verify release assets by URL, filename, and installer behavior.",
			"Do not merge or close work without explicit user intent or an explicit panel action.",
			"Treat GitHub failures as either mechanical issues, auth issues, or real project blockers.",
		],
	},
	{
		id: "notes-todos-docs",
		title: "Notes and todos",
		body: [
			"Notes and todos are lightweight project management surfaces. They are not replacements for the manager chat. They are the durable records that survive long context windows, app restarts, and future sessions.",
			"The notes panel stores user-facing facts: requirements, decisions, reminders, blockers, open questions, useful commands, and agent updates. The todo list shows active manager-maintained task state.",
		],
		points: [
			"Notes are stored in .stratum/notes.md.",
			"Todos are updated by the manager as work moves from planned to active to complete or blocked.",
			"plan.md stores broader run history and compaction summaries.",
			"codebase.md stores architecture, important files, commands, and conventions.",
			"Agents should not write private reasoning into notes.",
			"Useful commands and durable user requirements should be recorded explicitly.",
		],
	},
	{
		id: "rollback-docs",
		title: "Rollback, fork, and delete from message",
		body: [
			"Stratum tracks file checkpoints around user turns so the user can inspect what changed after a chosen message. This gives a rollback-style review even when the project is not a Git repository.",
			"Right-clicking a user message can open actions such as rollback, fork, or delete. Rollback reverses file changes after that message. Fork creates a new chat from that point. Delete removes that message and later chat text without changing file context.",
		],
		points: [
			"Rollback is for reverting file changes caused by later work.",
			"Fork is for trying a different path while preserving the earlier message state.",
			"Delete is for cleaning the visible transcript without changing project files.",
			"The review overlay should show changed files, additions, removals, and file previews.",
			"This feature is independent of Git and should work in ordinary folders.",
		],
	},
	{
		id: "run-reliability",
		title: "Run reliability",
		body: [
			"The run envelope is the source of truth for serious work. It tracks the active phase, assigned workers, active tool call, retry count, last error, changed files, checkpoints, and final status.",
			"The UI should reflect this object rather than guessing state from chat messages. If a worker is running, retrying, failed, blocked, or complete, that state should be visible in the manager-only chat.",
			"Every delegated task should be represented as a task envelope with enough detail for the manager and user to understand what is happening without reading the entire transcript.",
		],
		points: [
			"Run fields include runId, prompt, phase, assigned workers, active tool call, timeout deadline, retry count, last error, changed files, checkpoints, and final status.",
			"Retry mechanical failures such as server busy, rate limits, timeouts, transient file locks, and browser navigation timeouts.",
			"Do not blindly retry TypeScript errors, missing dependencies, invalid API keys, bad prompts, or permission denied errors.",
			"Use supervised mode for long-running commands such as dev servers and watchers.",
			"Hard abort should stop active manager and worker runs.",
			"Continue from failure should resume from the failed state without repeating completed work.",
		],
	},
	{
		id: "supervision-controls-docs",
		title: "Supervision controls",
		body: [
			"Supervision controls are the settings and surfaces that let agents continue useful work without erasing user control. They include permissions, model routing, provider keys, quotas, account state, updates, and review boundaries.",
		],
		points: [
			"File writes can be allowed, denied, or made ask-first per project risk.",
			"Commands should separate one-shot checks from long-running supervised processes.",
			"Git commit, push, release, and PR actions should be preceded by review.",
			"Network access should be visible when agents depend on external documentation or web pages.",
			"Delete operations should be explicit because they can remove user files or generated artifacts.",
			"Provider keys, token pools, and quotas should show usable, in-use, errored, or limited state.",
			"Updates should tell testers which desktop build they are running and what release is available.",
		],
	},
	{
		id: "onboarding-settings",
		title: "Onboarding and settings",
		body: [
			"Onboarding introduces the app by walking the user through project chats, model selection, provider keys, right-sidebar tools, notes, browser, terminal, LaTeX, GitHub review, and manager-led workflows.",
			"Settings is the configuration surface for accounts, API keys, model routing, permissions, quotas, agent names, onboarding restart, and admin controls.",
		],
		points: [
			"Onboarding should be restartable from Settings.",
			"The tour should not block clicks on highlighted controls.",
			"Settings sections should have enough width to avoid cramped admin tables or API-key lists.",
			"API key settings should show provider key counts and key statuses.",
			"Account settings should show user tier, status, quota usage, and sign-out controls.",
			"Admin settings are visible only to owner/admin roles.",
		],
	},
	{
		id: "updates-docs",
		title: "Over-the-air updates",
		body: [
			"Stratum can check GitHub Releases for newer versions. When a new release exists, the app can show a startup popup with release notes and a download action.",
			"If the user chooses later, an update icon remains visible beside the Stratum title so they can return to the update flow without being interrupted again.",
		],
		points: [
			"Release detection should compare the installed app version to the latest GitHub release tag.",
			"Release notes should be visible before the user downloads.",
			"The installer asset filename should remain stable for the website and updater.",
			"Unsigned installers may still show Windows warnings until code signing is configured.",
			"The app should not silently install updates without clear user approval.",
		],
	},
	{
		id: "github-releases",
		title: "GitHub and releases",
		body: [
			"Stratum includes GitHub and release workflows for testers. The app can check GitHub releases, show update prompts, and point users to the latest installer asset.",
		],
		points: [
			"Release assets should be attached to GitHub Releases with stable filenames.",
			"The website downloader should point to the latest release download URL.",
			"Update prompts should show release notes inside the app.",
			"Git review should show changed files from Stratum checkpoints, not require a Git repository for every rollback review.",
		],
	},
	{
		id: "admin-quotas",
		title: "Admin and quotas",
		body: [
			"Hosted account controls can be backed by Supabase Auth and Postgres. This gives email/password login, user status, tiers, revocation, and monthly quota tracking.",
		],
		points: [
			"Roles: owner, admin, full, limited, revoked.",
			"Limited users can have monthly token caps and model allowlists.",
			"Quota should complete the current prompt before blocking future sends.",
			"Admins can revoke, restore, change tier, reset usage, and inspect token spend from Settings.",
		],
	},
	{
		id: "changelog",
		title: "Changelog",
		body: ["Current testing releases focus on reliability, onboarding, project chats, settings, GitHub review, LaTeX polish, chat history, rollback review, and update prompts."],
		points: releaseHighlights,
	},
	{
		id: "support",
		title: "Support",
		body: [
			"Support requests should include the Stratum version, Windows version, provider/model used, project folder path shape, screenshot if UI-related, and exact error text if available.",
		],
		points: [
			"For login issues, confirm email verification and account status.",
			"For quota issues, check Settings > Account and Admin if available.",
			"For model failures, inspect provider key status and cooldown.",
			"For installer issues, verify the latest GitHub release asset exists.",
		],
	},
	{
		id: "press",
		title: "Press",
		body: [
			"Stratum is a Windows desktop app for manager-led AI workspaces. It combines a manager chat, visible worker lanes, project memory, Git review, LaTeX editing, browser verification, model routing, and release tooling for supervised long-running research/build work.",
		],
		points: [
			"Category: AI workspace / agent orchestration desktop app.",
			"Platform: Windows.",
			"Primary users: researchers, builders, technical writers, and small labs running long tasks.",
			"Positioning: a workspace around model execution, not another single chat UI.",
		],
	},
	{
		id: "releases",
		title: "Stratum 0.0.3",
		body: [
			"This release improves Stratum as a manager-led AI workspace for serious long-running research and build tasks.",
		],
		points: [
			"Added: Supabase account login, access roles, revocation, and monthly quota tracking.",
			"Added: Admin controls in Settings for user access and token limits.",
			"Added: Over-the-air update checks from GitHub releases.",
			"Added: Update available popup and deferred update indicator.",
			"Added: Multi-key provider support with key rotation, status tracking, and retry cooldowns.",
			"Added: ChatGPT / Codex account provider alongside normal API keys.",
			"Added: Parallel worker delegation for independent manager-assigned tasks.",
			"Added: Run envelope tracking for worker task state, retries, tool activity, and failures.",
			"Added: Rollback/review tooling for inspecting file changes after chat turns.",
			"Added: Slash command support for goal, plan/build-style behavior, grill-me, schedule, and refer.",
			"Added: Persistent chat history with full reload support.",
			"Added: Onboarding flow with restart option in Settings.",
			"Added: Project dashboard, notes, GitHub workspace, LaTeX workspace, browser tools, and local model guidance.",
			"Changed: Manager can now delegate to multiple workers concurrently when tasks are independent.",
			"Changed: Worker prompts and summaries are more structured for verification.",
			"Changed: Provider keys are managed as pools instead of single stored values.",
			"Changed: Failed API keys are retried after a cooldown instead of being permanently skipped.",
			"Changed: Run reliability UI is cleaner and better tied to actual task state.",
			"Changed: Website was redesigned as a serious Product OS style site with documentation, use cases, and download flow.",
			"Fixed: Installer icon and Windows app branding issues.",
			"Fixed: Installer build flow using patched executable icon before NSIS packaging.",
			"Fixed: GitHub workflow panel restoration.",
			"Fixed: Chat compaction no longer removes visible chat history.",
			"Fixed: Manager-only view and run envelope layout issues.",
			"Fixed: Settings/admin layout and quota display issues.",
			"Fixed: API key migration from dev storage to installed storage.",
			"Notes: Windows installer asset: stratum-setup.exe. Version 0.0.3. Recommended for testers using Windows with cloud or local models.",
		],
	},
];

function routeFromLocation() {
	const path = window.location.pathname.replace(/\/+$/, "") || "/";
	if (path === "/features") return "features";
	if (path === "/use-cases") return "useCases";
	if (path === "/local-models") return "local";
	if (path === "/documentation") return "documentation";
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
		const href = anchor.getAttribute("href");
		window.history.pushState({}, "", href);
		setRoute(routeFromLocation());
		const hash = href.includes("#") ? href.slice(href.indexOf("#") + 1) : "";
		if (hash) {
			window.requestAnimationFrame(() => {
				document.getElementById(hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
			});
			return;
		}
		window.scrollTo({ top: 0, behavior: "smooth" });
	}, []);

	return [route, navigate];
}

function isRouteActive(route, href) {
	if (href === "/" && route === "home") return true;
	if (href === "/features" && route === "features") return true;
	if (href === "/use-cases" && route === "useCases") return true;
	if (href === "/local-models" && route === "local") return true;
	if (href === "/documentation" && route === "documentation") return true;
	return href === "/download" && route === "download";
}

function Header({ route, onNavigate }) {
	const [resourcesOpen, setResourcesOpen] = React.useState(false);
	const [mobileNavOpen, setMobileNavOpen] = React.useState(false);
	const closeResources = () => setResourcesOpen(false);
	const closeMobileNav = () => {
		setMobileNavOpen(false);
		closeResources();
	};

	return (
		<header className={`site-header ${mobileNavOpen ? "mobile-open" : ""}`} onClick={onNavigate}>
			<a className="brand" href="/" data-route>
				<img src="/assets/stratum-logo.png" alt="" />
				<span>Stratum</span>
			</a>
			<nav aria-label="Primary navigation">
				{navItems.map((item) => (
					<a key={item.href} href={item.href} data-route className={isRouteActive(route, item.href) ? "active" : ""} onClick={closeMobileNav}>
						{item.label}
					</a>
				))}
				<div
					className={`resources-nav ${route === "documentation" ? "active" : ""} ${resourcesOpen ? "open" : ""}`}
					onMouseEnter={() => setResourcesOpen(true)}
					onMouseLeave={closeResources}
				>
					<button type="button" aria-haspopup="true" aria-expanded={resourcesOpen} onClick={() => setResourcesOpen((open) => !open)}>
						<span>Resources</span>
						<img src="/assets/down-icon.png" alt="" />
					</button>
					<div className="resources-menu" role="menu">
						<div>
							<h2>Everything you need to stay current and get help</h2>
						</div>
						<nav aria-label="Resources navigation">
							{resourceItems.map((item) => (
								<a key={item.href} href={item.href} data-route role="menuitem" onClick={closeMobileNav}>
									<strong>{item.label}</strong>
									<span>{item.detail}</span>
								</a>
							))}
						</nav>
					</div>
				</div>
			</nav>
			<a className="header-download" href="/download" data-route>
				Download
			</a>
			<button
				className="mobile-menu-button"
				type="button"
				aria-label="Toggle navigation"
				aria-expanded={mobileNavOpen}
				onClick={() => {
					closeResources();
					setMobileNavOpen((open) => !open);
				}}
			>
				<img src="/assets/menu.png" alt="" />
			</button>
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

function RunAnatomy() {
	return (
		<section className="section anatomy-section">
			<div className="section-heading split-heading">
				<div>
					<p className="eyebrow">Run anatomy</p>
					<h2>One project run moves from goal to reviewable artifact.</h2>
				</div>
				<p>
					Stratum makes the full loop visible: what the user asked for, how the manager planned it, which workers acted, what tools ran, what was verified, and what memory stayed behind.
				</p>
			</div>
			<div className="anatomy-track">
				{runAnatomySteps.map(([title, body], index) => (
					<article key={title} className="anatomy-step">
						<b>{String(index + 1).padStart(2, "0")}</b>
						<strong>{title}</strong>
						<p>{body}</p>
					</article>
				))}
			</div>
		</section>
	);
}

function RunLifecycle() {
	return (
		<section className="section lifecycle-section">
			<div className="section-heading split-heading">
				<div>
					<p className="eyebrow">Run lifecycle</p>
					<h2>A project run stays visible from goal to artifact.</h2>
				</div>
				<p>
					Stratum tracks who owns the work, which tools verified it, what changed, and what memory or artifacts remain inside the project.
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
						<span>acceptance checks: build, routes, review, artifacts</span>
					</div>
					<div className="console-line">
						<b>runtime.worker</b>
						<span>bounded implementation task assigned inside project folder</span>
					</div>
					<div className="console-line warning-line">
						<b>review.worker</b>
						<span>verify diffs, logs, screenshots, and release blockers</span>
					</div>
					<div className="console-line">
						<b>memory.write</b>
						<span>plan.md and notes updated with durable decisions</span>
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

function ManagerLedExplainer() {
	return (
		<section className="section manager-led-section">
			<div className="section-heading split-heading">
				<div>
					<p className="eyebrow">Why manager-led</p>
					<h2>Planning, execution, verification, and memory are separate jobs.</h2>
				</div>
				<p>
					A single agent transcript can blur who owns the plan and whether the work was checked. Stratum keeps the manager accountable while workers execute bounded tasks.
				</p>
			</div>
			<div className="manager-reason-grid">
				{managerReasons.map(([title, body]) => (
					<article key={title} className="manager-reason-card">
						<strong>{title}</strong>
						<p>{body}</p>
					</article>
				))}
			</div>
		</section>
	);
}

function ProjectControlLayer() {
	return (
		<section className="section control-layer-section">
			<div className="section-heading split-heading">
				<div>
					<p className="eyebrow">Project control layer</p>
					<h2>The manager keeps the team and project state aligned.</h2>
				</div>
				<p>
					Stratum keeps long-running work inspectable by separating ownership, execution, memory, and review into visible workspace layers.
				</p>
			</div>
			<div className="control-layer-grid">
				{controlLayerCards.map(([title, body, icon]) => (
					<article key={title} className="control-layer-card">
						<img src={icon} alt="" />
						<h3>{title}</h3>
						<p>{body}</p>
					</article>
				))}
			</div>
		</section>
	);
}

function ProjectArtifacts() {
	return (
		<section className="section artifact-section">
			<div className="section-heading split-heading">
				<div>
					<p className="eyebrow">Project memory</p>
					<h2>What stays in the project after the run.</h2>
				</div>
				<p>
					Stratum does not treat artifacts as stray downloads or transcript fragments. Durable records stay inside or beside the selected project so future work can resume with context.
				</p>
			</div>
			<div className="artifact-grid">
				{projectArtifacts.map(([title, body]) => (
					<article key={title} className="artifact-card">
						<strong>{title}</strong>
						<p>{body}</p>
					</article>
				))}
			</div>
		</section>
	);
}

function ProductSurfaces() {
	return (
		<section className="section surface-section">
			<div className="section-heading">
				<p className="eyebrow">Product surfaces</p>
				<h2>Tools become evidence and control surfaces.</h2>
				<p>
					Each workspace panel helps the user and manager inspect what changed, what was checked, and what will remain in the project.
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

function ArtifactDiscipline() {
	return (
		<section className="section artifact-discipline-section">
			<div className="section-heading split-heading">
				<div>
					<p className="eyebrow">Artifact review</p>
					<h2>Artifacts are reviewed before they become handoff.</h2>
				</div>
				<p>
					Stratum keeps generated outputs tied to the manager run, the worker that produced them, and the evidence used to accept or reject them.
				</p>
			</div>
			<div className="artifact-discipline-grid">
				{artifactReviewCards.map(([title, body]) => (
					<article key={title} className="artifact-discipline-card">
						<strong>{title}</strong>
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
					<h2>Screenshots that show the run staying inspectable.</h2>
				</div>
				<p>Each screenshot is evidence of a project-bound surface: manager state, workers, review, permissions, memory, models, updates, and artifacts.</p>
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

function RunModes() {
	return (
		<section className="section run-modes-section">
			<div className="section-heading split-heading">
				<div>
					<p className="eyebrow">Slash commands</p>
					<h2>Prompt prefixes tell the manager how to handle the run.</h2>
				</div>
				<p>
					Stratum can treat the same text box as a completion run, build request, planning pass, clarifying interview, reference lookup, or scheduled workflow depending on the command.
				</p>
			</div>
			<div className="run-mode-grid">
				{slashCommands.map(([command, body]) => (
					<article key={command} className="run-mode-card">
						<code>{command}</code>
						<p>{body}</p>
					</article>
				))}
			</div>
		</section>
	);
}

function SupervisionControls() {
	return (
		<section className="section supervision-section">
			<div className="section-heading split-heading">
				<div>
					<p className="eyebrow">Supervision controls</p>
					<h2>Agents can keep working inside visible boundaries.</h2>
				</div>
				<p>
					Permissions and settings define how much autonomy workers receive, which model capacity they can use, and when the manager must stop for review.
				</p>
			</div>
			<div className="supervision-grid">
				{supervisionControls.map(([title, body]) => (
					<article key={title} className="supervision-card">
						<strong>{title}</strong>
						<p>{body}</p>
					</article>
				))}
			</div>
		</section>
	);
}

function SurfaceGroups() {
	return (
		<section className="section surface-groups-section">
			<div className="section-heading split-heading">
				<div>
					<p className="eyebrow">Surface groups</p>
					<h2>Dedicated panels map to the jobs inside a run.</h2>
				</div>
				<p>
					The screenshots are not just UI inventory. They show how Stratum separates inspection, building, review, and operations into visible surfaces.
				</p>
			</div>
			<div className="surface-group-grid">
				{surfaceGroups.map(([title, images, labels]) => (
					<article key={title} className="surface-group-card">
						<div className="surface-group-images">
							{images.map((src, index) => (
								<img key={`${title}-${src}`} src={src} alt={`${labels[index]} screenshot`} />
							))}
						</div>
						<h3>{title}</h3>
						<div className="surface-group-labels">
							{labels.map((label) => (
								<span key={label}>{label}</span>
							))}
						</div>
					</article>
				))}
			</div>
		</section>
	);
}

function FeatureSpotlights() {
	return (
		<section className="section feature-spotlight-section">
			<div className="section-heading split-heading">
				<div>
					<p className="eyebrow">New surfaces</p>
					<h2>Recent feature work, shown from the actual desktop UI.</h2>
				</div>
				<p>
					These screenshots cover the newer operational features around project launch, permissions, account state, token pools, updates, and review.
				</p>
			</div>
			<div className="feature-spotlight-grid">
				{featureSpotlights.map(([title, src, body, points], index) => (
					<article key={title} className="feature-spotlight-card">
						<img src={src} alt={`${title} screenshot`} />
						<div>
							<b>{String(index + 1).padStart(2, "0")}</b>
							<h3>{title}</h3>
							<p>{body}</p>
							<div className="spotlight-points">
								{points.map((point) => (
									<span key={point}>{point}</span>
								))}
							</div>
						</div>
					</article>
				))}
			</div>
		</section>
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
				<h2>Install the workspace for supervised long-running research and build work.</h2>
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
			<div className="hero-brand-lockup" aria-label="Stratum">
				<img className="hero-logo" src="/assets/app-logo.png" alt="" />
				<span>Stratum</span>
			</div>
			<h1>Manager-led AI workspaces for long-running projects.</h1>
			<p className="hero-text">
				Stratum is a Windows workspace where the user supervises one manager, visible worker lanes, dedicated tools, reviewable artifacts, and project memory that carries forward.
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
			<RunAnatomy />
			<RunLifecycle />
			<ManagerLedExplainer />
			<ProjectControlLayer />
			<ProjectArtifacts />
			<ProductSurfaces />
			<ArchitectureSection />
			<ArtifactDiscipline />
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
					<h1>Supervised surfaces for long-running AI project work.</h1>
					<p>Stratum keeps manager control, worker status, project memory, and technical evidence visible while the run moves across files, tools, models, and artifacts.</p>
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
			<RunModes />
			<SupervisionControls />
			<SurfaceGroups />
			<FeatureSpotlights />
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
			<section className="section deep-use-section">
				<div className="section-heading split-heading">
					<div>
						<p className="eyebrow">Detailed runs</p>
						<h2>Each use case has workers, checks, and artifacts.</h2>
					</div>
					<p>
						Long-running work becomes easier to supervise when each workflow names the worker lanes, expected evidence, and project records that should survive the run.
					</p>
				</div>
				<div className="deep-use-grid">
					{deepUseCases.map(([title, lanes, artifacts]) => (
						<article key={title} className="deep-use-card">
							<h3>{title}</h3>
							<div>
								<strong>Worker lanes</strong>
								{lanes.map((lane) => (
									<span key={lane}>{lane}</span>
								))}
							</div>
							<div>
								<strong>Artifacts</strong>
								{artifacts.map((artifact) => (
									<span key={artifact}>{artifact}</span>
								))}
							</div>
						</article>
					))}
				</div>
			</section>
			<section className="section comparison-section">
				<div className="section-heading split-heading">
					<div>
						<p className="eyebrow">Why not just chat?</p>
						<h2>Models answer prompts. Stratum keeps project work supervised.</h2>
					</div>
					<p>
						Agent-first tools are becoming more capable; Stratum focuses on making long-running work inspectable, reviewable, and tied to the project.
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
			<section className="section differentiation-section">
				<div className="section-heading split-heading">
					<div>
						<p className="eyebrow">Category comparison</p>
						<h2>Where Stratum sits beside Antigravity 2.0 and Codex.</h2>
					</div>
					<p>
						This is not an integration matrix. It separates Stratum's project-bound manager/workers model from other agent-first command centers and coding agents.
					</p>
				</div>
				<div className="differentiation-table-wrap">
					<table className="differentiation-table">
						<thead>
							<tr>
								<th>Dimension</th>
								<th>Stratum</th>
								<th>Antigravity 2.0</th>
								<th>Codex</th>
							</tr>
						</thead>
						<tbody>
							{differentiationRows.map(([dimension, stratum, antigravity, codex]) => (
								<tr key={dimension}>
									<th scope="row">{dimension}</th>
									<td>{stratum}</td>
									<td>{antigravity}</td>
									<td>{codex}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</section>
		</>
	);
}

function ModelRoutingVisual() {
	return (
		<section className="section model-routing-section">
			<div className="section-heading split-heading">
				<div>
					<p className="eyebrow">Routing diagram</p>
					<h2>Use the right model for each lane in the run.</h2>
				</div>
				<p>
					Stratum can reserve stronger model capacity for planning and review while routing bounded worker tasks to local, hosted, or lower-cost OpenAI-compatible endpoints.
				</p>
			</div>
			<div className="model-routing-grid">
				{modelRoutingDiagram.map(([lane, model, body]) => (
					<article key={lane} className="model-routing-card">
						<strong>{lane}</strong>
						<span>{model}</span>
						<p>{body}</p>
					</article>
				))}
			</div>
		</section>
	);
}

function LocalModels() {
	return (
		<>
			<section className="page-section local-page">
				<div className="page-heading">
					<p className="eyebrow">Models & routing</p>
					<h1>Route manager and worker lanes across cloud, local, and compatible models.</h1>
					<p>Stratum can use different model choices for planning, worker execution, review, and quota management, including GPT/OpenAI, Claude/Anthropic where configured, custom OpenAI-compatible endpoints, and local runtimes.</p>
				</div>
				<div className="local-layout">
					<div className="terminal-card">
						<code>Manager: GPT / Claude / compatible cloud model</code>
						<code>Workers: local or lower-cost compatible endpoint</code>
						<code>OpenAI-compatible base URL: http://localhost:11434/v1</code>
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
			<ModelRoutingVisual />
		</>
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

function Documentation() {
	const [activeSection, setActiveSection] = React.useState(docsSections[0]?.id || "");
	const activeGroup =
		docsNavigation.find((group) => group.items.some(([, id]) => id === activeSection)) || docsNavigation[0];
	const activeGroupItems = activeGroup?.items || [];

	React.useEffect(() => {
		const elements = docsSections.map((section) => document.getElementById(section.id)).filter(Boolean);
		if (!elements.length) return undefined;

		let frame = 0;
		const updateActiveSection = () => {
			frame = 0;
			const offset = 128;
			let nextActive = elements[0]?.id || "";

			for (const element of elements) {
				if (element.getBoundingClientRect().top <= offset) {
					nextActive = element.id;
				} else {
					break;
				}
			}

			const nearBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
			if (nearBottom) nextActive = elements[elements.length - 1]?.id || nextActive;
			if (nextActive) setActiveSection(nextActive);
		};
		const requestUpdate = () => {
			if (frame) return;
			frame = window.requestAnimationFrame(updateActiveSection);
		};

		updateActiveSection();
		window.addEventListener("scroll", requestUpdate, { passive: true });
		window.addEventListener("resize", requestUpdate);
		window.addEventListener("hashchange", requestUpdate);
		return () => {
			if (frame) window.cancelAnimationFrame(frame);
			window.removeEventListener("scroll", requestUpdate);
			window.removeEventListener("resize", requestUpdate);
			window.removeEventListener("hashchange", requestUpdate);
		};
	}, []);

	React.useEffect(() => {
		const activeLink = document.querySelector(`.docs-sidebar a[href="/documentation#${activeSection}"]`);
		activeLink?.scrollIntoView({ block: "nearest" });
	}, [activeSection]);

	return (
		<section className="documentation-page">
			<aside className="docs-sidebar" aria-label="Documentation sections">
				<a href="/documentation" data-route className="docs-home">
					Home
				</a>
				{docsNavigation.map((group) => (
					<div key={group.title} className="docs-nav-group">
						<a
							href={`/documentation#${group.items[0]?.[1] || "overview"}`}
							data-route
							className={`docs-category-link ${activeGroup?.title === group.title ? "active" : ""}`}
						>
							{group.title}
						</a>
						{group.items.map(([label, id]) => (
							<a key={id} href={`/documentation#${id}`} data-route className={activeSection === id ? "active" : ""}>
								{label}
							</a>
						))}
					</div>
				))}
			</aside>
			<article className="docs-content">
				{docsSections.map((section) => (
					<section key={section.id} id={section.id} className="docs-section">
						<h1>{section.title}</h1>
						{section.body.map((paragraph) => (
							<p key={paragraph}>{paragraph}</p>
						))}
						{section.steps ? (
							<ol>
								{section.steps.map((step) => (
									<li key={step}>{step}</li>
								))}
							</ol>
						) : null}
						{section.code ? (
							<div className="docs-code-block">
								{section.code.map((line) => (
									<code key={line}>{line}</code>
								))}
							</div>
						) : null}
						{section.points ? (
							<ul>
								{section.points.map((point) => (
									<li key={point}>{point}</li>
								))}
							</ul>
						) : null}
					</section>
				))}
			</article>
			<aside className="docs-on-page" aria-label="On this page">
				<strong>{activeGroup?.title || "On this page"}</strong>
				{activeGroupItems.map(([label, id]) => (
					<a key={id} href={`/documentation#${id}`} data-route className={activeSection === id ? "active" : ""}>
						{label}
					</a>
				))}
			</aside>
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
					Models & routing
				</a>
				<a href="/documentation" data-route>
					Documentation
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
			<main onClick={navigate}>
				{route === "home" ? <Home onNavigate={navigate} /> : null}
				{route === "features" ? <Features /> : null}
				{route === "useCases" ? <UseCases /> : null}
				{route === "local" ? <LocalModels /> : null}
				{route === "documentation" ? <Documentation /> : null}
				{route === "download" ? <Download /> : null}
			</main>
			<Footer onNavigate={navigate} />
		</>
	);
}

createRoot(document.getElementById("root")).render(<App />);
