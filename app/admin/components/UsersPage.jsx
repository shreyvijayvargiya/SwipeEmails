import { useState } from "react";
import Icon from "./Icon";
import UserDrawer from "./UserDrawer";
import { users } from "../data";

export default function UsersPage() {
	const [search, setSearch] = useState("");
	const [filter, setFilter] = useState("all");
	const [selectedUser, setSelectedUser] = useState(null);

	const filtered = users.filter((u) => {
		const matchSearch =
			u.name.toLowerCase().includes(search.toLowerCase()) ||
			u.email.toLowerCase().includes(search.toLowerCase());
		const matchFilter =
			filter === "all" ||
			u.status === filter ||
			u.plan.toLowerCase() === filter;
		return matchSearch && matchFilter;
	});

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
					<div className="page-title">Users</div>
					<div className="page-desc">
						{users.length} total subscribers ·{" "}
						{users.filter((u) => u.status === "active").length} active
					</div>
				</div>
				<div style={{ display: "flex", gap: 8 }}>
					<button className="btn btn-secondary">
						<Icon name="download" size={12} /> Export CSV
					</button>
					<button className="btn btn-primary">
						<Icon name="plus" size={12} /> Add User
					</button>
				</div>
			</div>
			<div
				style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}
			>
				<div className="search-bar" style={{ width: 260 }}>
					<Icon name="search" size={13} />
					<input
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						placeholder="Search users..."
						style={{
							background: "none",
							border: "none",
							outline: "none",
							fontSize: 12,
							fontFamily: "var(--font-mono)",
							color: "var(--text)",
							flex: 1,
						}}
					/>
				</div>
				<div style={{ display: "flex", gap: 4 }}>
					{[
						"all",
						"active",
						"trial",
						"churned",
						"starter",
						"pro",
						"enterprise",
					].map((f) => (
						<button
							key={f}
							className={`btn ${filter === f ? "btn-primary" : "btn-secondary"}`}
							style={{
								padding: "5px 10px",
								fontSize: 10,
								textTransform: "capitalize",
							}}
							onClick={() => setFilter(f)}
						>
							{f}
						</button>
					))}
				</div>
			</div>
			<div className="card">
				<div className="table-wrap">
					<table>
						<thead>
							<tr>
								<th>User</th>
								<th>Plan</th>
								<th>Status</th>
								<th>MRR</th>
								<th>Country</th>
								<th>Joined</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{filtered.map((u) => (
								<tr key={u.id}>
									<td>
										<div
											style={{ display: "flex", alignItems: "center", gap: 10 }}
										>
											<div className="avatar">{u.name[0]}</div>
											<div>
												<div
													style={{
														color: "var(--text)",
														fontSize: 12,
														marginBottom: 1,
													}}
												>
													{u.name}
												</div>
												<div style={{ color: "var(--text3)", fontSize: 10 }}>
													{u.email}
												</div>
											</div>
										</div>
									</td>
									<td>
										<span
											className={`badge ${u.plan === "Enterprise" ? "badge-yellow" : u.plan === "Pro" ? "badge-blue" : "badge-purple"}`}
										>
											{u.plan}
										</span>
									</td>
									<td>
										<span
											className={`badge ${u.status === "active" ? "badge-green" : u.status === "trial" ? "badge-blue" : "badge-red"}`}
										>
											{u.status}
										</span>
									</td>
									<td
										style={{
											color: u.mrr > 0 ? "var(--text)" : "var(--text3)",
											fontFamily: "var(--font-mono)",
										}}
									>
										{u.mrr > 0 ? `$${u.mrr}/mo` : "—"}
									</td>
									<td style={{ fontSize: 16 }}>{u.country}</td>
									<td
										style={{
											color: "var(--text3)",
											fontFamily: "var(--font-mono)",
											fontSize: 11,
										}}
									>
										{u.joined}
									</td>
									<td>
										<div style={{ display: "flex", gap: 4 }}>
											<button
												className="btn btn-secondary"
												style={{ padding: "3px 8px", fontSize: 10 }}
												onClick={() => setSelectedUser(u)}
											>
												View
											</button>
											<button
												className="btn btn-ghost"
												style={{ padding: "3px 8px", fontSize: 10 }}
											>
												Edit
											</button>
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
				{selectedUser && (
					<UserDrawer
						user={selectedUser}
						onClose={() => setSelectedUser(null)}
					/>
				)}
				{filtered.length === 0 && (
					<div
						style={{
							textAlign: "center",
							padding: "40px 0",
							color: "var(--text3)",
							fontSize: 13,
						}}
					>
						No users match your search.
					</div>
				)}
			</div>
		</div>
	);
}
