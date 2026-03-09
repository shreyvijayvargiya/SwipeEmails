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
import { revenueData, visitorData, planData, users } from "../../data";

export default function OverviewPage() {
	const stats = [
		{
			label: "Monthly Recurring Revenue",
			value: "$8,100",
			change: "+12.5%",
			up: true,
			icon: "dollar",
			accentColor: "var(--accent)",
			iconBg: "rgba(0,212,170,0.1)",
			iconColor: "var(--accent)",
		},
		{
			label: "Active Subscribers",
			value: "247",
			change: "+8.3%",
			up: true,
			icon: "users",
			accentColor: "var(--blue)",
			iconBg: "rgba(88,166,255,0.1)",
			iconColor: "var(--blue)",
		},
		{
			label: "Churn Rate",
			value: "2.1%",
			change: "-0.4%",
			up: true,
			icon: "trending",
			accentColor: "var(--green)",
			iconBg: "rgba(63,185,80,0.1)",
			iconColor: "var(--green)",
		},
		{
			label: "Avg Revenue / User",
			value: "$32.8",
			change: "+4.1%",
			up: true,
			icon: "zap",
			accentColor: "var(--yellow)",
			iconBg: "rgba(210,153,34,0.1)",
			iconColor: "var(--yellow)",
		},
	];
	const recent = users.slice(0, 5);

	return (
		<div className="animate-in">
			<div className="page-header">
				<div className="page-title">Overview</div>
				<div className="page-desc">
					Welcome back, Shrey. Here's what's happening with your SaaS.
				</div>
			</div>
			<div className="stats-grid">
				{stats.map((s, i) => (
					<div
						key={i}
						className="stat-card"
						style={{ "--accent-color": s.accentColor }}
					>
						<div
							className="stat-icon"
							style={{ background: s.iconBg, color: s.iconColor }}
						>
							<Icon name={s.icon} size={16} />
						</div>
						<div className="stat-value">{s.value}</div>
						<div className="stat-label">{s.label}</div>
						<div className={`stat-change ${s.up ? "up" : "down"}`}>
							{s.up ? "↑" : "↓"} {s.change} vs last month
						</div>
					</div>
				))}
			</div>
			<div className="card" style={{ marginBottom: 24 }}>
				<div className="card-header">
					<div>
						<div className="card-title">Revenue Goal</div>
						<div className="card-subtitle">$8,100 / $10,000 monthly target</div>
					</div>
					<span className="badge badge-green">81%</span>
				</div>
				<div className="revenue-goal-bar">
					<div className="revenue-goal-fill" style={{ width: "81%" }} />
				</div>
			</div>
			<div className="charts-grid">
				<div className="card">
					<div className="card-header">
						<div>
							<div className="card-title">MRR Growth</div>
							<div className="card-subtitle">
								Monthly Recurring Revenue — last 12 months
							</div>
						</div>
						<span className="badge badge-green">↑ $8,100</span>
					</div>
					<ResponsiveContainer width="100%" height={220}>
						<AreaChart data={revenueData}>
							<defs>
								<linearGradient id="mrrGrad" x1="0" y1="0" x2="0" y2="1">
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
								dataKey="mrr"
								stroke="#00d4aa"
								strokeWidth={2}
								fill="url(#mrrGrad)"
								name="MRR"
							/>
						</AreaChart>
					</ResponsiveContainer>
				</div>
				<div className="card">
					<div className="card-header">
						<div>
							<div className="card-title">Plan Distribution</div>
							<div className="card-subtitle">Current subscribers by plan</div>
						</div>
					</div>
					<ResponsiveContainer width="100%" height={160}>
						<PieChart>
							<Pie
								data={planData}
								cx="50%"
								cy="50%"
								innerRadius={45}
								outerRadius={70}
								paddingAngle={4}
								dataKey="value"
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
							gap: 6,
							marginTop: 8,
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
										width: 8,
										height: 8,
										borderRadius: "50%",
										background: p.color,
										flexShrink: 0,
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
			<div className="grid-2">
				<div className="card">
					<div className="card-header">
						<div className="card-title">Recent Signups</div>
						<button className="btn btn-ghost text-xs">View all →</button>
					</div>
					{recent.map((u, i) => (
						<div key={i} className="activity-item">
							<div
								className="avatar"
								style={{ width: 28, height: 28, fontSize: 11 }}
							>
								{u.name[0]}
							</div>
							<div style={{ flex: 1 }}>
								<div
									style={{
										fontSize: 12,
										color: "var(--text)",
										marginBottom: 2,
									}}
								>
									{u.name}
								</div>
								<div style={{ fontSize: 10, color: "var(--text3)" }}>
									{u.email}
								</div>
							</div>
							<div
								style={{
									display: "flex",
									flexDirection: "column",
									alignItems: "flex-end",
									gap: 4,
								}}
							>
								<span
									className={`badge ${u.plan === "Enterprise" ? "badge-yellow" : u.plan === "Pro" ? "badge-blue" : "badge-purple"}`}
								>
									{u.plan}
								</span>
								<span style={{ fontSize: 10, color: "var(--text3)" }}>
									{u.joined}
								</span>
							</div>
						</div>
					))}
				</div>
				<div className="card">
					<div className="card-header">
						<div className="card-title">Weekly Traffic</div>
						<div className="card-subtitle">Visitors & signups this week</div>
					</div>
					<ResponsiveContainer width="100%" height={200}>
						<BarChart data={visitorData} barSize={14}>
							<CartesianGrid
								strokeDasharray="3 3"
								stroke="var(--border)"
								vertical={false}
							/>
							<XAxis
								dataKey="day"
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
							/>
							<Tooltip content={<CustomTooltip />} />
							<Bar
								dataKey="visitors"
								fill="#58a6ff"
								opacity={0.7}
								radius={[3, 3, 0, 0]}
								name="Visitors"
							/>
							<Bar
								dataKey="signups"
								fill="#00d4aa"
								radius={[3, 3, 0, 0]}
								name="Signups"
							/>
						</BarChart>
					</ResponsiveContainer>
				</div>
			</div>
		</div>
	);
}
