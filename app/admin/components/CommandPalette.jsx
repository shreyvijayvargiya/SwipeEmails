"use client";

import { useState, useEffect } from "react";
import Icon from "./Icon";

export default function CommandPalette({ open, onClose, onNavigate }) {
	const [query, setQuery] = useState("");
	const [selected, setSelected] = useState(0);

	const actions = [
		{
			section: "Navigation",
			items: [
				{ id: "overview", label: "Go to Overview", icon: "home" },
				{ id: "analytics", label: "Go to Analytics", icon: "chart" },
				{ id: "users", label: "Go to Users", icon: "users" },
				{ id: "billing", label: "Go to Billing", icon: "billing" },
				{ id: "roadmap", label: "Go to Roadmap", icon: "roadmap" },
				{ id: "support", label: "Go to Support", icon: "support" },
				{ id: "settings", label: "Go to Settings", icon: "settings" },
			],
		},
		{
			section: "Actions",
			items: [
				{ id: "export", label: "Export users CSV", icon: "download" },
				{ id: "invite", label: "Invite team member", icon: "plus" },
			],
		},
	];

	const getFilteredSections = () =>
		actions
			.map((sec) => ({
				...sec,
				items: query.trim()
					? sec.items.filter((i) => i.label.toLowerCase().includes(query.toLowerCase()))
					: sec.items,
			}))
			.filter((sec) => sec.items.length > 0);

	const sections = getFilteredSections();
	const flatFiltered = sections.flatMap((s) => s.items);

	useEffect(() => {
		setSelected(0);
	}, [query]);
	useEffect(() => {
		const handler = (e) => {
			if (e.key === "Escape") onClose();
			if (e.key === "ArrowDown") {
				e.preventDefault();
				setSelected((s) => Math.min(s + 1, flatFiltered.length - 1));
			}
			if (e.key === "ArrowUp") {
				e.preventDefault();
				setSelected((s) => Math.max(s - 1, 0));
			}
			if (e.key === "Enter" && flatFiltered[selected]) {
				e.preventDefault();
				const item = flatFiltered[selected];
				if (item.id && !["export", "invite"].includes(item.id)) onNavigate(item.id);
				onClose();
			}
		};
		if (open) window.addEventListener("keydown", handler);
		return () => window.removeEventListener("keydown", handler);
	}, [open, flatFiltered, selected, onClose, onNavigate]);

	if (!open) return null;
	let idx = 0;
	return (
		<div className="command-palette-overlay" onClick={onClose}>
			<div className="command-palette" onClick={(e) => e.stopPropagation()}>
				<input
					className="command-palette-input"
					placeholder="Search or run a command..."
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					autoFocus
				/>
				<div style={{ maxHeight: 320, overflowY: "auto" }}>
					{sections.map((sec) => (
						<div key={sec.section}>
							<div className="command-palette-section">{sec.section}</div>
							{sec.items.map((item) => {
								const currentIdx = idx++;
								return (
									<div
										key={item.id}
										className={`command-palette-item ${selected === currentIdx ? "selected" : ""}`}
										onClick={() => {
											if (item.id && !["export", "invite"].includes(item.id)) onNavigate(item.id);
											onClose();
										}}
										onMouseEnter={() => setSelected(currentIdx)}
									>
										<Icon name={item.icon} size={14} />
										{item.label}
									</div>
								);
							})}
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
