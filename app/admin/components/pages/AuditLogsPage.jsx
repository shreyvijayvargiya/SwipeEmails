import { auditLogs } from "../../data";
import Icon from "../Icon";

export default function AuditLogsPage() {
	return (
		<div className="animate-in">
			<div className="page-header">
				<div className="page-title">Audit Logs</div>
				<div className="page-desc">Track all changes and actions</div>
			</div>
			<div className="card">
				<div className="card-header">
					<div className="card-title">Recent Activity</div>
					<div style={{ display: "flex", gap: 8 }}>
						<button className="btn btn-secondary">
							<Icon name="filter" size={11} /> Filter
						</button>
						<button className="btn btn-secondary">
							<Icon name="download" size={11} /> Export
						</button>
					</div>
				</div>
				<div className="table-wrap">
					<table>
						<thead>
							<tr>
								<th>User</th>
								<th>Action</th>
								<th>Target</th>
								<th>Time</th>
								<th>IP</th>
							</tr>
						</thead>
						<tbody>
							{auditLogs.map((log) => (
								<tr key={log.id}>
									<td style={{ color: "var(--text)", fontWeight: 500 }}>
										{log.user}
									</td>
									<td>{log.action}</td>
									<td style={{ color: "var(--text2)" }}>{log.target}</td>
									<td style={{ color: "var(--text3)", fontSize: 11 }}>
										{log.time}
									</td>
									<td
										style={{
											fontFamily: "var(--font-mono)",
											fontSize: 11,
											color: "var(--text3)",
										}}
									>
										{log.ip}
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
