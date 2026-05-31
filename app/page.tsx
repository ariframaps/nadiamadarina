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

/* Scrollbar */
::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-track { background: var(--bg); }
::-webkit-scrollbar-thumb { background: var(--accent); border-radius: 2px; }

/* Heading font */
.syne { font-family: 'Syne', sans-serif; }

/* Blob backgrounds */
.blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  pointer-events: none;
  z-index: 0;
}

/* Glass card */
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

/* Pill badge */
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

/* Accent gradient text */
.grad {
  background: linear-gradient(135deg, var(--accent), var(--accent2));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Buttons */
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

/* Reveal animations */
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

/* Section */
.section { padding: 100px 0; position: relative; overflow: hidden; }

/* Section label */
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

/* Skill tag */
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

/* Cert row */
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

/* Contact input */
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

/* Marquee */
.marquee-wrap { overflow: hidden; }
.marquee-track {
  display: flex;
  width: max-content;
  animation: marquee-scroll 30s linear infinite;
}
.marquee-track:hover { animation-play-state: paused; }

/* Nav mobile menu */
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

/* Timeline */
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

/* Stat card */
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

/* Responsive helpers */
@media (max-width: 768px) {
  .section { padding: 72px 0; }
  .hide-mobile { display: none !important; }
}
@media (min-width: 769px) {
  .hide-desktop { display: none !important; }
}
`;

// ─── Data ─────────────────────────────────────────────────────────────────
const EXPERIENCES = [
	{
		role: "Tax Consulting Staff",
		company: "MUC Consulting",
		period: "Mar 2025 – Nov 2025",
		type: "Full-time",
		color: "#7C6FFF",
		points: [
			"Supported tax consulting activities and administrative processes within professional consulting environments",
			"Handled client documentation, ensuring completeness of supporting documents for consulting engagements",
			"Coordinated with clients and internal teams on documentation requirements and operational needs",
			"Conducted document checking, data validation, and administrative reviews for accuracy and compliance",
		],
	},
	{
		role: "Tax Consulting Intern",
		company: "Tax Consulting Firm",
		period: "Mar 2026 – Jun 2026",
		type: "Internship",
		color: "#C084FC",
		points: [
			"Supported operational and administrative activities within tax consulting environments",
			"Assisted in handling client requests, documentation processes, and administrative requirements",
			"Participated in preparing and organizing supporting documents for client engagements",
			"Coordinated with team members to support project completion within deadlines",
		],
	},
	{
		role: "Administrative Intern",
		company: "Prosecutor Office (Kejaksaan)",
		period: "Government Institution",
		type: "Internship",
		color: "#F0C96A",
		points: [
			"Supported administrative processes and documentation within government institutions",
			"Assisted with document management, filing processes, and operational support",
			"Maintained organized administrative records and supported daily operational activities",
		],
	},
];

const SKILLS_GROUPS = [
	{
		label: "Tax & Accounting",
		color: "#7C6FFF",
		tags: [
			"Tax Administration",
			"Tax Documentation",
			"Tax Planning",
			"Transfer Pricing",
			"Financial Compliance",
			"VAT/GST",
			"Regulatory Filing",
			"Client Documentation",
		],
	},
	{
		label: "Technical",
		color: "#C084FC",
		tags: [
			"Microsoft Excel (Advanced)",
			"Microsoft Office Suite",
			"Data Processing",
			"Report Writing",
			"Documentation Systems",
			"Canva",
		],
	},
	{
		label: "Professional",
		color: "#F0C96A",
		tags: [
			"Analytical Thinking",
			"Attention to Detail",
			"Client Coordination",
			"Team Collaboration",
			"Problem Solving",
			"Time Management",
			"Public Speaking",
			"Fast Learning",
		],
	},
];

const CERTS = [
	{ name: "Brevet AB", cat: "Tax", icon: "🏛️" },
	{ name: "Tax Officer Training", cat: "Tax", icon: "📋" },
	{ name: "Tax Planning  Corporate Tax Saving", cat: "Tax", icon: "💼" },
	{ name: "Pajak 102: Tax Planning", cat: "Tax", icon: "📊" },
	{
		name: "Transfer Pricing eLearning  World Bank Group",
		cat: "International",
		icon: "🌐",
	},
	{ name: "KPMG Audit & Assurance Job Simulation", cat: "Audit", icon: "🏦" },
	{ name: "Airlangga Microsoft Bootcamp", cat: "Technology", icon: "💻" },
	{
		name: "Intensive 2-Week Microsoft Excel Bootcamp",
		cat: "Technology",
		icon: "📈",
	},
	{ name: "C1 Advanced English Certificate", cat: "Language", icon: "🇬🇧" },
	{
		name: "EF SET English Certificate  C2 Proficient",
		cat: "Language",
		icon: "✨",
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

// ─── Hook: Reveal ─────────────────────────────────────────────────────────
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

function scrollTo(id: string) {
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

	const go = (id: string) => {
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
					{/* Logo */}
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
							<span
								style={{
									fontFamily: "'Syne',sans-serif",
									fontSize: 13,
									fontWeight: 800,
									color: "#fff",
								}}>
								N
							</span>
						</div>
						<span
							className="syne"
							style={{
								fontSize: 16,
								fontWeight: 700,
								color: "var(--text)",
								letterSpacing: "-0.01em",
							}}>
							Nadia<span className="grad">MS</span>
						</span>
					</button>

					{/* Desktop links */}
					<div className="hide-mobile" style={{ display: "flex", gap: 4 }}>
						{NAV_LINKS.map((l) => (
							<button
								key={l}
								onClick={() => go(l)}
								style={{
									background: active === l ? "rgba(124,111,255,0.12)" : "none",
									border: "1px solid",
									borderColor:
										active === l ? "rgba(124,111,255,0.3)" : "transparent",
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
										(e.currentTarget as HTMLButtonElement).style.color =
											"var(--text)";
										(e.currentTarget as HTMLButtonElement).style.borderColor =
											"var(--border)";
									}
								}}
								onMouseOut={(e) => {
									if (active !== l) {
										(e.currentTarget as HTMLButtonElement).style.color =
											"var(--text-muted)";
										(e.currentTarget as HTMLButtonElement).style.borderColor =
											"transparent";
									}
								}}>
								{l}
							</button>
						))}
					</div>

					<div style={{ display: "flex", alignItems: "center", gap: 10 }}>
						<a
							href="mailto:nadiamadarinasaid@gmail.com"
							className="btn-primary hide-mobile"
							style={{ padding: "9px 20px", fontSize: 13 }}>
							Hire Me <ArrowUpRight size={13} />
						</a>
						{/* Mobile hamburger */}
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

			{/* Mobile menu overlay */}
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
					<a
						href="mailto:nadiamadarinasaid@gmail.com"
						className="btn-primary"
						style={{ marginTop: 24 }}>
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
			{/* Blobs */}
			<div
				className="blob"
				style={{
					width: 600,
					height: 600,
					background:
						"radial-gradient(circle,rgba(124,111,255,0.18) 0%,transparent 70%)",
					top: "-10%",
					right: "-5%",
				}}
			/>
			<div
				className="blob"
				style={{
					width: 400,
					height: 400,
					background:
						"radial-gradient(circle,rgba(192,132,252,0.14) 0%,transparent 70%)",
					bottom: "5%",
					left: "-5%",
				}}
			/>
			<div
				className="blob"
				style={{
					width: 300,
					height: 300,
					background:
						"radial-gradient(circle,rgba(240,201,106,0.08) 0%,transparent 70%)",
					top: "40%",
					left: "30%",
				}}
			/>

			<div
				style={{
					maxWidth: 1160,
					margin: "0 auto",
					padding: "0 24px",
					width: "100%",
					position: "relative",
					zIndex: 1,
				}}>
				<div
					style={{
						display: "grid",
						gridTemplateColumns: "1fr auto",
						gap: 48,
						alignItems: "center",
					}}>
					{/* Text */}
					<div>
						<div
							style={{
								animation: "revealUp 0.8s cubic-bezier(.22,1,.36,1) 0.1s both",
							}}>
							<span
								className="pill"
								style={{
									borderColor: "rgba(124,111,255,0.35)",
									background: "rgba(124,111,255,0.1)",
									color: "var(--accent)",
									marginBottom: 28,
									display: "inline-flex",
								}}>
								<span
									style={{
										width: 6,
										height: 6,
										borderRadius: "50%",
										background: "#4ade80",
										animation: "pulse-ring 1.5s ease-out infinite",
										display: "inline-block",
									}}
								/>
								Open to Opportunities
							</span>
						</div>

						<h1
							className="syne"
							style={{
								fontSize: "clamp(44px,7vw,96px)",
								fontWeight: 800,
								lineHeight: 1.0,
								letterSpacing: "-0.03em",
								marginBottom: 24,
								animation: "revealUp 0.8s cubic-bezier(.22,1,.36,1) 0.2s both",
							}}>
							Nadia
							<br />
							<span className="grad">Madarina</span>
							<br />
							Sa&apos;id
						</h1>

						<p
							style={{
								fontSize: 16,
								lineHeight: 1.8,
								color: "var(--text-sub)",
								maxWidth: 460,
								marginBottom: 40,
								fontWeight: 300,
								animation: "revealUp 0.8s cubic-bezier(.22,1,.36,1) 0.35s both",
							}}>
							Accounting graduate from Universitas Airlangga specialising in tax
							consulting, compliance documentation, and client relations. Brevet
							AB certified, C2 English proficient.
						</p>

						<div
							style={{
								display: "flex",
								flexWrap: "wrap",
								gap: 12,
								marginBottom: 52,
								animation: "revealUp 0.8s cubic-bezier(.22,1,.36,1) 0.45s both",
							}}>
							<a
								href="#contact"
								className="btn-primary"
								onClick={(e) => {
									e.preventDefault();
									scrollTo("contact");
								}}>
								Get in Touch <ArrowUpRight size={14} />
							</a>
							<a
								href="#experience"
								className="btn-ghost"
								onClick={(e) => {
									e.preventDefault();
									scrollTo("experience");
								}}>
								View Experience
							</a>
							<a
								href="https://docs.google.com/document/d/1i7CJPFIWh5ntpQiJrJ6s_Kxo4LKjnmMX/edit?usp=sharing&ouid=112511912242432371380&rtpof=true&sd=true"
								className="btn-ghost"
								onClick={(e) => {
									e.preventDefault();
									scrollTo("experience");
								}}>
								Resume <ArrowUpRight size={14} />
							</a>
						</div>

						<div
							style={{
								display: "flex",
								flexWrap: "wrap",
								gap: 24,
								animation: "revealUp 0.8s cubic-bezier(.22,1,.36,1) 0.55s both",
							}}>
							{[
								{ icon: <MapPin size={13} />, text: "Sidoarjo, Indonesia" },
								{ icon: "🎓", text: "Airlangga '24" },
								{ icon: "✦", text: "Brevet AB" },
							].map(({ icon, text }) => (
								<div
									key={text}
									style={{
										display: "flex",
										alignItems: "center",
										gap: 6,
										fontSize: 13,
										color: "var(--text-muted)",
										fontWeight: 400,
									}}>
									<span
										style={{
											color: "var(--accent)",
											display: "flex",
											alignItems: "center",
										}}>
										{icon}
									</span>
									{text}
								</div>
							))}
						</div>
					</div>

					{/* Photo  hide on small screens */}
					<div
						className="hide-mobile"
						style={{
							animation: "fadeIn 1.2s cubic-bezier(.22,1,.36,1) 0.1s both",
							position: "relative",
						}}>
						{/* Spinning ring */}
						<div
							style={{
								position: "absolute",
								inset: -20,
								borderRadius: "50%",
								border: "1px dashed rgba(124,111,255,0.25)",
								animation: "spin-slow 20s linear infinite",
							}}
						/>
						<div
							style={{
								position: "absolute",
								inset: -8,
								borderRadius: "38px",
								background:
									"linear-gradient(135deg,rgba(124,111,255,0.3),rgba(192,132,252,0.2),transparent)",
								filter: "blur(2px)",
							}}
						/>
						<div
							style={{
								position: "relative",
								width: 320,
								height: 400,
								borderRadius: 32,
								overflow: "hidden",
								border: "1px solid rgba(255,255,255,0.1)",
								boxShadow:
									"0 40px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(124,111,255,0.2)",
							}}>
							<Image
								src="/nadia.webp"
								alt="Nadia Madarina Sa'id"
								fill
								style={{ objectFit: "cover" }}
								priority
							/>
							<div
								style={{
									position: "absolute",
									inset: 0,
									background:
										"linear-gradient(to top, rgba(8,11,20,0.6) 0%, transparent 50%)",
								}}
							/>
						</div>
						{/* Float badge */}
						<div
							className="glass"
							style={{
								position: "absolute",
								bottom: -16,
								right: -16,
								padding: "12px 18px",
								borderRadius: 14,
							}}>
							<div
								style={{
									fontSize: 11,
									color: "var(--text-muted)",
									marginBottom: 2,
									letterSpacing: "0.06em",
								}}>
								English
							</div>
							<div
								className="syne"
								style={{ fontSize: 18, fontWeight: 800, color: "var(--gold)" }}>
								C2
							</div>
						</div>
					</div>
				</div>

				{/* Stat row */}
				<div
					style={{
						display: "grid",
						gridTemplateColumns: "repeat(3,1fr)",
						gap: 16,
						marginTop: 64,
						animation: "revealUp 0.8s cubic-bezier(.22,1,.36,1) 0.65s both",
					}}>
					{[
						{ n: "2+", l: "Years Experience" },
						{ n: "10+", l: "Certifications" },
						{ n: "C2", l: "English Proficiency" },
					].map(({ n, l }) => (
						<div key={l} className="stat-card">
							<div
								className="syne grad"
								style={{
									fontSize: "clamp(28px,4vw,44px)",
									fontWeight: 800,
									lineHeight: 1,
								}}>
								{n}
							</div>
							<div
								style={{
									fontSize: 12,
									color: "var(--text-muted)",
									marginTop: 6,
									fontWeight: 400,
								}}>
								{l}
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Scroll cue */}
			<div
				style={{
					position: "absolute",
					bottom: 28,
					left: "50%",
					transform: "translateX(-50%)",
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					gap: 6,
					animation: "fadeIn 1s ease 1.2s both",
				}}>
				<span
					style={{
						fontSize: 10,
						letterSpacing: "0.15em",
						textTransform: "uppercase",
						color: "var(--text-muted)",
					}}>
					Scroll
				</span>
				<ChevronDown
					size={14}
					style={{
						color: "var(--accent)",
						animation: "float 2s ease-in-out infinite",
					}}
				/>
			</div>
		</section>
	);
}

// ─── Marquee ──────────────────────────────────────────────────────────────
function Marquee() {
	const items = [
		"Tax Consulting",
		"Brevet AB",
		"Compliance",
		"Transfer Pricing",
		"KPMG Simulation",
		"C2 English",
		"Universitas Airlangga",
		"Excel Advanced",
		"World Bank",
		"Documentation",
	];
	const doubled = [...items, ...items];
	return (
		<div
			style={{
				borderTop: "1px solid var(--border)",
				borderBottom: "1px solid var(--border)",
				padding: "16px 0",
				overflow: "hidden",
				background: "rgba(255,255,255,0.015)",
			}}>
			<div className="marquee-track">
				{doubled.map((item, i) => (
					<span
						key={i}
						style={{
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
		<section
			id="about"
			className="section"
			style={{ background: "var(--bg2)" }}>
			<div
				style={{
					position: "absolute",
					inset: 0,
					backgroundImage:
						"radial-gradient(circle at 80% 50%, rgba(124,111,255,0.06) 0%, transparent 60%)",
					pointerEvents: "none",
				}}
			/>
			<div
				style={{
					maxWidth: 1160,
					margin: "0 auto",
					padding: "0 24px",
					position: "relative",
				}}>
				<div
					style={{
						display: "grid",
						gridTemplateColumns: "1fr 1fr",
						gap: 64,
						alignItems: "center",
					}}>
					<div className="reveal-left">
						<div className="section-label">Who I Am</div>
						<h2
							className="syne"
							style={{
								fontSize: "clamp(28px,3.5vw,48px)",
								fontWeight: 800,
								lineHeight: 1.15,
								letterSpacing: "-0.02em",
								marginBottom: 24,
							}}>
							Detail-oriented
							<br />
							professional building
							<br />a career in <span className="grad">taxation</span>
						</h2>
						<p
							style={{
								fontSize: 15,
								lineHeight: 1.9,
								color: "var(--text-sub)",
								marginBottom: 20,
							}}>
							I&apos;m an accounting graduate from Universitas Airlangga with a
							strong foundation in tax consulting and financial compliance. My
							work at MUC Consulting gave me hands-on exposure to complex tax
							operations, client documentation workflows, and regulatory
							compliance.
						</p>
						<p
							style={{
								fontSize: 15,
								lineHeight: 1.9,
								color: "var(--text-sub)",
								marginBottom: 36,
							}}>
							I hold a Brevet AB certification, completed World Bank Group
							transfer pricing training, and maintain C2 English proficiency
							positioning me for both domestic and international consulting
							roles.
						</p>
						<div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
							{[
								"Tax Consulting",
								"Documentation",
								"Client Relations",
								"Data Validation",
								"Compliance",
							].map((t) => (
								<span
									key={t}
									className="pill"
									style={{
										borderColor: "rgba(124,111,255,0.3)",
										background: "rgba(124,111,255,0.08)",
										color: "var(--accent)",
									}}>
									{t}
								</span>
							))}
						</div>
					</div>

					<div
						className="reveal"
						style={{
							display: "grid",
							gridTemplateColumns: "1fr 1fr",
							gap: 16,
						}}>
						{[
							{
								label: "Education",
								value: "Universitas Airlangga",
								sub: "Bachelor of Accounting",
								color: "#7C6FFF",
							},
							{
								label: "Certification",
								value: "Brevet AB",
								sub: "Tax Certification",
								color: "#C084FC",
							},
							{
								label: "Language",
								value: "C2 Proficient",
								sub: "EF SET Certified",
								color: "#F0C96A",
							},
							{
								label: "Location",
								value: "Sidoarjo",
								sub: "East Java, Indonesia",
								color: "#7C6FFF",
							},
						].map(({ label, value, sub, color }) => (
							<div key={label} className="glass" style={{ padding: 24 }}>
								<div
									style={{
										fontSize: 10,
										fontWeight: 700,
										letterSpacing: "0.12em",
										textTransform: "uppercase",
										color: color,
										marginBottom: 10,
									}}>
									{label}
								</div>
								<div
									className="syne"
									style={{
										fontSize: 16,
										fontWeight: 700,
										color: "var(--text)",
										marginBottom: 4,
									}}>
									{value}
								</div>
								<div style={{ fontSize: 12, color: "var(--text-muted)" }}>
									{sub}
								</div>
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
	const [open, setOpen] = useState<number | null>(0);

	return (
		<section
			id="experience"
			className="section"
			style={{ background: "var(--bg)" }}>
			<div
				style={{
					position: "absolute",
					inset: 0,
					backgroundImage:
						"radial-gradient(circle at 20% 50%, rgba(192,132,252,0.06) 0%, transparent 60%)",
					pointerEvents: "none",
				}}
			/>
			<div
				style={{
					maxWidth: 1160,
					margin: "0 auto",
					padding: "0 24px",
					position: "relative",
				}}>
				<div className="reveal" style={{ marginBottom: 56 }}>
					<div className="section-label">Career Path</div>
					<h2
						className="syne"
						style={{
							fontSize: "clamp(28px,3.5vw,48px)",
							fontWeight: 800,
							letterSpacing: "-0.02em",
						}}>
						Professional <span className="grad">Experience</span>
					</h2>
				</div>

				<div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
					{EXPERIENCES.map((exp, i) => (
						<div
							key={i}
							className="reveal"
							style={{ transitionDelay: `${i * 0.1}s` }}>
							<div style={{ display: "flex", gap: 24 }}>
								{/* Timeline */}
								<div
									style={{
										display: "flex",
										flexDirection: "column",
										alignItems: "center",
										paddingTop: 4,
									}}>
									<div
										className="tl-dot"
										style={{
											background: `linear-gradient(135deg, ${exp.color}, ${i === 2 ? "#ff9f43" : "#C084FC"})`,
											boxShadow: `0 0 12px ${exp.color}60`,
										}}
									/>
									{i < EXPERIENCES.length - 1 && (
										<div
											className="tl-line"
											style={{
												background: `linear-gradient(to bottom, ${exp.color}60, transparent)`,
											}}
										/>
									)}
								</div>

								{/* Card */}
								<div
									className="glass"
									style={{
										flex: 1,
										marginBottom: 20,
										padding: "24px 28px",
										cursor: "pointer",
										borderColor:
											open === i ? `${exp.color}40` : "var(--border)",
										background:
											open === i ? `rgba(124,111,255,0.06)` : "var(--surface)",
									}}
									onClick={() => setOpen(open === i ? null : i)}>
									<div
										style={{
											display: "flex",
											justifyContent: "space-between",
											alignItems: "flex-start",
											gap: 12,
										}}>
										<div style={{ flex: 1 }}>
											<div
												style={{
													display: "flex",
													flexWrap: "wrap",
													gap: 8,
													marginBottom: 10,
												}}>
												<span
													className="pill"
													style={{
														borderColor: `${exp.color}50`,
														background: `${exp.color}15`,
														color: exp.color,
														fontSize: 10,
													}}>
													{exp.type}
												</span>
												<span
													style={{
														fontSize: 12,
														color: "var(--text-muted)",
														alignSelf: "center",
													}}>
													{exp.period}
												</span>
											</div>
											<h3
												className="syne"
												style={{
													fontSize: 18,
													fontWeight: 700,
													color: "var(--text)",
													marginBottom: 4,
												}}>
												{exp.role}
											</h3>
											<p
												style={{
													fontSize: 14,
													color: exp.color,
													fontWeight: 500,
												}}>
												{exp.company}
											</p>
										</div>
										<div
											style={{
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
											<ChevronDown
												size={14}
												style={{ color: "var(--text-muted)" }}
											/>
										</div>
									</div>

									{open === i && (
										<div
											style={{
												marginTop: 20,
												paddingTop: 20,
												borderTop: `1px solid ${exp.color}20`,
											}}>
											<ul
												style={{
													listStyle: "none",
													display: "flex",
													flexDirection: "column",
													gap: 10,
												}}>
												{exp.points.map((pt, j) => (
													<li
														key={j}
														style={{
															display: "flex",
															gap: 12,
															fontSize: 14,
															lineHeight: 1.7,
															color: "var(--text-sub)",
															animation: `revealUp 0.4s cubic-bezier(.22,1,.36,1) ${j * 0.06}s both`,
														}}>
														<span
															style={{
																color: exp.color,
																flexShrink: 0,
																marginTop: 3,
															}}>
															→
														</span>
														{pt}
													</li>
												))}
											</ul>
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
		<section
			id="skills"
			className="section"
			style={{ background: "var(--bg2)" }}>
			<div
				style={{
					position: "absolute",
					inset: 0,
					backgroundImage:
						"radial-gradient(circle at 70% 30%, rgba(124,111,255,0.07) 0%, transparent 60%)",
					pointerEvents: "none",
				}}
			/>
			<div
				style={{
					maxWidth: 1160,
					margin: "0 auto",
					padding: "0 24px",
					position: "relative",
				}}>
				<div className="reveal" style={{ marginBottom: 48 }}>
					<div className="section-label">Capabilities</div>
					<h2
						className="syne"
						style={{
							fontSize: "clamp(28px,3.5vw,48px)",
							fontWeight: 800,
							letterSpacing: "-0.02em",
						}}>
						Skills &amp; <span className="grad">Expertise</span>
					</h2>
				</div>

				{/* Tab switcher */}
				<div
					className="reveal"
					style={{
						display: "flex",
						gap: 8,
						marginBottom: 36,
						flexWrap: "wrap",
					}}>
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
							}}>
							{g.label}
						</button>
					))}
				</div>

				{/* Tags grid */}
				<div
					className="reveal"
					style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
					{SKILLS_GROUPS[activeTab].tags.map((tag, i) => (
						<span
							key={tag}
							className="stag"
							style={{
								animation: `revealUp 0.35s cubic-bezier(.22,1,.36,1) ${i * 0.05}s both`,
								borderColor: `${SKILLS_GROUPS[activeTab].color}30`,
							}}>
							{tag}
						</span>
					))}
				</div>

				{/* Languages */}
				<div
					className="reveal"
					style={{
						marginTop: 48,
						display: "grid",
						gridTemplateColumns: "repeat(auto-fit, minmax(260px,1fr))",
						gap: 16,
					}}>
					{[
						{
							lang: "Bahasa Indonesia",
							level: "Native",
							flag: "🇮🇩",
							color: "#7C6FFF",
						},
						{
							lang: "English",
							level: "C2 Proficient",
							flag: "🇬🇧",
							color: "#F0C96A",
						},
					].map(({ lang, level, flag, color }) => (
						<div
							key={lang}
							className="glass"
							style={{
								padding: "20px 24px",
								display: "flex",
								alignItems: "center",
								gap: 16,
							}}>
							<span style={{ fontSize: 28 }}>{flag}</span>
							<div>
								<div
									className="syne"
									style={{
										fontSize: 16,
										fontWeight: 700,
										color: "var(--text)",
										marginBottom: 3,
									}}>
									{lang}
								</div>
								<div
									style={{
										fontSize: 12,
										color: color,
										fontWeight: 600,
										letterSpacing: "0.06em",
										textTransform: "uppercase",
									}}>
									{level}
								</div>
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
		<section
			id="education"
			className="section"
			style={{ background: "var(--bg)" }}>
			<div
				style={{
					position: "absolute",
					inset: 0,
					backgroundImage:
						"radial-gradient(circle at 30% 70%, rgba(240,201,106,0.05) 0%, transparent 60%)",
					pointerEvents: "none",
				}}
			/>
			<div
				style={{
					maxWidth: 1160,
					margin: "0 auto",
					padding: "0 24px",
					position: "relative",
				}}>
				<div className="reveal" style={{ marginBottom: 48 }}>
					<div className="section-label">Academic</div>
					<h2
						className="syne"
						style={{
							fontSize: "clamp(28px,3.5vw,48px)",
							fontWeight: 800,
							letterSpacing: "-0.02em",
						}}>
						<span className="grad">Education</span>
					</h2>
				</div>

				<div
					style={{
						display: "grid",
						gridTemplateColumns: "1fr 1fr",
						gap: 24,
						alignItems: "start",
					}}>
					{/* Main card */}
					<div className="reveal glass" style={{ padding: "36px" }}>
						<div
							style={{
								display: "flex",
								gap: 16,
								alignItems: "flex-start",
								marginBottom: 24,
							}}>
							<div
								style={{
									width: 52,
									height: 52,
									borderRadius: 14,
									background: "linear-gradient(135deg,#7C6FFF,#C084FC)",
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									flexShrink: 0,
									fontSize: 24,
								}}>
								🎓
							</div>
							<div>
								<span
									className="pill"
									style={{
										borderColor: "rgba(124,111,255,0.3)",
										background: "rgba(124,111,255,0.1)",
										color: "var(--accent)",
										fontSize: 10,
										marginBottom: 10,
										display: "inline-flex",
									}}>
									2020 – 2024
								</span>
								<h3
									className="syne"
									style={{
										fontSize: 22,
										fontWeight: 800,
										color: "var(--text)",
										lineHeight: 1.2,
									}}>
									Bachelor of
									<br />
									Accounting
								</h3>
							</div>
						</div>
						<p
							style={{
								fontSize: 16,
								color: "var(--accent)",
								fontWeight: 600,
								marginBottom: 16,
							}}>
							Universitas Airlangga
						</p>
						<p
							style={{
								fontSize: 14,
								lineHeight: 1.85,
								color: "var(--text-sub)",
								marginBottom: 24,
							}}>
							Comprehensive accounting education from one of Indonesia&apos;s
							leading universities. Built strong foundations in taxation,
							financial analysis, auditing, and business reporting.
						</p>
						<div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
							{[
								"Taxation",
								"Financial Analysis",
								"Auditing",
								"Business Reporting",
								"Cost Accounting",
							].map((t) => (
								<span key={t} className="stag" style={{ fontSize: 12 }}>
									{t}
								</span>
							))}
						</div>
					</div>

					{/* Achievement */}
					<div
						className="reveal"
						style={{
							transitionDelay: "0.1s",
							display: "flex",
							flexDirection: "column",
							gap: 16,
						}}>
						<div
							className="glass"
							style={{
								padding: "28px",
								borderColor: "rgba(240,201,106,0.2)",
								background: "rgba(240,201,106,0.05)",
							}}>
							<div
								style={{
									fontSize: 10,
									fontWeight: 700,
									letterSpacing: "0.12em",
									textTransform: "uppercase",
									color: "var(--gold)",
									marginBottom: 12,
								}}>
								🏆 Achievement
							</div>
							<h4
								className="syne"
								style={{
									fontSize: 17,
									fontWeight: 700,
									color: "var(--text)",
									marginBottom: 8,
								}}>
								1st Place Lomba Konten Medsos
							</h4>
							<p
								style={{
									fontSize: 13,
									color: "var(--text-muted)",
									lineHeight: 1.6,
								}}>
								APA Fest 2021 · Ikatan Akuntan Indonesia · November 2021
							</p>
						</div>

						<div className="glass" style={{ padding: "28px" }}>
							<div
								style={{
									fontSize: 10,
									fontWeight: 700,
									letterSpacing: "0.12em",
									textTransform: "uppercase",
									color: "var(--accent)",
									marginBottom: 16,
								}}>
								Key Highlights
							</div>
							{[
								"Strong foundation in tax law & compliance",
								"Hands-on case studies & project learning",
								"Active member of accounting student body",
							].map((h, i) => (
								<div
									key={i}
									style={{
										display: "flex",
										gap: 10,
										fontSize: 14,
										color: "var(--text-sub)",
										marginBottom: 10,
										lineHeight: 1.6,
									}}>
									<span style={{ color: "var(--accent)", flexShrink: 0 }}>
										✓
									</span>{" "}
									{h}
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
	const cats = [
		"All",
		"Tax",
		"International",
		"Audit",
		"Technology",
		"Language",
	];
	const [active, setActive] = useState("All");
	const filtered =
		active === "All" ? CERTS : CERTS.filter((c) => c.cat === active);

	return (
		<section
			id="certifications"
			className="section"
			style={{ background: "var(--bg2)" }}>
			<div
				style={{
					position: "absolute",
					inset: 0,
					backgroundImage:
						"radial-gradient(circle at 60% 20%, rgba(124,111,255,0.07) 0%, transparent 60%)",
					pointerEvents: "none",
				}}
			/>
			<div
				style={{
					maxWidth: 1160,
					margin: "0 auto",
					padding: "0 24px",
					position: "relative",
				}}>
				<div className="reveal" style={{ marginBottom: 40 }}>
					<div className="section-label">Credentials</div>
					<h2
						className="syne"
						style={{
							fontSize: "clamp(28px,3.5vw,48px)",
							fontWeight: 800,
							letterSpacing: "-0.02em",
							marginBottom: 28,
						}}>
						Certifications &amp; <span className="grad">Training</span>
					</h2>
					<div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
						{cats.map((c) => (
							<button
								key={c}
								onClick={() => setActive(c)}
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
									borderColor: active === c ? "var(--accent)" : "var(--border)",
									background:
										active === c ? "rgba(124,111,255,0.15)" : "transparent",
									color: active === c ? "var(--accent)" : "var(--text-muted)",
								}}>
								{c}
							</button>
						))}
					</div>
				</div>

				<div
					style={{
						display: "grid",
						gridTemplateColumns: "repeat(auto-fill,minmax(320px,1fr))",
						gap: 12,
					}}>
					{filtered.map((cert, i) => (
						<div
							key={`${active}-${cert.name}`}
							className="cert-item"
							style={{
								animation: `revealUp .5s cubic-bezier(.22,1,.36,1) ${(i % 6) * 0.06}s both`,
							}}>
							<span style={{ fontSize: 22, flexShrink: 0 }}>{cert.icon}</span>
							<div style={{ flex: 1 }}>
								<div
									style={{
										fontSize: 14,
										fontWeight: 500,
										color: "var(--text)",
										marginBottom: 4,
										lineHeight: 1.4,
									}}>
									{cert.name}
								</div>
							</div>
							<span
								className="pill"
								style={{
									borderColor: "rgba(124,111,255,0.3)",
									background: "rgba(124,111,255,0.08)",
									color: "var(--accent)",
									fontSize: 10,
									flexShrink: 0,
								}}>
								{cert.cat}
							</span>
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
		<section
			id="contact"
			className="section"
			style={{ background: "var(--bg)" }}>
			<div
				style={{
					position: "absolute",
					inset: 0,
					backgroundImage:
						"radial-gradient(circle at 50% 50%, rgba(124,111,255,0.1) 0%, transparent 65%)",
					pointerEvents: "none",
				}}
			/>
			<div
				style={{
					maxWidth: 1160,
					margin: "0 auto",
					padding: "0 24px",
					position: "relative",
				}}>
				<div
					style={{ textAlign: "center", marginBottom: 64 }}
					className="reveal">
					<div className="section-label" style={{ justifyContent: "center" }}>
						Contact
					</div>
					<h2
						className="syne"
						style={{
							fontSize: "clamp(28px,3.5vw,56px)",
							fontWeight: 800,
							letterSpacing: "-0.02em",
							marginBottom: 16,
						}}>
						Let&apos;s build something
						<br />
						<span className="grad">great together</span>
					</h2>
					<p
						style={{
							fontSize: 15,
							color: "var(--text-sub)",
							maxWidth: 420,
							margin: "0 auto",
						}}>
						Actively seeking opportunities in taxation, accounting, and
						consulting. Full-time or internship I&apos;d love to connect.
					</p>
				</div>

				<div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 32 }}>
					{/* Contact info */}
					<div
						className="reveal-left"
						style={{ display: "flex", flexDirection: "column", gap: 16 }}>
						{[
							{
								icon: <Mail size={16} />,
								label: "Email",
								value: "nadiamadarinasaid@gmail.com",
								href: "mailto:nadiamadarinasaid@gmail.com",
							},
							{
								icon: <Phone size={16} />,
								label: "Phone",
								value: "+62 888-3052-061",
								href: "tel:+628883052061",
							},
							{
								icon: <ExternalLink size={16} />,
								label: "LinkedIn",
								value: "linkedin.com/in/nadiamadarinas",
								href: "https://linkedin.com/in/nadiamadarinas",
							},
							{
								icon: <MapPin size={16} />,
								label: "Location",
								value: "Sidoarjo, East Java, Indonesia",
								href: null,
							},
						].map(({ icon, label, value, href }) => (
							<div
								key={label}
								className="glass"
								style={{
									padding: "20px 24px",
									display: "flex",
									alignItems: "center",
									gap: 16,
								}}>
								<div
									style={{
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
									<div
										style={{
											fontSize: 11,
											fontWeight: 600,
											letterSpacing: "0.1em",
											textTransform: "uppercase",
											color: "var(--text-muted)",
											marginBottom: 3,
										}}>
										{label}
									</div>
									{href ? (
										<a
											href={href}
											target={href.startsWith("http") ? "_blank" : undefined}
											rel="noopener noreferrer"
											style={{
												fontSize: 14,
												color: "var(--text)",
												textDecoration: "none",
												fontWeight: 400,
												display: "flex",
												alignItems: "center",
												gap: 4,
											}}
											onMouseOver={(e) =>
												(e.currentTarget.style.color = "var(--accent)")
											}
											onMouseOut={(e) =>
												(e.currentTarget.style.color = "var(--text)")
											}>
											{value}{" "}
											{href.startsWith("http") && <ArrowUpRight size={12} />}
										</a>
									) : (
										<span
											style={{
												fontSize: 14,
												color: "var(--text)",
												fontWeight: 400,
											}}>
											{value}
										</span>
									)}
								</div>
							</div>
						))}
					</div>

					{/* Form */}
					{/* <div className="reveal glass" style={{ padding: "32px 36px" }}>
						<h3
							className="syne"
							style={{
								fontSize: 18,
								fontWeight: 700,
								marginBottom: 24,
								color: "var(--text)",
							}}>
							Send a Message
						</h3>
						<div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
							{[
								{
									id: "name",
									label: "Full Name",
									type: "text",
									placeholder: "Your name",
								},
								{
									id: "email",
									label: "Email",
									type: "email",
									placeholder: "your@email.com",
								},
								{
									id: "company",
									label: "Company",
									type: "text",
									placeholder: "Where you work",
								},
							].map(({ id, label, type, placeholder }) => (
								<div key={id}>
									<label
										htmlFor={id}
										style={{
											display: "block",
											fontSize: 11,
											fontWeight: 600,
											letterSpacing: "0.1em",
											textTransform: "uppercase",
											color: "var(--text-muted)",
											marginBottom: 8,
										}}>
										{label}
									</label>
									<input
										type={type}
										id={id}
										placeholder={placeholder}
										className="inp"
									/>
								</div>
							))}
							<div>
								<label
									htmlFor="msg"
									style={{
										display: "block",
										fontSize: 11,
										fontWeight: 600,
										letterSpacing: "0.1em",
										textTransform: "uppercase",
										color: "var(--text-muted)",
										marginBottom: 8,
									}}>
									Message
								</label>
								<textarea
									id="msg"
									rows={3}
									placeholder="Tell me about the opportunity..."
									className="inp"
									style={{ resize: "none" }}
								/>
							</div>
							<a
								href="mailto:nadiamadarinasaid@gmail.com"
								className="btn-primary"
								style={{ justifyContent: "center", marginTop: 4 }}>
								Send Message <ArrowUpRight size={14} />
							</a>
						</div>
					</div> */}
				</div>
			</div>
		</section>
	);
}

// ─── Footer ───────────────────────────────────────────────────────────────
function Footer() {
	return (
		<footer
			style={{
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
				© 2025{" "}
				<span style={{ color: "var(--text)", fontWeight: 500 }}>
					Nadia Madarina Sa&apos;id
				</span>
			</p>
			<p style={{ fontSize: 12, color: "var(--text-muted)" }}>
				Sidoarjo, Indonesia · Tax Consultant
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
