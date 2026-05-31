"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import {
	Mail,
	Phone,
	MapPin,
	ArrowUpRight,
	ExternalLink,
	Menu,
	X,
	ChevronDown,
	Shield,
	Award,
	BookOpen,
	TrendingUp,
} from "lucide-react";

// ─── Styles ────────────────────────────────────────────────────────────────
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --bg: #080B14;
  --bg2: #0D1120;
  --surface: rgba(255,255,255,0.04);
  --surface-hover: rgba(255,255,255,0.07);
  --border: rgba(255,255,255,0.08);
  --border-hover: rgba(255,255,255,0.18);
  --text: #F0F2FF;
  --text-muted: rgba(240,242,255,0.45);
  --text-sub: rgba(240,242,255,0.65);
  --accent: #7C6FFF;
  --accent2: #C084FC;
  --glow: rgba(124,111,255,0.35);
  --gold: #F0C96A;
}

html { scroll-behavior: smooth; }
body {
  font-family: 'DM Sans', sans-serif;
  background: var(--bg);
  color: var(--text);
  overflow-x: hidden;
  min-height: 100vh;
}

::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-track { background: var(--bg); }
::-webkit-scrollbar-thumb { background: var(--accent); border-radius: 2px; }

.syne { font-family: 'Syne', sans-serif; }

.blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  pointer-events: none;
  z-index: 0;
}

.glass {
  background: var(--surface);
  border: 1px solid var(--border);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-radius: 20px;
  transition: border-color 0.3s, background 0.3s, transform 0.3s;
}
.glass:hover {
  border-color: var(--border-hover);
  background: var(--surface-hover);
}

.pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 14px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  border: 1px solid;
  white-space: nowrap;
}

.grad {
  background: linear-gradient(135deg, var(--accent), var(--accent2));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 28px;
  border-radius: 12px;
  background: linear-gradient(135deg, var(--accent), var(--accent2));
  color: #fff;
  font-family: 'Syne', sans-serif;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  border: none;
  cursor: pointer;
  transition: opacity 0.2s, transform 0.2s, box-shadow 0.2s;
  box-shadow: 0 0 28px rgba(124,111,255,0.35);
}
.btn-primary:hover { opacity: 0.9; transform: translateY(-2px); box-shadow: 0 0 40px rgba(124,111,255,0.5); }

.btn-ghost {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 13px 28px;
  border-radius: 12px;
  background: transparent;
  color: var(--text);
  font-family: 'Syne', sans-serif;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  border: 1px solid var(--border);
  cursor: pointer;
  transition: border-color 0.2s, background 0.2s, transform 0.2s;
}
.btn-ghost:hover { border-color: var(--accent); background: rgba(124,111,255,0.08); transform: translateY(-2px); }

@keyframes revealUp {
  from { opacity: 0; transform: translateY(40px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes revealLeft {
  from { opacity: 0; transform: translateX(-30px); }
  to   { opacity: 1; transform: translateX(0); }
}
@keyframes fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}
@keyframes pulse-ring {
  0%   { transform: scale(1); opacity: 0.6; }
  100% { transform: scale(1.6); opacity: 0; }
}
@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}
@keyframes marquee-scroll {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}

.reveal { opacity: 0; transform: translateY(40px); transition: opacity 0.7s cubic-bezier(.22,1,.36,1), transform 0.7s cubic-bezier(.22,1,.36,1); }
.reveal.in { opacity: 1; transform: none; }
.reveal-left { opacity: 0; transform: translateX(-30px); transition: opacity 0.7s cubic-bezier(.22,1,.36,1), transform 0.7s cubic-bezier(.22,1,.36,1); }
.reveal-left.in { opacity: 1; transform: none; }

.section { padding: 100px 0; position: relative; overflow: hidden; }

.section-label {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 16px;
}
.section-label::before {
  content: '';
  display: block;
  width: 20px;
  height: 2px;
  background: linear-gradient(to right, var(--accent), var(--accent2));
  border-radius: 1px;
}

.stag {
  padding: 8px 16px;
  border-radius: 10px;
  background: var(--surface);
  border: 1px solid var(--border);
  font-size: 13px;
  font-weight: 500;
  color: var(--text-sub);
  transition: all 0.2s;
  display: inline-block;
}
.stag:hover {
  border-color: var(--accent);
  color: var(--text);
  background: rgba(124,111,255,0.1);
}

.cert-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 18px 24px;
  border-radius: 14px;
  background: var(--surface);
  border: 1px solid var(--border);
  transition: all 0.25s;
}
.cert-item:hover {
  border-color: rgba(124,111,255,0.4);
  background: rgba(124,111,255,0.06);
  transform: translateX(6px);
}

.inp {
  width: 100%;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 14px 18px;
  font-size: 14px;
  font-family: 'DM Sans', sans-serif;
  color: var(--text);
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
}
.inp::placeholder { color: var(--text-muted); }
.inp:focus { border-color: var(--accent); box-shadow: 0 0 0 3px rgba(124,111,255,0.15); }

.marquee-wrap { overflow: hidden; }
.marquee-track {
  display: flex;
  width: max-content;
  animation: marquee-scroll 30s linear infinite;
}
.marquee-track:hover { animation-play-state: paused; }

.mobile-menu {
  position: fixed;
  inset: 0;
  background: rgba(8,11,20,0.97);
  backdrop-filter: blur(24px);
  z-index: 200;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
}

.tl-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--accent), var(--accent2));
  flex-shrink: 0;
  margin-top: 6px;
  box-shadow: 0 0 12px var(--glow);
}
.tl-line {
  width: 1px;
  flex: 1;
  background: linear-gradient(to bottom, var(--accent), transparent);
  margin: 8px 0 0 5.5px;
  min-height: 40px;
}

.stat-card {
  padding: 28px;
  border-radius: 20px;
  background: var(--surface);
  border: 1px solid var(--border);
  text-align: center;
  transition: transform 0.3s, border-color 0.3s;
  position: relative;
  overflow: hidden;
}
.stat-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(124,111,255,0.06) 0%, transparent 60%);
  pointer-events: none;
}
.stat-card:hover { transform: translateY(-4px); border-color: rgba(124,111,255,0.3); }

@media (max-width: 768px) {
  .section { padding: 72px 0; }
  .hide-mobile { display: none !important; }
}
@media (min-width: 769px) {
  .hide-desktop { display: none !important; }
}

.hero-grid {
	display: grid;
	grid-template-columns: 1fr auto;
	gap: 48px;
	align-items: center;
}

@media (max-width: 768px) {
	.hero-grid {
		grid-template-columns: 1fr;
	}
	.hero-content { order: 2; }
	.hero-image { order: 1; }
}

/* Impact bar for experience */
.impact-bar {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 16px;
  background: rgba(124,111,255,0.06);
  border: 1px solid rgba(124,111,255,0.2);
  border-radius: 10px;
  margin-top: 16px;
}

/* Cert group header */
.cert-group-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
  margin-bottom: 8px;
  border-bottom: 1px solid var(--border);
}

/* Skill category card */
.skill-category {
  padding: 24px;
  border-radius: 16px;
  background: var(--surface);
  border: 1px solid var(--border);
  transition: border-color 0.25s, transform 0.25s;
}
.skill-category:hover {
  border-color: rgba(124,111,255,0.3);
  transform: translateY(-3px);
}
`;

// ─── Data ─────────────────────────────────────────────────────────────────
const EXPERIENCES = [
	{
		role: "Junior Tax Consultant — Tax Dispute",
		company: "MUC Consulting",
		period: "May 2025 – Nov 2025 · 7 months",
		location: "Surabaya, East Java · On-site",
		type: "Contract",
		color: "#7C6FFF",
		summary: "Worked within MUC Consulting's Tax Dispute division, one of Indonesia's leading tax consulting firms, handling VAT compliance, tax law research, and client documentation for disputed tax cases.",
		points: [
			"Analyzed VAT and income tax regulations to support consultants in building client dispute arguments and objection letters",
			"Reviewed and validated client tax documents for completeness, accuracy, and regulatory compliance before submission to DGT",
			"Conducted tax law research to identify applicable regulations, precedents, and risk areas relevant to ongoing client disputes",
			"Coordinated documentation workflows between clients and senior consultants, ensuring deadlines were consistently met",
		],
		skills: ["Tax Law", "Value-Added Tax (VAT)", "Corporate Tax", "Tax Audits", "Document Review"],
		highlight: "Gained hands-on exposure to real tax disputes at Indonesia's top-tier consulting firm",
	},
	{
		role: "Internal Audit Intern",
		company: "Inspektorat Kota Surabaya",
		period: "Oct 2022 – Dec 2022 · 3 months",
		location: "Surabaya, East Java · On-site",
		type: "MBKM Internship",
		color: "#F0C96A",
		summary: "Completed an MBKM government internship at Surabaya City Inspectorate, gaining direct exposure to public sector internal audit processes and government financial oversight.",
		points: [
			"Participated in internal audit fieldwork, reviewing financial records and supporting documents for government programs",
			"Documented audit findings and organized evidence files in accordance with government audit standards",
			"Verified the accuracy and completeness of budget usage reports across multiple government work units",
			"Supported senior auditors in preparing audit summaries and review checklists",
		],
		skills: ["Internal Audits", "Auditing", "Document Review", "Financial Compliance"],
		highlight: "Developed government audit competency and public-sector financial oversight skills",
	},
	{
		role: "Merchandise Coordinator",
		company: "SCOLAH – UNAIR Mengajar",
		period: "Apr 2022 – Feb 2023 · 11 months",
		location: "Universitas Airlangga",
		type: "Organization",
		color: "#C084FC",
		summary: "Led merchandise operations and financial coordination for SCOLAH, an Airlangga University social education program, managing budgets, vendor relations, and team collaboration.",
		points: [
			"Managed merchandise procurement, vendor coordination, and financial tracking for fundraising and program operations",
			"Led a cross-functional team to execute product launches and events aligned with program timelines",
			"Recognized as Best of the Month (July 2022) for outstanding performance and contribution to program goals",
			"Maintained financial records and produced accountability reports for organizational leadership",
		],
		skills: ["Financial Management", "Team Leadership", "Problem Solving", "Fundraising"],
		highlight: "Awarded Best of the Month — recognized for exceptional initiative and execution",
	},
];

const SKILLS_GROUPS = [
	{
		label: "Tax Expertise",
		icon: "🏛️",
		color: "#7C6FFF",
		description: "Core competencies directly applicable to tax consulting roles",
		tags: [
			"Value-Added Tax (VAT)",
			"Income Tax",
			"Corporate Tax",
			"Tax Law & Regulation",
			"Tax Planning",
			"Transfer Pricing",
			"Tax Dispute & Objection",
			"Fiscal Reconciliation",
			"Tax Preparation",
			"Brevet AB Certified",
			"Coretax System",
			"OECD Guidelines",
		],
	},
	{
		label: "Audit & Compliance",
		icon: "🔍",
		color: "#C084FC",
		description: "Skills built through real government audit exposure and academic training",
		tags: [
			"Internal Auditing",
			"Document Review",
			"Financial Compliance",
			"Data Validation",
			"Audit Workpapers",
			"Regulatory Filing",
			"Risk Identification",
			"KPMG Simulation (Audit & Assurance)",
		],
	},
	{
		label: "Technical Tools",
		icon: "💻",
		color: "#F0C96A",
		description: "Technology skills that accelerate accuracy and reporting",
		tags: [
			"Microsoft Excel (Advanced)",
			"Pivot Tables",
			"VLOOKUP / LOOKUP Functions",
			"Data Validation & Charts",
			"Visual Basic for Applications (VBA)",
			"Microsoft Word & PowerPoint",
			"Canva",
		],
	},
	{
		label: "Professional Skills",
		icon: "✦",
		color: "#4ade80",
		description: "Qualities that define trustworthy, consulting-grade professionals",
		tags: [
			"Analytical Thinking",
			"Attention to Detail",
			"Client Documentation",
			"Team Collaboration",
			"Deadline Management",
			"Fast Learning",
			"Professional Writing",
			"English (C2 Proficient)",
		],
	},
];

const CERT_GROUPS = [
	{
		label: "Tax & Regulatory",
		icon: "🏛️",
		color: "#7C6FFF",
		note: "The foundation of any credible tax consultant",
		certs: [
			{ name: "Brevet AB", org: "LPK FEB Universitas Airlangga", year: "2023", icon: "🏛️", highlight: true },
			{ name: "Tax Officer Training", org: "Talentiv", year: "2026", icon: "📋", highlight: false },
			{ name: "Tax Planning: Cara Menghemat Pajak Perusahaan", org: "Ioda Academy · 2-Day Training", year: "2025", icon: "💼", highlight: false },
			{ name: "Pajak 102: Tax Planning", org: "Accounting Hack", year: "2025", icon: "📊", highlight: false },
		],
	},
	{
		label: "International Tax",
		icon: "🌐",
		color: "#C084FC",
		note: "Cross-border tax competency validated by the World Bank Group",
		certs: [
			{ name: "eLearning Course on Transfer Pricing", org: "World Bank Group (WBG)", year: "2026", icon: "🌐", highlight: true },
		],
	},
	{
		label: "Audit & Assurance",
		icon: "🔍",
		color: "#F0C96A",
		note: "Exposure to Big Four audit methodology",
		certs: [
			{ name: "KPMG Audit & Assurance Job Simulation", org: "Forage / KPMG Canada", year: "2025", icon: "🏦", highlight: true },
		],
	},
	{
		label: "Technology",
		icon: "💻",
		color: "#4ade80",
		note: "Excel fluency is non-negotiable in tax consulting — certified advanced level",
		certs: [
			{ name: "Intensive 2-Week Microsoft Excel Bootcamp", org: "KarirNex", year: "2026", icon: "📈", highlight: true },
			{ name: "Airlangga Microsoft Bootcamp", org: "PT Ruang Data Indonesia", year: "2025", icon: "💻", highlight: false },
		],
	},
	{
		label: "Language",
		icon: "🇬🇧",
		color: "#F0C96A",
		note: "C2-level English opens doors to international consulting and multinational clients",
		certs: [
			{ name: "EF SET English Certificate — C2 Proficient (75/100)", org: "EF SET", year: "2023", icon: "✨", highlight: true },
			{ name: "Duolingo English Certificate — C1 Advanced (135/160)", org: "Duolingo English Test", year: "2023", icon: "🇬🇧", highlight: false },
		],
	},
];

const NAV_LINKS = [
	"home",
	"about",
	"experience",
	"skills",
	"education",
	"certifications",
	"contact",
];

function useReveal() {
	useEffect(() => {
		const obs = new IntersectionObserver(
			(entries) =>
				entries.forEach((e) => {
					if (e.isIntersecting) e.target.classList.add("in");
				}),
			{ threshold: 0.08, rootMargin: "0px 0px -50px 0px" },
		);
		document
			.querySelectorAll(".reveal, .reveal-left")
			.forEach((el) => obs.observe(el));
		return () => obs.disconnect();
	}, []);
}

function scrollTo(id) {
	document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

// ─── Navbar ───────────────────────────────────────────────────────────────
function Navbar() {
	const [scrolled, setScrolled] = useState(false);
	const [active, setActive] = useState("home");
	const [menuOpen, setMenuOpen] = useState(false);

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 50);
		window.addEventListener("scroll", onScroll);
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	const go = (id) => {
		setActive(id);
		setMenuOpen(false);
		scrollTo(id);
	};

	return (
		<>
			<nav
				style={{
					position: "fixed",
					top: 0,
					left: 0,
					right: 0,
					zIndex: 100,
					padding: scrolled ? "12px 0" : "20px 0",
					background: scrolled ? "rgba(8,11,20,0.85)" : "transparent",
					backdropFilter: scrolled ? "blur(20px)" : "none",
					borderBottom: scrolled ? "1px solid var(--border)" : "none",
					transition: "all 0.4s cubic-bezier(.22,1,.36,1)",
				}}>
				<div
					style={{
						maxWidth: 1160,
						margin: "0 auto",
						padding: "0 24px",
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
					}}>
					<button
						onClick={() => go("home")}
						style={{
							background: "none",
							border: "none",
							cursor: "pointer",
							display: "flex",
							alignItems: "center",
							gap: 10,
						}}>
						<div
							style={{
								width: 32,
								height: 32,
								borderRadius: 8,
								background: "linear-gradient(135deg,#7C6FFF,#C084FC)",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
							}}>
							<span style={{ fontFamily: "'Syne',sans-serif", fontSize: 13, fontWeight: 800, color: "#fff" }}>N</span>
						</div>
						<span className="syne" style={{ fontSize: 16, fontWeight: 700, color: "var(--text)", letterSpacing: "-0.01em" }}>
							Nadia<span className="grad">MS</span>
						</span>
					</button>

					<div className="hide-mobile" style={{ display: "flex", gap: 4 }}>
						{NAV_LINKS.map((l) => (
							<button
								key={l}
								onClick={() => go(l)}
								style={{
									background: active === l ? "rgba(124,111,255,0.12)" : "none",
									border: "1px solid",
									borderColor: active === l ? "rgba(124,111,255,0.3)" : "transparent",
									borderRadius: 8,
									cursor: "pointer",
									padding: "6px 14px",
									fontSize: 13,
									fontWeight: 500,
									color: active === l ? "var(--accent)" : "var(--text-muted)",
									transition: "all 0.2s",
									textTransform: "capitalize",
								}}
								onMouseOver={(e) => {
									if (active !== l) {
										e.currentTarget.style.color = "var(--text)";
										e.currentTarget.style.borderColor = "var(--border)";
									}
								}}
								onMouseOut={(e) => {
									if (active !== l) {
										e.currentTarget.style.color = "var(--text-muted)";
										e.currentTarget.style.borderColor = "transparent";
									}
								}}>
								{l}
							</button>
						))}
					</div>

					<div style={{ display: "flex", alignItems: "center", gap: 10 }}>
						<a href="mailto:nadiamadarinasaid@gmail.com" className="btn-primary hide-mobile" style={{ padding: "9px 20px", fontSize: 13 }}>
							Hire Me <ArrowUpRight size={13} />
						</a>
						<button
							className="hide-desktop"
							onClick={() => setMenuOpen(true)}
							style={{
								background: "var(--surface)",
								border: "1px solid var(--border)",
								borderRadius: 8,
								padding: 8,
								cursor: "pointer",
								color: "var(--text)",
								display: "flex",
								alignItems: "center",
							}}>
							<Menu size={18} />
						</button>
					</div>
				</div>
			</nav>

			{menuOpen && (
				<div className="mobile-menu">
					<button
						onClick={() => setMenuOpen(false)}
						style={{
							position: "absolute",
							top: 24,
							right: 24,
							background: "var(--surface)",
							border: "1px solid var(--border)",
							borderRadius: 8,
							padding: 8,
							cursor: "pointer",
							color: "var(--text)",
							display: "flex",
						}}>
						<X size={18} />
					</button>
					{NAV_LINKS.map((l, i) => (
						<button
							key={l}
							onClick={() => go(l)}
							style={{
								background: "none",
								border: "none",
								cursor: "pointer",
								fontFamily: "'Syne',sans-serif",
								fontSize: 28,
								fontWeight: 700,
								color: active === l ? "var(--accent)" : "var(--text-sub)",
								textTransform: "capitalize",
								padding: "8px 0",
								animation: `revealUp 0.4s cubic-bezier(.22,1,.36,1) ${i * 0.06}s both`,
							}}>
							{l}
						</button>
					))}
					<a href="mailto:nadiamadarinasaid@gmail.com" className="btn-primary" style={{ marginTop: 24 }}>
						Hire Me <ArrowUpRight size={14} />
					</a>
				</div>
			)}
		</>
	);
}

// ─── Hero ─────────────────────────────────────────────────────────────────
function Hero() {
	return (
		<section
			id="home"
			style={{
				minHeight: "100svh",
				display: "flex",
				alignItems: "center",
				position: "relative",
				overflow: "hidden",
				paddingTop: 80,
			}}>
			<div className="blob" style={{ width: 600, height: 600, background: "radial-gradient(circle,rgba(124,111,255,0.18) 0%,transparent 70%)", top: "-10%", right: "-5%" }} />
			<div className="blob" style={{ width: 400, height: 400, background: "radial-gradient(circle,rgba(192,132,252,0.14) 0%,transparent 70%)", bottom: "5%", left: "-5%" }} />
			<div className="blob" style={{ width: 300, height: 300, background: "radial-gradient(circle,rgba(240,201,106,0.08) 0%,transparent 70%)", top: "40%", left: "30%" }} />

			<div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 24px", width: "100%", position: "relative", zIndex: 1 }}>
				<div className="hero-grid">
					{/* Text */}
					<div className="hero-content">
						<div style={{ animation: "revealUp 0.8s cubic-bezier(.22,1,.36,1) 0.1s both" }}>
							<span className="pill" style={{
								borderColor: "rgba(124,111,255,0.35)",
								background: "rgba(124,111,255,0.1)",
								color: "var(--accent)",
								marginBottom: 28,
								display: "inline-flex",
							}}>
								<span style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80", animation: "pulse-ring 1.5s ease-out infinite", display: "inline-block" }} />
								Open to Tax Consulting Roles
							</span>
						</div>

						{/* REWRITTEN: Value-first headline instead of name-first */}
						<h1 className="syne" style={{
							fontSize: "clamp(38px,5.5vw,80px)",
							fontWeight: 800,
							lineHeight: 1.05,
							letterSpacing: "-0.03em",
							marginBottom: 20,
							animation: "revealUp 0.8s cubic-bezier(.22,1,.36,1) 0.2s both",
						}}>
							Tax professional
							<br />
							built for <span className="grad">compliance</span>
							<br />
							and <span className="grad">consulting.</span>
						</h1>

						{/* REWRITTEN: Identity statement with clear positioning */}
						<p style={{
							fontSize: 15,
							lineHeight: 1.85,
							color: "var(--text-sub)",
							maxWidth: 480,
							marginBottom: 16,
							fontWeight: 300,
							animation: "revealUp 0.8s cubic-bezier(.22,1,.36,1) 0.3s both",
						}}>
							<strong style={{ color: "var(--text)", fontWeight: 500 }}>Nadia Madarina Said</strong> — Accounting graduate from Universitas Airlangga, Brevet AB certified, with hands-on experience at MUC Consulting handling VAT compliance and tax dispute documentation.
						</p>

						{/* ADDED: Credibility hook */}
						<p style={{
							fontSize: 14,
							lineHeight: 1.7,
							color: "var(--text-muted)",
							maxWidth: 480,
							marginBottom: 40,
							fontWeight: 300,
							animation: "revealUp 0.8s cubic-bezier(.22,1,.36,1) 0.35s both",
						}}>
							Transfer Pricing trained by the World Bank Group. C2 English proficient. Ready to contribute to your tax team from day one.
						</p>

						<div style={{
							display: "flex",
							flexWrap: "wrap",
							gap: 12,
							marginBottom: 52,
							animation: "revealUp 0.8s cubic-bezier(.22,1,.36,1) 0.45s both",
						}}>
							<a href="#contact" className="btn-primary" onClick={(e) => { e.preventDefault(); scrollTo("contact"); }}>
								Get in Touch <ArrowUpRight size={14} />
							</a>
							<a href="#experience" className="btn-ghost" onClick={(e) => { e.preventDefault(); scrollTo("experience"); }}>
								View Experience
							</a>
							<a href="https://docs.google.com/document/d/1i7CJPFIWh5ntpQiJrJ6s_Kxo4LKjnmMX/edit?usp=sharing&ouid=112511912242432371380&rtpof=true&sd=true" className="btn-ghost">
								Resume <ArrowUpRight size={14} />
							</a>
						</div>

						{/* REWRITTEN: More specific credibility markers */}
						<div style={{
							display: "flex",
							flexWrap: "wrap",
							gap: 24,
							animation: "revealUp 0.8s cubic-bezier(.22,1,.36,1) 0.55s both",
						}}>
							{[
								{ icon: <MapPin size={13} />, text: "Sidoarjo, East Java" },
								{ icon: "🎓", text: "Airlangga Accounting '24" },
								{ icon: "🏛️", text: "Brevet AB Certified" },
								{ icon: "🌐", text: "MUC Consulting Alumni" },
							].map(({ icon, text }) => (
								<div key={text} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "var(--text-muted)", fontWeight: 400 }}>
									<span style={{ color: "var(--accent)", display: "flex", alignItems: "center" }}>{icon}</span>
									{text}
								</div>
							))}
						</div>
					</div>

					{/* Photo */}
					<div className="hero-image" style={{ animation: "fadeIn 1.2s cubic-bezier(.22,1,.36,1) 0.1s both", position: "relative" }}>
						<div style={{
							position: "absolute",
							inset: -20,
							borderRadius: "50%",
							border: "1px dashed rgba(124,111,255,0.6)",
							boxShadow: "0 0 12px rgba(124,111,255,0.25)",
							animation: "spin-slow 17s linear infinite",
						}} />
						<div style={{
							position: "absolute",
							inset: -8,
							borderRadius: "38px",
							background: "linear-gradient(135deg,rgba(124,111,255,0.3),rgba(192,132,252,0.2),transparent)",
							filter: "blur(2px)",
						}} />
						<div style={{
							position: "relative",
							width: 320,
							height: 400,
							borderRadius: 32,
							overflow: "hidden",
							border: "1px solid rgba(255,255,255,0.1)",
							boxShadow: "0 40px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(124,111,255,0.2)",
						}}>
							<Image src="/nadia.webp" alt="Nadia Madarina Said" fill style={{ objectFit: "cover" }} priority />
							<div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(8,11,20,0.6) 0%, transparent 50%)" }} />
						</div>
						<div className="glass" style={{ position: "absolute", bottom: -16, right: -16, padding: "12px 18px", borderRadius: 14 }}>
							<div style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 2, letterSpacing: "0.06em" }}>English</div>
							<div className="syne" style={{ fontSize: 18, fontWeight: 800, color: "var(--gold)" }}>C2</div>
						</div>
					</div>
				</div>

				{/* REWRITTEN: Stats with better framing */}
				<div style={{
					display: "grid",
					gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
					gap: 16,
					marginTop: 64,
					animation: "revealUp 0.8s cubic-bezier(.22,1,.36,1) 0.65s both",
				}}>
					{[
						{ n: "MUC Consulting", l: "Tax Dispute Division Experience" },
						{ n: "10+", l: "Professional Certifications" },
						{ n: "C2", l: "English — EF SET Certified" },
					].map(({ n, l }) => (
						<div key={l} className="stat-card">
							<div className="syne grad" style={{ fontSize: "clamp(18px,3vw,28px)", fontWeight: 800, lineHeight: 1.2 }}>{n}</div>
							<div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 6, fontWeight: 400 }}>{l}</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}

// ─── Marquee ──────────────────────────────────────────────────────────────
function Marquee() {
	const items = [
		"Tax Dispute",
		"Brevet AB",
		"VAT Compliance",
		"Transfer Pricing",
		"KPMG Simulation",
		"C2 English",
		"MUC Consulting",
		"Excel Advanced",
		"World Bank Group",
		"Internal Audit",
	];
	const doubled = [...items, ...items];
	return (
		<div style={{
			borderTop: "1px solid var(--border)",
			borderBottom: "1px solid var(--border)",
			padding: "16px 0",
			overflow: "hidden",
			background: "rgba(255,255,255,0.015)",
			marginTop: "16px",
		}}>
			<div className="marquee-track">
				{doubled.map((item, i) => (
					<span key={i} style={{
						display: "inline-flex",
						alignItems: "center",
						gap: 20,
						padding: "0 20px",
						fontSize: 12,
						fontWeight: 600,
						letterSpacing: "0.1em",
						textTransform: "uppercase",
						color: i % 4 === 1 ? "var(--accent)" : "var(--text-muted)",
						whiteSpace: "nowrap",
						fontFamily: "'Syne',sans-serif",
					}}>
						{item} <span style={{ opacity: 0.25, fontSize: 8 }}>◆</span>
					</span>
				))}
			</div>
		</div>
	);
}

// ─── About ────────────────────────────────────────────────────────────────
function About() {
	return (
		<section id="about" className="section" style={{ background: "var(--bg2)" }}>
			<div style={{
				position: "absolute",
				inset: 0,
				backgroundImage: "radial-gradient(circle at 80% 50%, rgba(124,111,255,0.06) 0%, transparent 60%)",
				pointerEvents: "none",
			}} />
			<div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 24px", position: "relative" }}>
				<div style={{
					display: "grid",
					gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
					gap: 64,
					alignItems: "center",
				}}>
					<div className="reveal-left">
						<div className="section-label">Who I Am</div>

						{/* REWRITTEN: Stronger identity statement */}
						<h2 className="syne" style={{
							fontSize: "clamp(28px,3.5vw,48px)",
							fontWeight: 800,
							lineHeight: 1.15,
							letterSpacing: "-0.02em",
							marginBottom: 24,
						}}>
							A tax consultant
							<br />
							who reads between
							<br />
							the <span className="grad">regulatory lines.</span>
						</h2>

						{/* REWRITTEN: More compelling, specific narrative */}
						<p style={{ fontSize: 15, lineHeight: 1.9, color: "var(--text-sub)", marginBottom: 20 }}>
							I graduated from Universitas Airlangga's Accounting programme with a specialisation in taxation — then went straight into MUC Consulting's Tax Dispute division, where the work required both regulatory precision and clear analytical thinking under real deadlines.
						</p>
						<p style={{ fontSize: 15, lineHeight: 1.9, color: "var(--text-sub)", marginBottom: 20 }}>
							I hold a <strong style={{ color: "var(--text)" }}>Brevet AB</strong> certification, completed <strong style={{ color: "var(--text)" }}>World Bank Group transfer pricing training</strong>, and maintain <strong style={{ color: "var(--text)" }}>C2 English proficiency</strong> — which means I can work with multinational clients, international tax frameworks, and cross-border consulting engagements.
						</p>
						<p style={{ fontSize: 15, lineHeight: 1.9, color: "var(--text-sub)", marginBottom: 36 }}>
							Tax consulting rewards professionals who are rigorous with documentation, accurate under pressure, and quick to learn. That describes how I work.
						</p>

						<div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
							{["Tax Dispute", "VAT Compliance", "Transfer Pricing", "Internal Audit", "Document Review", "C2 English"].map((t) => (
								<span key={t} className="pill" style={{
									borderColor: "rgba(124,111,255,0.3)",
									background: "rgba(124,111,255,0.08)",
									color: "var(--accent)",
								}}>
									{t}
								</span>
							))}
						</div>
					</div>

					<div className="reveal" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
						{[
							{ label: "Education", value: "Universitas Airlangga", sub: "Bachelor of Accounting, 2024", color: "#7C6FFF" },
							{ label: "Core Certification", value: "Brevet AB", sub: "Tax Law & Administration", color: "#C084FC" },
							{ label: "Language", value: "C2 Proficient", sub: "EF SET + Duolingo Certified", color: "#F0C96A" },
							{ label: "Experience", value: "MUC Consulting", sub: "Tax Dispute Division", color: "#7C6FFF" },
						].map(({ label, value, sub, color }) => (
							<div key={label} className="glass" style={{ padding: 24 }}>
								<div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: color, marginBottom: 10 }}>{label}</div>
								<div className="syne" style={{ fontSize: 15, fontWeight: 700, color: "var(--text)", marginBottom: 4 }}>{value}</div>
								<div style={{ fontSize: 12, color: "var(--text-muted)" }}>{sub}</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}

// ─── Experience ───────────────────────────────────────────────────────────
function Experience() {
	const [open, setOpen] = useState(0);

	return (
		<section id="experience" className="section" style={{ background: "var(--bg)" }}>
			<div style={{
				position: "absolute",
				inset: 0,
				backgroundImage: "radial-gradient(circle at 20% 50%, rgba(192,132,252,0.06) 0%, transparent 60%)",
				pointerEvents: "none",
			}} />
			<div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 24px", position: "relative" }}>
				<div className="reveal" style={{ marginBottom: 12 }}>
					<div className="section-label">Career Path</div>
					<h2 className="syne" style={{ fontSize: "clamp(28px,3.5vw,48px)", fontWeight: 800, letterSpacing: "-0.02em" }}>
						Professional <span className="grad">Experience</span>
					</h2>
				</div>

				{/* ADDED: Section context */}
				<p className="reveal" style={{ fontSize: 15, color: "var(--text-sub)", maxWidth: 560, marginBottom: 48, lineHeight: 1.8 }}>
					Practical exposure across tax consulting, government audit, and financial operations — each role reinforcing a different layer of professional competency.
				</p>

				<div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
					{EXPERIENCES.map((exp, i) => (
						<div key={i} className="reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
							<div style={{ display: "flex", gap: 24 }}>
								<div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 4 }}>
									<div className="tl-dot" style={{
										background: `linear-gradient(135deg, ${exp.color}, ${i === 2 ? "#ff9f43" : "#C084FC"})`,
										boxShadow: `0 0 12px ${exp.color}60`,
									}} />
									{i < EXPERIENCES.length - 1 && (
										<div className="tl-line" style={{ background: `linear-gradient(to bottom, ${exp.color}60, transparent)` }} />
									)}
								</div>

								<div
									className="glass"
									style={{
										flex: 1,
										marginBottom: 20,
										padding: "24px 28px",
										cursor: "pointer",
										borderColor: open === i ? `${exp.color}40` : "var(--border)",
										background: open === i ? `rgba(124,111,255,0.06)` : "var(--surface)",
									}}
									onClick={() => setOpen(open === i ? null : i)}>

									<div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
										<div style={{ flex: 1 }}>
											<div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 10 }}>
												<span className="pill" style={{ borderColor: `${exp.color}50`, background: `${exp.color}15`, color: exp.color, fontSize: 10 }}>
													{exp.type}
												</span>
												<span style={{ fontSize: 12, color: "var(--text-muted)", alignSelf: "center" }}>{exp.period}</span>
												<span style={{ fontSize: 12, color: "var(--text-muted)", alignSelf: "center" }}>{exp.location}</span>
											</div>
											<h3 className="syne" style={{ fontSize: 18, fontWeight: 700, color: "var(--text)", marginBottom: 4 }}>{exp.role}</h3>
											<p style={{ fontSize: 14, color: exp.color, fontWeight: 500, marginBottom: 8 }}>{exp.company}</p>

											{/* ADDED: One-line summary always visible */}
											<p style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.6 }}>{exp.summary}</p>
										</div>
										<div style={{
											width: 32,
											height: 32,
											borderRadius: 8,
											background: "var(--surface)",
											border: "1px solid var(--border)",
											display: "flex",
											alignItems: "center",
											justifyContent: "center",
											transition: "transform 0.3s",
											transform: open === i ? "rotate(180deg)" : "none",
											flexShrink: 0,
										}}>
											<ChevronDown size={14} style={{ color: "var(--text-muted)" }} />
										</div>
									</div>

									{open === i && (
										<div style={{ marginTop: 20, paddingTop: 20, borderTop: `1px solid ${exp.color}20` }}>
											{/* ADDED: Responsibilities with impact framing */}
											<div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 12 }}>
												Key Responsibilities
											</div>
											<ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
												{exp.points.map((pt, j) => (
													<li key={j} style={{
														display: "flex",
														gap: 12,
														fontSize: 14,
														lineHeight: 1.7,
														color: "var(--text-sub)",
														animation: `revealUp 0.4s cubic-bezier(.22,1,.36,1) ${j * 0.06}s both`,
													}}>
														<span style={{ color: exp.color, flexShrink: 0, marginTop: 3 }}>→</span>
														{pt}
													</li>
												))}
											</ul>

											{/* ADDED: Skills tags per experience */}
											<div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
												{exp.skills.map((s) => (
													<span key={s} style={{
														padding: "4px 12px",
														borderRadius: 8,
														background: `${exp.color}15`,
														border: `1px solid ${exp.color}30`,
														fontSize: 12,
														color: exp.color,
														fontWeight: 500,
													}}>
														{s}
													</span>
												))}
											</div>

											{/* ADDED: Highlight callout */}
											<div className="impact-bar">
												<span style={{ fontSize: 14 }}>⚡</span>
												<span style={{ fontSize: 13, color: "var(--text-sub)", fontStyle: "italic" }}>{exp.highlight}</span>
											</div>
										</div>
									)}
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}

// ─── Skills ───────────────────────────────────────────────────────────────
function Skills() {
	const [activeTab, setActiveTab] = useState(0);

	return (
		<section id="skills" className="section" style={{ background: "var(--bg2)" }}>
			<div style={{
				position: "absolute",
				inset: 0,
				backgroundImage: "radial-gradient(circle at 70% 30%, rgba(124,111,255,0.07) 0%, transparent 60%)",
				pointerEvents: "none",
			}} />
			<div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 24px", position: "relative" }}>
				<div className="reveal" style={{ marginBottom: 12 }}>
					<div className="section-label">Capabilities</div>
					<h2 className="syne" style={{ fontSize: "clamp(28px,3.5vw,48px)", fontWeight: 800, letterSpacing: "-0.02em" }}>
						Skills &amp; <span className="grad">Expertise</span>
					</h2>
				</div>

				{/* REWRITTEN: Context-setting intro */}
				<p className="reveal" style={{ fontSize: 15, color: "var(--text-sub)", maxWidth: 560, marginBottom: 40, lineHeight: 1.8 }}>
					Organized by what actually matters in tax consulting — not an arbitrary list, but a structured picture of where I can add value from day one.
				</p>

				{/* Tab switcher */}
				<div className="reveal" style={{ display: "flex", gap: 8, marginBottom: 36, flexWrap: "wrap" }}>
					{SKILLS_GROUPS.map((g, i) => (
						<button
							key={g.label}
							onClick={() => setActiveTab(i)}
							style={{
								padding: "10px 20px",
								borderRadius: 10,
								border: "1px solid",
								fontFamily: "'Syne',sans-serif",
								fontSize: 13,
								fontWeight: 600,
								cursor: "pointer",
								transition: "all 0.2s",
								borderColor: activeTab === i ? g.color : "var(--border)",
								background: activeTab === i ? `${g.color}18` : "transparent",
								color: activeTab === i ? g.color : "var(--text-muted)",
								display: "flex",
								alignItems: "center",
								gap: 6,
							}}>
							<span>{g.icon}</span> {g.label}
						</button>
					))}
				</div>

				{/* ADDED: Category description */}
				<p className="reveal" style={{
					fontSize: 13,
					color: "var(--text-muted)",
					marginBottom: 20,
					fontStyle: "italic",
					lineHeight: 1.6,
				}}>
					{SKILLS_GROUPS[activeTab].description}
				</p>

				{/* Tags grid */}
				<div className="reveal" style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
					{SKILLS_GROUPS[activeTab].tags.map((tag, i) => (
						<span key={tag} className="stag" style={{
							animation: `revealUp 0.35s cubic-bezier(.22,1,.36,1) ${i * 0.05}s both`,
							borderColor: `${SKILLS_GROUPS[activeTab].color}30`,
						}}>
							{tag}
						</span>
					))}
				</div>

				{/* Languages */}
				<div className="reveal" style={{
					marginTop: 48,
					display: "grid",
					gridTemplateColumns: "repeat(auto-fit, minmax(260px,1fr))",
					gap: 16,
				}}>
					{[
						{ lang: "Bahasa Indonesia", level: "Native Speaker", flag: "🇮🇩", color: "#7C6FFF", note: "Professional written and verbal communication" },
						{ lang: "English", level: "C2 Proficient", flag: "🇬🇧", color: "#F0C96A", note: "EF SET 75/100 · Duolingo 135/160 C1 Advanced" },
					].map(({ lang, level, flag, color, note }) => (
						<div key={lang} className="glass" style={{ padding: "20px 24px", display: "flex", alignItems: "center", gap: 16 }}>
							<span style={{ fontSize: 28 }}>{flag}</span>
							<div>
								<div className="syne" style={{ fontSize: 16, fontWeight: 700, color: "var(--text)", marginBottom: 2 }}>{lang}</div>
								<div style={{ fontSize: 12, color: color, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 4 }}>{level}</div>
								<div style={{ fontSize: 11, color: "var(--text-muted)" }}>{note}</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}

// ─── Education ────────────────────────────────────────────────────────────
function Education() {
	return (
		<section id="education" className="section" style={{ background: "var(--bg)" }}>
			<div style={{
				position: "absolute",
				inset: 0,
				backgroundImage: "radial-gradient(circle at 30% 70%, rgba(240,201,106,0.05) 0%, transparent 60%)",
				pointerEvents: "none",
			}} />
			<div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 24px", position: "relative" }}>
				<div className="reveal" style={{ marginBottom: 48 }}>
					<div className="section-label">Academic Foundation</div>
					<h2 className="syne" style={{ fontSize: "clamp(28px,3.5vw,48px)", fontWeight: 800, letterSpacing: "-0.02em" }}>
						<span className="grad">Education</span>
					</h2>
				</div>

				<div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24, alignItems: "start" }}>
					<div className="reveal glass" style={{ padding: "36px" }}>
						<div style={{ display: "flex", gap: 16, alignItems: "flex-start", marginBottom: 24 }}>
							<div style={{
								width: 52,
								height: 52,
								borderRadius: 14,
								background: "linear-gradient(135deg,#7C6FFF,#C084FC)",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								flexShrink: 0,
								fontSize: 24,
							}}>🎓</div>
							<div>
								<span className="pill" style={{
									borderColor: "rgba(124,111,255,0.3)",
									background: "rgba(124,111,255,0.1)",
									color: "var(--accent)",
									fontSize: 10,
									marginBottom: 10,
									display: "inline-flex",
								}}>2020 – 2024</span>
								<h3 className="syne" style={{ fontSize: 22, fontWeight: 800, color: "var(--text)", lineHeight: 1.2 }}>
									Bachelor of<br />Accounting
								</h3>
							</div>
						</div>
						<p style={{ fontSize: 16, color: "var(--accent)", fontWeight: 600, marginBottom: 12 }}>Universitas Airlangga</p>
						{/* REWRITTEN: Specific, not generic */}
						<p style={{ fontSize: 14, lineHeight: 1.85, color: "var(--text-sub)", marginBottom: 24 }}>
							Completed a four-year accounting degree at one of Indonesia's top-ranked state universities, with a curriculum that included taxation law, financial statement analysis, auditing standards, and cost accounting — forming the academic bedrock of my consulting work today.
						</p>
						<div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
							{["Taxation Law", "Financial Analysis", "Auditing Standards", "Cost Accounting", "Business Reporting"].map((t) => (
								<span key={t} className="stag" style={{ fontSize: 12 }}>{t}</span>
							))}
						</div>
					</div>

					<div className="reveal" style={{ transitionDelay: "0.1s", display: "flex", flexDirection: "column", gap: 16 }}>
						<div className="glass" style={{ padding: "28px", borderColor: "rgba(240,201,106,0.2)", background: "rgba(240,201,106,0.05)" }}>
							<div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 12 }}>🏆 Competition Win</div>
							<h4 className="syne" style={{ fontSize: 17, fontWeight: 700, color: "var(--text)", marginBottom: 8 }}>1st Place — Lomba Konten Medsos</h4>
							{/* REWRITTEN: Context added */}
							<p style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.7 }}>
								APA Fest 2021 · Ikatan Akuntan Indonesia · November 2021. Recognized for creating the top-performing social media content entry in a national accounting organization competition.
							</p>
						</div>

						<div className="glass" style={{ padding: "28px" }}>
							<div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 16 }}>
								Why Airlangga Matters
							</div>
							{[
								"Consistently ranked among Indonesia's top 10 universities — known for producing practice-ready accountants",
								"Curriculum aligned with IAI (Ikatan Akuntan Indonesia) professional standards",
								"Graduated with hands-on case study exposure in taxation and audit methodology",
							].map((h, i) => (
								<div key={i} style={{ display: "flex", gap: 10, fontSize: 14, color: "var(--text-sub)", marginBottom: 10, lineHeight: 1.65 }}>
									<span style={{ color: "var(--accent)", flexShrink: 0 }}>✓</span> {h}
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

// ─── Certifications ───────────────────────────────────────────────────────
function Certifications() {
	const [activeGroup, setActiveGroup] = useState(null);

	const displayGroups = activeGroup === null ? CERT_GROUPS : CERT_GROUPS.filter(g => g.label === activeGroup);

	return (
		<section id="certifications" className="section" style={{ background: "var(--bg2)" }}>
			<div style={{
				position: "absolute",
				inset: 0,
				backgroundImage: "radial-gradient(circle at 60% 20%, rgba(124,111,255,0.07) 0%, transparent 60%)",
				pointerEvents: "none",
			}} />
			<div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 24px", position: "relative" }}>
				<div className="reveal" style={{ marginBottom: 16 }}>
					<div className="section-label">Credentials</div>
					<h2 className="syne" style={{ fontSize: "clamp(28px,3.5vw,48px)", fontWeight: 800, letterSpacing: "-0.02em", marginBottom: 16 }}>
						Certifications &amp; <span className="grad">Training</span>
					</h2>
					{/* REWRITTEN: Explain WHY certs matter */}
					<p style={{ fontSize: 15, color: "var(--text-sub)", maxWidth: 600, lineHeight: 1.8, marginBottom: 28 }}>
						In tax consulting, credentials are not decorative — they signal regulatory literacy, technical discipline, and a commitment to staying current. Each certification below was earned with purpose.
					</p>

					{/* Filter tabs */}
					<div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
						<button
							onClick={() => setActiveGroup(null)}
							style={{
								padding: "8px 16px",
								borderRadius: 8,
								border: "1px solid",
								fontFamily: "'Syne',sans-serif",
								fontSize: 12,
								fontWeight: 600,
								cursor: "pointer",
								transition: "all 0.2s",
								letterSpacing: "0.04em",
								borderColor: activeGroup === null ? "var(--accent)" : "var(--border)",
								background: activeGroup === null ? "rgba(124,111,255,0.15)" : "transparent",
								color: activeGroup === null ? "var(--accent)" : "var(--text-muted)",
							}}>
							All
						</button>
						{CERT_GROUPS.map((g) => (
							<button
								key={g.label}
								onClick={() => setActiveGroup(activeGroup === g.label ? null : g.label)}
								style={{
									padding: "8px 16px",
									borderRadius: 8,
									border: "1px solid",
									fontFamily: "'Syne',sans-serif",
									fontSize: 12,
									fontWeight: 600,
									cursor: "pointer",
									transition: "all 0.2s",
									letterSpacing: "0.04em",
									borderColor: activeGroup === g.label ? g.color : "var(--border)",
									background: activeGroup === g.label ? `${g.color}20` : "transparent",
									color: activeGroup === g.label ? g.color : "var(--text-muted)",
								}}>
								{g.icon} {g.label}
							</button>
						))}
					</div>
				</div>

				{/* REWRITTEN: Grouped certs with explanatory notes */}
				<div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
					{displayGroups.map((group, gi) => (
						<div key={group.label} className="reveal" style={{ transitionDelay: `${gi * 0.08}s` }}>
							{/* Group header */}
							<div className="cert-group-header">
								<span style={{ fontSize: 20 }}>{group.icon}</span>
								<div>
									<h3 className="syne" style={{ fontSize: 16, fontWeight: 700, color: "var(--text)" }}>{group.label}</h3>
									<p style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}>{group.note}</p>
								</div>
							</div>

							{/* Cert items */}
							<div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: 10 }}>
								{group.certs.map((cert, i) => (
									<div key={cert.name} className="cert-item" style={{
										borderColor: cert.highlight ? `${group.color}40` : "var(--border)",
										background: cert.highlight ? `${group.color}08` : "var(--surface)",
										animation: `revealUp .5s cubic-bezier(.22,1,.36,1) ${i * 0.06}s both`,
									}}>
										<span style={{ fontSize: 20, flexShrink: 0 }}>{cert.icon}</span>
										<div style={{ flex: 1 }}>
											<div style={{ fontSize: 13, fontWeight: 500, color: "var(--text)", marginBottom: 3, lineHeight: 1.4 }}>{cert.name}</div>
											<div style={{ fontSize: 11, color: "var(--text-muted)" }}>{cert.org} · {cert.year}</div>
										</div>
										{cert.highlight && (
											<span className="pill" style={{
												borderColor: `${group.color}40`,
												background: `${group.color}15`,
												color: group.color,
												fontSize: 9,
												flexShrink: 0,
											}}>
												Key
											</span>
										)}
									</div>
								))}
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}

// ─── Contact ──────────────────────────────────────────────────────────────
function Contact() {
	return (
		<section id="contact" className="section" style={{ background: "var(--bg)" }}>
			<div style={{
				position: "absolute",
				inset: 0,
				backgroundImage: "radial-gradient(circle at 50% 50%, rgba(124,111,255,0.1) 0%, transparent 65%)",
				pointerEvents: "none",
			}} />
			<div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 24px", position: "relative" }}>
				<div style={{ textAlign: "center", marginBottom: 64 }} className="reveal">
					<div className="section-label" style={{ justifyContent: "center" }}>Contact</div>
					{/* REWRITTEN: Recruiting-friendly CTA */}
					<h2 className="syne" style={{ fontSize: "clamp(28px,3.5vw,56px)", fontWeight: 800, letterSpacing: "-0.02em", marginBottom: 16 }}>
						Ready to contribute
						<br />
						<span className="grad">to your tax team.</span>
					</h2>
					<p style={{ fontSize: 15, color: "var(--text-sub)", maxWidth: 480, margin: "0 auto" }}>
						I'm actively seeking full-time Tax Staff, Tax Consultant, or Tax Associate roles. Whether it's a quick question or a formal interview — feel free to reach out directly.
					</p>
				</div>

				<div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 32 }}>
					<div className="reveal-left" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
						{[
							{
								icon: <Mail size={16} />,
								label: "Email",
								value: "nadiamadarinasaid@gmail.com",
								href: "mailto:nadiamadarinasaid@gmail.com",
								sub: "Best way to reach me",
							},
							{
								icon: <Phone size={16} />,
								label: "Phone / WhatsApp",
								value: "+62 888-3052-061",
								href: "tel:+628883052061",
								sub: "Available on business days",
							},
							{
								icon: <ExternalLink size={16} />,
								label: "LinkedIn",
								value: "linkedin.com/in/nadiamadarinas",
								href: "https://linkedin.com/in/nadiamadarinas",
								sub: "Full work history and recommendations",
							},
							{
								icon: <MapPin size={16} />,
								label: "Location",
								value: "Sidoarjo, East Java, Indonesia",
								href: null,
								sub: "Open to relocation for the right opportunity",
							},
						].map(({ icon, label, value, href, sub }) => (
							<div key={label} className="glass" style={{ padding: "20px 24px", display: "flex", alignItems: "center", gap: 16 }}>
								<div style={{
									width: 40,
									height: 40,
									borderRadius: 10,
									background: "rgba(124,111,255,0.12)",
									border: "1px solid rgba(124,111,255,0.2)",
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									color: "var(--accent)",
									flexShrink: 0,
								}}>
									{icon}
								</div>
								<div>
									<div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 3 }}>{label}</div>
									{href ? (
										<a
											href={href}
											target={href.startsWith("http") ? "_blank" : undefined}
											rel="noopener noreferrer"
											style={{ fontSize: 14, color: "var(--text)", textDecoration: "none", fontWeight: 400, display: "flex", alignItems: "center", gap: 4 }}
											onMouseOver={(e) => (e.currentTarget.style.color = "var(--accent)")}
											onMouseOut={(e) => (e.currentTarget.style.color = "var(--text)")}>
											{value} {href.startsWith("http") && <ArrowUpRight size={12} />}
										</a>
									) : (
										<span style={{ fontSize: 14, color: "var(--text)", fontWeight: 400 }}>{value}</span>
									)}
									{/* ADDED: Sub-label for context */}
									<div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}>{sub}</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}

// ─── Footer ───────────────────────────────────────────────────────────────
function Footer() {
	return (
		<footer style={{
			background: "#050709",
			borderTop: "1px solid var(--border)",
			padding: "28px 24px",
			display: "flex",
			flexWrap: "wrap",
			gap: 12,
			justifyContent: "space-between",
			alignItems: "center",
		}}>
			<p style={{ fontSize: 13, color: "var(--text-muted)" }}>
				© 2025 <span style={{ color: "var(--text)", fontWeight: 500 }}>Nadia Madarina Said</span>
			</p>
			<p style={{ fontSize: 12, color: "var(--text-muted)" }}>
				Sidoarjo, Indonesia · Junior Tax Consultant · Brevet AB
			</p>
		</footer>
	);
}

// ─── Page ─────────────────────────────────────────────────────────────────
export default function Page() {
	useReveal();
	return (
		<>
			<style dangerouslySetInnerHTML={{ __html: CSS }} />
			<Navbar />
			<main>
				<Hero />
				<Marquee />
				<About />
				<Experience />
				<Skills />
				<Education />
				<Certifications />
				<Contact />
			</main>
			<Footer />
		</>
	);
}
