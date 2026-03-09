import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import CommandPalette from "./components/CommandPalette";
import Icon from "./components/Icon";
import { notifications } from "./data";

const ROUTES = [
	{ id: "overview", path: "/admin", label: "Overview", icon: "home" },
	{ id: "analytics", path: "/admin/analytics", label: "Analytics", icon: "chart" },
	{ id: "users", path: "/admin/users", label: "Users", icon: "users" },
	{ id: "billing", path: "/admin/billing", label: "Billing", icon: "billing" },
	{ id: "roadmap", path: "/admin/roadmap", label: "Roadmap", icon: "roadmap" },
	{ id: "support", path: "/admin/support", label: "Support", icon: "support" },
	{ id: "affiliates", path: "/admin/affiliates", label: "Affiliates", icon: "affiliate" },
	{ id: "team", path: "/admin/team", label: "Team", icon: "team" },
	{ id: "audit", path: "/admin/audit", label: "Audit Logs", icon: "audit" },
	{ id: "onboarding", path: "/admin/onboarding", label: "Getting Started", icon: "onboarding" },
	{ id: "notifications", path: "/admin/notifications", label: "Notifications", icon: "bell" },
	{ id: "settings", path: "/admin/settings", label: "Settings", icon: "settings" },
];

const PAGE_TITLES = {
	overview: "Overview",
	analytics: "Analytics",
	users: "Users & Customers",
	billing: "Billing & Revenue",
	roadmap: "Roadmap & Changelog",
	support: "Support / Help Desk",
	affiliates: "Affiliate Program",
	team: "Team Management",
	audit: "Audit Logs",
	onboarding: "Getting Started",
	notifications: "Notifications",
	settings: "Settings",
};

export default function AdminLayout({ children, pageTitle }) {
	const router = useRouter();
	const [sidebarOpen, setSidebarOpen] = useState(true);
	const [theme, setTheme] = useState("dark");
	const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
	const [isMobile, setIsMobile] = useState(false);
	const unreadNotifs = notifications.filter((n) => !n.read).length;

	const path = router.asPath || "";
	const currentPage = path.replace("/admin", "").replace(/\/$/, "") || "";
	const activeId = currentPage === "" ? "overview" : currentPage.slice(1);
	const title = pageTitle || PAGE_TITLES[activeId] || "Overview";

	useEffect(() => {
		const stored = localStorage.getItem("admin-theme");
		if (stored) setTheme(stored);
	}, []);

	useEffect(() => {
		document.documentElement.setAttribute("data-theme", theme);
		localStorage.setItem("admin-theme", theme);
	}, [theme]);

	useEffect(() => {
		const handler = (e) => {
			if ((e.metaKey || e.ctrlKey) && e.key === "k") {
				e.preventDefault();
				setCommandPaletteOpen((o) => !o);
			}
		};
		window.addEventListener("keydown", handler);
		return () => window.removeEventListener("keydown", handler);
	}, []);

	useEffect(() => {
		const mq = window.matchMedia("(max-width: 768px)");
		const handler = () => {
			setIsMobile(mq.matches);
			if (mq.matches) setSidebarOpen(false);
		};
		handler();
		mq.addEventListener("change", handler);
		return () => mq.removeEventListener("change", handler);
	}, []);

	const handleNavClick = (path) => {
		router.push(path);
		if (isMobile) setSidebarOpen(false);
	};

	const handleCommandNavigate = (id) => {
		const route = ROUTES.find((r) => r.id === id);
		if (route) {
			router.push(route.path);
			setCommandPaletteOpen(false);
			if (isMobile) setSidebarOpen(false);
		}
	};

	const navItems = ROUTES.map((r) => ({
		...r,
		badge: r.id === "notifications" ? unreadNotifs : undefined,
	}));

	return (
		<div className="admin-app">
			<CommandPalette
				open={commandPaletteOpen}
				onClose={() => setCommandPaletteOpen(false)}
				onNavigate={handleCommandNavigate}
			/>
			{isMobile && (
				<div
					className={`sidebar-overlay ${sidebarOpen ? "sidebar-overlay-visible" : ""}`}
					onClick={() => setSidebarOpen(false)}
					aria-hidden="true"
				/>
			)}
			<aside
				className={`sidebar ${sidebarOpen ? "sidebar-open" : ""}`}
				style={
					!isMobile
						? { width: sidebarOpen ? 220 : 60, minWidth: sidebarOpen ? 220 : 60 }
						: { width: 220, minWidth: 220 }
				}
			>
				<div className="sidebar-logo">
					<div className="logo-mark">IK</div>
					{(sidebarOpen || isMobile) && (
						<div>
							<div className="logo-text">Inkgest</div>
						</div>
					)}
					{(sidebarOpen || isMobile) && (
						<span className="logo-badge" style={{ marginLeft: "auto" }}>
							admin
						</span>
					)}
				</div>
				<div className="sidebar-section">
					{(sidebarOpen || isMobile) && <div className="sidebar-label">Navigation</div>}
					{navItems.map((item) => (
						<div
							key={item.id}
							className={`nav-item ${activeId === item.id ? "active" : ""}`}
							onClick={() => handleNavClick(item.path)}
							title={!sidebarOpen && !isMobile ? item.label : ""}
						>
							<span className="nav-icon">
								<Icon name={item.icon} size={15} />
							</span>
							{(sidebarOpen || isMobile) && <span>{item.label}</span>}
							{item.badge > 0 && <span className="nav-badge">{item.badge}</span>}
						</div>
					))}
				</div>
				<div className="sidebar-footer">
					<div className="user-card">
						<div className="avatar">S</div>
						{(sidebarOpen || isMobile) && (
							<div className="user-info">
								<div className="user-name">Shrey</div>
								<div className="user-role">Admin · Pro</div>
							</div>
						)}
					</div>
				</div>
			</aside>
			<div className="main">
				<div className="topbar">
					<button
						className="icon-btn"
						onClick={() => setSidebarOpen(!sidebarOpen)}
						aria-label={sidebarOpen ? "Close menu" : "Open menu"}
					>
						<Icon name={sidebarOpen ? "x" : "menu"} size={14} />
					</button>
					<div className="topbar-title">{title}</div>
					<div
						className="search-bar"
						onClick={() => setCommandPaletteOpen(true)}
						style={{ cursor: "pointer" }}
					>
						<Icon name="search" size={13} />
						<span style={{ color: "var(--text3)" }}>Search anything...</span>
						<span
							style={{
								marginLeft: "auto",
								fontSize: 10,
								color: "var(--text3)",
								background: "var(--surface3)",
								padding: "1px 5px",
								borderRadius: 4,
								border: "1px solid var(--border2)",
							}}
						>
							⌘K
						</span>
					</div>
					<div className="topbar-actions">
						<button
							className="icon-btn"
							onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
							title={theme === "dark" ? "Switch to light" : "Switch to dark"}
						>
							{theme === "dark" ? (
								<Icon name="sun" size={14} />
							) : (
								<Icon name="moon" size={14} />
							)}
						</button>
						<div className="icon-btn" onClick={() => router.push("/admin/notifications")}>
							<Icon name="bell" size={14} />
							{unreadNotifs > 0 && <div className="notif-dot" />}
						</div>
						<div className="icon-btn" onClick={() => router.push("/admin/settings")}>
							<Icon name="settings" size={14} />
						</div>
						<div
							className="avatar"
							style={{
								width: 32,
								height: 32,
								fontSize: 13,
								cursor: "pointer",
								borderRadius: "var(--radius)",
							}}
						>
							S
						</div>
					</div>
				</div>
				<div className="content">{children}</div>
			</div>
		</div>
	);
}
