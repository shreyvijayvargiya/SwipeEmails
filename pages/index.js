import { useEffect } from "react";
import { useRouter } from "next/router";

export default function IndexPage() {
	const router = useRouter();
	useEffect(() => {
		if (router.isReady) {
			router.replace("/admin");
		}
	}, [router]);
	return (
		<div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#080b0f", color: "#8b949e", fontFamily: "monospace" }}>
			Redirecting to admin...
		</div>
	);
}
