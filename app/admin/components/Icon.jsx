const icons = {
	home: (size) => (
		<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
			<path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
			<polyline points="9,22 9,12 15,12 15,22" />
		</svg>
	),
	chart: (size) => (
		<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
			<line x1="18" y1="20" x2="18" y2="10" />
			<line x1="12" y1="20" x2="12" y2="4" />
			<line x1="6" y1="20" x2="6" y2="14" />
			<line x1="2" y1="20" x2="22" y2="20" />
		</svg>
	),
	users: (size) => (
		<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
			<path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
			<circle cx="9" cy="7" r="4" />
			<path d="M23 21v-2a4 4 0 00-3-3.87" />
			<path d="M16 3.13a4 4 0 010 7.75" />
		</svg>
	),
	billing: (size) => (
		<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
			<rect x="1" y="4" width="22" height="16" rx="2" />
			<line x1="1" y1="10" x2="23" y2="10" />
		</svg>
	),
	bell: (size) => (
		<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
			<path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
			<path d="M13.73 21a2 2 0 01-3.46 0" />
		</svg>
	),
	settings: (size) => (
		<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
			<circle cx="12" cy="12" r="3" />
			<path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
		</svg>
	),
	trending: (size) => (
		<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
			<polyline points="23,6 13.5,15.5 8.5,10.5 1,18" />
			<polyline points="17,6 23,6 23,12" />
		</svg>
	),
	dollar: (size) => (
		<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
			<line x1="12" y1="1" x2="12" y2="23" />
			<path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
		</svg>
	),
	user: (size) => (
		<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
			<path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
			<circle cx="12" cy="7" r="4" />
		</svg>
	),
	zap: (size) => (
		<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
			<polygon points="13,2 3,14 12,14 11,22 21,10 12,10 13,2" />
		</svg>
	),
	chevron: (size) => (
		<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
			<polyline points="9,18 15,12 9,6" />
		</svg>
	),
	search: (size) => (
		<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
			<circle cx="11" cy="11" r="8" />
			<line x1="21" y1="21" x2="16.65" y2="16.65" />
		</svg>
	),
	plus: (size) => (
		<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
			<line x1="12" y1="5" x2="12" y2="19" />
			<line x1="5" y1="12" x2="19" y2="12" />
		</svg>
	),
	filter: (size) => (
		<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
			<polygon points="22,3 2,3 10,12.46 10,19 14,21 14,12.46 22,3" />
		</svg>
	),
	download: (size) => (
		<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
			<path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
			<polyline points="7,10 12,15 17,10" />
			<line x1="12" y1="15" x2="12" y2="3" />
		</svg>
	),
	menu: (size) => (
		<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
			<line x1="3" y1="6" x2="21" y2="6" />
			<line x1="3" y1="12" x2="21" y2="12" />
			<line x1="3" y1="18" x2="21" y2="18" />
		</svg>
	),
	x: (size) => (
		<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
			<line x1="18" y1="6" x2="6" y2="18" />
			<line x1="6" y1="6" x2="18" y2="18" />
		</svg>
	),
	check: (size) => (
		<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
			<polyline points="20,6 9,17 4,12" />
		</svg>
	),
	logout: (size) => (
		<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
			<path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
			<polyline points="16,17 21,12 16,7" />
			<line x1="21" y1="12" x2="9" y2="12" />
		</svg>
	),
	shield: (size) => (
		<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
			<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
		</svg>
	),
	globe: (size) => (
		<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
			<circle cx="12" cy="12" r="10" />
			<line x1="2" y1="12" x2="22" y2="12" />
			<path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
		</svg>
	),
	key: (size) => (
		<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
			<path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 11-7.778 7.778 5.5 5.5 0 017.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
		</svg>
	),
	mail: (size) => (
		<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
			<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
			<polyline points="22,6 12,13 2,6" />
		</svg>
	),
	palette: (size) => (
		<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
			<circle cx="13.5" cy="6.5" r=".5" />
			<circle cx="17.5" cy="10.5" r=".5" />
			<circle cx="8.5" cy="7.5" r=".5" />
			<circle cx="6.5" cy="12.5" r=".5" />
			<path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 011.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
		</svg>
	),
	roadmap: (size) => (
		<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
			<path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2v2" />
			<rect x="9" y="3" width="6" height="4" rx="1" />
		</svg>
	),
	support: (size) => (
		<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
			<path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
		</svg>
	),
	affiliate: (size) => (
		<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
			<path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
			<circle cx="9" cy="7" r="4" />
			<path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
			<line x1="12" y1="12" x2="12" y2="12" strokeWidth="2" />
		</svg>
	),
	team: (size) => (
		<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
			<path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
			<circle cx="9" cy="7" r="4" />
			<path d="M23 21v-2a4 4 0 00-3-3.87" />
			<path d="M16 3.13a4 4 0 010 7.75" />
		</svg>
	),
	audit: (size) => (
		<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
			<path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
			<polyline points="14,2 14,8 20,8" />
			<line x1="16" y1="13" x2="8" y2="13" />
			<line x1="16" y1="17" x2="8" y2="17" />
			<polyline points="10,9 9,9 8,9" />
		</svg>
	),
	onboarding: (size) => (
		<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
			<circle cx="12" cy="12" r="10" />
			<polyline points="12,6 12,12 16,14" />
		</svg>
	),
	sun: (size) => (
		<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
			<circle cx="12" cy="12" r="5" />
			<line x1="12" y1="1" x2="12" y2="3" />
			<line x1="12" y1="21" x2="12" y2="23" />
			<line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
			<line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
			<line x1="1" y1="12" x2="3" y2="12" />
			<line x1="21" y1="12" x2="23" y2="12" />
			<line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
			<line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
		</svg>
	),
	moon: (size) => (
		<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
			<path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
		</svg>
	),
};

export default function Icon({ name, size = 16 }) {
	const fn = icons[name];
	return fn ? fn(size) : null;
}
