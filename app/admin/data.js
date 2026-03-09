export const revenueData = [
	{ month: "Jan", mrr: 1200, arr: 14400, churn: 2 },
	{ month: "Feb", mrr: 1850, arr: 22200, churn: 1 },
	{ month: "Mar", mrr: 2400, arr: 28800, churn: 3 },
	{ month: "Apr", mrr: 2100, arr: 25200, churn: 4 },
	{ month: "May", mrr: 3200, arr: 38400, churn: 1 },
	{ month: "Jun", mrr: 3800, arr: 45600, churn: 2 },
	{ month: "Jul", mrr: 4200, arr: 50400, churn: 0 },
	{ month: "Aug", mrr: 5100, arr: 61200, churn: 3 },
	{ month: "Sep", mrr: 5800, arr: 69600, churn: 1 },
	{ month: "Oct", mrr: 6400, arr: 76800, churn: 2 },
	{ month: "Nov", mrr: 7200, arr: 86400, churn: 1 },
	{ month: "Dec", mrr: 8100, arr: 97200, churn: 2 },
];

export const visitorData = [
	{ day: "Mon", visitors: 420, signups: 18 },
	{ day: "Tue", visitors: 580, signups: 24 },
	{ day: "Wed", visitors: 390, signups: 14 },
	{ day: "Thu", visitors: 720, signups: 31 },
	{ day: "Fri", visitors: 850, signups: 42 },
	{ day: "Sat", visitors: 310, signups: 11 },
	{ day: "Sun", visitors: 240, signups: 8 },
];

export const planData = [
	{ name: "Starter", value: 38, color: "#3b82f6" },
	{ name: "Pro", value: 45, color: "#10b981" },
	{ name: "Enterprise", value: 17, color: "#f59e0b" },
];

export const users = [
	{ id: 1, name: "Alex Rivera", email: "alex@startupco.io", plan: "Pro", status: "active", mrr: 49, joined: "2024-01-12", country: "🇺🇸" },
	{ id: 2, name: "Priya Sharma", email: "priya@devstudio.com", plan: "Enterprise", status: "active", mrr: 199, joined: "2024-02-03", country: "🇮🇳" },
	{ id: 3, name: "Luca Moretti", email: "luca@indie.build", plan: "Starter", status: "active", mrr: 9, joined: "2024-02-18", country: "🇮🇹" },
	{ id: 4, name: "Sarah Chen", email: "sarah@launchfast.co", plan: "Pro", status: "churned", mrr: 0, joined: "2024-01-05", country: "🇨🇳" },
	{ id: 5, name: "Marcus Webb", email: "marcus@solofounder.xyz", plan: "Pro", status: "active", mrr: 49, joined: "2024-03-01", country: "🇬🇧" },
	{ id: 6, name: "Yuki Tanaka", email: "yuki@buildinpublic.jp", plan: "Starter", status: "trial", mrr: 0, joined: "2024-03-10", country: "🇯🇵" },
	{ id: 7, name: "Omar Hassan", email: "omar@hackersclub.io", plan: "Enterprise", status: "active", mrr: 199, joined: "2024-01-28", country: "🇪🇬" },
	{ id: 8, name: "Nina Kowalski", email: "nina@shipfast.dev", plan: "Pro", status: "active", mrr: 49, joined: "2024-02-14", country: "🇵🇱" },
	{ id: 9, name: "James Okafor", email: "james@makermind.co", plan: "Starter", status: "trial", mrr: 0, joined: "2024-03-15", country: "🇳🇬" },
	{ id: 10, name: "Elena Vasquez", email: "elena@buildspace.mx", plan: "Pro", status: "active", mrr: 49, joined: "2024-02-22", country: "🇲🇽" },
];

export const notifications = [
	{ id: 1, type: "signup", title: "New signup", desc: "Yuki Tanaka just signed up for a free trial", time: "2m ago", read: false },
	{ id: 2, type: "upgrade", title: "Plan upgrade", desc: "Marcus Webb upgraded from Starter → Pro", time: "1h ago", read: false },
	{ id: 3, type: "churn", title: "Subscription cancelled", desc: "Sarah Chen cancelled their Pro subscription", time: "3h ago", read: false },
	{ id: 4, type: "payment", title: "Payment failed", desc: "Payment retry failed for invoice #INV-2891", time: "5h ago", read: true },
	{ id: 5, type: "milestone", title: "MRR milestone", desc: "Congratulations! You crossed $8,000 MRR 🎉", time: "1d ago", read: true },
	{ id: 6, type: "signup", title: "New signup", desc: "James Okafor joined on the Starter plan", time: "1d ago", read: true },
	{ id: 7, type: "payment", title: "Payment received", desc: "$199 from Omar Hassan — Enterprise renewal", time: "2d ago", read: true },
	{ id: 8, type: "upgrade", title: "Plan upgrade", desc: "Elena Vasquez moved from Starter → Pro", time: "3d ago", read: true },
];

export const roadmapItems = [
	{ id: "r1", title: "AI-powered email suggestions", status: "planned", priority: "high" },
	{ id: "r2", title: "Bulk export to CSV", status: "planned", priority: "medium" },
	{ id: "r3", title: "Custom branding for templates", status: "in_progress", priority: "high" },
	{ id: "r4", title: "Slack integration", status: "in_progress", priority: "medium" },
	{ id: "r5", title: "Dark mode support", status: "done", priority: "high" },
	{ id: "r6", title: "Command palette (⌘K)", status: "done", priority: "medium" },
];

export const changelogEntries = [
	{ version: "2.1.0", date: "2024-03-06", items: ["Command palette", "Theme toggle", "New admin pages"] },
	{ version: "2.0.0", date: "2024-02-15", items: ["Redesigned dashboard", "Analytics overhaul"] },
	{ version: "1.9.0", date: "2024-01-20", items: ["Team management", "Audit logs"] },
];

export const supportTickets = [
	{ id: "TKT-101", subject: "Can't export emails", user: "Alex Rivera", status: "open", priority: "high", created: "2h ago" },
	{ id: "TKT-102", subject: "Billing question", user: "Priya Sharma", status: "in_progress", priority: "medium", created: "5h ago" },
	{ id: "TKT-103", subject: "API rate limit", user: "Marcus Webb", status: "resolved", priority: "low", created: "1d ago" },
];

export const affiliateData = [
	{ id: 1, name: "Tech Blog", referrals: 42, conversions: 12, earnings: 360, status: "active" },
	{ id: 2, name: "YouTube Channel", referrals: 128, conversions: 28, earnings: 840, status: "active" },
	{ id: 3, name: "Newsletter", referrals: 56, conversions: 8, earnings: 240, status: "pending" },
];

export const teamMembers = [
	{ id: 1, name: "Shrey", email: "shrey@inkgest.io", role: "Admin", status: "active" },
	{ id: 2, name: "Alex", email: "alex@inkgest.io", role: "Editor", status: "active" },
	{ id: 3, name: "Jordan", email: "jordan@inkgest.io", role: "Viewer", status: "invited" },
];

export const auditLogs = [
	{ id: 1, user: "Shrey", action: "Updated settings", target: "API Keys", time: "10m ago", ip: "192.168.1.1" },
	{ id: 2, user: "Alex", action: "Exported users", target: "CSV", time: "1h ago", ip: "10.0.0.5" },
	{ id: 3, user: "Shrey", action: "Invited team member", target: "Jordan", time: "2h ago", ip: "192.168.1.1" },
	{ id: 4, user: "Shrey", action: "Changed plan", target: "Priya Sharma → Pro", time: "3h ago", ip: "192.168.1.1" },
];

export const onboardingSteps = [
	{ id: 1, title: "Connect your email provider", done: true },
	{ id: 2, title: "Import your first templates", done: true },
	{ id: 3, title: "Set up team members", done: false },
	{ id: 4, title: "Configure billing", done: true },
	{ id: 5, title: "Enable analytics", done: false },
];

export const invoices = [
	{ id: "INV-2901", customer: "Omar Hassan", plan: "Enterprise", amount: 199, status: "paid", date: "2024-03-01" },
	{ id: "INV-2900", customer: "Priya Sharma", plan: "Enterprise", amount: 199, status: "paid", date: "2024-03-01" },
	{ id: "INV-2899", customer: "Marcus Webb", plan: "Pro", amount: 49, status: "paid", date: "2024-03-01" },
	{ id: "INV-2898", customer: "Alex Rivera", plan: "Pro", amount: 49, status: "paid", date: "2024-03-01" },
	{ id: "INV-2897", customer: "Nina Kowalski", plan: "Pro", amount: 49, status: "paid", date: "2024-03-01" },
	{ id: "INV-2896", customer: "Elena Vasquez", plan: "Pro", amount: 49, status: "paid", date: "2024-03-01" },
	{ id: "INV-2891", customer: "Unknown User", plan: "Pro", amount: 49, status: "failed", date: "2024-02-28" },
	{ id: "INV-2885", customer: "Luca Moretti", plan: "Starter", amount: 9, status: "paid", date: "2024-02-28" },
];
