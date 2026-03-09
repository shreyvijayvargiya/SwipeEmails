export default function CustomTooltip({ active, payload, label }) {
	if (!active || !payload?.length) return null;
	return (
		<div className="custom-tooltip">
			<div style={{ color: "var(--text3)", marginBottom: 4 }}>{label}</div>
			{payload.map((p, i) => (
				<div key={i} style={{ color: p.color || "var(--accent)" }}>
					{p.name}:{" "}
					<strong>
						{typeof p.value === "number" && p.name?.toLowerCase().includes("mrr")
							? `$${p.value.toLocaleString()}`
							: p.value}
					</strong>
				</div>
			))}
		</div>
	);
}
