import { affiliateData } from "../data";
import Icon from "./Icon";

export default function AffiliatesPage() {
	return (
		<div className="animate-in">
			<div className="page-header">
				<div className="page-title">Affiliate Program</div>
				<div className="page-desc">
					Referral links, conversions, and payouts
				</div>
			</div>
			<div
				className="stats-grid"
				style={{ gridTemplateColumns: "repeat(4,1fr)" }}
			>
				{[
					{ label: "Total Referrals", value: "226" },
					{ label: "Conversations", value: "48" },
					{ label: "Total Earnings", value: "$1,440" },
					{ label: "Active Affiliates", value: "3" },
				].map((s, i) => (
					<div key={i} className="stat-card">
						<div className="stat-value">{s.value}</div>
						<div className="stat-label">{s.label}</div>
					</div>
				))}
			</div>
			<div className="card">
				<div className="card-header">
					<div className="card-title">Affiliate Partners</div>
					<button className="btn btn-primary">
						<Icon name="plus" size={12} /> Add Affiliate
					</button>
				</div>
				<div className="table-wrap">
					<table>
						<thead>
							<tr>
								<th>Partner</th>
								<th>Referrals</th>
								<th>Conversions</th>
								<th>Earnings</th>
								<th>Status</th>
							</tr>
						</thead>
						<tbody>
							{affiliateData.map((a) => (
								<tr key={a.id}>
									<td style={{ color: "var(--text)", fontWeight: 500 }}>
										{a.name}
									</td>
									<td>{a.referrals}</td>
									<td>{a.conversions}</td>
									<td style={{ color: "var(--green)" }}>${a.earnings}</td>
									<td>
										<span
											className={`badge badge-${a.status === "active" ? "green" : "yellow"}`}
										>
											{a.status}
										</span>
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
