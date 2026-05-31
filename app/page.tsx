"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
	Mail,
	Phone,
	MapPin,
	ArrowUpRight,
	ChevronDown,
	ExternalLink,
} from "lucide-react";

// ─── Data ──────────────────────────────────────────────────────────────────
const EXPERIENCES = [
	{
		role: "Tax Consulting Staff",
		company: "MUC Consulting",
		period: "Mar 2025 – Nov 2025",
		type: "Full-time",
		index: "01",
		points: [
			"Supported tax consulting activities and administrative processes within professional consulting environments",
			"Handled client documentation, ensuring completeness of supporting documents for consulting engagements",
			"Coordinated with clients and internal teams on documentation requirements and operational needs",
			"Conducted document checking, data validation, and administrative reviews for accuracy and compliance",
			"Utilized Microsoft Excel for data processing, documentation management, and reporting activities",
		],
	},
	{
		role: "Tax Consulting Intern",
		company: "Tax Consulting Firm",
		period: "Mar 2026 – Jun 2026",
		type: "Internship",
		index: "02",
		points: [
			"Supported operational and administrative activities within tax consulting environments",
			"Assisted in handling client requests, documentation processes, and administrative requirements",
			"Participated in preparing and organizing supporting documents for client engagements",
			"Supported data processing, documentation management, and validation processes",
			"Coordinated with team members to support project completion within deadlines",
		],
	},
	{
		role: "Administrative Intern",
		company: "Prosecutor Office (Kejaksaan)",
		period: "Government Institution",
		type: "Internship",
		index: "03",
		points: [
			"Supported administrative processes and documentation within government institutions",
			"Assisted with document management, filing processes, and operational support",
			"Maintained organized administrative records and supported daily operational activities",
		],
	},
];

const SKILLS = {
	"Tax & Compliance": [
		"Tax Administration",
		"Tax Documentation",
		"Tax Planning",
		"Transfer Pricing",
		"Financial Compliance",
		"Client Documentation",
		"Regulatory Filing",
		"VAT/GST Handling",
	],
	"Technical Tools": [
		"Microsoft Excel",
		"Microsoft Word",
		"Microsoft PowerPoint",
		"Data Processing",
		"Report Writing",
		"Canva",
		"Documentation Systems",
	],
	Professional: [
		"Analytical Thinking",
		"Attention to Detail",
		"Client Coordination",
		"Team Collaboration",
		"Problem Solving",
		"Time Management",
		"Public Speaking",
		"Fast Learning",
	],
};

const CERTIFICATIONS = [
	{ name: "Brevet AB", category: "Tax", year: "—" },
	{ name: "Tax Officer Training", category: "Tax", year: "—" },
	{ name: "Tax Planning — Corporate Tax Saving", category: "Tax", year: "—" },
	{ name: "Pajak 102: Tax Planning", category: "Tax", year: "—" },
	{
		name: "Transfer Pricing eLearning",
		org: "World Bank Group",
		category: "International",
		year: "—",
	},
	{
		name: "KPMG Audit & Assurance Job Simulation",
		category: "Audit",
		year: "—",
	},
	{ name: "Airlangga Microsoft Bootcamp", category: "Technology", year: "—" },
	{
		name: "Intensive 2-Week Microsoft Excel Bootcamp",
		category: "Technology",
		year: "—",
	},
	{ name: "C1 Advanced English Certificate", category: "Language", year: "—" },
	{
		name: "EF SET English Certificate — C2 Proficient",
		category: "Language",
		year: "—",
	},
];

// ─── Styles injected globally ──────────────────────────────────────────────
const GLOBAL_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,400;1,500&family=Mulish:wght@300;400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --ink: #0D0D0D;
    --paper: #F5F0E8;
    --paper-mid: #EDE7D9;
    --gold: #B8955A;
    --gold-light: #D4AF7A;
    --muted: #7A6F63;
    --white: #FAFAF8;
  }

  html { scroll-behavior: smooth; }

  body {
    font-family: 'Mulish', sans-serif;
    background: var(--paper);
    color: var(--ink);
    overflow-x: hidden;
  }

  .display { font-family: 'Playfair Display', serif; }
  .gold { color: var(--gold); }
  .muted { color: var(--muted); }

  /* Reveal animations */
  .reveal {
    opacity: 0;
    transform: translateY(32px);
    transition: opacity 0.85s cubic-bezier(0.22,1,0.36,1), transform 0.85s cubic-bezier(0.22,1,0.36,1);
  }
  .reveal.in { opacity: 1; transform: none; }

  .reveal-left {
    opacity: 0;
    transform: translateX(-32px);
    transition: opacity 0.85s cubic-bezier(0.22,1,0.36,1), transform 0.85s cubic-bezier(0.22,1,0.36,1);
  }
  .reveal-left.in { opacity: 1; transform: none; }

  /* Hero animations */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(40px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes scaleIn {
    from { opacity: 0; transform: scale(0.94); }
    to   { opacity: 1; transform: scale(1); }
  }
  .anim-up { animation: fadeUp 1s cubic-bezier(0.22,1,0.36,1) both; }
  .anim-in { animation: fadeIn 1s ease both; }
  .anim-scale { animation: scaleIn 1.2s cubic-bezier(0.22,1,0.36,1) both; }

  /* Grain overlay */
  .grain::after {
    content: '';
    position: fixed;
    inset: -200%;
    width: 400%;
    height: 400%;
    opacity: 0.035;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
    pointer-events: none;
    z-index: 9999;
  }

  /* Nav underline */
  .nav-item {
    position: relative;
    font-size: 11px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    font-weight: 500;
    color: var(--muted);
    transition: color 0.2s;
    padding-bottom: 2px;
  }
  .nav-item::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    width: 0;
    height: 1px;
    background: var(--gold);
    transition: width 0.3s cubic-bezier(0.22,1,0.36,1);
  }
  .nav-item:hover { color: var(--ink); }
  .nav-item:hover::after, .nav-item.active::after { width: 100%; }
  .nav-item.active { color: var(--ink); }

  /* Experience accordion */
  .exp-row {
    border-top: 1px solid rgba(13,13,13,0.1);
    transition: background 0.25s;
    cursor: pointer;
  }
  .exp-row:last-child { border-bottom: 1px solid rgba(13,13,13,0.1); }
  .exp-row:hover { background: rgba(184,149,90,0.04); }
  .exp-row.open { background: rgba(184,149,90,0.06); }

  /* Skill tag */
  .skill-tag {
    display: inline-flex;
    align-items: center;
    padding: 6px 14px;
    border: 1px solid rgba(13,13,13,0.15);
    border-radius: 2px;
    font-size: 12px;
    font-weight: 500;
    color: var(--ink);
    background: transparent;
    transition: all 0.2s;
    letter-spacing: 0.01em;
  }
  .skill-tag:hover {
    border-color: var(--gold);
    color: var(--gold);
    background: rgba(184,149,90,0.06);
  }

  /* Cert row */
  .cert-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    padding: 18px 0;
    border-bottom: 1px solid rgba(13,13,13,0.08);
    transition: padding-left 0.25s;
  }
  .cert-row:hover { padding-left: 8px; }

  /* Contact input */
  .field {
    width: 100%;
    background: transparent;
    border: none;
    border-bottom: 1px solid rgba(247,244,239,0.2);
    padding: 12px 0;
    font-size: 14px;
    font-family: 'Mulish', sans-serif;
    color: var(--paper);
    outline: none;
    transition: border-color 0.2s;
  }
  .field::placeholder { color: rgba(247,244,239,0.3); }
  .field:focus { border-color: var(--gold); }

  /* Marquee */
  @keyframes marquee {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }
  .marquee-inner {
    display: flex;
    width: max-content;
    animation: marquee 28s linear infinite;
  }
  .marquee-inner:hover { animation-play-state: paused; }

  /* Photo parallax container */
  .photo-frame {
    position: relative;
    overflow: hidden;
  }
`;

// ─── Hook: Reveal ─────────────────────────────────────────────────────────
function useReveal() {
	useEffect(() => {
		const obs = new IntersectionObserver(
			(entries) =>
				entries.forEach((e) => {
					if (e.isIntersecting) e.target.classList.add("in");
				}),
			{ threshold: 0.08, rootMargin: "0px 0px -60px 0px" },
		);
		document
			.querySelectorAll(".reveal, .reveal-left")
			.forEach((el) => obs.observe(el));
		return () => obs.disconnect();
	}, []);
}

// ─── Navbar ──────────────────────────────────────────────────────────────
function Navbar() {
	const [scrolled, setScrolled] = useState(false);
	const [active, setActive] = useState("home");

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 60);
		window.addEventListener("scroll", onScroll);
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	const nav = (id: string) => {
		setActive(id);
		document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
	};

	const links = [
		"home",
		"about",
		"experience",
		"skills",
		"education",
		"certifications",
		"contact",
	];

	return (
		<header
			style={{
				position: "fixed",
				top: 0,
				left: 0,
				right: 0,
				zIndex: 100,
				padding: scrolled ? "14px 0" : "24px 0",
				background: scrolled ? "rgba(245,240,232,0.92)" : "transparent",
				backdropFilter: scrolled ? "blur(16px)" : "none",
				borderBottom: scrolled ? "1px solid rgba(13,13,13,0.08)" : "none",
				transition: "all 0.5s cubic-bezier(0.22,1,0.36,1)",
			}}>
			<div
				style={{
					maxWidth: 1200,
					margin: "0 auto",
					padding: "0 32px",
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
				}}>
				<button
					onClick={() => nav("home")}
					className="display"
					style={{
						fontSize: 18,
						fontWeight: 500,
						letterSpacing: "0.04em",
						color: "var(--ink)",
						background: "none",
						border: "none",
						cursor: "pointer",
					}}>
					NMS
				</button>

				<nav style={{ display: "flex", gap: 32, alignItems: "center" }}>
					{links.map((l) => (
						<button
							key={l}
							onClick={() => nav(l)}
							className={`nav-item ${active === l ? "active" : ""}`}
							style={{ background: "none", border: "none", cursor: "pointer" }}>
							{l}
						</button>
					))}
				</nav>

				<a
					href="mailto:nadiamadarinasaid@gmail.com"
					style={{
						fontSize: 11,
						letterSpacing: "0.12em",
						textTransform: "uppercase",
						fontWeight: 600,
						color: "var(--ink)",
						textDecoration: "none",
						display: "flex",
						alignItems: "center",
						gap: 6,
						borderBottom: "1px solid var(--ink)",
						paddingBottom: 2,
					}}>
					Hire Me <ArrowUpRight size={12} />
				</a>
			</div>
		</header>
	);
}

// ─── Hero ────────────────────────────────────────────────────────────────
function Hero() {
	return (
		<section
			id="home"
			style={{
				minHeight: "100svh",
				background: "var(--paper)",
				display: "grid",
				gridTemplateColumns: "1fr 1fr",
				overflow: "hidden",
				position: "relative",
			}}>
			{/* Left panel */}
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "flex-end",
					padding: "160px 56px 80px",
					position: "relative",
				}}>
				{/* Vertical rule */}
				<div
					style={{
						position: "absolute",
						top: 0,
						right: 0,
						bottom: 0,
						width: 1,
						background: "rgba(13,13,13,0.08)",
					}}
				/>

				<div className="anim-up" style={{ animationDelay: "0.1s" }}>
					<p
						style={{
							fontSize: 11,
							letterSpacing: "0.2em",
							textTransform: "uppercase",
							color: "var(--gold)",
							fontWeight: 600,
							marginBottom: 32,
						}}>
						Tax Consultant · Accounting
					</p>
				</div>

				<h1
					className="display anim-up"
					style={{
						fontSize: "clamp(52px,6vw,88px)",
						lineHeight: 1.0,
						letterSpacing: "-0.02em",
						animationDelay: "0.2s",
					}}>
					Nadia
					<br />
					Madarina
					<br />
					<em style={{ color: "var(--gold)", fontStyle: "italic" }}>
						Sa&apos;id
					</em>
				</h1>

				<div
					className="anim-up"
					style={{ animationDelay: "0.35s", marginTop: 40 }}>
					<p
						style={{
							fontSize: 14,
							lineHeight: 1.8,
							color: "var(--muted)",
							maxWidth: 380,
						}}>
						Accounting graduate from Universitas Airlangga. Hands-on experience
						in tax consulting, compliance documentation, and client relations —
						backed by Brevet AB certification and C2 English proficiency.
					</p>
				</div>

				<div
					className="anim-up"
					style={{
						animationDelay: "0.48s",
						marginTop: 48,
						display: "flex",
						gap: 20,
						alignItems: "center",
					}}>
					<a
						href="#contact"
						onClick={(e) => {
							e.preventDefault();
							document
								.getElementById("contact")
								?.scrollIntoView({ behavior: "smooth" });
						}}
						style={{
							display: "inline-flex",
							alignItems: "center",
							gap: 8,
							padding: "14px 28px",
							background: "var(--ink)",
							color: "var(--paper)",
							fontSize: 12,
							letterSpacing: "0.1em",
							textTransform: "uppercase",
							fontWeight: 600,
							textDecoration: "none",
							transition: "opacity 0.2s",
						}}
						onMouseOver={(e) => (e.currentTarget.style.opacity = "0.8")}
						onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}>
						Get in Touch <ArrowUpRight size={12} />
					</a>
					<a
						href="#experience"
						onClick={(e) => {
							e.preventDefault();
							document
								.getElementById("experience")
								?.scrollIntoView({ behavior: "smooth" });
						}}
						style={{
							fontSize: 12,
							letterSpacing: "0.1em",
							textTransform: "uppercase",
							fontWeight: 600,
							color: "var(--muted)",
							textDecoration: "none",
							borderBottom: "1px solid currentColor",
							paddingBottom: 2,
						}}>
						View Work
					</a>
				</div>

				{/* Scroll indicator */}
				<div
					className="anim-in"
					style={{
						animationDelay: "1.2s",
						marginTop: 80,
						display: "flex",
						alignItems: "center",
						gap: 12,
					}}>
					<div style={{ width: 32, height: 1, background: "var(--ink)" }} />
					<span
						style={{
							fontSize: 10,
							letterSpacing: "0.2em",
							textTransform: "uppercase",
							color: "var(--muted)",
						}}>
						Scroll
					</span>
					<ChevronDown
						size={12}
						style={{
							color: "var(--muted)",
							animation: "fadeUp 1s ease infinite alternate",
						}}
					/>
				</div>
			</div>

			{/* Right panel — photo */}
			<div
				className="photo-frame anim-scale"
				style={{
					animationDelay: "0.05s",
					position: "relative",
					background: "var(--ink)",
				}}>
				<Image
					src="/nadia.webp"
					alt="Nadia Madarina Sa'id"
					fill
					className="object-cover"
					style={{ opacity: 0.85, filter: "contrast(1.05) saturate(0.9)" }}
					priority
				/>
				{/* Gradient overlay */}
				<div
					style={{
						position: "absolute",
						inset: 0,
						background:
							"linear-gradient(to right, rgba(13,13,13,0.35) 0%, transparent 40%, transparent 60%, rgba(13,13,13,0.2) 100%)",
					}}
				/>
				{/* Bottom caption */}
				<div
					style={{
						position: "absolute",
						bottom: 40,
						right: 40,
						textAlign: "right",
					}}>
					<div
						style={{
							fontSize: 10,
							letterSpacing: "0.2em",
							textTransform: "uppercase",
							color: "rgba(245,240,232,0.5)",
							marginBottom: 4,
						}}>
						Based in
					</div>
					<div style={{ fontSize: 14, fontWeight: 600, color: "var(--paper)" }}>
						Sidoarjo, Indonesia
					</div>
				</div>
				{/* Top accent */}
				<div style={{ position: "absolute", top: 40, right: 40 }}>
					<div
						style={{
							fontSize: 10,
							letterSpacing: "0.2em",
							textTransform: "uppercase",
							color: "var(--gold-light)",
							marginBottom: 4,
						}}>
						Universitas Airlangga
					</div>
					<div style={{ fontSize: 12, color: "rgba(245,240,232,0.6)" }}>
						Class of 2024
					</div>
				</div>
			</div>

			{/* Index numbers decorative */}
			<div
				style={{
					position: "absolute",
					bottom: 80,
					left: 56,
					display: "flex",
					gap: 32,
				}}>
				{[
					{ n: "2+", l: "Yrs Exp." },
					{ n: "10+", l: "Certs" },
					{ n: "C2", l: "English" },
				].map(({ n, l }) => (
					<div key={l} className="anim-up" style={{ animationDelay: "0.7s" }}>
						<div
							className="display"
							style={{
								fontSize: 28,
								fontWeight: 700,
								color: "var(--ink)",
								lineHeight: 1,
							}}>
							{n}
						</div>
						<div
							style={{
								fontSize: 10,
								letterSpacing: "0.15em",
								textTransform: "uppercase",
								color: "var(--muted)",
								marginTop: 4,
							}}>
							{l}
						</div>
					</div>
				))}
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
		"Airlangga '24",
		"Documentation",
		"Excel Advanced",
		"World Bank",
	];
	const doubled = [...items, ...items];
	return (
		<div
			style={{
				background: "var(--ink)",
				padding: "18px 0",
				overflow: "hidden",
				borderTop: "1px solid rgba(245,240,232,0.06)",
				borderBottom: "1px solid rgba(245,240,232,0.06)",
			}}>
			<div className="marquee-inner">
				{doubled.map((item, i) => (
					<span
						key={i}
						style={{
							display: "inline-flex",
							alignItems: "center",
							gap: 24,
							padding: "0 24px",
							fontSize: 11,
							letterSpacing: "0.18em",
							textTransform: "uppercase",
							color: i % 5 === 2 ? "var(--gold)" : "rgba(245,240,232,0.35)",
							fontWeight: 500,
							whiteSpace: "nowrap",
						}}>
						{item} <span style={{ opacity: 0.3 }}>·</span>
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
			style={{ background: "var(--white)", padding: "120px 0" }}>
			<div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
				<div
					style={{
						display: "grid",
						gridTemplateColumns: "1fr 2fr",
						gap: 80,
						alignItems: "start",
					}}>
					<div className="reveal-left">
						<div
							style={{
								width: 40,
								height: 1,
								background: "var(--gold)",
								marginBottom: 24,
							}}
						/>
						<p
							style={{
								fontSize: 11,
								letterSpacing: "0.2em",
								textTransform: "uppercase",
								color: "var(--gold)",
								fontWeight: 600,
								marginBottom: 16,
							}}>
							About
						</p>
						<h2
							className="display"
							style={{
								fontSize: "clamp(32px,3.5vw,52px)",
								lineHeight: 1.15,
								color: "var(--ink)",
							}}>
							Detail-oriented
							<br />
							professional
						</h2>
					</div>

					<div className="reveal" style={{ paddingTop: 8 }}>
						<p
							style={{
								fontSize: 16,
								lineHeight: 1.9,
								color: "var(--muted)",
								marginBottom: 28,
							}}>
							I&apos;m an accounting graduate from Universitas Airlangga with a
							strong foundation in tax consulting and financial compliance. My
							career at MUC Consulting gave me hands-on exposure to complex tax
							operations, client documentation workflows, and regulatory
							compliance processes.
						</p>
						<p
							style={{
								fontSize: 16,
								lineHeight: 1.9,
								color: "var(--muted)",
								marginBottom: 48,
							}}>
							I hold a Brevet AB certification, completed World Bank Group
							transfer pricing training, and maintain C2 English proficiency —
							positioning me to work in both domestic and international
							consulting contexts. I thrive in environments that demand
							precision, structured thinking, and clear communication.
						</p>

						<div
							style={{
								display: "grid",
								gridTemplateColumns: "repeat(3,1fr)",
								gap: 1,
								background: "rgba(13,13,13,0.08)",
							}}>
							{[
								{ label: "Education", value: "Universitas Airlangga" },
								{ label: "Degree", value: "Bachelor of Accounting" },
								{ label: "Location", value: "Sidoarjo, Indonesia" },
							].map(({ label, value }) => (
								<div
									key={label}
									style={{ background: "var(--white)", padding: "24px 28px" }}>
									<div
										style={{
											fontSize: 10,
											letterSpacing: "0.18em",
											textTransform: "uppercase",
											color: "var(--gold)",
											fontWeight: 600,
											marginBottom: 8,
										}}>
										{label}
									</div>
									<div
										style={{
											fontSize: 14,
											fontWeight: 500,
											color: "var(--ink)",
										}}>
										{value}
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

// ─── Experience ──────────────────────────────────────────────────────────
function Experience() {
	const [open, setOpen] = useState<number | null>(0);

	return (
		<section
			id="experience"
			style={{ background: "var(--paper)", padding: "120px 0" }}>
			<div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
				<div
					style={{
						display: "flex",
						alignItems: "flex-end",
						justifyContent: "space-between",
						marginBottom: 72,
					}}>
					<div className="reveal-left">
						<div
							style={{
								width: 40,
								height: 1,
								background: "var(--gold)",
								marginBottom: 24,
							}}
						/>
						<p
							style={{
								fontSize: 11,
								letterSpacing: "0.2em",
								textTransform: "uppercase",
								color: "var(--gold)",
								fontWeight: 600,
								marginBottom: 12,
							}}>
							Career
						</p>
						<h2
							className="display"
							style={{
								fontSize: "clamp(32px,3.5vw,52px)",
								lineHeight: 1.1,
								color: "var(--ink)",
							}}>
							Professional
							<br />
							<em>Experience</em>
						</h2>
					</div>
					<div className="reveal" style={{ textAlign: "right" }}>
						<p
							style={{
								fontSize: 12,
								color: "var(--muted)",
								letterSpacing: "0.05em",
							}}>
							Click to expand
						</p>
					</div>
				</div>

				<div className="reveal">
					{EXPERIENCES.map((exp, i) => (
						<div
							key={i}
							className={`exp-row ${open === i ? "open" : ""}`}
							onClick={() => setOpen(open === i ? null : i)}
							style={{ padding: open === i ? "32px 0 24px" : "28px 0" }}>
							{/* Row header */}
							<div
								style={{
									display: "grid",
									gridTemplateColumns: "60px 1fr auto 120px auto",
									alignItems: "center",
									gap: 24,
									padding: "0 4px",
								}}>
								<span
									className="display"
									style={{
										fontSize: 13,
										color: "var(--muted)",
										fontStyle: "italic",
									}}>
									{exp.index}
								</span>
								<h3
									style={{
										fontSize: 18,
										fontWeight: 600,
										color: "var(--ink)",
										letterSpacing: "-0.01em",
									}}>
									{exp.role}
								</h3>
								<span
									style={{
										fontSize: 13,
										color: "var(--gold)",
										fontWeight: 500,
									}}>
									{exp.company}
								</span>
								<span
									style={{
										fontSize: 11,
										color: "var(--muted)",
										letterSpacing: "0.05em",
										textAlign: "right",
									}}>
									{exp.period}
								</span>
								<div
									style={{
										width: 28,
										height: 28,
										border: "1px solid rgba(13,13,13,0.15)",
										borderRadius: "50%",
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
										transition:
											"transform 0.35s cubic-bezier(0.22,1,0.36,1), border-color 0.2s",
										transform: open === i ? "rotate(180deg)" : "rotate(0)",
										borderColor: open === i ? "var(--gold)" : undefined,
										flexShrink: 0,
									}}>
									<ChevronDown
										size={12}
										style={{
											color: open === i ? "var(--gold)" : "var(--muted)",
										}}
									/>
								</div>
							</div>

							{/* Expanded content */}
							{open === i && (
								<div
									style={{
										paddingTop: 24,
										paddingLeft: 84,
										paddingRight: 156,
									}}>
									<div
										style={{
											display: "inline-block",
											padding: "4px 12px",
											border: "1px solid rgba(184,149,90,0.35)",
											fontSize: 10,
											letterSpacing: "0.15em",
											textTransform: "uppercase",
											color: "var(--gold)",
											marginBottom: 20,
										}}>
										{exp.type}
									</div>
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
													gap: 16,
													fontSize: 14,
													lineHeight: 1.7,
													color: "var(--muted)",
												}}>
												<span
													style={{
														color: "var(--gold)",
														flexShrink: 0,
														marginTop: 2,
													}}>
													—
												</span>
												{pt}
											</li>
										))}
									</ul>
								</div>
							)}
						</div>
					))}
				</div>
			</div>
		</section>
	);
}

// ─── Skills ──────────────────────────────────────────────────────────────
function Skills() {
	return (
		<section
			id="skills"
			style={{ background: "var(--ink)", padding: "120px 0" }}>
			<div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
				<div style={{ marginBottom: 72 }}>
					<div className="reveal">
						<div
							style={{
								width: 40,
								height: 1,
								background: "var(--gold)",
								marginBottom: 24,
							}}
						/>
						<p
							style={{
								fontSize: 11,
								letterSpacing: "0.2em",
								textTransform: "uppercase",
								color: "var(--gold)",
								fontWeight: 600,
								marginBottom: 12,
							}}>
							Capabilities
						</p>
						<h2
							className="display"
							style={{
								fontSize: "clamp(32px,3.5vw,52px)",
								lineHeight: 1.1,
								color: "var(--paper)",
							}}>
							Skills &amp; <em>Expertise</em>
						</h2>
					</div>
				</div>

				<div
					style={{
						display: "grid",
						gridTemplateColumns: "repeat(3,1fr)",
						gap: "1px",
						background: "rgba(245,240,232,0.08)",
					}}>
					{Object.entries(SKILLS).map(([category, tags], ci) => (
						<div
							key={category}
							className="reveal"
							style={{
								background: "var(--ink)",
								padding: "48px 40px",
								transitionDelay: `${ci * 0.1}s`,
							}}>
							<p
								style={{
									fontSize: 10,
									letterSpacing: "0.2em",
									textTransform: "uppercase",
									color: "var(--gold)",
									fontWeight: 600,
									marginBottom: 28,
								}}>
								{category}
							</p>
							<div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
								{tags.map((tag) => (
									<span
										key={tag}
										className="skill-tag"
										style={{
											color: "rgba(245,240,232,0.7)",
											borderColor: "rgba(245,240,232,0.12)",
										}}>
										{tag}
									</span>
								))}
							</div>
						</div>
					))}
				</div>

				{/* Languages strip */}
				<div
					className="reveal"
					style={{
						marginTop: 1,
						background: "rgba(245,240,232,0.04)",
						borderTop: "1px solid rgba(245,240,232,0.08)",
						display: "grid",
						gridTemplateColumns: "1fr 1fr",
						gap: "1px",
					}}>
					{[
						{ lang: "Bahasa Indonesia", level: "Native" },
						{ lang: "English", level: "C2 Proficient — EF SET Certified" },
					].map(({ lang, level }) => (
						<div
							key={lang}
							style={{
								padding: "28px 40px",
								display: "flex",
								alignItems: "center",
								justifyContent: "space-between",
								background: "var(--ink)",
							}}>
							<span
								style={{
									fontSize: 14,
									fontWeight: 500,
									color: "var(--paper)",
								}}>
								{lang}
							</span>
							<span
								style={{
									fontSize: 11,
									letterSpacing: "0.12em",
									textTransform: "uppercase",
									color: "var(--gold)",
									fontWeight: 600,
								}}>
								{level}
							</span>
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
			style={{ background: "var(--white)", padding: "120px 0" }}>
			<div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
				<div className="reveal-left" style={{ marginBottom: 72 }}>
					<div
						style={{
							width: 40,
							height: 1,
							background: "var(--gold)",
							marginBottom: 24,
						}}
					/>
					<p
						style={{
							fontSize: 11,
							letterSpacing: "0.2em",
							textTransform: "uppercase",
							color: "var(--gold)",
							fontWeight: 600,
							marginBottom: 12,
						}}>
						Academic
					</p>
					<h2
						className="display"
						style={{
							fontSize: "clamp(32px,3.5vw,52px)",
							lineHeight: 1.1,
							color: "var(--ink)",
						}}>
						Education
					</h2>
				</div>

				<div
					className="reveal"
					style={{
						display: "grid",
						gridTemplateColumns: "1fr 1fr",
						gap: "1px",
						background: "rgba(13,13,13,0.08)",
					}}>
					{/* Main */}
					<div style={{ background: "var(--white)", padding: "56px" }}>
						<p
							style={{
								fontSize: 11,
								letterSpacing: "0.15em",
								textTransform: "uppercase",
								color: "var(--muted)",
								marginBottom: 20,
							}}>
							2020 — 2024
						</p>
						<h3
							className="display"
							style={{
								fontSize: 32,
								fontWeight: 500,
								color: "var(--ink)",
								lineHeight: 1.2,
								marginBottom: 8,
							}}>
							Bachelor of
							<br />
							Accounting
						</h3>
						<p
							style={{
								fontSize: 16,
								color: "var(--gold)",
								fontWeight: 500,
								marginBottom: 24,
							}}>
							Universitas Airlangga
						</p>
						<p
							style={{ fontSize: 14, lineHeight: 1.85, color: "var(--muted)" }}>
							Comprehensive accounting education from one of Indonesia&apos;s
							leading universities. Built strong foundations in taxation,
							financial analysis, auditing, and business reporting through
							rigorous coursework and project-based learning.
						</p>
					</div>

					{/* Sidebar */}
					<div
						style={{
							background: "var(--paper)",
							padding: "56px",
							display: "flex",
							flexDirection: "column",
							gap: 32,
						}}>
						<div>
							<p
								style={{
									fontSize: 10,
									letterSpacing: "0.18em",
									textTransform: "uppercase",
									color: "var(--gold)",
									fontWeight: 600,
									marginBottom: 16,
								}}>
								Core Subjects
							</p>
							<div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
								{[
									"Taxation",
									"Financial Analysis",
									"Auditing",
									"Business Reporting",
									"Cost Accounting",
									"Business Law",
								].map((t) => (
									<span key={t} className="skill-tag">
										{t}
									</span>
								))}
							</div>
						</div>

						<div style={{ height: 1, background: "rgba(13,13,13,0.08)" }} />

						<div
							style={{
								background: "var(--ink)",
								padding: "28px",
								borderRadius: 0,
							}}>
							<p
								style={{
									fontSize: 10,
									letterSpacing: "0.18em",
									textTransform: "uppercase",
									color: "var(--gold)",
									fontWeight: 600,
									marginBottom: 12,
								}}>
								Achievement
							</p>
							<p
								style={{
									fontSize: 15,
									fontWeight: 600,
									color: "var(--paper)",
									marginBottom: 6,
								}}>
								1st Place — Lomba Konten Medsos
							</p>
							<p
								style={{
									fontSize: 12,
									color: "rgba(245,240,232,0.45)",
									lineHeight: 1.5,
								}}>
								APA Fest 2021 · Ikatan Akuntan Indonesia · November 2021
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

// ─── Certifications ──────────────────────────────────────────────────────
function Certifications() {
	const categories = [
		"All",
		"Tax",
		"International",
		"Audit",
		"Technology",
		"Language",
	];
	const [active, setActive] = useState("All");
	const filtered =
		active === "All"
			? CERTIFICATIONS
			: CERTIFICATIONS.filter((c) => c.category === active);

	return (
		<section
			id="certifications"
			style={{ background: "var(--paper)", padding: "120px 0" }}>
			<div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
				<div
					style={{
						display: "flex",
						alignItems: "flex-end",
						justifyContent: "space-between",
						flexWrap: "wrap",
						gap: 32,
						marginBottom: 64,
					}}>
					<div className="reveal-left">
						<div
							style={{
								width: 40,
								height: 1,
								background: "var(--gold)",
								marginBottom: 24,
							}}
						/>
						<p
							style={{
								fontSize: 11,
								letterSpacing: "0.2em",
								textTransform: "uppercase",
								color: "var(--gold)",
								fontWeight: 600,
								marginBottom: 12,
							}}>
							Credentials
						</p>
						<h2
							className="display"
							style={{
								fontSize: "clamp(32px,3.5vw,52px)",
								lineHeight: 1.1,
								color: "var(--ink)",
							}}>
							Certifications
						</h2>
					</div>

					<div
						className="reveal"
						style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
						{categories.map((c) => (
							<button
								key={c}
								onClick={() => setActive(c)}
								style={{
									padding: "8px 18px",
									fontSize: 11,
									letterSpacing: "0.12em",
									textTransform: "uppercase",
									fontWeight: 600,
									background: active === c ? "var(--ink)" : "transparent",
									color: active === c ? "var(--gold)" : "var(--muted)",
									border: "1px solid",
									borderColor:
										active === c ? "var(--ink)" : "rgba(13,13,13,0.15)",
									cursor: "pointer",
									transition: "all 0.2s",
								}}>
								{c}
							</button>
						))}
					</div>
				</div>

				<div className="reveal">
					{filtered.map((cert, i) => (
						<div
							key={cert.name}
							className="cert-row"
							style={{ transitionDelay: `${i * 0.04}s` }}>
							<span
								className="display"
								style={{
									fontSize: 12,
									color: "var(--muted)",
									fontStyle: "italic",
									width: 28,
									flexShrink: 0,
								}}>
								{String(i + 1).padStart(2, "0")}
							</span>
							<span
								style={{
									fontSize: 15,
									fontWeight: 500,
									color: "var(--ink)",
									flex: 1,
								}}>
								{cert.name}
							</span>
							{cert.org && (
								<span style={{ fontSize: 12, color: "var(--muted)" }}>
									{cert.org}
								</span>
							)}
							<span
								style={{
									padding: "3px 10px",
									border: "1px solid rgba(184,149,90,0.35)",
									fontSize: 10,
									letterSpacing: "0.15em",
									textTransform: "uppercase",
									color: "var(--gold)",
									flexShrink: 0,
								}}>
								{cert.category}
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
			style={{ background: "var(--ink)", padding: "120px 0" }}>
			<div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
				<div
					style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80 }}>
					<div className="reveal-left">
						<div
							style={{
								width: 40,
								height: 1,
								background: "var(--gold)",
								marginBottom: 24,
							}}
						/>
						<p
							style={{
								fontSize: 11,
								letterSpacing: "0.2em",
								textTransform: "uppercase",
								color: "var(--gold)",
								fontWeight: 600,
								marginBottom: 16,
							}}>
							Contact
						</p>
						<h2
							className="display"
							style={{
								fontSize: "clamp(32px,3.5vw,52px)",
								lineHeight: 1.1,
								color: "var(--paper)",
								marginBottom: 40,
							}}>
							Let&apos;s build something
							<br />
							<em style={{ color: "var(--gold)" }}>great together</em>
						</h2>
						<p
							style={{
								fontSize: 15,
								lineHeight: 1.85,
								color: "rgba(245,240,232,0.5)",
								maxWidth: 380,
								marginBottom: 56,
							}}>
							Actively seeking opportunities in taxation, accounting, and
							consulting. Whether full-time or internship — I&apos;d love to
							connect.
						</p>

						<div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
							{[
								{
									icon: <Mail size={14} />,
									label: "Email",
									value: "nadiamadarinasaid@gmail.com",
									href: "mailto:nadiamadarinasaid@gmail.com",
								},
								{
									icon: <Phone size={14} />,
									label: "Phone",
									value: "+62 888-3052-061",
									href: "tel:+628883052061",
								},
								{
									icon: <ExternalLink size={14} />,
									label: "LinkedIn",
									value: "linkedin.com/in/nadiamadarinas",
									href: "https://linkedin.com/in/nadiamadarinas",
								},
								{
									icon: <MapPin size={14} />,
									label: "Location",
									value: "Sidoarjo, East Java",
									href: null,
								},
							].map(({ icon, label, value, href }) => (
								<div
									key={label}
									style={{ display: "flex", gap: 16, alignItems: "center" }}>
									<div
										style={{
											width: 36,
											height: 36,
											border: "1px solid rgba(245,240,232,0.12)",
											display: "flex",
											alignItems: "center",
											justifyContent: "center",
											color: "var(--gold)",
											flexShrink: 0,
										}}>
										{icon}
									</div>
									<div>
										<div
											style={{
												fontSize: 10,
												letterSpacing: "0.15em",
												textTransform: "uppercase",
												color: "rgba(245,240,232,0.3)",
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
													fontSize: 13,
													color: "var(--paper)",
													textDecoration: "none",
													borderBottom: "1px solid rgba(245,240,232,0.15)",
													paddingBottom: 1,
													transition: "border-color 0.2s",
												}}
												onMouseOver={(e) =>
													(e.currentTarget.style.borderColor = "var(--gold)")
												}
												onMouseOut={(e) =>
													(e.currentTarget.style.borderColor =
														"rgba(245,240,232,0.15)")
												}>
												{value}
											</a>
										) : (
											<span style={{ fontSize: 13, color: "var(--paper)" }}>
												{value}
											</span>
										)}
									</div>
								</div>
							))}
						</div>
					</div>

					<div className="reveal" style={{ paddingTop: 8 }}>
						<div
							style={{
								borderTop: "1px solid rgba(245,240,232,0.08)",
								paddingTop: 48,
							}}>
							{[
								{
									id: "name",
									label: "Full Name",
									type: "text",
									placeholder: "Your name",
								},
								{
									id: "email",
									label: "Email Address",
									type: "email",
									placeholder: "your@email.com",
								},
								{
									id: "company",
									label: "Company / Organization",
									type: "text",
									placeholder: "Where you work",
								},
							].map(({ id, label, type, placeholder }) => (
								<div key={id} style={{ marginBottom: 32 }}>
									<label
										htmlFor={id}
										style={{
											display: "block",
											fontSize: 10,
											letterSpacing: "0.18em",
											textTransform: "uppercase",
											color: "rgba(245,240,232,0.3)",
											marginBottom: 10,
											fontWeight: 600,
										}}>
										{label}
									</label>
									<input
										type={type}
										id={id}
										placeholder={placeholder}
										className="field"
									/>
								</div>
							))}
							<div style={{ marginBottom: 40 }}>
								<label
									htmlFor="message"
									style={{
										display: "block",
										fontSize: 10,
										letterSpacing: "0.18em",
										textTransform: "uppercase",
										color: "rgba(245,240,232,0.3)",
										marginBottom: 10,
										fontWeight: 600,
									}}>
									Message
								</label>
								<textarea
									id="message"
									rows={4}
									placeholder="Tell me about the opportunity..."
									className="field"
									style={{ resize: "none", display: "block" }}
								/>
							</div>
							<a
								href="mailto:nadiamadarinasaid@gmail.com"
								style={{
									display: "inline-flex",
									alignItems: "center",
									gap: 10,
									padding: "16px 36px",
									background: "var(--gold)",
									color: "var(--ink)",
									fontSize: 12,
									letterSpacing: "0.12em",
									textTransform: "uppercase",
									fontWeight: 700,
									textDecoration: "none",
									transition: "opacity 0.2s",
								}}
								onMouseOver={(e) => (e.currentTarget.style.opacity = "0.85")}
								onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}>
								Send via Email <ArrowUpRight size={14} />
							</a>
						</div>
					</div>
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
				background: "#080808",
				borderTop: "1px solid rgba(245,240,232,0.06)",
				padding: "28px 32px",
				display: "flex",
				justifyContent: "space-between",
				alignItems: "center",
			}}>
			<p
				style={{
					fontSize: 11,
					letterSpacing: "0.1em",
					color: "rgba(245,240,232,0.25)",
				}}>
				© 2025{" "}
				<span style={{ color: "var(--gold)" }}>Nadia Madarina Sa&apos;id</span>
			</p>
			<p
				style={{
					fontSize: 11,
					letterSpacing: "0.08em",
					color: "rgba(245,240,232,0.2)",
				}}>
				Sidoarjo, Indonesia
			</p>
		</footer>
	);
}

// ─── Page ─────────────────────────────────────────────────────────────────
export default function Page() {
	useReveal();
	return (
		<>
			<style dangerouslySetInnerHTML={{ __html: GLOBAL_STYLES }} />
			<div className="grain">
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
			</div>
		</>
	);
}
