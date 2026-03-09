import Icon from "./Icon";
import { teamMembers } from "../data";

export default function TeamPage() {
	return (
		<div className="animate-in">
			<div className="page-header">
				<div className="page-title">Team Management</div>
				<div className="page-desc">Invite members and manage roles</div>
			</div>
			<div className="card">
				<div className="card-header">
					<div className="card-title">Team Members</div>
					<button className="btn btn-primary">
						<Icon name="plus" size={12} /> Invite Member
					</button>
				</div>
				<div className="table-wrap">
					<table>
						<thead>
							<tr>
								<th>Member</th>
								<th>Email</th>
								<th>Role</th>
								<th>Status</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{teamMembers.map((m) => (
								<tr key={m.id}>
									<td>
										<div
											style={{ display: "flex", alignItems: "center", gap: 10 }}
										>
											<div
												className="avatar"
												style={{ width: 28, height: 28, fontSize: 11 }}
											>
												{m.name[0]}
											</div>
											<span style={{ color: "var(--text)" }}>{m.name}</span>
										</div>
									</td>
									<td style={{ color: "var(--text2)" }}>{m.email}</td>
									<td>
										<span
											className={`badge ${m.role === "Admin" ? "badge-yellow" : "badge-blue"}`}
										>
											{m.role}
										</span>
									</td>
									<td>
										<span
											className={`badge badge-${m.status === "active" ? "green" : "yellow"}`}
										>
											{m.status}
										</span>
									</td>
									<td>
										<button className="btn btn-ghost" style={{ fontSize: 10 }}>
											Edit
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
