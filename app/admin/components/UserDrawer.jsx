import Icon from "./Icon";
import { invoices } from "../data";

export default function UserDrawer({ user, onClose }) {
	if (!user) return null;
	const userInvoices = invoices.filter((inv) => inv.customer === user.name);
	return (
		<>
			<div className="user-drawer-overlay" onClick={onClose} />
			<div className="user-drawer">
				<div style={{ padding: 24, borderBottom: "1px solid var(--border)" }}>
					<div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
						<div style={{ display: "flex", alignItems: "center", gap: 14 }}>
							<div className="avatar" style={{ width: 48, height: 48, fontSize: 18 }}>
								{user.name[0]}
							</div>
							<div>
								<div style={{ fontSize: 18, fontWeight: 700, color: "var(--text)", fontFamily: "var(--font-display)" }}>
									{user.name}
								</div>
								<div style={{ fontSize: 12, color: "var(--text2)" }}>{user.email}</div>
							</div>
						</div>
						<button className="icon-btn" onClick={onClose}>
							<Icon name="x" size={14} />
						</button>
					</div>
					<div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
						<span
							className={`badge ${user.plan === "Enterprise" ? "badge-yellow" : user.plan === "Pro" ? "badge-blue" : "badge-purple"}`}
						>
							{user.plan}
						</span>
						<span
							className={`badge ${user.status === "active" ? "badge-green" : user.status === "trial" ? "badge-blue" : "badge-red"}`}
						>
							{user.status}
						</span>
						<span style={{ fontSize: 12, color: "var(--text2)" }}>{user.country}</span>
					</div>
				</div>
				<div style={{ padding: 24 }}>
					<div style={{ fontSize: 11, color: "var(--text3)", marginBottom: 12, letterSpacing: "0.06em", textTransform: "uppercase" }}>
						Details
					</div>
					<div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
						<div>
							<span style={{ color: "var(--text3)", fontSize: 11 }}>MRR</span>
							<div style={{ color: "var(--text)", fontSize: 14 }}>{user.mrr > 0 ? `$${user.mrr}/mo` : "—"}</div>
						</div>
						<div>
							<span style={{ color: "var(--text3)", fontSize: 11 }}>Joined</span>
							<div style={{ color: "var(--text)", fontSize: 14 }}>{user.joined}</div>
						</div>
					</div>
					<div style={{ marginTop: 24 }}>
						<div style={{ fontSize: 11, color: "var(--text3)", marginBottom: 12, letterSpacing: "0.06em", textTransform: "uppercase" }}>
							Recent Invoices
						</div>
						{userInvoices.length > 0 ? (
							userInvoices.slice(0, 5).map((inv) => (
								<div
									key={inv.id}
									style={{
										display: "flex",
										justifyContent: "space-between",
										padding: "8px 0",
										borderBottom: "1px solid var(--border)",
										fontSize: 12,
									}}
								>
									<span style={{ color: "var(--text2)" }}>{inv.id}</span>
									<span style={{ color: "var(--text)" }}>${inv.amount}</span>
								</div>
							))
						) : (
							<div style={{ color: "var(--text3)", fontSize: 12 }}>No invoices</div>
						)}
					</div>
					<button className="btn btn-primary" style={{ marginTop: 24, width: "100%" }}>
						Send Email
					</button>
				</div>
			</div>
		</>
	);
}
