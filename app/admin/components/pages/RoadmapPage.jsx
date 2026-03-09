import { useState } from "react";
import { roadmapItems, changelogEntries } from "../../data";

export default function RoadmapPage() {
	const [items] = useState(roadmapItems);
	const columns = [
		{ id: "planned", label: "Planned" },
		{ id: "in_progress", label: "In Progress" },
		{ id: "done", label: "Done" },
	];
	const getItemsForColumn = (status) => items.filter((i) => i.status === status);

	return (
		<div className="animate-in">
			<div className="page-header">
				<div className="page-title">Roadmap & Changelog</div>
				<div className="page-desc">Product roadmap and release notes</div>
			</div>
			<div className="kanban-board">
				{columns.map((col) => (
					<div key={col.id} className="kanban-column">
						<div className="kanban-column-header">{col.label}</div>
						{getItemsForColumn(col.id).map((item) => (
							<div key={item.id} className="kanban-card">
								<div style={{ fontSize: 12, color: "var(--text)", marginBottom: 4 }}>{item.title}</div>
								<span className={`badge badge-${item.priority === "high" ? "red" : "blue"}`} style={{ fontSize: 9 }}>{item.priority}</span>
							</div>
						))}
					</div>
				))}
			</div>
			<div className="card" style={{ marginTop: 24 }}>
				<div className="card-header">
					<div className="card-title">Changelog</div>
				</div>
				{changelogEntries.map((entry, i) => (
					<div key={i} style={{ padding: "12px 0", borderBottom: i < changelogEntries.length - 1 ? "1px solid var(--border)" : "none" }}>
						<div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
							<span style={{ fontFamily: "var(--font-mono)", fontWeight: 600, color: "var(--accent)" }}>v{entry.version}</span>
							<span style={{ fontSize: 11, color: "var(--text3)" }}>{entry.date}</span>
						</div>
						<ul style={{ margin: 0, paddingLeft: 20, fontSize: 12, color: "var(--text2)" }}>
							{entry.items.map((it, j) => (
								<li key={j} style={{ marginBottom: 4 }}>{it}</li>
							))}
						</ul>
					</div>
				))}
			</div>
		</div>
	);
}
