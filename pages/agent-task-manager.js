import { useState, useEffect, useRef } from "react";

// ─── Initial Data ────────────────────────────────────────────────────────────

const INITIAL_PROJECTS = [
	{
		id: "p1",
		name: "storefront.dev",
		color: "#3b82f6",
		emoji: "🛒",
		url: "https://storefront.dev",
		githubLink: "https://github.com/example/storefront",
		agents: [
			{
				id: "a1",
				name: "Atlas",
				model: "claude-opus",
				status: "busy",
				successRate: 94,
				uptime: "2h 14m",
				taskId: "TASK-004",
			},
			{
				id: "a2",
				name: "Forge",
				model: "claude-sonnet",
				status: "idle",
				successRate: 88,
				uptime: "5h 42m",
				taskId: null,
			},
		],
		tasks: {
			backlog: [
				{
					id: "TASK-001",
					title: "Fix CORS error on /api/auth/callback",
					priority: "low",
					tag: "bug",
					site: "storefront.dev",
					time: "2m ago",
					logs: [],
				},
				{
					id: "TASK-008",
					title: "404 on dynamic routes after deploy",
					priority: "medium",
					tag: "deploy",
					site: "storefront.dev",
					time: "8m ago",
					logs: [],
				},
			],
			running: [
				{
					id: "TASK-004",
					title: "Hydration mismatch on SSR page load",
					priority: "high",
					tag: "ssr",
					site: "storefront.dev",
					agent: "Atlas",
					time: "18m",
					progress: 62,
					logs: [
						"Analyzing server response...",
						"Diff detected in <Header>",
						"Patching hydration boundary...",
					],
				},
			],
			review: [
				{
					id: "TASK-003",
					title: "Memory leak in useEffect cleanup",
					priority: "medium",
					tag: "perf",
					site: "storefront.dev",
					agent: "Forge",
					time: "34m",
					logs: ["Fixed missing cleanup fn", "Verified with heap snapshot"],
				},
			],
			done: [
				{
					id: "TASK-005",
					title: "Rate limiter not resetting on new IP",
					priority: "medium",
					tag: "backend",
					site: "storefront.dev",
					agent: "Atlas",
					time: "3h 40m",
					logs: [],
				},
			],
		},
	},
	{
		id: "p2",
		name: "payments.io",
		color: "#10b981",
		emoji: "💳",
		url: "https://payments.io",
		githubLink: "https://github.com/example/payments",
		agents: [
			{
				id: "a3",
				name: "Raven",
				model: "gpt-4o",
				status: "busy",
				successRate: 91,
				uptime: "47m",
				taskId: "TASK-007",
			},
			{
				id: "a4",
				name: "Ember",
				model: "claude-sonnet",
				status: "error",
				successRate: 76,
				uptime: "3h 05m",
				taskId: null,
			},
		],
		tasks: {
			backlog: [
				{
					id: "TASK-009",
					title: "Refund webhook not triggering on partial",
					priority: "high",
					tag: "payments",
					site: "payments.io",
					time: "5m ago",
					logs: [],
				},
			],
			running: [
				{
					id: "TASK-007",
					title: "Stripe webhook returning 500 on prod",
					priority: "critical",
					tag: "payments",
					site: "payments.io",
					agent: "Raven",
					time: "5m",
					progress: 28,
					logs: [
						"Inspecting webhook handler...",
						"Found missing STRIPE_SECRET env var",
					],
				},
			],
			review: [],
			done: [
				{
					id: "TASK-002",
					title: "Login redirect loop after OAuth",
					priority: "high",
					tag: "auth",
					site: "payments.io",
					agent: "Ember",
					time: "2h 15m",
					logs: [],
				},
			],
		},
	},
];

const PRIORITY_CONFIG = {
	critical: { color: "#ef4444", bg: "rgba(239,68,68,0.1)", label: "CRIT" },
	high: { color: "#f97316", bg: "rgba(249,115,22,0.1)", label: "HIGH" },
	medium: { color: "#eab308", bg: "rgba(234,179,8,0.1)", label: "MED" },
	low: { color: "#22c55e", bg: "rgba(34,197,94,0.1)", label: "LOW" },
};

const TAG_COLORS = {
	bug: "#ef4444",
	deploy: "#a78bfa",
	ssr: "#60a5fa",
	payments: "#fbbf24",
	auth: "#f472b6",
	ci: "#34d399",
	perf: "#fb923c",
	backend: "#94a3b8",
	ui: "#e879f9",
};

const COLS = [
	{ id: "backlog", label: "Backlog" },
	{ id: "running", label: "Running" },
	{ id: "review", label: "Review" },
	{ id: "done", label: "Done" },
];

const MODELS = [
	"claude-opus",
	"claude-sonnet",
	"gpt-4o",
	"gemini-pro",
	"llama-3",
	"mistral",
];
const PRIORITIES = ["critical", "high", "medium", "low"];
const TAGS = [
	"bug",
	"deploy",
	"ssr",
	"payments",
	"auth",
	"ci",
	"perf",
	"backend",
	"ui",
];
const EMOJIS = ["🛒", "💳", "🚀", "⚡", "🔧", "🌐", "📱", "🎯", "🔐", "📦"];
const USER = { name: "Shrey", avatar: "S" };
const PROJECT_COLORS = [
	"#3b82f6",
	"#10b981",
	"#f59e0b",
	"#ef4444",
	"#8b5cf6",
	"#06b6d4",
	"#ec4899",
	"#84cc16",
];

let _taskCounter = 20;
let _agentCounter = 10;
const newTaskId = () => `TASK-0${++_taskCounter}`;
const newAgentId = () => `agt-${++_agentCounter}`;

// ─── Theme ───────────────────────────────────────────────────────────────────

function useTheme() {
	const [dark, setDark] = useState(true);
	const t = dark
		? {
				bg: "#0a0a0a",
				mainBg: "#000000",
				surface: "oklch(14.1% 0.005 285.823)",
				surfaceHover: "oklch(10.1% 0.005 285.823)",
				border: "rgba(255,255,255,0.08)",
				borderStrong: "rgba(255,255,255,0.14)",
				text: "#fafafa",
				textMid: "#a1a1aa",
				textDim: "#71717a",
				input: "oklch(14.1% 0.005 285.823)",
				inputBorder: "rgba(255,255,255,0.1)",
				colBg: "#18181b",
				badge: "rgba(255,255,255,0.06)",
				shadow: "0 2px 8px rgba(0,0,0,0.4)",
				logBg: "#09090b",
			}
		: {
				bg: "#f8fafc",
				mainBg: "#000000",
				surface: "#ffffff",
				surfaceHover: "#fbfbfb",
				border: "rgba(0,0,0,0.07)",
				borderStrong: "rgba(0,0,0,0.14)",
				text: "#0f172a",
				textMid: "#475569",
				textDim: "#94a3b8",
				input: "#f8fafc",
				inputBorder: "rgba(0,0,0,0.1)",
				colBg: "#fbfbfb",
				badge: "rgba(0,0,0,0.05)",
				shadow: "0 2px 8px rgba(0,0,0,0.08)",
				logBg: "#e2e8f0",
			};
	return { dark, setDark, t };
}

// ─── Small Components ────────────────────────────────────────────────────────

function PulsingDot({ color }) {
	return (
		<span
			style={{
				position: "relative",
				display: "inline-flex",
				width: 8,
				height: 8,
				flexShrink: 0,
			}}
		>
			<span
				style={{
					display: "block",
					width: 8,
					height: 8,
					borderRadius: "50%",
					background: color,
					position: "absolute",
				}}
			/>
			<span
				style={{
					display: "block",
					width: 8,
					height: 8,
					borderRadius: "50%",
					background: color,
					position: "absolute",
					opacity: 0.35,
					animation: "pulse 1.6s ease-out infinite",
				}}
			/>
		</span>
	);
}

function Modal({ open, onClose, title, children, t }) {
	if (!open) return null;
	return (
		<div
			onClick={onClose}
			style={{
				position: "fixed",
				inset: 0,
				background: "rgba(0,0,0,0.5)",
				zIndex: 200,
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				backdropFilter: "blur(3px)",
			}}
		>
			<div
				onClick={(e) => e.stopPropagation()}
				style={{
					background: t.surface,
					border: `1px solid ${t.border}`,
					borderRadius: 14,
					padding: 28,
					width: 440,
					maxHeight: "85vh",
					overflowY: "auto",
					boxShadow: t.shadow,
				}}
			>
				<div
					style={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
						marginBottom: 22,
					}}
				>
					<span style={{ fontWeight: 700, fontSize: 16, color: t.text }}>
						{title}
					</span>
					<button
						onClick={onClose}
						style={{
							background: "none",
							border: "none",
							color: t.textDim,
							fontSize: 18,
							cursor: "pointer",
							lineHeight: 1,
							padding: 4,
						}}
					>
						✕
					</button>
				</div>
				{children}
			</div>
		</div>
	);
}

function Field({ label, children, t }) {
	return (
		<div style={{ marginBottom: 16 }}>
			<div
				style={{
					fontSize: 11,
					fontWeight: 600,
					color: t.textMid,
					marginBottom: 6,
					textTransform: "uppercase",
					letterSpacing: 0.5,
				}}
			>
				{label}
			</div>
			{children}
		</div>
	);
}

function Input({ t, ...props }) {
	return (
		<input
			{...props}
			style={{
				width: "100%",
				background: t.input,
				border: `1px solid ${t.inputBorder}`,
				borderRadius: 8,
				padding: "9px 12px",
				color: t.text,
				fontSize: 13,
				outline: "none",
				fontFamily: "inherit",
				...(props.style || {}),
			}}
		/>
	);
}

function Textarea({ t, ...props }) {
	return (
		<textarea
			{...props}
			style={{
				width: "100%",
				background: t.input,
				border: `1px solid ${t.inputBorder}`,
				borderRadius: 8,
				padding: "9px 12px",
				color: t.text,
				fontSize: 13,
				outline: "none",
				fontFamily: "inherit",
				resize: "vertical",
				minHeight: 80,
				...(props.style || {}),
			}}
		/>
	);
}

function Select({ t, children, ...props }) {
	return (
		<select
			{...props}
			style={{
				width: "100%",
				background: t.input,
				border: `1px solid ${t.inputBorder}`,
				borderRadius: 8,
				padding: "9px 12px",
				color: t.text,
				fontSize: 13,
				outline: "none",
				cursor: "pointer",
				fontFamily: "inherit",
			}}
		>
			{children}
		</select>
	);
}

function Btn({ children, variant = "ghost", t, onClick, style = {} }) {
	const styles = {
		primary: { background: "#3b82f6", color: "#fff", border: "none" },
		ghost: {
			background: t.badge,
			color: t.textMid,
			border: `1px solid ${t.border}`,
		},
		danger: {
			background: "rgba(239,68,68,0.1)",
			color: "#ef4444",
			border: "1px solid rgba(239,68,68,0.2)",
		},
	};
	return (
		<button
			onClick={onClick}
			style={{
				...styles[variant],
				borderRadius: 8,
				padding: "8px 16px",
				fontSize: 13,
				fontWeight: 600,
				cursor: "pointer",
				fontFamily: "inherit",
				...style,
			}}
		>
			{children}
		</button>
	);
}

// ─── Task Card ────────────────────────────────────────────────────────────────

function TaskCard({ task, col, onMove, onClick, onDelete, t }) {
	const p = PRIORITY_CONFIG[task.priority];
	const tagColor = TAG_COLORS[task.tag] || "#888";
	const NEXT = { backlog: "running", running: "review", review: "done" };
	const PREV = { running: "backlog", review: "running", done: "review" };

	return (
		<div
			onClick={() => onClick(task)}
			style={{
				background: t.surface,
				border: `1px solid ${t.border}`,
				borderRadius: 10,
				padding: "13px 14px",
				cursor: "pointer",
				marginBottom: 8,
				transition: "all 0.15s",
				boxShadow: t.shadow,
			}}
			onMouseEnter={(e) => {
				e.currentTarget.style.borderColor = t.borderStrong;
				e.currentTarget.style.transform = "translateY(-1px)";
			}}
			onMouseLeave={(e) => {
				e.currentTarget.style.borderColor = t.border;
				e.currentTarget.style.transform = "translateY(0)";
			}}
		>
			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					marginBottom: 8,
				}}
			>
				<span style={{ color: t.textDim, fontSize: 10, fontWeight: 600 }}>
					{task.id}
				</span>
				<div style={{ display: "flex", alignItems: "center", gap: 4 }}>
					{onDelete && (
						<button
							onClick={(e) => {
								e.stopPropagation();
								if (typeof window !== "undefined" && window.confirm("Delete this task?")) onDelete(task.id);
							}}
							style={{
								background: "none",
								border: "none",
								color: t.textDim,
								fontSize: 10,
								cursor: "pointer",
								padding: 2,
								lineHeight: 1,
							}}
							title="Delete task"
						>
							🗑
						</button>
					)}
					<span
					style={{
						background: p.bg,
						color: p.color,
						fontSize: 9,
						fontWeight: 800,
						letterSpacing: 1,
						padding: "2px 6px",
						borderRadius: 4,
					}}
				>
					{p.label}
				</span>
				</div>
			</div>
			<div
				style={{
					color: t.text,
					fontSize: 13,
					fontWeight: 500,
					lineHeight: 1.45,
					marginBottom: 10,
				}}
			>
				{task.title}
			</div>
			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					marginBottom:
						task.progress !== undefined || task.logs?.length ? 10 : 0,
				}}
			>
				<div style={{ display: "flex", alignItems: "center", gap: 6 }}>
					<span
						style={{
							background: `${tagColor}18`,
							color: tagColor,
							fontSize: 10,
							padding: "2px 7px",
							borderRadius: 4,
							fontWeight: 600,
						}}
					>
						#{task.tag}
					</span>
					{task.agent && (
						<span style={{ color: t.textDim, fontSize: 10 }}>
							→ {task.agent}
						</span>
					)}
				</div>
				<span style={{ color: t.textDim, fontSize: 10 }}>{task.time}</span>
			</div>
			{task.progress !== undefined && (
				<div style={{ marginBottom: 8 }}>
					<div
						style={{
							display: "flex",
							justifyContent: "space-between",
							marginBottom: 4,
						}}
					>
						<span style={{ color: t.textDim, fontSize: 10 }}>progress</span>
						<span style={{ color: "#f97316", fontSize: 10, fontWeight: 600 }}>
							{task.progress}%
						</span>
					</div>
					<div style={{ height: 3, background: t.badge, borderRadius: 2 }}>
						<div
							style={{
								height: "100%",
								width: `${task.progress}%`,
								background: "linear-gradient(90deg, #3b82f6, #8b5cf6)",
								borderRadius: 2,
								transition: "width 0.6s",
							}}
						/>
					</div>
				</div>
			)}
			{task.logs?.length > 0 && (
				<div
					style={{
						background: t.logBg,
						borderRadius: 6,
						padding: "6px 9px",
						marginBottom: 8,
					}}
				>
					<span style={{ color: "#22c55e", fontSize: 10 }}>
						▸ {task.logs[task.logs.length - 1]}
					</span>
				</div>
			)}
			<div style={{ display: "flex", gap: 6 }}>
				{col !== "backlog" && (
					<button
						onClick={(e) => {
							e.stopPropagation();
							onMove(task.id, col, "prev");
						}}
						style={{
							background: "none",
							border: `1px solid ${t.border}`,
							color: t.textDim,
							fontSize: 10,
							padding: "3px 8px",
							borderRadius: 4,
							cursor: "pointer",
						}}
					>
						← back
					</button>
				)}
				{col !== "done" && (
					<button
						onClick={(e) => {
							e.stopPropagation();
							onMove(task.id, col, "next");
						}}
						style={{
							background: "none",
							border: `1px solid ${t.border}`,
							color: t.textDim,
							fontSize: 10,
							padding: "3px 8px",
							borderRadius: 4,
							cursor: "pointer",
						}}
					>
						{col === "backlog"
							? "→ run"
							: col === "running"
								? "→ review"
								: "→ done"}
					</button>
				)}
			</div>
		</div>
	);
}

// ─── Agent Pill ───────────────────────────────────────────────────────────────

function AgentRow({ agent, t, projectColor }) {
	const statusColor = { busy: "#f59e0b", idle: "#22c55e", error: "#ef4444" }[
		agent.status
	];
	return (
		<div
			style={{
				display: "flex",
				alignItems: "center",
				gap: 10,
				padding: "8px 10px",
				borderRadius: 8,
				background: t.surfaceHover,
				marginBottom: 4,
			}}
		>
			<div
				style={{
					width: 30,
					height: 30,
					borderRadius: "50%",
					background: `conic-gradient(${projectColor} ${agent.successRate}%, ${t.badge} 0)`,
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					flexShrink: 0,
				}}
			>
				<div
					style={{
						width: 22,
						height: 22,
						borderRadius: "50%",
						background: t.surface,
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<span style={{ fontSize: 9, fontWeight: 800, color: t.text }}>
						{agent.name[0]}
					</span>
				</div>
			</div>
			<div style={{ flex: 1, minWidth: 0 }}>
				<div style={{ display: "flex", alignItems: "center", gap: 5 }}>
					<span style={{ fontSize: 12, fontWeight: 600, color: t.text }}>
						{agent.name}
					</span>
					<PulsingDot color={statusColor} />
				</div>
				<div style={{ fontSize: 10, color: t.textDim }}>{agent.model}</div>
			</div>
			<span
				style={{
					fontSize: 10,
					color: statusColor,
					fontWeight: 700,
					textTransform: "uppercase",
				}}
			>
				{agent.status}
			</span>
		</div>
	);
}

// ─── Main App ─────────────────────────────────────────────────────────────────

export default function AgentOS() {
	const { dark, setDark, t } = useTheme();
	const [projects, setProjects] = useState(INITIAL_PROJECTS);
	const [activeProjectId, setActiveProjectId] = useState("p1");
	const [expandedProjects, setExpandedProjects] = useState(["p1"]);
	const [selectedTask, setSelectedTask] = useState(null);
	const [tick, setTick] = useState(0);

	// Modals
	const [showNewProject, setShowNewProject] = useState(false);
	const [showNewAgent, setShowNewAgent] = useState(false);
	const [showNewTask, setShowNewTask] = useState(false);
	const [showEditProject, setShowEditProject] = useState(false);
	const [editingProjectId, setEditingProjectId] = useState(null);
	const [showDeleteProjectConfirm, setShowDeleteProjectConfirm] = useState(false);
	const [projectToDelete, setProjectToDelete] = useState(null);

	// Forms
	const [newProject, setNewProject] = useState({
		name: "",
		emoji: "🚀",
		color: "#3b82f6",
		url: "",
		githubLink: "",
	});
	const [newAgent, setNewAgent] = useState({
		name: "",
		model: "claude-sonnet",
	});
	const [newTask, setNewTask] = useState({
		title: "",
		priority: "medium",
		tag: "bug",
		site: "",
		instructions: "",
	});
	const [editProjectData, setEditProjectData] = useState({
		name: "",
		emoji: "🚀",
		color: "#3b82f6",
		url: "",
		githubLink: "",
	});
	const [editTaskTitle, setEditTaskTitle] = useState("");
	const [editTaskInstructions, setEditTaskInstructions] = useState("");

	const activeProject = projects.find((p) => p.id === activeProjectId);

	useEffect(() => {
		if (selectedTask) {
			setEditTaskTitle(selectedTask.title);
			setEditTaskInstructions(selectedTask.instructions || "");
		}
	}, [selectedTask?.id]);

	// Tick progress
	useEffect(() => {
		const interval = setInterval(() => setTick((x) => x + 1), 2500);
		return () => clearInterval(interval);
	}, []);

	useEffect(() => {
		setProjects((prev) =>
			prev.map((proj) => ({
				...proj,
				tasks: {
					...proj.tasks,
					running: proj.tasks.running.map((t) => ({
						...t,
						progress:
							t.progress !== undefined
								? Math.min(99, t.progress + Math.floor(Math.random() * 2 + 1))
								: undefined,
					})),
				},
			})),
		);
	}, [tick]);

	const NEXT_COL = { backlog: "running", running: "review", review: "done" };
	const PREV_COL = { running: "backlog", review: "running", done: "review" };

	const moveTask = (taskId, fromCol, dir) => {
		const toCol = dir === "next" ? NEXT_COL[fromCol] : PREV_COL[fromCol];
		if (!toCol) return;
		setProjects((prev) =>
			prev.map((proj) => {
				if (proj.id !== activeProjectId) return proj;
				const task = proj.tasks[fromCol].find((t) => t.id === taskId);
				const idleAgent = proj.agents.find((a) => a.status === "idle");
				return {
					...proj,
					tasks: {
						...proj.tasks,
						[fromCol]: proj.tasks[fromCol].filter((t) => t.id !== taskId),
						[toCol]: [
							...(dir === "next" ? proj.tasks[toCol] : []),
							{
								...task,
								agent:
									fromCol === "backlog" && dir === "next"
										? idleAgent?.name || "Auto"
										: task.agent,
								progress:
									fromCol === "backlog" && dir === "next" ? 0 : undefined,
							},
							...(dir === "next" ? [] : proj.tasks[toCol]),
						],
					},
				};
			}),
		);
	};

	const addProject = () => {
		if (!newProject.name.trim()) return;
		const p = {
			id: `p${Date.now()}`,
			name: newProject.name.trim(),
			color: newProject.color,
			emoji: newProject.emoji,
			url: newProject.url?.trim() || "",
			githubLink: newProject.githubLink?.trim() || "",
			agents: [],
			tasks: { backlog: [], running: [], review: [], done: [] },
		};
		setProjects((prev) => [...prev, p]);
		setActiveProjectId(p.id);
		setExpandedProjects((prev) => [...prev, p.id]);
		setNewProject({ name: "", emoji: "🚀", color: "#3b82f6", url: "", githubLink: "" });
		setShowNewProject(false);
	};

	const addAgent = () => {
		if (!newAgent.name.trim()) return;
		const agent = {
			id: newAgentId(),
			name: newAgent.name.trim(),
			model: newAgent.model,
			status: "idle",
			successRate: 85,
			uptime: "0m",
			taskId: null,
		};
		setProjects((prev) =>
			prev.map((p) =>
				p.id === activeProjectId ? { ...p, agents: [...p.agents, agent] } : p,
			),
		);
		setNewAgent({ name: "", model: "claude-sonnet" });
		setShowNewAgent(false);
	};

	const addTask = () => {
		if (!newTask.title.trim()) return;
		const task = {
			id: newTaskId(),
			title: newTask.title.trim(),
			priority: newTask.priority,
			tag: newTask.tag,
			site: newTask.site || activeProject?.name || "your-site.dev",
			instructions: newTask.instructions?.trim() || "",
			time: "just now",
			logs: [],
		};
		setProjects((prev) =>
			prev.map((p) =>
				p.id === activeProjectId
					? { ...p, tasks: { ...p.tasks, backlog: [task, ...p.tasks.backlog] } }
					: p,
			),
		);
		setNewTask({ title: "", priority: "medium", tag: "bug", site: "", instructions: "" });
		setShowNewTask(false);
	};

	const toggleExpand = (id) =>
		setExpandedProjects((prev) =>
			prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
		);

	const openEditProject = (proj) => {
		setEditingProjectId(proj.id);
		setEditProjectData({
			name: proj.name,
			emoji: proj.emoji,
			color: proj.color,
			url: proj.url || "",
			githubLink: proj.githubLink || "",
		});
		setShowEditProject(true);
	};

	const updateProject = () => {
		if (!editProjectData.name.trim() || !editingProjectId) return;
		setProjects((prev) =>
			prev.map((p) =>
				p.id === editingProjectId
					? {
							...p,
							name: editProjectData.name.trim(),
							emoji: editProjectData.emoji,
							color: editProjectData.color,
							url: editProjectData.url?.trim() || "",
							githubLink: editProjectData.githubLink?.trim() || "",
						}
					: p,
			),
		);
		setShowEditProject(false);
		setEditingProjectId(null);
	};

	const confirmDeleteProject = (proj) => {
		setProjectToDelete(proj);
		setShowDeleteProjectConfirm(true);
	};

	const deleteProject = () => {
		if (!projectToDelete) return;
		setProjects((prev) => prev.filter((p) => p.id !== projectToDelete.id));
		if (activeProjectId === projectToDelete.id) {
			const remaining = projects.filter((p) => p.id !== projectToDelete.id);
			setActiveProjectId(remaining[0]?.id || null);
			setExpandedProjects((prev) => prev.filter((x) => x !== projectToDelete.id));
		}
		setShowDeleteProjectConfirm(false);
		setProjectToDelete(null);
	};

	const updateTask = () => {
		if (!selectedTask || !editTaskTitle.trim()) return;
		const taskId = selectedTask.id;
		const updates = { title: editTaskTitle.trim(), instructions: editTaskInstructions?.trim() || "" };
		setProjects((prev) =>
			prev.map((proj) => ({
				...proj,
				tasks: Object.fromEntries(
					Object.entries(proj.tasks).map(([col, tasks]) => [
						col,
						tasks.map((t) =>
							t.id === taskId ? { ...t, ...updates } : t,
						),
					]),
				),
			})),
		);
		setSelectedTask((t) => (t?.id === taskId ? { ...t, ...updates } : t));
		setEditTaskTitle("");
		setEditTaskInstructions("");
	};

	const deleteTask = (taskId) => {
		const id = taskId || selectedTask?.id;
		if (!id) return;
		setProjects((prev) =>
			prev.map((proj) => ({
				...proj,
				tasks: Object.fromEntries(
					Object.entries(proj.tasks).map(([col, tasks]) => [
						col,
						tasks.filter((t) => t.id !== id),
					]),
				),
			})),
		);
		setSelectedTask(null);
		setEditTaskTitle("");
		setEditTaskInstructions("");
	};

	const totalTasks = activeProject
		? Object.values(activeProject.tasks).flat().length
		: 0;
	const runningCount = activeProject?.tasks.running.length || 0;
	const busyAgents =
		activeProject?.agents.filter((a) => a.status === "busy").length || 0;

	return (
		<div
			className="agent-os"
			style={{
				minHeight: "100vh",
				background: t.bg,
				color: t.text,
				display: "flex",
				flexDirection: "column",
				fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
			}}
		>
			<style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; -webkit-font-smoothing: antialiased; }
        .agent-os { font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(128,128,128,0.2); border-radius: 2px; }
        @keyframes pulse { 0% { transform: scale(1); opacity: 0.35; } 100% { transform: scale(2.8); opacity: 0; } }
        @keyframes spin { to { transform: rotate(360deg); } }
        select option { background: #27272a; }
        @media (max-width: 768px) {
          .agent-sidebar { width: 100% !important; max-width: 100% !important; flex-shrink: 0 !important; }
          .agent-main { flex-direction: column !important; }
          .agent-kanban-cols { flex-direction: column !important; overflow-x: visible !important; min-height: 0 !important; }
          .agent-kanban-col { min-width: 100% !important; flex: 1 1 auto !important; }
          .agent-topbar-stats { display: none !important; }
          .agent-topbar { padding: 0 12px !important; flex-wrap: wrap !important; }
        }
      `}</style>

			{/* ── Top Bar ── */}
			<div
				className="agent-topbar"
				style={{
					height: 56,
					borderBottom: `1px solid ${t.border}`,
					padding: "0 20px",
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					background: t.surface,
					flexShrink: 0,
				}}
			>
				<div style={{ display: "flex", alignItems: "center", gap: 10 }}>
					<div
						style={{
							width: 28,
							height: 28,
							background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
							borderRadius: 7,
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							fontSize: 14,
						}}
					>
						⚡
					</div>
					<span style={{ fontWeight: 800, fontSize: 16, letterSpacing: -0.3 }}>
						AgentOS
					</span>
					<span style={{ color: t.textDim, fontSize: 12 }}>
						/ {activeProject?.name || "—"}
					</span>
				</div>
				<div className="agent-topbar-stats" style={{ display: "flex", alignItems: "center", gap: 20 }}>
					{[
						{ label: "tasks", value: totalTasks },
						{ label: "running", value: runningCount, color: "#3b82f6" },
						{
							label: "agents on",
							value: `${busyAgents}/${activeProject?.agents.length || 0}`,
							color: "#22c55e",
						},
					].map(({ label, value, color }) => (
						<div key={label} style={{ textAlign: "center" }}>
							<div
								style={{
									fontWeight: 800,
									fontSize: 16,
									color: color || t.text,
								}}
							>
								{value}
							</div>
							<div style={{ fontSize: 10, color: t.textDim, fontWeight: 500 }}>
								{label}
							</div>
						</div>
					))}
					<button
						onClick={() => setDark((d) => !d)}
						style={{
							background: t.badge,
							border: `1px solid ${t.border}`,
							borderRadius: 8,
							padding: "6px 12px",
							cursor: "pointer",
							fontSize: 13,
							color: t.textMid,
						}}
					>
						{dark ? "☀ Light" : "☾ Dark"}
					</button>
				</div>
			</div>

			<div className="agent-main" style={{ display: "flex", flex: 1, overflow: "hidden" }}>
				{/* ── Sidebar ── */}
				<div
					className="agent-sidebar"
					style={{
						width: 230,
						borderRight: `1px solid ${t.border}`,
						background: t.surface,
						display: "flex",
						flexDirection: "column",
						flexShrink: 0,
						overflow: "hidden",
					}}
				>
					<div style={{ padding: "14px 14px 6px", flex: 1, overflowY: "auto" }}>
						<div
							style={{
								display: "flex",
								alignItems: "center",
								justifyContent: "space-between",
								marginBottom: 10,
							}}
						>
							<span
								style={{
									fontSize: 11,
									fontWeight: 700,
									color: t.textDim,
									textTransform: "uppercase",
									letterSpacing: 0.8,
								}}
							>
								Projects
							</span>
							<button
								onClick={() => setShowNewProject(true)}
								style={{
									background: "none",
									border: `1px solid ${t.border}`,
									color: t.textMid,
									fontSize: 16,
									width: 22,
									height: 22,
									borderRadius: 5,
									cursor: "pointer",
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									lineHeight: 1,
								}}
							>
								+
							</button>
						</div>

						{projects.map((proj) => {
							const isActive = proj.id === activeProjectId;
							const isExpanded = expandedProjects.includes(proj.id);
							const projTaskCount = Object.values(proj.tasks).flat().length;
							return (
								<div key={proj.id}>
									<div
										onClick={() => {
											setActiveProjectId(proj.id);
											toggleExpand(proj.id);
										}}
										style={{
											display: "flex",
											alignItems: "center",
											gap: 8,
											padding: "8px 10px",
											borderRadius: 8,
											cursor: "pointer",
											marginBottom: 2,
											background: isActive ? `${proj.color}18` : "transparent",
											border: `1px solid ${isActive ? `${proj.color}30` : "transparent"}`,
											transition: "all 0.15s",
										}}
										onMouseEnter={(e) =>
											!isActive &&
											(e.currentTarget.style.background = t.surfaceHover)
										}
										onMouseLeave={(e) =>
											!isActive &&
											(e.currentTarget.style.background = "transparent")
										}
									>
										<span style={{ fontSize: 14 }}>{proj.emoji}</span>
										<div style={{ flex: 1, minWidth: 0 }}>
											<div
												style={{
													fontSize: 13,
													fontWeight: 600,
													color: isActive ? proj.color : t.text,
													overflow: "hidden",
													textOverflow: "ellipsis",
													whiteSpace: "nowrap",
												}}
											>
												{proj.name}
											</div>
											<div style={{ fontSize: 10, color: t.textDim }}>
												{proj.agents.length} agents · {projTaskCount} tasks
											</div>
										</div>
										<div style={{ display: "flex", gap: 4, alignItems: "center" }}>
											<button
												onClick={(e) => {
													e.stopPropagation();
													openEditProject(proj);
												}}
												style={{
													background: "none",
													border: "none",
													color: t.textDim,
													fontSize: 11,
													cursor: "pointer",
													padding: 2,
													lineHeight: 1,
												}}
												title="Edit project"
											>
												✎
											</button>
											<button
												onClick={(e) => {
													e.stopPropagation();
													confirmDeleteProject(proj);
												}}
												style={{
													background: "none",
													border: "none",
													color: t.textDim,
													fontSize: 11,
													cursor: "pointer",
													padding: 2,
													lineHeight: 1,
												}}
												title="Delete project"
											>
												🗑
											</button>
											<span
												style={{
													fontSize: 9,
													color: t.textDim,
													transform: isExpanded ? "rotate(90deg)" : "none",
													transition: "transform 0.15s",
												}}
											>
												▶
											</span>
										</div>
									</div>

									{isExpanded && isActive && (
										<div
											style={{
												marginLeft: 10,
												marginBottom: 8,
												paddingLeft: 10,
												borderLeft: `2px solid ${proj.color}30`,
											}}
										>
											<div
												style={{
													fontSize: 10,
													fontWeight: 700,
													color: t.textDim,
													textTransform: "uppercase",
													letterSpacing: 0.5,
													padding: "6px 0 4px",
												}}
											>
												Agents
											</div>
											{proj.agents.length === 0 && (
												<div
													style={{
														fontSize: 10,
														color: t.textDim,
														padding: "4px 0",
													}}
												>
													No agents yet
												</div>
											)}
											{proj.agents.map((a) => (
												<AgentRow
													key={a.id}
													agent={a}
													t={t}
													projectColor={proj.color}
												/>
											))}
											<button
												onClick={() => setShowNewAgent(true)}
												style={{
													width: "100%",
													marginTop: 6,
													background: "none",
													border: `1px dashed ${t.border}`,
													borderRadius: 7,
													padding: "5px 0",
													color: t.textDim,
													fontSize: 11,
													cursor: "pointer",
													fontWeight: 600,
												}}
											>
												+ add agent
											</button>
										</div>
									)}
								</div>
							);
						})}
					</div>
					{/* ── User section ── */}
					<div
						style={{
							padding: "12px 14px",
							borderTop: `1px solid ${t.border}`,
							display: "flex",
							alignItems: "center",
							gap: 10,
							background: t.surfaceHover,
							flexShrink: 0,
						}}
					>
						<div
							style={{
								width: 36,
								height: 36,
								borderRadius: "50%",
								background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								fontSize: 14,
								fontWeight: 700,
								color: "#fff",
								flexShrink: 0,
							}}
						>
							{USER.avatar}
						</div>
						<div style={{ flex: 1, minWidth: 0 }}>
							<div
								style={{
									fontSize: 13,
									fontWeight: 600,
									color: t.text,
									overflow: "hidden",
									textOverflow: "ellipsis",
									whiteSpace: "nowrap",
								}}
							>
								{USER.name}
							</div>
							<div style={{ fontSize: 10, color: t.textDim }}>AgentOS</div>
						</div>
					</div>
				</div>

				{/* ── Kanban ── */}
				<div
					style={{
						flex: 1,
						overflow: "auto",
						padding: 20,
						display: "flex",
						flexDirection: "column",
					}}
				>
					{activeProject ? (
						<>
							<div
								style={{
									display: "flex",
									alignItems: "center",
									justifyContent: "space-between",
									marginBottom: 18,
									flexShrink: 0,
								}}
							>
								<div style={{ display: "flex", alignItems: "center", gap: 10 }}>
									<span style={{ fontSize: 20 }}>{activeProject.emoji}</span>
									<div>
										<div style={{ fontWeight: 800, fontSize: 17 }}>
											{activeProject.name}
										</div>
										<div style={{ fontSize: 12, color: t.textDim }}>
											{activeProject.agents.length} agents · {totalTasks} tasks
										</div>
									</div>
								</div>
								<Btn
									variant="primary"
									t={t}
									onClick={() => setShowNewTask(true)}
								>
									+ New Task
								</Btn>
							</div>

							<div className="agent-kanban-cols" style={{ display: "flex", gap: 14, flex: 1, overflowX: "auto" }}>
								{COLS.map((col) => {
									const colTasks = activeProject.tasks[col.id];
									return (
										<div
											key={col.id}
											className="agent-kanban-col"
											style={{
												minWidth: 270,
												flex: "1 0 270px",
												display: "flex",
												flexDirection: "column",
											}}
										>
											<div
												style={{
													display: "flex",
													alignItems: "center",
													justifyContent: "space-between",
													marginBottom: 12,
												}}
											>
												<div
													style={{
														display: "flex",
														alignItems: "center",
														gap: 7,
													}}
												>
													{col.id === "running" && (
														<span
															style={{
																display: "inline-block",
																animation: "spin 3s linear infinite",
																fontSize: 12,
																color: "#3b82f6",
															}}
														>
															◌
														</span>
													)}
													{col.id === "done" && (
														<span style={{ fontSize: 12, color: "#22c55e" }}>
															✓
														</span>
													)}
													<span style={{ fontWeight: 700, fontSize: 13 }}>
														{col.label}
													</span>
												</div>
												<span
													style={{
														background: t.badge,
														color: t.textDim,
														fontSize: 10,
														fontWeight: 700,
														padding: "2px 7px",
														borderRadius: 20,
													}}
												>
													{colTasks.length}
												</span>
											</div>
											<div style={{ flex: 1, overflowY: "auto" }}>
												{colTasks.map((task) => (
													<TaskCard
														key={task.id}
														task={task}
														col={col.id}
														onMove={moveTask}
														onClick={setSelectedTask}
														onDelete={deleteTask}
														t={t}
													/>
												))}
												{colTasks.length === 0 && (
													<div
														style={{
															border: `1px dashed ${t.border}`,
															borderRadius: 10,
															padding: "24px 16px",
															textAlign: "center",
															color: t.textDim,
															fontSize: 12,
														}}
													>
														empty
													</div>
												)}
											</div>
										</div>
									);
								})}
							</div>
						</>
					) : (
						<div
							style={{
								flex: 1,
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								color: t.textDim,
							}}
						>
							Select a project to get started
						</div>
					)}
				</div>
			</div>

			{/* ── Task Detail Modal ── */}
			<Modal
				open={!!selectedTask}
				onClose={() => { setSelectedTask(null); setEditTaskTitle(""); setEditTaskInstructions(""); }}
				title={selectedTask?.id || ""}
				t={t}
			>
				{selectedTask && (
					<>
						<Field label="Title" t={t}>
							<Input
								t={t}
								value={editTaskTitle}
								onChange={(e) => setEditTaskTitle(e.target.value)}
								placeholder="Task title..."
							/>
						</Field>
						<div
							style={{
								display: "flex",
								gap: 6,
								marginBottom: 16,
								flexWrap: "wrap",
							}}
						>
							<span
								style={{
									background: PRIORITY_CONFIG[selectedTask.priority].bg,
									color: PRIORITY_CONFIG[selectedTask.priority].color,
									fontSize: 10,
									fontWeight: 800,
									padding: "3px 8px",
									borderRadius: 4,
								}}
							>
								{selectedTask.priority.toUpperCase()}
							</span>
							<span
								style={{
									background: `${TAG_COLORS[selectedTask.tag] || "#888"}18`,
									color: TAG_COLORS[selectedTask.tag] || "#888",
									fontSize: 10,
									padding: "3px 8px",
									borderRadius: 4,
								}}
							>
								#{selectedTask.tag}
							</span>
							{selectedTask.agent && (
								<span
									style={{
										background: t.badge,
										color: t.textMid,
										fontSize: 10,
										padding: "3px 8px",
										borderRadius: 4,
									}}
								>
									agent: {selectedTask.agent}
								</span>
							)}
						</div>
						<div
							style={{
								fontSize: 11,
								fontWeight: 700,
								color: t.textDim,
								textTransform: "uppercase",
								letterSpacing: 0.5,
								marginBottom: 6,
							}}
						>
							Site
						</div>
						<div
							style={{
								background: t.logBg,
								borderRadius: 7,
								padding: "8px 12px",
								fontSize: 12,
								color: "#3b82f6",
								marginBottom: 16,
							}}
						>
							{selectedTask.site}
						</div>
						<Field label="Instructions for agent" t={t}>
							<Textarea
								t={t}
								value={editTaskInstructions}
								onChange={(e) => setEditTaskInstructions(e.target.value)}
								placeholder="Detailed instructions for the agent to perform this task..."
							/>
						</Field>
						{selectedTask.logs?.length > 0 && (
							<>
								<div
									style={{
										fontSize: 11,
										fontWeight: 700,
										color: t.textDim,
										textTransform: "uppercase",
										letterSpacing: 0.5,
										marginBottom: 6,
									}}
								>
									Agent Logs
								</div>
								<div
									style={{
										background: t.logBg,
										borderRadius: 8,
										padding: "12px 14px",
									}}
								>
									{selectedTask.logs.map((l, i) => (
										<div
											key={i}
											style={{
												color: "#22c55e",
												fontSize: 11,
												marginBottom: 4,
											}}
										>
											▸ {l}
										</div>
									))}
								</div>
							</>
						)}
						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
								gap: 8,
								marginTop: 20,
								paddingTop: 16,
								borderTop: `1px solid ${t.border}`,
							}}
						>
							<Btn variant="danger" t={t} onClick={() => deleteTask()}>
								Delete Task
							</Btn>
							<div style={{ display: "flex", gap: 8 }}>
								<Btn t={t} onClick={() => setSelectedTask(null)}>
									Cancel
								</Btn>
								<Btn variant="primary" t={t} onClick={updateTask}>
									Save
								</Btn>
							</div>
						</div>
					</>
				)}
			</Modal>

			{/* ── New Project Modal ── */}
			<Modal
				open={showNewProject}
				onClose={() => setShowNewProject(false)}
				title="New Project"
				t={t}
			>
				<Field label="Project Name" t={t}>
					<Input
						t={t}
						value={newProject.name}
						onChange={(e) =>
							setNewProject((p) => ({ ...p, name: e.target.value }))
						}
						placeholder="my-saas.dev"
					/>
				</Field>
				<Field label="URL (optional)" t={t}>
					<Input
						t={t}
						value={newProject.url}
						onChange={(e) =>
							setNewProject((p) => ({ ...p, url: e.target.value }))
						}
						placeholder="https://my-saas.dev"
					/>
				</Field>
				<Field label="GitHub Link (optional)" t={t}>
					<Input
						t={t}
						value={newProject.githubLink}
						onChange={(e) =>
							setNewProject((p) => ({ ...p, githubLink: e.target.value }))
						}
						placeholder="https://github.com/user/repo"
					/>
				</Field>
				<Field label="Emoji" t={t}>
					<div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
						{EMOJIS.map((em) => (
							<button
								key={em}
								onClick={() => setNewProject((p) => ({ ...p, emoji: em }))}
								style={{
									width: 36,
									height: 36,
									fontSize: 18,
									cursor: "pointer",
									borderRadius: 7,
									background:
										newProject.emoji === em ? `${newProject.color}20` : t.badge,
									border: `2px solid ${newProject.emoji === em ? newProject.color : "transparent"}`,
								}}
							>
								{em}
							</button>
						))}
					</div>
				</Field>
				<Field label="Color" t={t}>
					<div style={{ display: "flex", gap: 6 }}>
						{PROJECT_COLORS.map((c) => (
							<button
								key={c}
								onClick={() => setNewProject((p) => ({ ...p, color: c }))}
								style={{
									width: 28,
									height: 28,
									borderRadius: "50%",
									background: c,
									cursor: "pointer",
									border: `3px solid ${newProject.color === c ? t.text : "transparent"}`,
								}}
							/>
						))}
					</div>
				</Field>
				<div
					style={{
						display: "flex",
						justifyContent: "flex-end",
						gap: 8,
						marginTop: 8,
					}}
				>
					<Btn t={t} onClick={() => setShowNewProject(false)}>
						Cancel
					</Btn>
					<Btn variant="primary" t={t} onClick={addProject}>
						Create Project
					</Btn>
				</div>
			</Modal>

			{/* ── Edit Project Modal ── */}
			<Modal
				open={showEditProject}
				onClose={() => { setShowEditProject(false); setEditingProjectId(null); }}
				title="Edit Project"
				t={t}
			>
				<Field label="Project Name" t={t}>
					<Input
						t={t}
						value={editProjectData.name}
						onChange={(e) =>
							setEditProjectData((p) => ({ ...p, name: e.target.value }))
						}
						placeholder="my-saas.dev"
					/>
				</Field>
				<Field label="URL (optional)" t={t}>
					<Input
						t={t}
						value={editProjectData.url}
						onChange={(e) =>
							setEditProjectData((p) => ({ ...p, url: e.target.value }))
						}
						placeholder="https://my-saas.dev"
					/>
				</Field>
				<Field label="GitHub Link (optional)" t={t}>
					<Input
						t={t}
						value={editProjectData.githubLink}
						onChange={(e) =>
							setEditProjectData((p) => ({ ...p, githubLink: e.target.value }))
						}
						placeholder="https://github.com/user/repo"
					/>
				</Field>
				<Field label="Emoji" t={t}>
					<div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
						{EMOJIS.map((em) => (
							<button
								key={em}
								onClick={() => setEditProjectData((p) => ({ ...p, emoji: em }))}
								style={{
									width: 36,
									height: 36,
									fontSize: 18,
									cursor: "pointer",
									borderRadius: 7,
									background:
										editProjectData.emoji === em ? `${editProjectData.color}20` : t.badge,
									border: `2px solid ${editProjectData.emoji === em ? editProjectData.color : "transparent"}`,
								}}
							>
								{em}
							</button>
						))}
					</div>
				</Field>
				<Field label="Color" t={t}>
					<div style={{ display: "flex", gap: 6 }}>
						{PROJECT_COLORS.map((c) => (
							<button
								key={c}
								onClick={() => setEditProjectData((p) => ({ ...p, color: c }))}
								style={{
									width: 28,
									height: 28,
									borderRadius: "50%",
									background: c,
									cursor: "pointer",
									border: `3px solid ${editProjectData.color === c ? t.text : "transparent"}`,
								}}
							/>
						))}
					</div>
				</Field>
				<div
					style={{
						display: "flex",
						justifyContent: "flex-end",
						gap: 8,
						marginTop: 8,
					}}
				>
					<Btn t={t} onClick={() => { setShowEditProject(false); setEditingProjectId(null); }}>
						Cancel
					</Btn>
					<Btn variant="primary" t={t} onClick={updateProject}>
						Save
					</Btn>
				</div>
			</Modal>

			{/* ── Delete Project Confirm ── */}
			<Modal
				open={showDeleteProjectConfirm}
				onClose={() => { setShowDeleteProjectConfirm(false); setProjectToDelete(null); }}
				title="Delete Project?"
				t={t}
			>
				{projectToDelete && (
					<>
						<div style={{ marginBottom: 20, color: t.text, fontSize: 14, lineHeight: 1.5 }}>
							Are you sure you want to delete <strong>{projectToDelete.name}</strong>? This will remove all agents and tasks.
						</div>
						<div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
							<Btn t={t} onClick={() => { setShowDeleteProjectConfirm(false); setProjectToDelete(null); }}>
								Cancel
							</Btn>
							<Btn variant="danger" t={t} onClick={deleteProject}>
								Delete
							</Btn>
						</div>
					</>
				)}
			</Modal>

			{/* ── New Agent Modal ── */}
			<Modal
				open={showNewAgent}
				onClose={() => setShowNewAgent(false)}
				title={`Add Agent to ${activeProject?.name}`}
				t={t}
			>
				<Field label="Agent Name" t={t}>
					<Input
						t={t}
						value={newAgent.name}
						onChange={(e) =>
							setNewAgent((a) => ({ ...a, name: e.target.value }))
						}
						placeholder="e.g. Sigma, Flux, Nova..."
					/>
				</Field>
				<Field label="Model" t={t}>
					<Select
						t={t}
						value={newAgent.model}
						onChange={(e) =>
							setNewAgent((a) => ({ ...a, model: e.target.value }))
						}
					>
						{MODELS.map((m) => (
							<option key={m} value={m}>
								{m}
							</option>
						))}
					</Select>
				</Field>
				<div
					style={{
						display: "flex",
						justifyContent: "flex-end",
						gap: 8,
						marginTop: 8,
					}}
				>
					<Btn t={t} onClick={() => setShowNewAgent(false)}>
						Cancel
					</Btn>
					<Btn variant="primary" t={t} onClick={addAgent}>
						Add Agent
					</Btn>
				</div>
			</Modal>

			{/* ── New Task Modal ── */}
			<Modal
				open={showNewTask}
				onClose={() => setShowNewTask(false)}
				title={`New Task — ${activeProject?.name}`}
				t={t}
			>
				<Field label="Task Description" t={t}>
					<Input
						t={t}
						value={newTask.title}
						onChange={(e) =>
							setNewTask((x) => ({ ...x, title: e.target.value }))
						}
						placeholder="Describe the bug or issue..."
					/>
				</Field>
				<Field label="Priority" t={t}>
					<Select
						t={t}
						value={newTask.priority}
						onChange={(e) =>
							setNewTask((x) => ({ ...x, priority: e.target.value }))
						}
					>
						{PRIORITIES.map((p) => (
							<option key={p} value={p}>
								{p}
							</option>
						))}
					</Select>
				</Field>
				<Field label="Tag" t={t}>
					<Select
						t={t}
						value={newTask.tag}
						onChange={(e) => setNewTask((x) => ({ ...x, tag: e.target.value }))}
					>
						{TAGS.map((tg) => (
							<option key={tg} value={tg}>
								{tg}
							</option>
						))}
					</Select>
				</Field>
				<Field label="Site URL (optional)" t={t}>
					<Input
						t={t}
						value={newTask.site}
						onChange={(e) =>
							setNewTask((x) => ({ ...x, site: e.target.value }))
						}
						placeholder={activeProject?.name || "your-site.dev"}
					/>
				</Field>
				<Field label="Instructions for agent" t={t}>
					<Textarea
						t={t}
						value={newTask.instructions}
						onChange={(e) =>
							setNewTask((x) => ({ ...x, instructions: e.target.value }))
						}
						placeholder="Detailed instructions for the agent to perform this task..."
					/>
				</Field>
				<div
					style={{
						display: "flex",
						justifyContent: "flex-end",
						gap: 8,
						marginTop: 8,
					}}
				>
					<Btn t={t} onClick={() => setShowNewTask(false)}>
						Cancel
					</Btn>
					<Btn variant="primary" t={t} onClick={addTask}>
						Add to Backlog
					</Btn>
				</div>
			</Modal>
		</div>
	);
}
