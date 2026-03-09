import { invoices } from "../../data";
import Icon from "../Icon";

export default function BillingPage() {
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
					<div className="page-title">Billing</div>
					<div className="page-desc">
						Subscription plans, invoices, and revenue overview
					</div>
				</div>
				<button className="btn btn-primary">
					<Icon name="download" size={12} /> Download Report
				</button>
			</div>
			<div
				className="stats-grid"
				style={{ gridTemplateColumns: "repeat(4,1fr)", marginBottom: 24 }}
			>
				{[
					{
						label: "Current MRR",
						value: "$8,100",
						change: "+12.5%",
						up: true,
						color: "var(--accent)",
					},
					{
						label: "Active Subscriptions",
						value: "247",
						change: "+5",
						up: true,
						color: "var(--blue)",
					},
					{
						label: "Failed Payments",
						value: "3",
						change: "+1",
						up: false,
						color: "var(--red)",
					},
					{
						label: "Avg Subscription Age",
						value: "4.2 mo",
						change: "+0.3",
						up: true,
						color: "var(--yellow)",
					},
				].map((s, i) => (
					<div
						key={i}
						className="stat-card"
						style={{ "--accent-color": s.color }}
					>
						<div className="stat-value" style={{ fontSize: 22 }}>
							{s.value}
						</div>
						<div className="stat-label">{s.label}</div>
						<div className={`stat-change ${s.up ? "up" : "down"}`}>
							{s.change} vs last month
						</div>
					</div>
				))}
			</div>
			<div className="plan-grid">
				{[
					{
						name: "Starter",
						price: 9,
						users: 94,
						color: "var(--purple)",
						features: [
							"5 projects",
							"10k API calls/mo",
							"Email support",
							"Basic analytics",
						],
					},
					{
						name: "Pro",
						price: 49,
						users: 111,
						color: "var(--blue)",
						current: true,
						features: [
							"Unlimited projects",
							"500k API calls/mo",
							"Priority support",
							"Advanced analytics",
							"Custom domain",
						],
					},
					{
						name: "Enterprise",
						price: 199,
						users: 42,
						color: "var(--yellow)",
						features: [
							"Unlimited everything",
							"SLA guarantee",
							"Dedicated support",
							"SSO & SAML",
							"Custom billing",
							"Audit logs",
						],
					},
				].map((p, i) => (
					<div key={i} className={`plan-card ${p.current ? "current" : ""}`}>
						<div
							style={{
								display: "flex",
								alignItems: "center",
								gap: 8,
								marginBottom: 16,
							}}
						>
							<div
								style={{
									width: 8,
									height: 8,
									borderRadius: "50%",
									background: p.color,
								}}
							/>
							<span
								style={{
									fontFamily: "var(--font-display)",
									fontSize: 15,
									fontWeight: 700,
									color: "var(--text)",
								}}
							>
								{p.name}
							</span>
						</div>
						<div className="plan-price">
							${p.price}
							<span>/mo</span>
						</div>
						<div
							style={{
								fontSize: 11,
								color: "var(--text3)",
								marginTop: 4,
								marginBottom: 16,
							}}
						>
							{p.users} active subscribers · $
							{(p.price * p.users).toLocaleString()} MRR
						</div>
						<div
							style={{
								borderTop: "1px solid var(--border)",
								paddingTop: 14,
								display: "flex",
								flexDirection: "column",
								gap: 8,
							}}
						>
							{p.features.map((f, fi) => (
								<div
									key={fi}
									style={{
										display: "flex",
										alignItems: "center",
										gap: 8,
										fontSize: 11,
										color: "var(--text2)",
									}}
								>
									<span style={{ color: "var(--green)" }}>
										<Icon name="check" size={12} />
									</span>
									{f}
								</div>
							))}
						</div>
					</div>
				))}
			</div>
			<div className="card">
				<div className="card-header">
					<div className="card-title">Recent Invoices</div>
					<div style={{ display: "flex", gap: 8 }}>
						<button className="btn btn-secondary" style={{ fontSize: 11 }}>
							<Icon name="filter" size={11} /> Filter
						</button>
						<button className="btn btn-secondary" style={{ fontSize: 11 }}>
							<Icon name="download" size={11} /> Export
						</button>
					</div>
				</div>
				<div className="table-wrap">
					<table>
						<thead>
							<tr>
								<th>Invoice</th>
								<th>Customer</th>
								<th>Plan</th>
								<th>Amount</th>
								<th>Status</th>
								<th>Date</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{invoices.map((inv, i) => (
								<tr key={i}>
									<td
										style={{
											fontFamily: "var(--font-mono)",
											color: "var(--text)",
											fontSize: 11,
										}}
									>
										{inv.id}
									</td>
									<td style={{ color: "var(--text)", fontSize: 12 }}>
										{inv.customer}
									</td>
									<td>
										<span
											className={`badge ${inv.plan === "Enterprise" ? "badge-yellow" : inv.plan === "Pro" ? "badge-blue" : "badge-purple"}`}
										>
											{inv.plan}
										</span>
									</td>
									<td
										style={{
											fontFamily: "var(--font-mono)",
											color: "var(--text)",
										}}
									>
										${inv.amount}
									</td>
									<td>
										<span
											className={`badge ${inv.status === "paid" ? "badge-green" : "badge-red"}`}
										>
											{inv.status}
										</span>
									</td>
									<td
										style={{
											color: "var(--text3)",
											fontSize: 11,
											fontFamily: "var(--font-mono)",
										}}
									>
										{inv.date}
									</td>
									<td>
										<button
											className="btn btn-ghost"
											style={{ fontSize: 10, padding: "3px 8px" }}
										>
											View
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}
