import { supportTickets } from "../data";
import Icon from "./Icon";

export default function SupportPage() {
	return (
		<div className="animate-in">
			<div className="page-header">
				<div className="page-title">Support / Help Desk</div>
				<div className="page-desc">
					Manage support tickets and help requests
				</div>
			</div>
			<div
				className="stats-grid"
				style={{ gridTemplateColumns: "repeat(3,1fr)" }}
			>
				{[
					{ label: "Open", value: "12", color: "var(--yellow)" },
					{ label: "In Progress", value: "5", color: "var(--blue)" },
					{ label: "Resolved", value: "48", color: "var(--green)" },
				].map((s, i) => (
					<div
						key={i}
						className="stat-card"
						style={{ "--accent-color": s.color }}
					>
						<div className="stat-value">{s.value}</div>
						<div className="stat-label">{s.label}</div>
					</div>
				))}
			</div>
			<div className="card">
				<div className="card-header">
					<div className="card-title">Recent Tickets</div>
					<button className="btn btn-primary">
						<Icon name="plus" size={12} /> New Ticket
					</button>
				</div>
				<div className="table-wrap">
					<table>
						<thead>
							<tr>
								<th>ID</th>
								<th>Subject</th>
								<th>User</th>
								<th>Status</th>
								<th>Priority</th>
								<th>Created</th>
							</tr>
						</thead>
						<tbody>
							{supportTickets.map((t) => (
								<tr key={t.id}>
									<td
										style={{
											fontFamily: "var(--font-mono)",
											color: "var(--text)",
										}}
									>
										{t.id}
									</td>
									<td>{t.subject}</td>
									<td>{t.user}</td>
									<td>
										<span
											className={`badge badge-${t.status === "resolved" ? "green" : t.status === "in_progress" ? "blue" : "yellow"}`}
										>
											{t.status}
										</span>
									</td>
									<td>
										<span
											className={`badge badge-${t.priority === "high" ? "red" : "blue"}`}
										>
											{t.priority}
										</span>
									</td>
									<td style={{ color: "var(--text3)" }}>{t.created}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}
