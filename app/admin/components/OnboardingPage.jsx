import Icon from "./Icon";
import { onboardingSteps } from "../data";

export default function OnboardingPage() {
	const doneCount = onboardingSteps.filter((s) => s.done).length;
	const pct = Math.round((doneCount / onboardingSteps.length) * 100);

	return (
		<div className="animate-in">
			<div className="page-header">
				<div className="page-title">Getting Started</div>
				<div className="page-desc">
					Complete these steps to get the most out of Inkgest
				</div>
			</div>
			<div className="card" style={{ marginBottom: 24 }}>
				<div className="card-header">
					<div>
						<div className="card-title">Setup Progress</div>
						<div className="card-subtitle">
							{doneCount} of {onboardingSteps.length} completed
						</div>
					</div>
					<span className="badge badge-green">{pct}%</span>
				</div>
				<div className="revenue-goal-bar">
					<div className="revenue-goal-fill" style={{ width: `${pct}%` }} />
				</div>
			</div>
			<div className="card">
				<div className="card-header">
					<div className="card-title">Checklist</div>
				</div>
				{onboardingSteps.map((step) => (
					<div
						key={step.id}
						style={{
							display: "flex",
							alignItems: "center",
							gap: 12,
							padding: "12px 0",
							borderBottom: "1px solid var(--border)",
						}}
					>
						<div
							style={{
								width: 24,
								height: 24,
								borderRadius: "50%",
								background: step.done ? "var(--green)" : "var(--surface2)",
								border: step.done ? "none" : "1px solid var(--border)",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								color: step.done ? "white" : "var(--text3)",
							}}
						>
							{step.done && <Icon name="check" size={14} />}
						</div>
						<span
							style={{
								color: step.done ? "var(--text3)" : "var(--text)",
								textDecoration: step.done ? "line-through" : "none",
							}}
						>
							{step.title}
						</span>
						{step.done && (
							<span
								className="badge badge-green"
								style={{ marginLeft: "auto" }}
							>
								Done
							</span>
						)}
						{!step.done && (
							<button
								className="btn btn-primary"
								style={{ marginLeft: "auto", fontSize: 11 }}
							>
								Start
							</button>
						)}
					</div>
				))}
			</div>
		</div>
	);
}
