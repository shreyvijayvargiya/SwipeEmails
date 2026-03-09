import { useState, useEffect } from "react";
import CommandPalette from "./components/CommandPalette";
import {
	OverviewPage,
	AnalyticsPage,
	UsersPage,
	BillingPage,
	RoadmapPage,
	SupportPage,
	AffiliatesPage,
	TeamPage,
	AuditLogsPage,
	OnboardingPage,
	NotificationsPage,
	SettingsPage,
} from "./components";
import { notifications } from "./data";
import Icon from "./components/Icon";

const pageTitles = {
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

const PAGES = {
	overview: OverviewPage,
	analytics: AnalyticsPage,
	users: UsersPage,
	billing: BillingPage,
	roadmap: RoadmapPage,
	support: SupportPage,
	affiliates: AffiliatesPage,
	team: TeamPage,
	audit: AuditLogsPage,
	onboarding: OnboardingPage,
	notifications: NotificationsPage,
	settings: SettingsPage,
};

export default function AdminApp() {
	const [page, setPage] = useState("overview");
	const [sidebarOpen, setSidebarOpen] = useState(true);
	const [theme, setTheme] = useState("dark");
	const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
	const unreadNotifs = notifications.filter((n) => !n.read).length;

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

	const navItems = [
		{ id: "overview", label: "Overview", icon: "home" },
		{ id: "analytics", label: "Analytics", icon: "chart" },
		{ id: "users", label: "Users", icon: "users" },
		{ id: "billing", label: "Billing", icon: "billing" },
		{ id: "roadmap", label: "Roadmap", icon: "roadmap" },
		{ id: "support", label: "Support", icon: "support" },
		{ id: "affiliates", label: "Affiliates", icon: "affiliate" },
		{ id: "team", label: "Team", icon: "team" },
		{ id: "audit", label: "Audit Logs", icon: "audit" },
		{ id: "onboarding", label: "Getting Started", icon: "onboarding" },
		{
			id: "notifications",
			label: "Notifications",
			icon: "bell",
			badge: unreadNotifs,
		},
		{ id: "settings", label: "Settings", icon: "settings" },
	];

	const PageComponent = PAGES[page] || OverviewPage;

	return (
		<div className="admin-app">
			<CommandPalette
				open={commandPaletteOpen}
				onClose={() => setCommandPaletteOpen(false)}
				onNavigate={(id) => {
					setPage(id);
					setCommandPaletteOpen(false);
				}}
			/>
			<aside
				className="sidebar"
				style={{
					width: sidebarOpen ? 220 : 60,
					minWidth: sidebarOpen ? 220 : 60,
				}}
			>
				<div className="sidebar-logo">
					<div className="logo-mark">IK</div>
					{sidebarOpen && (
						<div>
							<div className="logo-text">Inkgest</div>
						</div>
					)}
					{sidebarOpen && (
						<span className="logo-badge" style={{ marginLeft: "auto" }}>
							admin
						</span>
					)}
				</div>
				<div className="sidebar-section">
					{sidebarOpen && <div className="sidebar-label">Navigation</div>}
					{navItems.map((item) => (
						<div
							key={item.id}
							className={`nav-item ${page === item.id ? "active" : ""}`}
							onClick={() => setPage(item.id)}
							title={!sidebarOpen ? item.label : ""}
						>
							<span className="nav-icon">
								<Icon name={item.icon} size={15} />
							</span>
							{sidebarOpen && <span>{item.label}</span>}
							{item.badge > 0 && (
								<span className="nav-badge">{item.badge}</span>
							)}
						</div>
					))}
				</div>
				<div className="sidebar-footer">
					<div className="user-card">
						<div className="avatar">S</div>
						{sidebarOpen && (
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
					>
						<Icon name={sidebarOpen ? "x" : "menu"} size={14} />
					</button>
					<div className="topbar-title">{pageTitles[page]}</div>
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
						<div className="icon-btn" onClick={() => setPage("notifications")}>
							<Icon name="bell" size={14} />
							{unreadNotifs > 0 && <div className="notif-dot" />}
						</div>
						<div className="icon-btn" onClick={() => setPage("settings")}>
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
				<div className="content">
					<PageComponent />
				</div>
			</div>
		</div>
	);
}
