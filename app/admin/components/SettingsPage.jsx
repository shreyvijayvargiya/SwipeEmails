import { useState } from "react";
import Icon from "./Icon";

function ToggleRow({ label, desc, defaultOn }) {
	const [on, setOn] = useState(defaultOn);
	return (
		<div className="toggle-wrap">
			<div className="toggle-info">
				<div className="toggle-title">{label}</div>
				<div className="toggle-desc">{desc}</div>
			</div>
			<div className={`toggle ${on ? "on" : ""}`} onClick={() => setOn(!on)} />
		</div>
	);
}

export default function SettingsPage() {
	const [activeSection, setActiveSection] = useState("profile");
	const settingsSections = [
		{ id: "profile", label: "Profile", icon: "user" },
		{ id: "team", label: "Team", icon: "users" },
		{ id: "security", label: "Security", icon: "shield" },
		{ id: "notifications", label: "Notifications", icon: "bell" },
		{ id: "integrations", label: "Integrations", icon: "globe" },
		{ id: "api", label: "API Keys", icon: "key" },
		{ id: "appearance", label: "Appearance", icon: "palette" },
		{ id: "billing", label: "Billing", icon: "billing" },
	];

	const renderSection = () => {
		switch (activeSection) {
			case "profile":
				return (
					<div>
						<div
							style={{
								display: "flex",
								alignItems: "center",
								gap: 20,
								marginBottom: 28,
								padding: 20,
								background: "var(--surface2)",
								border: "1px solid var(--border)",
								borderRadius: "var(--radius-lg)",
							}}
						>
							<div
								className="avatar"
								style={{ width: 60, height: 60, fontSize: 22 }}
							>
								S
							</div>
							<div>
								<div
									style={{
										fontFamily: "var(--font-display)",
										fontSize: 18,
										fontWeight: 700,
										color: "var(--text)",
									}}
								>
									Shrey
								</div>
								<div
									style={{
										fontSize: 12,
										color: "var(--text3)",
										marginBottom: 10,
									}}
								>
									shrey@inkgest.io · Admin
								</div>
								<button className="btn btn-secondary" style={{ fontSize: 11 }}>
									Change Avatar
								</button>
							</div>
						</div>
						<div className="grid-2">
							<div className="form-group">
								<label className="form-label">First Name</label>
								<input className="form-input" defaultValue="Shrey" />
							</div>
							<div className="form-group">
								<label className="form-label">Last Name</label>
								<input className="form-input" defaultValue="" />
							</div>
						</div>
						<div className="form-group">
							<label className="form-label">Email Address</label>
							<input className="form-input" defaultValue="shrey@inkgest.io" />
						</div>
						<div className="form-group">
							<label className="form-label">Company / Product Name</label>
							<input className="form-input" defaultValue="Inkgest" />
						</div>
						<div className="form-group">
							<label className="form-label">Bio</label>
							<textarea
								className="form-input"
								rows={3}
								defaultValue="Solo indie hacker building Inkgest — AI-powered content workspace."
								style={{ resize: "vertical" }}
							/>
						</div>
						<button className="btn btn-primary">Save Changes</button>
					</div>
				);
			case "security":
				return (
					<div>
						<div className="form-group">
							<label className="form-label">Current Password</label>
							<input
								className="form-input"
								type="password"
								placeholder="••••••••"
							/>
						</div>
						<div className="form-group">
							<label className="form-label">New Password</label>
							<input
								className="form-input"
								type="password"
								placeholder="••••••••"
							/>
						</div>
						<div className="form-group">
							<label className="form-label">Confirm New Password</label>
							<input
								className="form-input"
								type="password"
								placeholder="••••••••"
							/>
						</div>
						<button className="btn btn-primary" style={{ marginBottom: 28 }}>
							Update Password
						</button>
						<div className="divider" />
						<div
							className="card-title"
							style={{ marginBottom: 16, fontFamily: "var(--font-display)" }}
						>
							Two-Factor Authentication
						</div>
						<ToggleRow
							label="Authenticator App"
							desc="Use TOTP-based 2FA (Google Authenticator, etc.)"
							defaultOn={true}
						/>
						<ToggleRow
							label="SMS Backup"
							desc="Send OTP via SMS as backup method"
							defaultOn={false}
						/>
						<ToggleRow
							label="Login Alerts"
							desc="Email notification on new device login"
							defaultOn={true}
						/>
					</div>
				);
			case "api":
				return (
					<div>
						<div
							style={{
								marginBottom: 20,
								display: "flex",
								alignItems: "center",
								justifyContent: "space-between",
							}}
						>
							<div>
								<div
									className="card-title"
									style={{ fontFamily: "var(--font-display)", marginBottom: 4 }}
								>
									API Keys
								</div>
								<div className="card-subtitle">
									Use these keys to authenticate API requests.
								</div>
							</div>
							<button className="btn btn-primary">
								<Icon name="plus" size={12} /> Create Key
							</button>
						</div>
						{[
							{
								name: "Production Key",
								key: "sk_live_••••••••••••••••••••••••2x9f",
								created: "Jan 12, 2024",
								last: "2 hours ago",
								status: "active",
							},
							{
								name: "Development Key",
								key: "sk_test_••••••••••••••••••••••••8k3m",
								created: "Feb 03, 2024",
								last: "5 days ago",
								status: "active",
							},
							{
								name: "Webhook Secret",
								key: "whsec_•••••••••••••••••••••••••••7p2q",
								created: "Feb 03, 2024",
								last: "1 day ago",
								status: "active",
							},
						].map((k, i) => (
							<div
								key={i}
								style={{
									background: "var(--surface2)",
									border: "1px solid var(--border)",
									borderRadius: "var(--radius)",
									padding: 16,
									marginBottom: 10,
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
									<span
										style={{
											fontSize: 13,
											color: "var(--text)",
											fontWeight: 500,
										}}
									>
										{k.name}
									</span>
									<div style={{ display: "flex", gap: 6 }}>
										<button
											className="btn btn-secondary"
											style={{ fontSize: 10, padding: "3px 8px" }}
										>
											Copy
										</button>
										<button
											className="btn btn-ghost"
											style={{
												fontSize: 10,
												padding: "3px 8px",
												color: "var(--red)",
											}}
										>
											Revoke
										</button>
									</div>
								</div>
								<div
									style={{
										fontFamily: "var(--font-mono)",
										fontSize: 12,
										color: "var(--text3)",
										marginBottom: 8,
										background: "var(--surface3)",
										padding: "6px 10px",
										borderRadius: 4,
									}}
								>
									{k.key}
								</div>
								<div
									style={{
										display: "flex",
										gap: 16,
										fontSize: 10,
										color: "var(--text3)",
									}}
								>
									<span>Created: {k.created}</span>
									<span>Last used: {k.last}</span>
									<span className="badge badge-green" style={{ fontSize: 9 }}>
										{k.status}
									</span>
								</div>
							</div>
						))}
					</div>
				);
			case "integrations":
				return (
					<div>
						<div
							className="card-title"
							style={{ fontFamily: "var(--font-display)", marginBottom: 16 }}
						>
							Connected Integrations
						</div>
						{[
							{
								name: "Stripe",
								desc: "Payment processing and subscription management",
								connected: true,
								icon: "💳",
							},
							{
								name: "Resend",
								desc: "Transactional email delivery",
								connected: true,
								icon: "📧",
							},
							{
								name: "PostHog",
								desc: "Product analytics and session recording",
								connected: false,
								icon: "📊",
							},
							{
								name: "Notion",
								desc: "Export content and reports to Notion",
								connected: false,
								icon: "📝",
							},
							{
								name: "Slack",
								desc: "Receive alerts and reports in Slack",
								connected: true,
								icon: "💬",
							},
							{
								name: "GitHub",
								desc: "Deploy hooks and version control integration",
								connected: false,
								icon: "🐙",
							},
						].map((int, i) => (
							<div
								key={i}
								style={{
									display: "flex",
									alignItems: "center",
									gap: 14,
									padding: "14px 0",
									borderBottom: "1px solid var(--border)",
								}}
							>
								<div
									style={{
										fontSize: 22,
										width: 40,
										height: 40,
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
										background: "var(--surface2)",
										borderRadius: "var(--radius)",
										border: "1px solid var(--border)",
									}}
								>
									{int.icon}
								</div>
								<div style={{ flex: 1 }}>
									<div
										style={{
											fontSize: 13,
											color: "var(--text)",
											marginBottom: 2,
										}}
									>
										{int.name}
									</div>
									<div style={{ fontSize: 11, color: "var(--text3)" }}>
										{int.desc}
									</div>
								</div>
								<button
									className={`btn ${int.connected ? "btn-secondary" : "btn-primary"}`}
									style={{ fontSize: 11 }}
								>
									{int.connected ? "Disconnect" : "Connect"}
								</button>
							</div>
						))}
					</div>
				);
			default:
				return (
					<div
						style={{
							padding: "40px 0",
							textAlign: "center",
							color: "var(--text3)",
						}}
					>
						<div style={{ fontSize: 24, marginBottom: 8 }}>🔧</div>
						<div style={{ fontSize: 13 }}>Section under construction</div>
					</div>
				);
		}
	};

	return (
		<div className="animate-in">
			<div className="page-header">
				<div className="page-title">Settings</div>
				<div className="page-desc">
					Manage your account, security, and integrations
				</div>
			</div>
			<div className="settings-grid">
				<div>
					<div className="settings-nav">
						{settingsSections.map((s) => (
							<div
								key={s.id}
								className={`settings-nav-item ${activeSection === s.id ? "active" : ""}`}
								onClick={() => setActiveSection(s.id)}
							>
								<Icon name={s.icon} size={14} />
								{s.label}
							</div>
						))}
					</div>
					<div style={{ marginTop: 16 }}>
						<div
							className="settings-nav-item"
							style={{ color: "var(--red)", cursor: "pointer" }}
						>
							<Icon name="logout" size={14} />
							Sign Out
						</div>
					</div>
				</div>
				<div className="card">{renderSection()}</div>
			</div>
		</div>
	);
}
