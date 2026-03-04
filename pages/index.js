import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Fuse from "fuse.js";

const GUMROAD_URL = "https://shreyvijayvargiya.gumroad.com/l/swipe-emails";

const CATEGORY_TAGS = [
	"All",
	"Welcome",
	"Onboarding",
	"Transactional",
	"Newsletter",
	"Marketing",
	"Promotional",
	"Re-engagement",
	"Newsletters",
	"Feedback",
	"Reviews",
];

const TICKER_ITEMS = [
	"STRIPE",
	"NOTION",
	"LINEAR",
	"FIGMA",
	"VERCEL",
	"SHOPIFY",
	"AIRBNB",
	"DROPBOX",
	"INTERCOM",
	"SLACK",
	"GITHUB",
	"LOOM",
];

function ImageModal({ image, onClose }) {
  if (!image) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="relative max-w-[95vw] max-h-[95vh] overflow-hidden rounded-2xl bg-white shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/90 hover:bg-white flex items-center justify-center text-slate-600 hover:text-slate-800 shadow-lg transition-colors"
          aria-label="Close"
        >
          ✕
        </button>

        <div className="flex-1 overflow-auto">
          <img
            src={image.src}
            alt={image.title || image.name}
            className="w-full h-auto block"
            style={{ maxHeight: "90vh" }}
          />
          <div className="p-4 text-center">
            <div className="text-sm font-medium text-slate-700 truncate max-w-full">
              {image.title || image.name}
            </div>
            {image.description && (
              <div className="text-xs text-slate-500 mt-1 max-w-md mx-auto">{image.description}</div>
            )}
            <div className="text-xs text-slate-400 mt-0.5">{image.category}</div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function App() {
	const [emails, setEmails] = useState([]);
	const [loading, setLoading] = useState(true);
	const [searchQuery, setSearchQuery] = useState("");
	const [activeTag, setActiveTag] = useState("All");
	const [filteredEmails, setFilteredEmails] = useState([]);
	const [selectedImage, setSelectedImage] = useState(null);
	const fuseRef = useRef(null);

	useEffect(() => {
		fetch("/emails.json")
			.then((res) => res.json())
			.then((data) => {
				const list = data.emails || [];
				setEmails(list);
				setFilteredEmails(list);
				fuseRef.current = new Fuse(list, {
					keys: ["title", "description", "category", "name", "company"],
					threshold: 0.3,
				});
			})
			.catch(() => setEmails([]))
			.finally(() => setLoading(false));
	}, []);

	useEffect(() => {
		let result = emails;
		if (searchQuery.trim()) {
			result =
				fuseRef.current?.search(searchQuery).map((r) => r.item) ?? emails;
		}
		if (activeTag !== "All") {
			const tagLower = activeTag.toLowerCase();
			result = result.filter((e) => {
				const cat = (e.category || "").toLowerCase();
				if (tagLower === "newsletter") return cat === "newsletters";
				if (tagLower === "promotional") return cat === "marketing";
				if (tagLower === "welcome") return cat === "onboarding";
				return cat === tagLower;
			});
		}
		setFilteredEmails(result);
	}, [searchQuery, activeTag, emails]);

	useEffect(() => {
		const handleEscape = (e) => {
			if (e.key === "Escape") setSelectedImage(null);
		};
		if (selectedImage) {
			document.addEventListener("keydown", handleEscape);
			document.body.style.overflow = "hidden";
		}
		return () => {
			document.removeEventListener("keydown", handleEscape);
			document.body.style.overflow = "";
		};
	}, [selectedImage]);

	const count = emails.length;

	return (
		<div
			className="min-h-screen overflow-x-hidden"
			style={{
				background: "#0a0a08",
				color: "#f0efe8",
				fontFamily: "'Bricolage Grotesque', sans-serif",
			}}
		>
			<link
				href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Mono:wght@400;500&family=Bricolage+Grotesque:wght@400;500;600;700;800&display=swap"
				rel="stylesheet"
			/>

			<style jsx global>{`
				html {
					scroll-behavior: smooth;
				}
				@keyframes ticker {
					from {
						transform: translateX(0);
					}
					to {
						transform: translateX(-50%);
					}
				}
				.ticker-animate {
					animation: ticker 25s linear infinite;
				}
			`}</style>

			{/* NAV */}
			<nav
				className="fixed top-0 left-0 right-0 z-[20] flex items-center justify-between px-6 md:px-10 py-4"
				style={{
					background: "rgba(10,10,8,0.85)",
					backdropFilter: "blur(12px)",
					borderBottom: "1px solid #2a2a26",
				}}
			>
				<a
					href="#"
					className="flex items-center gap-2 no-underline"
					style={{
						color: "#f0efe8",
						fontFamily: "'Instrument Serif', serif",
						fontSize: 22,
					}}
				>
					<span className="w-2 h-2 rounded-full bg-[#e8ff47]" />
					SwipeEmails
				</a>
				<a
					href={GUMROAD_URL}
					target="_blank"
					rel="noopener noreferrer"
					className="font-medium text-[#0a0a08] text-xs py-2.5 px-5 rounded-md no-underline"
					style={{ background: "#e8ff47", fontFamily: "'DM Mono', monospace" }}
				>
					Get Access →
				</a>
			</nav>

			{/* HERO */}
			<section
				className="min-h-screen flex flex-col items-center justify-center text-center pt-28 pb-16 px-6 relative overflow-hidden"
				style={{
					background:
						"radial-gradient(ellipse 80% 50% at 50% 0%, rgba(232,255,71,0.07) 0%, transparent 60%), radial-gradient(ellipse 40% 40% at 80% 60%, rgba(255,107,53,0.05) 0%, transparent 50%)",
				}}
			>
				<div
					className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-8 text-xs"
					style={{
						background: "#1a1a18",
						border: "1px solid #2a2a26",
						color: "#888880",
						fontFamily: "'DM Mono', monospace",
					}}
				>
					✦ <span style={{ color: "#e8ff47" }}>{count}+ curated templates</span>{" "}
					from the world&apos;s best brands
				</div>
				<h1
					className="text-5xl md:text-7xl lg:text-8xl font-normal leading-none max-w-[900px] mb-6"
					style={{ fontFamily: "'Instrument Serif', serif" }}
				>
					Steal emails from
					<br />
					<em style={{ color: "#e8ff47" }}>top companies.</em>
				</h1>
				<p className="text-lg text-[#888880] max-w-[520px] leading-relaxed mb-12">
					{count}+ hand-picked email templates from Stripe, Notion, Linear, and
					100+ more. Search instantly, get the HTML, ship faster.
				</p>
				<div className="flex gap-3 flex-wrap justify-center">
					<a
						href={GUMROAD_URL}
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center gap-2 font-bold text-[#0a0a08] text-base py-4 px-8 rounded-xl no-underline"
						style={{ background: "#e8ff47" }}
					>
						⚡ Get Lifetime Access — $29
					</a>
					<a
						href="#templates"
						className="inline-flex items-center gap-2 font-medium text-base py-4 px-8 rounded-xl no-underline border border-[#2a2a26] text-[#f0efe8] hover:border-[#888880] transition-colors"
					>
						Browse templates ↓
					</a>
				</div>
				<div className="flex gap-10 mt-16">
					<div className="text-center">
						<div
							className="text-4xl font-normal"
							style={{ fontFamily: "'Instrument Serif', serif" }}
						>
							{count}
							<span style={{ color: "#e8ff47" }}>+</span>
						</div>
						<div
							className="text-xs text-[#888880] mt-1"
							style={{ fontFamily: "'DM Mono', monospace" }}
						>
							Templates
						</div>
					</div>
					<div className="text-center">
						<div
							className="text-4xl font-normal"
							style={{ fontFamily: "'Instrument Serif', serif" }}
						>
							100<span style={{ color: "#e8ff47" }}>+</span>
						</div>
						<div
							className="text-xs text-[#888880] mt-1"
							style={{ fontFamily: "'DM Mono', monospace" }}
						>
							Companies
						</div>
					</div>
					<div className="text-center">
						<div
							className="text-4xl font-normal"
							style={{ fontFamily: "'Instrument Serif', serif" }}
						>
							AI<span style={{ color: "#e8ff47" }}>✦</span>
						</div>
						<div
							className="text-xs text-[#888880] mt-1"
							style={{ fontFamily: "'DM Mono', monospace" }}
						>
							HTML Export
						</div>
					</div>
				</div>
			</section>

			<div className="mb-12 p-2 max-w-[600px] mx-auto">
				<div
					className="text-[11px] text-[#888880] uppercase tracking-wider mb-4"
					style={{ fontFamily: "'DM Mono', monospace" }}
				>
					// the collection
				</div>
				<h2
					className="text-4xl md:text-5xl font-normal"
					style={{ fontFamily: "'Instrument Serif', serif" }}
				>
					Every template you could <em style={{ color: "#e8ff47" }}>ever</em>{" "}
					need.
				</h2>
			</div>

			{/* TICKER */}
			<div className="border-t border-b border-[#2a2a26] overflow-hidden py-3 mt-12 mb-0">
				<div
					className="flex gap-12 ticker-animate whitespace-nowrap"
					style={{ width: "max-content" }}
				>
					{[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
						<div
							key={i}
							className="flex items-center gap-3 text-[11px] text-[#888880]"
							style={{ fontFamily: "'DM Mono', monospace" }}
						>
							{item} <span style={{ color: "#e8ff47" }}>✦</span>
						</div>
					))}
				</div>
			</div>

			{/* SEARCH */}
			<div className="max-w-[900px] mx-auto px-6 md:px-10 pt-10 pb-0">
				<div
					className="flex items-center gap-3 rounded-xl px-5 py-3.5 border border-[#2a2a26] transition-colors focus-within:border-[#e8ff47]"
					style={{ background: "#111110" }}
				>
					<span className="text-[#888880] text-lg">⌕</span>
					<input
						type="text"
						placeholder='Search "Stripe onboarding" or "SaaS welcome email"…'
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						className="flex-1 bg-transparent border-none outline-none text-[#f0efe8] text-base placeholder:text-[#888880]"
						style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
					/>
				</div>
				<div className="flex gap-2 flex-wrap mt-3 px-1">
					{CATEGORY_TAGS.map((tag) => (
						<button
							key={tag}
							onClick={() => setActiveTag(tag)}
							className={`px-3 py-1.5 rounded-full text-xs font-medium cursor-pointer transition-colors border ${
								activeTag === tag
									? "border-[#e8ff47] text-[#e8ff47]"
									: "border-[#2a2a26] text-[#888880] hover:border-[#e8ff47] hover:text-[#e8ff47]"
							}`}
							style={{ fontFamily: "'DM Mono', monospace" }}
						>
							{tag}
						</button>
					))}
				</div>
			</div>

			{/* WALL OF EMAILS */}
			<section className="max-w-[1400px] mx-auto px-6 py-20" id="templates">
				{loading ? (
					<div className="flex justify-center py-20">
						<div className="w-10 h-10 rounded-full border-2 border-[#e8ff47] border-t-transparent animate-spin" />
					</div>
				) : filteredEmails.length > 0 ? (
					<div
						className="columns-2 md:columns-3 lg:columns-4 xl:columns-5"
						style={{ columnGap: 12 }}
					>
						{filteredEmails.map((img, i) => (
							<div
								key={img.src || i}
								className="break-inside-avoid mb-3 rounded-xl overflow-hidden border border-[#2a2a26] cursor-pointer transition-all hover:-translate-y-1 hover:border-[#e8ff47]/30 group relative"
								style={{ background: "#141412" }}
								onClick={() => setSelectedImage(img)}
							>
								<img
									src={img.src}
									alt={img.title || img.name}
									className="w-full block object-cover object-top"
								/>
								<div
									className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"
									style={{ background: "rgba(10,10,8,0.75)" }}
								>
									<div
										className="flex items-center gap-1.5 font-bold text-xs text-[#0a0a08] py-2.5 px-4 rounded-md"
										style={{ background: "#e8ff47" }}
									>
										👁 Preview
									</div>
								</div>
							</div>
						))}
					</div>
				) : (
					<div className="text-center py-20 text-[#888880]">
						No templates match your search.
					</div>
				)}
			</section>

			{/* FEATURES */}
			<section className="max-w-[1200px] mx-auto px-6 md:px-10 py-20">
				<div
					className="grid grid-cols-1 md:grid-cols-3 gap-0.5 rounded-2xl overflow-hidden"
					style={{ background: "#2a2a26" }}
				>
					<div className="p-10" style={{ background: "#111110" }}>
						<span className="text-3xl block mb-5">⚡</span>
						<div className="text-xl font-bold mb-2.5">Vector Search</div>
						<div className="text-sm text-[#888880] leading-relaxed">
							Type anything — brand, vibe, use-case. Semantic search finds the
							right email instantly across {count}+ templates.
						</div>
						<span
							className="inline-block mt-4 text-[10px] text-[#e8ff47] px-2.5 py-1 rounded"
							style={{
								background: "rgba(232,255,71,0.08)",
								fontFamily: "'DM Mono', monospace",
							}}
						>
							AI-powered
						</span>
					</div>
					<div className="p-10" style={{ background: "#111110" }}>
						<span className="text-3xl block mb-5">{`</>`}</span>
						<div className="text-xl font-bold mb-2.5">Get the HTML</div>
						<div className="text-sm text-[#888880] leading-relaxed">
							Found one you love? Get clean, editable HTML instantly. Or ask AI
							to remix it in your brand&apos;s style.
						</div>
						<span
							className="inline-block mt-4 text-[10px] text-[#e8ff47] px-2.5 py-1 rounded"
							style={{
								background: "rgba(232,255,71,0.08)",
								fontFamily: "'DM Mono', monospace",
							}}
						>
							One click
						</span>
					</div>
					<div className="p-10" style={{ background: "#111110" }}>
						<span className="text-3xl block mb-5">✦</span>
						<div className="text-xl font-bold mb-2.5">AI Edits</div>
						<div className="text-sm text-[#888880] leading-relaxed">
							Describe what you want changed. Claude rewrites the copy, adjusts
							layout, applies your brand colors.
						</div>
						<span
							className="inline-block mt-4 text-[10px] text-[#e8ff47] px-2.5 py-1 rounded"
							style={{
								background: "rgba(232,255,71,0.08)",
								fontFamily: "'DM Mono', monospace",
							}}
						>
							Claude-powered
						</span>
					</div>
				</div>
			</section>

			{/* PRICING */}
			<section
				className="max-w-[900px] mx-auto px-6 md:px-10 py-20 text-center"
				id="pricing"
			>
				<div
					className="text-[11px] text-[#888880] uppercase tracking-wider mb-4"
					style={{ fontFamily: "'DM Mono', monospace" }}
				>
					// simple pricing
				</div>
				<h2
					className="text-4xl md:text-5xl font-normal mb-2"
					style={{ fontFamily: "'Instrument Serif', serif" }}
				>
					One price.
					<br />
					<em style={{ color: "#e8ff47" }}>Forever.</em>
				</h2>
				<p className="text-sm text-[#888880] mb-12">
					Pay once, get everything. No subscription.
				</p>

				<div className="max-w-md mx-auto">
					<div
						className="rounded-2xl p-10 md:p-12 text-left border border-[#e8ff47] relative"
						style={{
							background:
								"linear-gradient(135deg, rgba(232,255,71,0.04) 0%, #111110 60%)",
						}}
					>
						<div
							className="text-4xl font-normal mb-1"
							style={{ fontFamily: "'Instrument Serif', serif" }}
						>
							<sup className="text-2xl align-top mt-3">$</sup>29
						</div>
						<div
							className="text-[11px] text-[#888880] mb-7"
							style={{ fontFamily: "'DM Mono', monospace" }}
						>
							one-time · yours forever
						</div>
						<ul className="list-none mb-8 space-y-2">
							{[
								"400+ email templates",
								"Unlimited search",
								"HTML export",
								"AI-powered edits",
								"New templates monthly",
								"Lifetime updates",
							].map((item) => (
								<li
									key={item}
									className="flex items-center gap-2.5 py-2 border-b border-[#2a2a26] text-sm text-[#888880] last:border-0"
								>
									<span className="text-[#e8ff47] font-bold">✓</span> {item}
								</li>
							))}
						</ul>
						<a
							href={GUMROAD_URL}
							target="_blank"
							rel="noopener noreferrer"
							className="block text-center py-3.5 rounded-xl font-bold text-sm text-[#0a0a08] no-underline transition-opacity hover:opacity-90"
							style={{ background: "#e8ff47" }}
						>
							Get Lifetime Access →
						</a>
					</div>
				</div>
				<p
					className="mt-6 text-xs text-[#888880]"
					style={{ fontFamily: "'DM Mono', monospace" }}
				>
					🔒 Secure checkout via Gumroad · Instant access · 7-day refund
					guarantee
				</p>
			</section>

			{/* FOOTER */}
			<footer className="border-t border-[#2a2a26] py-10 px-6 md:px-10 flex items-center justify-between flex-wrap gap-4">
				<div
					className="text-xl text-[#888880]"
					style={{ fontFamily: "'Instrument Serif', serif" }}
				>
					SwipeEmails
				</div>
				<div
					className="text-[11px] text-[#888880]"
					style={{ fontFamily: "'DM Mono', monospace" }}
				>
					© 2026 SwipeEmails · Built for email obsessives
				</div>
				<a
					href={GUMROAD_URL}
					target="_blank"
					rel="noopener noreferrer"
					className="text-xs text-[#e8ff47] no-underline"
					style={{ fontFamily: "'DM Mono', monospace" }}
				>
					Buy on Gumroad →
				</a>
			</footer>

			<AnimatePresence>
				{selectedImage && (
					<ImageModal
						image={selectedImage}
						onClose={() => setSelectedImage(null)}
					/>
				)}
			</AnimatePresence>
		</div>
	);
}
