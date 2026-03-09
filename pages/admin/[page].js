import AdminLayout from "../../app/admin/AdminLayout";
import {
	OverviewPage,
	AnalyticsPage,
	UsersPage,
	BillingPage,
	RoadmapPage,
	SupportPage,
	AffiliatesPage,
	TeamPage,
	AuditLogsPage,
	OnboardingPage,
	NotificationsPage,
	SettingsPage,
} from "../../app/admin/components/pages";

const PAGES = {
	overview: OverviewPage,
	analytics: AnalyticsPage,
	users: UsersPage,
	billing: BillingPage,
	roadmap: RoadmapPage,
	support: SupportPage,
	affiliates: AffiliatesPage,
	team: TeamPage,
	audit: AuditLogsPage,
	onboarding: OnboardingPage,
	notifications: NotificationsPage,
	settings: SettingsPage,
};

export default function AdminPageRoute({ page }) {
	const PageComponent = PAGES[page] || OverviewPage;
	return (
		<AdminLayout>
			<PageComponent />
		</AdminLayout>
	);
}

export function getServerSideProps({ params }) {
	const page = params?.page || "overview";
	return { props: { page } };
}
