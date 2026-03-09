import { useState } from "react";
import {
	AreaChart,
	Area,
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
	PieChart,
	Pie,
	Cell,
} from "recharts";
import Icon from "../Icon";
import CustomTooltip from "../CustomTooltip";
import { revenueData, visitorData, planData } from "../../data";

export default function AnalyticsPage() {
	const [period, setPeriod] = useState("12m");

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
					<div className="page-title">Analytics</div>
					<div className="page-desc">
						Revenue, growth, and user behavior metrics
					</div>
				</div>
				<div style={{ display: "flex", gap: 4 }}>
					{["7d", "30d", "3m", "12m"].map((p) => (
						<button
							key={p}
							className={`btn ${period === p ? "btn-primary" : "btn-secondary"}`}
							style={{ padding: "5px 10px", fontSize: 11 }}
							onClick={() => setPeriod(p)}
						>
							{p}
						</button>
					))}
				</div>
			</div>
			<div
				className="stats-grid"
				style={{ gridTemplateColumns: "repeat(4,1fr)" }}
			>
				{[
					{
						label: "Total Revenue",
						value: "$48,300",
						change: "+21%",
						up: true,
					},
					{ label: "New MRR", value: "+$2,100", change: "+15%", up: true },
					{ label: "Expansion MRR", value: "+$840", change: "+33%", up: true },
					{ label: "Churned MRR", value: "-$390", change: "-8%", up: false },
				].map((s, i) => (
					<div
						key={i}
						className="stat-card"
						style={{ "--accent-color": s.up ? "var(--green)" : "var(--red)" }}
					>
						<div className="stat-value" style={{ fontSize: 22 }}>
							{s.value}
						</div>
						<div className="stat-label">{s.label}</div>
						<div className={`stat-change ${s.up ? "up" : "down"}`}>
							{s.change} this period
						</div>
					</div>
				))}
			</div>
			<div className="card mb-6">
				<div className="card-header">
					<div>
						<div className="card-title">Revenue Breakdown</div>
						<div className="card-subtitle">MRR vs ARR over time</div>
					</div>
					<button className="btn btn-secondary">
						<Icon name="download" size={12} /> Export
					</button>
				</div>
				<ResponsiveContainer width="100%" height={260}>
					<AreaChart data={revenueData}>
						<defs>
							<linearGradient id="arrGrad" x1="0" y1="0" x2="0" y2="1">
								<stop offset="5%" stopColor="#58a6ff" stopOpacity={0.2} />
								<stop offset="95%" stopColor="#58a6ff" stopOpacity={0} />
							</linearGradient>
							<linearGradient id="mrrGrad2" x1="0" y1="0" x2="0" y2="1">
								<stop offset="5%" stopColor="#00d4aa" stopOpacity={0.2} />
								<stop offset="95%" stopColor="#00d4aa" stopOpacity={0} />
							</linearGradient>
						</defs>
						<CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
						<XAxis
							dataKey="month"
							tick={{
								fill: "var(--text3)",
								fontSize: 10,
								fontFamily: "JetBrains Mono",
							}}
							axisLine={false}
							tickLine={false}
						/>
						<YAxis
							tick={{
								fill: "var(--text3)",
								fontSize: 10,
								fontFamily: "JetBrains Mono",
							}}
							axisLine={false}
							tickLine={false}
							tickFormatter={(v) => `$${v / 1000}k`}
						/>
						<Tooltip content={<CustomTooltip />} />
						<Area
							type="monotone"
							dataKey="arr"
							stroke="#58a6ff"
							strokeWidth={2}
							fill="url(#arrGrad)"
							name="ARR"
						/>
						<Area
							type="monotone"
							dataKey="mrr"
							stroke="#00d4aa"
							strokeWidth={2}
							fill="url(#mrrGrad2)"
							name="MRR"
						/>
					</AreaChart>
				</ResponsiveContainer>
			</div>
			<div className="charts-grid-3">
				<div className="card">
					<div className="card-header">
						<div className="card-title">Signups</div>
						<div className="card-subtitle">New users per week</div>
					</div>
					<ResponsiveContainer width="100%" height={140}>
						<BarChart data={visitorData} barSize={14}>
							<XAxis
								dataKey="day"
								tick={{ fill: "var(--text3)", fontSize: 9 }}
								axisLine={false}
								tickLine={false}
							/>
							<Tooltip content={<CustomTooltip />} />
							<Bar
								dataKey="signups"
								fill="#00d4aa"
								radius={[3, 3, 0, 0]}
								name="Signups"
							/>
						</BarChart>
					</ResponsiveContainer>
				</div>
				<div className="card">
					<div className="card-header">
						<div className="card-title">Churn Events</div>
						<div className="card-subtitle">Monthly cancellations</div>
					</div>
					<ResponsiveContainer width="100%" height={140}>
						<BarChart data={revenueData} barSize={14}>
							<XAxis
								dataKey="month"
								tick={{ fill: "var(--text3)", fontSize: 9 }}
								axisLine={false}
								tickLine={false}
							/>
							<Tooltip content={<CustomTooltip />} />
							<Bar
								dataKey="churn"
								fill="#f85149"
								radius={[3, 3, 0, 0]}
								name="Churn"
							/>
						</BarChart>
					</ResponsiveContainer>
				</div>
				<div className="card">
					<div className="card-header">
						<div className="card-title">Plan Distribution</div>
					</div>
					<ResponsiveContainer width="100%" height={100}>
						<PieChart>
							<Pie
								data={planData}
								cx="50%"
								cy="50%"
								outerRadius={45}
								dataKey="value"
								paddingAngle={3}
							>
								{planData.map((entry, i) => (
									<Cell key={i} fill={entry.color} />
								))}
							</Pie>
							<Tooltip
								content={({ active, payload }) =>
									active && payload?.length ? (
										<div className="custom-tooltip">
											{payload[0].name}: <strong>{payload[0].value}%</strong>
										</div>
									) : null
								}
							/>
						</PieChart>
					</ResponsiveContainer>
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							gap: 5,
							marginTop: 6,
						}}
					>
						{planData.map((p, i) => (
							<div
								key={i}
								style={{
									display: "flex",
									alignItems: "center",
									gap: 8,
									fontSize: 11,
								}}
							>
								<div
									style={{
										width: 7,
										height: 7,
										borderRadius: "50%",
										background: p.color,
									}}
								/>
								<span style={{ color: "var(--text2)", flex: 1 }}>{p.name}</span>
								<span
									style={{
										color: "var(--text)",
										fontFamily: "var(--font-mono)",
									}}
								>
									{p.value}%
								</span>
							</div>
						))}
					</div>
				</div>
			</div>
			<div className="card">
				<div className="card-header">
					<div className="card-title">Funnel Analysis</div>
					<div className="card-subtitle">
						Visit → Signup → Trial → Paid conversion
					</div>
				</div>
				<div className="funnel-row" style={{ display: "flex", gap: 16, marginTop: 8, flexWrap: "wrap" }}>
					{[
						{
							stage: "Visitors",
							count: "12,480",
							pct: "100%",
							color: "var(--blue)",
						},
						{
							stage: "Signups",
							count: "1,248",
							pct: "10.0%",
							color: "var(--purple)",
						},
						{
							stage: "Trial Start",
							count: "623",
							pct: "49.9%",
							color: "var(--yellow)",
						},
						{
							stage: "Paid Convert",
							count: "247",
							pct: "39.6%",
							color: "var(--accent)",
						},
					].map((f, i) => (
						<div
							key={i}
							style={{
								flex: 1,
								background: "var(--surface2)",
								border: "1px solid var(--border)",
								borderRadius: "var(--radius-lg)",
								padding: 16,
								borderTop: `3px solid ${f.color}`,
							}}
						>
							<div
								style={{
									fontSize: 10,
									color: "var(--text3)",
									marginBottom: 6,
									letterSpacing: "0.06em",
									textTransform: "uppercase",
								}}
							>
								{f.stage}
							</div>
							<div
								style={{
									fontFamily: "var(--font-display)",
									fontSize: 24,
									fontWeight: 800,
									color: "var(--text)",
									letterSpacing: "-0.03em",
								}}
							>
								{f.count}
							</div>
							<div style={{ fontSize: 11, color: f.color, marginTop: 4 }}>
								{f.pct} conversion
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
