import { useState } from "react";
import Icon from "../Icon";
import { notifications } from "../../data";

export default function NotificationsPage() {
	const [notifs, setNotifs] = useState(notifications);
	const unread = notifs.filter((n) => !n.read).length;

	const typeConfig = {
		signup: { icon: "👤", bg: "rgba(0,212,170,0.1)", color: "var(--accent)" },
		upgrade: { icon: "⚡", bg: "rgba(88,166,255,0.1)", color: "var(--blue)" },
		churn: { icon: "⚠️", bg: "rgba(248,81,73,0.1)", color: "var(--red)" },
		payment: { icon: "💳", bg: "rgba(210,153,34,0.1)", color: "var(--yellow)" },
		milestone: { icon: "🎉", bg: "rgba(63,185,80,0.1)", color: "var(--green)" },
	};

	return (
		<div className="animate-in">
			<div
				className="page-header"
				style={{
					display: "flex",
					alignItems: "flex-start",
					justifyContent: "space-between",
				}}
			>
				<div>
					<div className="page-title">Notifications</div>
					<div className="page-desc">
						{unread} unread · {notifs.length} total
					</div>
				</div>
				<button
					className="btn btn-secondary"
					onClick={() => setNotifs(notifs.map((n) => ({ ...n, read: true })))}
				>
					<Icon name="check" size={12} /> Mark all read
				</button>
			</div>
			<div className="grid-2">
				<div className="card" style={{ flex: 1 }}>
					<div className="card-header">
						<div className="card-title">All Notifications</div>
					</div>
					{notifs.map((n, i) => {
						const cfg = typeConfig[n.type] || typeConfig.payment;
						return (
							<div
								key={i}
								className={`notif-item ${n.read ? "read" : ""}`}
								onClick={() =>
									setNotifs(
										notifs.map((nn, ni) =>
											ni === i ? { ...nn, read: true } : nn,
										),
									)
								}
							>
								<div className="notif-icon-wrap" style={{ background: cfg.bg }}>
									<span>{cfg.icon}</span>
								</div>
								<div style={{ flex: 1 }}>
									<div
										style={{
											display: "flex",
											alignItems: "center",
											gap: 8,
											marginBottom: 3,
										}}
									>
										<span
											style={{
												fontSize: 12,
												color: "var(--text)",
												fontWeight: n.read ? 400 : 500,
											}}
										>
											{n.title}
										</span>
										{!n.read && (
											<div
												style={{
													width: 6,
													height: 6,
													borderRadius: "50%",
													background: "var(--accent)",
												}}
											/>
										)}
									</div>
									<div
										style={{
											fontSize: 11,
											color: "var(--text2)",
											marginBottom: 4,
										}}
									>
										{n.desc}
									</div>
									<div style={{ fontSize: 10, color: "var(--text3)" }}>
										{n.time}
									</div>
								</div>
							</div>
						);
					})}
				</div>
				<div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
					<div className="card">
						<div className="card-header">
							<div className="card-title">Notification Summary</div>
						</div>
						{[
							{
								type: "signup",
								label: "New Signups",
								count: 2,
								color: "var(--accent)",
							},
							{
								type: "upgrade",
								label: "Upgrades",
								count: 2,
								color: "var(--blue)",
							},
							{
								type: "churn",
								label: "Cancellations",
								count: 1,
								color: "var(--red)",
							},
							{
								type: "payment",
								label: "Payment Issues",
								count: 1,
								color: "var(--yellow)",
							},
							{
								type: "milestone",
								label: "Milestones",
								count: 1,
								color: "var(--green)",
							},
						].map((s, i) => (
							<div
								key={i}
								style={{
									display: "flex",
									alignItems: "center",
									justifyContent: "space-between",
									padding: "10px 0",
									borderBottom: i < 4 ? "1px solid var(--border)" : "none",
								}}
							>
								<div style={{ display: "flex", alignItems: "center", gap: 10 }}>
									<div
										style={{
											width: 8,
											height: 8,
											borderRadius: "50%",
											background: s.color,
										}}
									/>
									<span style={{ fontSize: 12, color: "var(--text2)" }}>
										{s.label}
									</span>
								</div>
								<span
									style={{
										fontFamily: "var(--font-mono)",
										fontSize: 12,
										color: "var(--text)",
										fontWeight: 600,
									}}
								>
									{s.count}
								</span>
							</div>
						))}
					</div>
					<div className="card">
						<div className="card-header">
							<div className="card-title">Alert Preferences</div>
						</div>
						<AlertToggle
							label="New signup alerts"
							desc="Get notified when a new user signs up"
							defaultOn={true}
						/>
						<AlertToggle
							label="Churn alerts"
							desc="Immediate alert on cancellation"
							defaultOn={true}
						/>
						<AlertToggle
							label="Payment failures"
							desc="Alert on failed payment attempts"
							defaultOn={true}
						/>
						<AlertToggle
							label="Weekly digest"
							desc="Summary email every Monday"
							defaultOn={false}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

function AlertToggle({ label, desc, defaultOn }) {
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
