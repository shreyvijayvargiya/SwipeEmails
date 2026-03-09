import dynamic from "next/dynamic";
import AdminLayout from "../../app/admin/AdminLayout";
import OverviewPage from "../../app/admin/components/pages/OverviewPage";

export default function AdminIndexPage() {
	return (
		<AdminLayout>
			<OverviewPage />
		</AdminLayout>
	);
}
