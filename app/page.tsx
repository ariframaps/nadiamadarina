"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
	Mail,
	Phone,
	Link2 as LinkedinIcon,
	MapPin,
	ArrowRight,
	Award,
	BookOpen,
	Briefcase,
	ChevronDown,
	ExternalLink,
	Star,
	CheckCircle2,
	GraduationCap,
	Trophy,
} from "lucide-react";

// ─── Data ──────────────────────────────────────────────────────────────────
const EXPERIENCES = [
	{
		role: "Tax Consulting Staff",
		company: "MUC Consulting",
		period: "Mar 2025 – Nov 2025",
		type: "Full-time",
		color: "#C9A96E",
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
		color: "#8B9E8A",
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
		color: "#C4886F",
		points: [
			"Supported administrative processes and documentation within government institutions",
			"Assisted with document management, filing processes, and operational support",
			"Maintained organized administrative records and supported daily operational activities",
		],
	},
];

const SKILLS_TAX = [
	{ name: "Tax Administration Support", level: 90 },
	{ name: "Tax Documentation & Compliance", level: 88 },
	{ name: "Tax Planning Fundamentals", level: 82 },
	{ name: "Transfer Pricing Knowledge", level: 75 },
	{ name: "Financial Documentation", level: 85 },
	{ name: "Client Documentation Management", level: 87 },
];

const SKILLS_TECH = [
	{ name: "Microsoft Excel (Advanced)", level: 92 },
	{ name: "Microsoft Office Suite", level: 90 },
	{ name: "Data Processing & Reporting", level: 85 },
	{ name: "Documentation Management", level: 88 },
	{ name: "Canva", level: 80 },
];

const SKILLS_SOFT = [
	"Analytical Thinking",
	"Attention to Detail",
	"Client Coordination",
	"Team Collaboration",
	"Problem Solving",
	"Time Management",
	"Adaptability",
	"Public Speaking",
	"Fast Learning",
	"Communication",
];

const CERTIFICATIONS = [
	{ name: "Brevet AB", icon: "🏆", category: "Tax" },
	{ name: "Tax Officer Training", icon: "📋", category: "Tax" },
	{ name: "Tax Planning — Corporate Tax Saving", icon: "💼", category: "Tax" },
	{ name: "Pajak 102: Tax Planning", icon: "📊", category: "Tax" },
	{
		name: "Transfer Pricing eLearning — World Bank Group",
		icon: "🌐",
		category: "International",
	},
	{
		name: "KPMG Audit & Assurance Job Simulation",
		icon: "🏛️",
		category: "Audit",
	},
	{ name: "Airlangga Microsoft Bootcamp", icon: "💻", category: "Tech" },
	{
		name: "Intensive 2-Week Microsoft Excel Bootcamp",
		icon: "📈",
		category: "Tech",
	},
	{ name: "C1 Advanced English Certificate", icon: "🇬🇧", category: "Language" },
	{
		name: "EF SET English Certificate — C2 Proficient",
		icon: "✨",
		category: "Language",
	},
];

// ─── Hook: Intersection Observer ───────────────────────────────────────────
function useReveal() {
	useEffect(() => {
		const els = document.querySelectorAll(".section-reveal");
		const obs = new IntersectionObserver(
			(entries) =>
				entries.forEach((e) => {
					if (e.isIntersecting) e.target.classList.add("visible");
				}),
			{ threshold: 0.1, rootMargin: "0px 0px -60px 0px" },
		);
		els.forEach((el) => obs.observe(el));
		return () => obs.disconnect();
	}, []);
}

// ─── Animated Skill Bar ─────────────────────────────────────────────────────
function SkillBar({ name, level }: { name: string; level: number }) {
	const ref = useRef<HTMLDivElement>(null);
	const [width, setWidth] = useState(0);
	useEffect(() => {
		const obs = new IntersectionObserver(
			([e]) => {
				if (e.isIntersecting) {
					setWidth(level);
					obs.disconnect();
				}
			},
			{ threshold: 0.3 },
		);
		if (ref.current) obs.observe(ref.current);
		return () => obs.disconnect();
	}, [level]);
	return (
		<div ref={ref} className="mb-5">
			<div className="flex justify-between items-center mb-2">
				<span className="text-sm font-medium" style={{ color: "#1A1A1A" }}>
					{name}
				</span>
				<span className="text-xs font-medium" style={{ color: "#C9A96E" }}>
					{level}%
				</span>
			</div>
			<div
				style={{ background: "#EDE9E3", borderRadius: "2px", height: "2px" }}>
				<div className="skill-bar" style={{ width: `${width}%` }} />
			</div>
		</div>
	);
}

// ─── Navbar ─────────────────────────────────────────────────────────────────
function Navbar() {
	const [scrolled, setScrolled] = useState(false);
	const [active, setActive] = useState("home");
	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 40);
		window.addEventListener("scroll", onScroll);
		return () => window.removeEventListener("scroll", onScroll);
	}, []);
	const links = [
		"home",
		"about",
		"experience",
		"skills",
		"education",
		"certifications",
		"contact",
	];
	const scroll = (id: string) => {
		setActive(id);
		document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
	};
	return (
		<nav
			className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
			style={{
				background: scrolled ? "rgba(253, 250, 246, 0.95)" : "transparent",
				backdropFilter: scrolled ? "blur(20px)" : "none",
				borderBottom: scrolled ? "1px solid rgba(201,169,110,0.15)" : "none",
				padding: scrolled ? "12px 0" : "20px 0",
			}}>
			<div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
				<button
					onClick={() => scroll("home")}
					className="font-display text-xl font-semibold"
					style={{ color: "#1A1A1A" }}>
					N<span className="gold-text">M</span>S
				</button>
				<div className="hidden md:flex items-center gap-8">
					{links.map((l) => (
						<button
							key={l}
							onClick={() => scroll(l)}
							className="nav-link relative flex flex-col items-center gap-1 text-xs uppercase tracking-widest font-medium transition-colors duration-200"
							style={{ color: active === l ? "#C9A96E" : "#6B6560" }}>
							{l}
							<div
								className="nav-dot"
								style={{ opacity: active === l ? 1 : 0, background: "#C9A96E" }}
							/>
						</button>
					))}
				</div>
				<a
					href="mailto:nadiamadarinasaid@gmail.com"
					className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full text-xs uppercase tracking-widest font-medium transition-all duration-300 hover:shadow-lg"
					style={{ background: "#C9A96E", color: "#FDFAF6" }}>
					Hire Me <ArrowRight size={12} />
				</a>
			</div>
		</nav>
	);
}

// ─── Hero ────────────────────────────────────────────────────────────────────
function Hero() {
	return (
		<section
			id="home"
			className="relative min-h-screen flex items-center overflow-hidden"
			style={{ background: "#FDFAF6" }}>
			{/* Decorative orbs */}
			<div
				className="absolute top-20 right-10 w-96 h-96 rounded-full opacity-20 pointer-events-none"
				style={{
					background: "radial-gradient(circle, #C9A96E 0%, transparent 70%)",
					filter: "blur(40px)",
				}}
			/>
			<div
				className="absolute bottom-20 left-10 w-64 h-64 rounded-full opacity-10 pointer-events-none"
				style={{
					background: "radial-gradient(circle, #8B9E8A 0%, transparent 70%)",
					filter: "blur(30px)",
				}}
			/>

			{/* Vertical text decorations */}
			<div className="absolute left-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-4">
				<div
					style={{
						width: "1px",
						height: "80px",
						background: "linear-gradient(to bottom, transparent, #C9A96E)",
					}}
				/>
				<span
					className="text-xs uppercase tracking-[0.3em] font-medium"
					style={{
						color: "#C9A96E",
						writingMode: "vertical-rl",
						transform: "rotate(180deg)",
					}}>
					Portfolio 2025
				</span>
				<div
					style={{
						width: "1px",
						height: "80px",
						background: "linear-gradient(to bottom, #C9A96E, transparent)",
					}}
				/>
			</div>

			<div className="max-w-6xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-16 items-center w-full">
				{/* Text */}
				<div className="order-2 lg:order-1">
					<div
						className="animate-fade-in-up"
						style={{ animationDelay: "0.1s", opacity: 0 }}>
						<span
							className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-medium px-3 py-1.5 rounded-full mb-6"
							style={{
								background: "rgba(201,169,110,0.12)",
								color: "#C9A96E",
								border: "1px solid rgba(201,169,110,0.3)",
							}}>
							<span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
							Open to Opportunities
						</span>
					</div>
					<h1
						className="animate-fade-in-up font-display mb-4"
						style={{
							fontSize: "clamp(2.8rem,6vw,5rem)",
							lineHeight: 1.05,
							letterSpacing: "-0.02em",
							animationDelay: "0.2s",
							opacity: 0,
						}}>
						<span style={{ color: "#1A1A1A" }}>Nadia</span>
						<br />
						<span style={{ color: "#1A1A1A" }}>Madarina</span>
						<br />
						<span className="gold-text italic">Sa&apos;id</span>
					</h1>
					<p
						className="animate-fade-in-up text-base font-medium mb-3 uppercase tracking-widest"
						style={{ color: "#6B6560", animationDelay: "0.35s", opacity: 0 }}>
						Tax Consultant · Accounting Professional
					</p>
					<p
						className="animate-fade-in-up text-base leading-relaxed mb-8 max-w-md"
						style={{ color: "#6B6560", animationDelay: "0.45s", opacity: 0 }}>
						Accounting graduate from Universitas Airlangga with hands-on
						experience in tax consulting. Skilled in client documentation, data
						validation, and compliance support — backed by Brevet AB
						certification and C2 English proficiency.
					</p>

					<div
						className="animate-fade-in-up flex flex-wrap gap-3 mb-8"
						style={{ animationDelay: "0.55s", opacity: 0 }}>
						<a
							href="#contact"
							onClick={(e) => {
								e.preventDefault();
								document
									.getElementById("contact")
									?.scrollIntoView({ behavior: "smooth" });
							}}
							className="flex items-center gap-2 px-6 py-3 rounded-full font-medium text-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
							style={{ background: "#1A1A1A", color: "#FDFAF6" }}>
							<Mail size={14} /> Contact Me
						</a>
						<a
							href="#experience"
							onClick={(e) => {
								e.preventDefault();
								document
									.getElementById("experience")
									?.scrollIntoView({ behavior: "smooth" });
							}}
							className="flex items-center gap-2 px-6 py-3 rounded-full font-medium text-sm transition-all duration-300 hover:-translate-y-0.5"
							style={{
								background: "transparent",
								color: "#C9A96E",
								border: "1.5px solid #C9A96E",
							}}>
							View Experience <ArrowRight size={14} />
						</a>
					</div>

					<div
						className="animate-fade-in-up flex items-center gap-6"
						style={{ animationDelay: "0.65s", opacity: 0 }}>
						{[
							{ icon: <MapPin size={12} />, text: "Sidoarjo, Indonesia" },
							{ icon: <Star size={12} />, text: "C2 English Proficient" },
							{ icon: <Award size={12} />, text: "Brevet AB Certified" },
						].map(({ icon, text }) => (
							<div
								key={text}
								className="flex items-center gap-1.5 text-xs"
								style={{ color: "#6B6560" }}>
								<span style={{ color: "#C9A96E" }}>{icon}</span> {text}
							</div>
						))}
					</div>
				</div>

				{/* Photo */}
				<div
					className="order-1 lg:order-2 flex justify-center lg:justify-end animate-scale-in"
					style={{ animationDelay: "0.1s", opacity: 0 }}>
					<div className="relative">
						{/* Decorative ring */}
						<div
							className="absolute -inset-4 rounded-3xl opacity-30"
							style={{
								background:
									"linear-gradient(135deg, #C9A96E, transparent, #8B9E8A)",
								zIndex: 0,
							}}
						/>
						<div
							className="absolute -inset-2 rounded-3xl"
							style={{
								background: "rgba(201,169,110,0.08)",
								zIndex: 0,
								border: "1px solid rgba(201,169,110,0.2)",
							}}
						/>
						{/* Photo container */}
						<div
							className="relative rounded-3xl overflow-hidden animate-float"
							style={{
								width: "clamp(260px, 35vw, 380px)",
								aspectRatio: "4/5",
								zIndex: 1,
								boxShadow: "0 40px 100px rgba(0,0,0,0.12)",
							}}>
							<Image
								src="/nadia.webp"
								alt="Nadia Madarina Sa'id"
								fill
								className="object-cover"
								priority
							/>
							{/* Overlay gradient */}
							<div
								className="absolute inset-0"
								style={{
									background:
										"linear-gradient(to top, rgba(26,26,26,0.15) 0%, transparent 60%)",
								}}
							/>
						</div>
						{/* Floating badge */}
						<div
							className="absolute -bottom-4 -left-4 px-4 py-3 rounded-2xl shadow-xl"
							style={{
								background: "#FDFAF6",
								border: "1px solid rgba(201,169,110,0.2)",
								zIndex: 2,
							}}>
							<div
								className="text-xs uppercase tracking-widest font-medium mb-0.5"
								style={{ color: "#C9A96E" }}>
								Based in
							</div>
							<div
								className="text-sm font-semibold"
								style={{ color: "#1A1A1A" }}>
								Sidoarjo, Indonesia 🇮🇩
							</div>
						</div>
						{/* Top badge */}
						<div
							className="absolute -top-4 -right-4 px-4 py-3 rounded-2xl shadow-xl"
							style={{ background: "#1A1A1A", zIndex: 2 }}>
							<div className="text-xs font-medium" style={{ color: "#C9A96E" }}>
								Universitas
							</div>
							<div
								className="text-xs font-semibold"
								style={{ color: "#FDFAF6" }}>
								Airlangga '24
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Scroll cue */}
			<a
				href="#about"
				onClick={(e) => {
					e.preventDefault();
					document
						.getElementById("about")
						?.scrollIntoView({ behavior: "smooth" });
				}}
				className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in"
				style={{ animationDelay: "1s", opacity: 0, color: "#6B6560" }}>
				<span className="text-xs uppercase tracking-widest">Scroll</span>
				<ChevronDown
					size={16}
					style={{ animation: "float 2s ease-in-out infinite" }}
				/>
			</a>
		</section>
	);
}

// ─── About ───────────────────────────────────────────────────────────────────
function About() {
	return (
		<section id="about" className="py-28" style={{ background: "#F7F4EF" }}>
			<div className="max-w-6xl mx-auto px-6">
				<div className="grid lg:grid-cols-2 gap-16 items-center">
					<div className="section-reveal">
						<span
							className="text-xs uppercase tracking-widest font-medium"
							style={{ color: "#C9A96E" }}>
							Who I Am
						</span>
						<h2
							className="font-display mt-3 mb-6"
							style={{
								fontSize: "clamp(2rem, 4vw, 3rem)",
								color: "#1A1A1A",
								lineHeight: 1.15,
							}}>
							A detail-oriented professional
							<br />
							<em className="gold-text">building a career in taxation</em>
						</h2>
						<p
							className="text-base leading-relaxed mb-5"
							style={{ color: "#6B6560" }}>
							I&apos;m an accounting graduate from Universitas Airlangga with a
							strong passion for tax consulting and financial compliance. My
							journey has taken me from academic excellence to hands-on
							professional experience at MUC Consulting, where I supported
							complex tax consulting operations.
						</p>
						<p
							className="text-base leading-relaxed mb-8"
							style={{ color: "#6B6560" }}>
							I thrive in environments that demand precision, analytical
							thinking, and exceptional communication. My Brevet AB
							certification, World Bank transfer pricing training, and C2
							English proficiency reflect my commitment to continuous
							professional growth.
						</p>
						<div className="flex flex-wrap gap-3">
							{[
								"Tax Consulting",
								"Documentation",
								"Client Relations",
								"Data Validation",
								"Compliance",
							].map((tag) => (
								<span
									key={tag}
									className="px-3 py-1.5 rounded-full text-xs font-medium uppercase tracking-wider"
									style={{
										background: "rgba(201,169,110,0.12)",
										color: "#9A7A4A",
										border: "1px solid rgba(201,169,110,0.25)",
									}}>
									{tag}
								</span>
							))}
						</div>
					</div>

					<div
						className="section-reveal grid grid-cols-2 gap-4"
						style={{ transitionDelay: "0.15s" }}>
						{[
							{
								number: "2+",
								label: "Years Experience",
								icon: <Briefcase size={20} />,
								bg: "#1A1A1A",
								fg: "#C9A96E",
							},
							{
								number: "10+",
								label: "Certifications",
								icon: <Award size={20} />,
								bg: "#C9A96E",
								fg: "#FDFAF6",
							},
							{
								number: "C2",
								label: "English Proficiency",
								icon: <Star size={20} />,
								bg: "#8B9E8A",
								fg: "#FDFAF6",
							},
							{
								number: "Brevet AB",
								label: "Tax Certification",
								icon: <CheckCircle2 size={20} />,
								bg: "#F7F4EF",
								fg: "#1A1A1A",
								border: "1px solid rgba(201,169,110,0.3)",
							},
						].map((stat) => (
							<div
								key={stat.label}
								className="hover-lift rounded-2xl p-6 cursor-default"
								style={{
									background: stat.bg,
									border: stat.border || "none",
									boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
								}}>
								<div className="mb-3" style={{ color: stat.fg, opacity: 0.7 }}>
									{stat.icon}
								</div>
								<div
									className="font-display text-2xl font-bold mb-1"
									style={{ color: stat.fg }}>
									{stat.number}
								</div>
								<div
									className="text-xs font-medium uppercase tracking-wider"
									style={{ color: stat.fg, opacity: 0.7 }}>
									{stat.label}
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}

// ─── Experience ──────────────────────────────────────────────────────────────
function Experience() {
	const [open, setOpen] = useState(0);
	return (
		<section
			id="experience"
			className="py-28"
			style={{ background: "#FDFAF6" }}>
			<div className="max-w-6xl mx-auto px-6">
				<div className="text-center mb-16 section-reveal">
					<span
						className="text-xs uppercase tracking-widest font-medium"
						style={{ color: "#C9A96E" }}>
						Career Path
					</span>
					<h2
						className="font-display mt-3"
						style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "#1A1A1A" }}>
						Professional <em className="gold-text">Experience</em>
					</h2>
				</div>

				<div className="relative">
					{/* Timeline line */}
					<div className="absolute left-6 top-0 bottom-0 w-px hidden md:block timeline-line" />

					<div className="space-y-6">
						{EXPERIENCES.map((exp, i) => (
							<div
								key={i}
								className="section-reveal md:pl-16 relative"
								style={{ transitionDelay: `${i * 0.12}s` }}>
								{/* Dot */}
								<div
									className="absolute left-4 top-8 w-4 h-4 rounded-full border-2 hidden md:block transition-transform duration-300"
									style={{
										background: open === i ? exp.color : "#F7F4EF",
										borderColor: exp.color,
										transform: open === i ? "scale(1.3)" : "scale(1)",
									}}
								/>

								<div
									className="rounded-2xl overflow-hidden cursor-pointer transition-all duration-300"
									style={{
										background: "#F7F4EF",
										border:
											open === i
												? `1.5px solid ${exp.color}40`
												: "1.5px solid transparent",
										boxShadow:
											open === i
												? `0 8px 40px ${exp.color}18`
												: "0 2px 12px rgba(0,0,0,0.04)",
									}}
									onClick={() => setOpen(open === i ? -1 : i)}>
									<div className="p-6 flex items-start justify-between gap-4">
										<div className="flex-1">
											<div className="flex flex-wrap items-center gap-3 mb-2">
												<span
													className="text-xs px-2.5 py-1 rounded-full font-medium uppercase tracking-wider"
													style={{
														background: `${exp.color}18`,
														color: exp.color,
													}}>
													{exp.type}
												</span>
												<span
													className="text-xs font-medium"
													style={{ color: "#6B6560" }}>
													{exp.period}
												</span>
											</div>
											<h3
												className="font-semibold text-lg mb-0.5"
												style={{ color: "#1A1A1A" }}>
												{exp.role}
											</h3>
											<p
												className="text-sm font-medium"
												style={{ color: exp.color }}>
												{exp.company}
											</p>
										</div>
										<div
											className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300"
											style={{
												background: `${exp.color}15`,
												transform: open === i ? "rotate(180deg)" : "rotate(0)",
											}}>
											<ChevronDown size={14} style={{ color: exp.color }} />
										</div>
									</div>

									{open === i && (
										<div className="px-6 pb-6">
											<div
												style={{
													height: "1px",
													background: `${exp.color}20`,
													marginBottom: "16px",
												}}
											/>
											<ul className="space-y-3">
												{exp.points.map((pt, j) => (
													<li
														key={j}
														className="flex items-start gap-3 text-sm leading-relaxed"
														style={{ color: "#6B6560" }}>
														<span
															className="flex-shrink-0 mt-0.5"
															style={{ color: exp.color }}>
															<CheckCircle2 size={14} />
														</span>
														{pt}
													</li>
												))}
											</ul>
										</div>
									)}
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}

// ─── Skills ──────────────────────────────────────────────────────────────────
function Skills() {
	return (
		<section id="skills" className="py-28" style={{ background: "#1A1A1A" }}>
			<div className="max-w-6xl mx-auto px-6">
				<div className="text-center mb-16 section-reveal">
					<span
						className="text-xs uppercase tracking-widest font-medium"
						style={{ color: "#C9A96E" }}>
						Capabilities
					</span>
					<h2
						className="font-display mt-3"
						style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "#F7F4EF" }}>
						Skills & <em className="gold-text">Expertise</em>
					</h2>
				</div>

				<div className="grid lg:grid-cols-3 gap-8">
					{/* Tax & Accounting */}
					<div
						className="section-reveal rounded-2xl p-8"
						style={{
							background: "rgba(247,244,239,0.05)",
							border: "1px solid rgba(201,169,110,0.15)",
						}}>
						<div className="flex items-center gap-3 mb-8">
							<div
								className="w-8 h-8 rounded-full flex items-center justify-center"
								style={{ background: "rgba(201,169,110,0.15)" }}>
								<BookOpen size={14} style={{ color: "#C9A96E" }} />
							</div>
							<h3
								className="font-semibold text-sm uppercase tracking-widest"
								style={{ color: "#F7F4EF" }}>
								Tax & Accounting
							</h3>
						</div>
						{SKILLS_TAX.map((s) => (
							<SkillBar key={s.name} {...s} />
						))}
					</div>

					{/* Technical */}
					<div
						className="section-reveal rounded-2xl p-8"
						style={{
							background: "rgba(247,244,239,0.05)",
							border: "1px solid rgba(201,169,110,0.15)",
							transitionDelay: "0.12s",
						}}>
						<div className="flex items-center gap-3 mb-8">
							<div
								className="w-8 h-8 rounded-full flex items-center justify-center"
								style={{ background: "rgba(201,169,110,0.15)" }}>
								<Briefcase size={14} style={{ color: "#C9A96E" }} />
							</div>
							<h3
								className="font-semibold text-sm uppercase tracking-widest"
								style={{ color: "#F7F4EF" }}>
								Technical
							</h3>
						</div>
						{SKILLS_TECH.map((s) => (
							<SkillBar key={s.name} {...s} />
						))}
					</div>

					{/* Professional */}
					<div
						className="section-reveal rounded-2xl p-8"
						style={{
							background: "rgba(247,244,239,0.05)",
							border: "1px solid rgba(201,169,110,0.15)",
							transitionDelay: "0.24s",
						}}>
						<div className="flex items-center gap-3 mb-8">
							<div
								className="w-8 h-8 rounded-full flex items-center justify-center"
								style={{ background: "rgba(201,169,110,0.15)" }}>
								<Star size={14} style={{ color: "#C9A96E" }} />
							</div>
							<h3
								className="font-semibold text-sm uppercase tracking-widest"
								style={{ color: "#F7F4EF" }}>
								Professional
							</h3>
						</div>
						<div className="flex flex-wrap gap-2">
							{SKILLS_SOFT.map((s) => (
								<span
									key={s}
									className="px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 hover:-translate-y-0.5 cursor-default"
									style={{
										background: "rgba(201,169,110,0.1)",
										color: "#E8D5B0",
										border: "1px solid rgba(201,169,110,0.2)",
									}}>
									{s}
								</span>
							))}
						</div>
						<div
							className="mt-8 pt-6"
							style={{ borderTop: "1px solid rgba(201,169,110,0.15)" }}>
							<h4
								className="text-xs uppercase tracking-widest font-medium mb-4"
								style={{ color: "#C9A96E" }}>
								Languages
							</h4>
							{[
								{ lang: "Bahasa Indonesia", level: "Native", pct: 100 },
								{ lang: "English", level: "C2 Proficient", pct: 95 },
							].map(({ lang, level, pct }) => (
								<div key={lang} className="mb-4">
									<div className="flex justify-between mb-1.5">
										<span
											className="text-sm font-medium"
											style={{ color: "#F7F4EF" }}>
											{lang}
										</span>
										<span className="text-xs" style={{ color: "#C9A96E" }}>
											{level}
										</span>
									</div>
									<SkillBar name="" level={pct} />
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

// ─── Education ───────────────────────────────────────────────────────────────
function Education() {
	return (
		<section id="education" className="py-28" style={{ background: "#F7F4EF" }}>
			<div className="max-w-6xl mx-auto px-6">
				<div className="text-center mb-16 section-reveal">
					<span
						className="text-xs uppercase tracking-widest font-medium"
						style={{ color: "#C9A96E" }}>
						Academic Background
					</span>
					<h2
						className="font-display mt-3"
						style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "#1A1A1A" }}>
						<em className="gold-text">Education</em>
					</h2>
				</div>

				<div className="max-w-3xl mx-auto">
					<div
						className="section-reveal hover-lift rounded-3xl overflow-hidden"
						style={{
							background: "#FDFAF6",
							border: "1px solid rgba(201,169,110,0.2)",
							boxShadow: "0 8px 48px rgba(0,0,0,0.06)",
						}}>
						<div className="p-8 md:p-12">
							<div className="flex flex-col md:flex-row gap-8 items-start">
								<div
									className="flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center"
									style={{ background: "#1A1A1A" }}>
									<GraduationCap size={28} style={{ color: "#C9A96E" }} />
								</div>
								<div className="flex-1">
									<div className="flex flex-wrap items-center gap-3 mb-3">
										<span
											className="text-xs px-2.5 py-1 rounded-full font-medium uppercase tracking-wider"
											style={{
												background: "rgba(201,169,110,0.12)",
												color: "#9A7A4A",
												border: "1px solid rgba(201,169,110,0.25)",
											}}>
											2020 – 2024
										</span>
										<span
											className="text-xs font-medium"
											style={{ color: "#C9A96E" }}>
											Bachelor's Degree
										</span>
									</div>
									<h3
										className="font-display text-2xl font-semibold mb-1"
										style={{ color: "#1A1A1A" }}>
										Bachelor of Accounting
									</h3>
									<p
										className="text-base font-medium mb-4"
										style={{ color: "#C9A96E" }}>
										Universitas Airlangga
									</p>
									<p
										className="text-sm leading-relaxed mb-6"
										style={{ color: "#6B6560" }}>
										Graduated with a comprehensive accounting education from one
										of Indonesia&apos;s top universities. Developed strong
										foundations in taxation, financial analysis, auditing, and
										business reporting through rigorous academic coursework and
										hands-on project-based learning.
									</p>
									<div className="flex flex-wrap gap-2">
										{[
											"Taxation",
											"Financial Analysis",
											"Auditing",
											"Business Reporting",
											"Case Studies",
										].map((t) => (
											<span
												key={t}
												className="px-3 py-1 rounded-full text-xs font-medium"
												style={{
													background: "#F7F4EF",
													color: "#6B6560",
													border: "1px solid rgba(0,0,0,0.08)",
												}}>
												{t}
											</span>
										))}
									</div>
								</div>
							</div>
						</div>
						<div className="px-8 md:px-12 pb-8 md:pb-12">
							<div
								style={{
									height: "1px",
									background: "rgba(201,169,110,0.15)",
									marginBottom: "24px",
								}}
							/>
							<div
								className="rounded-2xl p-6"
								style={{
									background:
										"linear-gradient(135deg, #1A1A1A 0%, #2A2A2A 100%)",
								}}>
								<div className="flex items-start gap-4">
									<Trophy
										size={20}
										style={{
											color: "#C9A96E",
											flexShrink: 0,
											marginTop: "2px",
										}}
									/>
									<div>
										<div
											className="text-xs uppercase tracking-widest font-medium mb-1"
											style={{ color: "#C9A96E" }}>
											Achievement
										</div>
										<div
											className="text-sm font-semibold mb-1"
											style={{ color: "#F7F4EF" }}>
											1st Winner — Lomba Konten Medsos
										</div>
										<div className="text-xs" style={{ color: "#6B6560" }}>
											APA Fest 2021 · Ikatan Akuntan Indonesia · November 2021
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

// ─── Certifications ──────────────────────────────────────────────────────────
function Certifications() {
	const categories = [
		"All",
		"Tax",
		"International",
		"Audit",
		"Tech",
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
			className="py-28"
			style={{ background: "#FDFAF6" }}>
			<div className="max-w-6xl mx-auto px-6">
				<div className="text-center mb-12 section-reveal">
					<span
						className="text-xs uppercase tracking-widest font-medium"
						style={{ color: "#C9A96E" }}>
						Credentials
					</span>
					<h2
						className="font-display mt-3 mb-8"
						style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "#1A1A1A" }}>
						Certifications & <em className="gold-text">Training</em>
					</h2>
					<div className="flex flex-wrap justify-center gap-2">
						{categories.map((c) => (
							<button
								key={c}
								onClick={() => setActive(c)}
								className="px-4 py-2 rounded-full text-xs font-medium uppercase tracking-wider transition-all duration-200"
								style={{
									background: active === c ? "#1A1A1A" : "transparent",
									color: active === c ? "#C9A96E" : "#6B6560",
									border:
										active === c
											? "1.5px solid #1A1A1A"
											: "1.5px solid rgba(0,0,0,0.1)",
								}}>
								{c}
							</button>
						))}
					</div>
				</div>

				<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
					{filtered.map((cert, i) => (
						<div
							key={cert.name}
							className="section-reveal hover-lift rounded-2xl p-5 flex items-start gap-4 cursor-default"
							style={{
								background: "#F7F4EF",
								border: "1px solid rgba(201,169,110,0.15)",
								transitionDelay: `${i * 0.06}s`,
								boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
							}}>
							<div className="text-2xl flex-shrink-0">{cert.icon}</div>
							<div>
								<div
									className="text-xs uppercase tracking-wider font-medium mb-1"
									style={{ color: "#C9A96E" }}>
									{cert.category}
								</div>
								<div
									className="text-sm font-medium leading-snug"
									style={{ color: "#1A1A1A" }}>
									{cert.name}
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}

// ─── Contact ─────────────────────────────────────────────────────────────────
function Contact() {
	return (
		<section id="contact" className="py-28" style={{ background: "#1A1A1A" }}>
			<div className="max-w-6xl mx-auto px-6">
				<div className="grid lg:grid-cols-2 gap-16 items-center">
					<div className="section-reveal">
						<span
							className="text-xs uppercase tracking-widest font-medium"
							style={{ color: "#C9A96E" }}>
							Get In Touch
						</span>
						<h2
							className="font-display mt-3 mb-6"
							style={{
								fontSize: "clamp(2rem, 4vw, 3rem)",
								color: "#F7F4EF",
								lineHeight: 1.15,
							}}>
							Let&apos;s build something
							<br />
							<em className="gold-text">great together</em>
						</h2>
						<p
							className="text-base leading-relaxed mb-10"
							style={{ color: "#6B6560" }}>
							I&apos;m actively seeking opportunities in taxation, accounting,
							and consulting. Whether you have a full-time role or internship
							opportunity, I&apos;d love to connect.
						</p>
						<div className="space-y-4">
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
									icon: <LinkedinIcon size={16} />,
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
								<div key={label} className="flex items-center gap-4 group">
									<div
										className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-200 group-hover:bg-opacity-80"
										style={{
											background: "rgba(201,169,110,0.12)",
											color: "#C9A96E",
										}}>
										{icon}
									</div>
									<div>
										<div
											className="text-xs uppercase tracking-wider font-medium mb-0.5"
											style={{ color: "#6B6560" }}>
											{label}
										</div>
										{href ? (
											<a
												href={href}
												target={href.startsWith("http") ? "_blank" : undefined}
												rel="noopener noreferrer"
												className="text-sm font-medium transition-colors duration-200 hover:underline flex items-center gap-1.5"
												style={{ color: "#F7F4EF" }}>
												{value}
												{href.startsWith("http") && (
													<ExternalLink size={10} style={{ opacity: 0.5 }} />
												)}
											</a>
										) : (
											<span
												className="text-sm font-medium"
												style={{ color: "#F7F4EF" }}>
												{value}
											</span>
										)}
									</div>
								</div>
							))}
						</div>
					</div>

					<div className="section-reveal" style={{ transitionDelay: "0.15s" }}>
						<div
							className="rounded-3xl p-8 md:p-10"
							style={{
								background: "rgba(247,244,239,0.04)",
								border: "1px solid rgba(201,169,110,0.15)",
							}}>
							<h3
								className="font-semibold text-lg mb-6"
								style={{ color: "#F7F4EF" }}>
								Send a Message
							</h3>
							<div className="space-y-4">
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
									<div key={id}>
										<label
											htmlFor={id}
											className="block text-xs uppercase tracking-wider font-medium mb-2"
											style={{ color: "#6B6560" }}>
											{label}
										</label>
										<input
											type={type}
											id={id}
											placeholder={placeholder}
											className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200 focus:border-opacity-60"
											style={{
												background: "rgba(247,244,239,0.06)",
												border: "1px solid rgba(201,169,110,0.2)",
												color: "#F7F4EF",
												fontFamily: "'DM Sans', sans-serif",
											}}
											onFocus={(e) =>
												(e.target.style.borderColor = "rgba(201,169,110,0.6)")
											}
											onBlur={(e) =>
												(e.target.style.borderColor = "rgba(201,169,110,0.2)")
											}
										/>
									</div>
								))}
								<div>
									<label
										htmlFor="message"
										className="block text-xs uppercase tracking-wider font-medium mb-2"
										style={{ color: "#6B6560" }}>
										Message
									</label>
									<textarea
										id="message"
										rows={4}
										placeholder="Tell me about the opportunity..."
										className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200 resize-none"
										style={{
											background: "rgba(247,244,239,0.06)",
											border: "1px solid rgba(201,169,110,0.2)",
											color: "#F7F4EF",
											fontFamily: "'DM Sans', sans-serif",
										}}
										onFocus={(e) =>
											(e.target.style.borderColor = "rgba(201,169,110,0.6)")
										}
										onBlur={(e) =>
											(e.target.style.borderColor = "rgba(201,169,110,0.2)")
										}
									/>
								</div>
								<a
									href="mailto:nadiamadarinasaid@gmail.com"
									className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-medium text-sm transition-all duration-300 hover:shadow-lg hover:shadow-yellow-900/20 hover:-translate-y-0.5"
									style={{
										background: "linear-gradient(135deg, #C9A96E, #9A7A4A)",
										color: "#FDFAF6",
									}}>
									<Mail size={14} /> Send Message via Email
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

// ─── Footer ──────────────────────────────────────────────────────────────────
function Footer() {
	return (
		<footer
			className="py-8 text-center"
			style={{
				background: "#111111",
				borderTop: "1px solid rgba(201,169,110,0.1)",
			}}>
			<p className="text-xs" style={{ color: "#6B6560" }}>
				© 2025{" "}
				<span style={{ color: "#C9A96E" }}>Nadia Madarina Sa&apos;id</span> ·
				Sidoarjo, Indonesia · All Rights Reserved
			</p>
		</footer>
	);
}

// ─── Page ────────────────────────────────────────────────────────────────────
export default function Page() {
	useReveal();
	return (
		<>
			<Navbar />
			<main>
				<Hero />
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
