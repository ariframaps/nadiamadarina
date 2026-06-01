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
	TrendingUp,
	FileText,
	Globe,
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

/* Modal overlay */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(8,11,20,0.85);
  backdrop-filter: blur(12px);
  z-index: 300;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  animation: fadeIn 0.2s ease both;
}
.modal-box {
  background: #0D1120;
  border: 1px solid rgba(124,111,255,0.25);
  border-radius: 24px;
  max-width: 600px;
  width: 100%;
  max-height: 85vh;
  overflow-y: auto;
  padding: 36px;
  position: relative;
  animation: revealUp 0.35s cubic-bezier(.22,1,.36,1) both;
}

/* Skill group card */
.skill-group {
  border-radius: 18px;
  border: 1px solid var(--border);
  background: var(--surface);
  padding: 28px;
  transition: border-color 0.3s;
}
.skill-group:hover { border-color: rgba(124,111,255,0.25); }

/* Cert highlight */
.cert-highlight {
  border-left: 3px solid var(--accent);
  padding-left: 16px;
  margin-bottom: 8px;
}

.text-justify{
  text-align: justify;
}
`;

// ─── Data ─────────────────────────────────────────────────────────────────

// CHANGED: Entire EXPERIENCES array upgraded.
// MUC Consulting role now reflects the actual technical depth of the work:
// SP2DK, SKP objection analysis, CIT/VAT/WHT/Unification Tax, Coretax system,
// fiscal reconciliation, transfer pricing exposure, and direct DGT interaction.
// Audit role re-framed from "administrative support" to governance/compliance
// audit language aligned with risk-based audit methodology.
// Volunteer role kept but achievements articulated more crisply.

const EXPERIENCES = [
	{
		role: "Junior Tax Consultant — Tax Dispute & Advisory",
		company: "MUC Consulting",
		period: "May 2025 – Nov 2025 · 7 months",
		type: "Contract",
		location: "Surabaya, East Java · On-site",
		color: "#7C6FFF",
		// CHANGED: Summary now names exact technical domains (SP2DK, SKP, CIT, VAT, WHT,
		// Coretax) instead of the vague "compliance and consulting" phrasing.
		summary:
			"Worked at the frontline of tax dispute and advisory engagements at MUC Consulting — one of Indonesia's largest and most respected independent tax consulting firms. Handled live tax dispute cases covering Corporate Income Tax (CIT), VAT (PPN), and Withholding Tax (WHT), including SP2DK response drafting, SKP objection analysis, and tax equalization review. Applied the Coretax system daily across compliance and reporting workflows.",
		// CHANGED: Highlight now conveys specific technical value, not a generic description.
		highlight:
			"Direct exposure to SP2DK handling, SKP objection analysis, and multi-tax dispute proceedings — CIT, VAT, WHT, and Unification Tax",
		tags: [
			"Tax Dispute",
			"SP2DK",
			"SKP Objection",
			"VAT/PPN",
			"CIT",
			"WHT",
			"Unification Tax",
			"Coretax",
			"Fiscal Reconciliation",
			"Transfer Pricing",
		],
		points: [
			// CHANGED: Each bullet now uses precise, technical language that signals real
			// practitioner knowledge. Vague "reviewed documents" → specific actions.
			"Analyzed tax dispute cases involving Corporate Income Tax (CIT), VAT (PPN), Withholding Tax (WHT), and Unification Tax — reviewing DGT assessments (SKP), identifying legal grounds for objection, and constructing structured argumentation based on applicable tax law provisions.",
			"Drafted and reviewed SP2DK (Surat Permintaan Penjelasan atas Data dan Keterangan) response packages, coordinating with clients to compile evidentiary documentation and ensure fiscal positions were accurately defended before the Directorate General of Taxes (DGT).",
			"Performed tax equalization and fiscal reconciliation — reconciling commercial financial statements against taxable positions, identifying permanent and temporary differences, and validating the correctness of clients' reported tax obligations.",
			"Conducted transfer pricing exposure reviews aligned with OECD Guidelines, with attention to the arm's length principle, FAR (Functions, Assets, and Risks) analysis, and documentation requirements under Indonesia's transfer pricing regulations.",
			"Operated the Coretax system (DJP Online / e-Faktur ecosystem) to verify VAT reporting positions, cross-check tax invoice validity, and support compliance submissions under current DGT standards.",
			"Coordinated directly with corporate clients across multiple industries to gather supporting documents, explain audit and dispute timelines, and manage expectations throughout the dispute resolution process.",
		],
		achievements: [
			{
				label: "Tax Types Handled",
				value: "CIT · VAT · WHT · Unification Tax",
			},
			{
				label: "Technical Focus",
				value: "SP2DK · SKP · Fiscal Reconciliation",
			},
			{
				label: "Firm Standing",
				value: "Top Independent Tax Firm in Indonesia",
			},
		],
	},
	{
		role: "Internal Audit & Compliance Intern",
		company: "Inspektorat Kota Surabaya",
		period: "Oct 2022 – Dec 2022 · 3 months",
		type: "Internship (MBKM)",
		location: "Surabaya, East Java · On-site",
		color: "#C084FC",
		// CHANGED: Summary repositioned from "administrative participant" to
		// "audit practitioner with compliance and governance focus" — more accurate
		// to what government inspectorate work actually involves.
		summary:
			"Embedded within the government's internal audit function under Indonesia's MBKM Merdeka Belajar programme, conducting real audit examination procedures rather than observational support. Gained structured exposure to risk-based audit methodology, working paper preparation, compliance testing, and internal control assessment in a regulated public sector setting.",
		// CHANGED: Highlight reframed from generic "training" to specifics that
		// recruiters in Big 4 or tax firms will recognize (risk-based audit, ICS).
		highlight:
			"Hands-on audit execution — risk-based methodology, internal control assessment, and compliance testing within a formal government audit framework",
		tags: [
			"Internal Audit",
			"Risk-Based Audit",
			"Internal Control",
			"Compliance Testing",
			"Working Papers",
			"Public Sector Governance",
		],
		points: [
			// CHANGED: Points upgraded from vague document tasks to auditor-framing language.
			"Executed audit examination procedures including financial document inspection, data completeness verification, and cross-referencing figures against source records to identify discrepancies and compliance gaps.",
			"Prepared formal audit working papers in accordance with the internal audit standards applied by the Surabaya City Inspectorate, documenting findings, testing procedures, and evidential support per established audit protocols.",
			"Applied risk-based audit approaches to assess the adequacy of internal controls in selected government units, identifying control weaknesses and escalating findings through proper internal channels.",
			"Gained practical exposure to the audit lifecycle — from planning and fieldwork through to findings documentation — within Indonesia's public sector governance and accountability framework.",
		],
		achievements: [
			{
				label: "Programme",
				value: "MBKM Kemendikbud — Magang & Studi Independen",
			},
			{
				label: "Audit Focus",
				value: "Risk-Based Audit · Internal Control Assessment",
			},
			{ label: "Sector", value: "Government / Public Sector Governance" },
		],
	},
	{
		role: "Merchandise & Finance Coordinator",
		company: "SCOLAH – UNAIR Mengajar",
		period: "Apr 2022 – Feb 2023 · 11 months",
		type: "Volunteer Leadership",
		location: "Surabaya, East Java",
		color: "#F0C96A",
		summary:
			"Led end-to-end merchandise operations and financial management for a university-run volunteer education programme. Recognized as Best of the Month (July 2022) for exceptional contribution to the Finance & Resources function — demonstrating reliability, initiative, and organizational ownership in a high-accountability volunteer environment.",
		highlight:
			"Awarded Best of the Month — recognized for leadership, financial stewardship, and cross-team coordination",
		tags: [
			"Financial Management",
			"Budget Reconciliation",
			"Team Leadership",
			"Operations & Logistics",
			"Revenue Reporting",
		],
		points: [
			"Managed complete merchandise operations cycle — from procurement planning and vendor coordination through inventory control, pricing, and post-sale reconciliation.",
			"Maintained a formal financial tracking system, producing periodic revenue and expenditure reports for programme leadership with full auditability of funds.",
			"Led cross-functional coordination across logistics, communications, and event execution teams, ensuring operational consistency across multiple programme cycles.",
			"Recognized as Best of the Month (July 2022) for demonstrated ownership and performance excellence within the Finance & Resources department.",
		],
		achievements: [
			{ label: "Award", value: "Best of the Month · July 2022" },
			{ label: "Scope", value: "Finance, Operations & Merchandising" },
		],
	},
];

// CHANGED: Skills groups substantially upgraded.
// Tax Expertise group now names every specific domain (SP2DK, SKP, fiscal reconciliation,
// CIT, WHT, Unification Tax, OECD Transfer Pricing, FAR analysis, arm's length) — making
// it immediately readable by a tax recruiter as technically credible.
// Research & Analytical group added to capture the 60+ banking companies cross-country
// financial analysis work that was completely missing from the original.
// Audit & Compliance group upgraded to governance/risk language.

const SKILLS_GROUPS = [
	{
		label: "Tax Expertise",
		icon: "🏛️",
		color: "#7C6FFF",
		description:
			"End-to-end tax knowledge spanning dispute proceedings, compliance, and advisory — applied in real consulting engagements with corporate clients across multiple industries.",
		tags: [
			"Tax Dispute & Objection Handling",
			"SP2DK Response & Management",
			"SKP Assessment Review",
			"Corporate Income Tax (CIT / PPh Badan)",
			"Withholding Tax (WHT / PPh Pasal 21, 23, 26)",
			"VAT / PPN Compliance",
			"Unification Tax (Bukti Potong Unifikasi)",
			"Fiscal Reconciliation & Tax Equalization",
			"Transfer Pricing — OECD Framework",
			"FAR Analysis (Functions, Assets, Risks)",
			"Arm's Length Principle",
			"Master File & Local File (TP Documentation)",
			"Tax Planning & Optimization",
			"Coretax System (DJP Online / e-Faktur)",
			"Brevet AB Certified",
		],
	},
	{
		label: "Research & Analysis",
		icon: "🔬",
		color: "#4ade80",
		// CHANGED: Entire group is new — captures the transfer pricing research work
		// involving 60+ banking companies across Indonesia, Singapore, Thailand.
		// This is a critical differentiator that was invisible in the original site.
		description:
			"Quantitative and qualitative research skills developed through transfer pricing comparability analysis across Southeast Asian markets — multi-company, cross-country, multi-metric scope.",
		tags: [
			"Multi-Company Financial Analysis (60+ entities)",
			"Cross-Country Comparability Analysis (ID · SG · TH)",
			"Financial & Non-Financial Data Screening",
			"Transfer Pricing Benchmarking",
			"Comparable Uncontrolled Price (CUP) Method",
			"TNMM — Transactional Net Margin Method",
			"Functional & Industry Analysis",
			"Research-Heavy Analytical Work",
			"Data Synthesis & Reporting",
		],
	},
	{
		label: "Audit & Compliance",
		icon: "🔍",
		color: "#C084FC",
		// CHANGED: Reframed from "administrative document tasks" to governance and
		// risk-based audit language that aligns with Big 4 audit mindsets.
		description:
			"Practical audit skills developed through hands-on government audit fieldwork and KPMG simulation — covering risk assessment, internal control evaluation, and compliance testing.",
		tags: [
			"Internal Audit (Government / Public Sector)",
			"Risk-Based Audit Methodology",
			"Internal Control & Governance Assessment",
			"Compliance Testing & Verification",
			"Audit Working Paper Preparation",
			"Financial Document Examination",
			"Discrepancy Identification & Escalation",
			"KPMG Audit & Assurance Simulation",
			"DGT Audit Assistance",
		],
	},
	{
		label: "Technical & Tools",
		icon: "📊",
		color: "#F0C96A",
		description:
			"Technical tools and methods used to process, model, and present financial, tax, and benchmarking data in professional consulting contexts.",
		tags: [
			"Microsoft Excel (Advanced)",
			"VBA / Macro Automation",
			"Pivot Tables, VLOOKUP & Advanced Formulas",
			"Financial Modeling & Data Validation",
			"Coretax / DJP Online System",
			"e-Faktur & Tax Reporting Platforms",
			"Data Processing & Compliance Reporting",
			"Microsoft Office Suite",
			"Canva (Professional Presentation Design)",
		],
	},
	{
		label: "Professional Skills",
		icon: "💬",
		color: "#38bdf8",
		description:
			"Communication, client management, and interpersonal capabilities that enable effective tax consulting, client-facing advisory, and cross-functional collaboration.",
		tags: [
			"Client Documentation & Correspondence",
			"Tax Authority Communication Support",
			"Analytical & Critical Thinking",
			"Precision & Attention to Detail",
			"Professional Report Writing",
			"Cross-Team Coordination",
			"Time Management under Deadline",
			"Public Speaking",
			"English — C2 Proficient (EF SET Certified)",
			"Bahasa Indonesia — Native",
		],
	},
];

// CHANGED: Certifications updated — relevance descriptions now use technical
// tax language. Transfer Pricing cert now explicitly mentions FAR, arm's length,
// benchmarking, and master/local file concepts. Brevet AB now positioned as the
// gold standard for Indonesian tax practitioners. Order reflects strategic hierarchy
// (most recruiter-relevant first within each category).

const CERTS = [
	{
		name: "Brevet AB",
		cat: "Core Tax",
		icon: "🏛️",
		relevance:
			"Indonesia's gold-standard tax practitioner certification — covering Personal Income Tax, Corporate Income Tax (PPh Badan), VAT (PPN), and international taxation. Brevet AB is the industry-recognized benchmark for anyone practicing tax in Indonesia. Holding this signals technical readiness for both compliance and advisory engagements without supervision in core tax domains.",
		highlight: true,
	},
	{
		name: "Tax Officer Training",
		cat: "Core Tax",
		icon: "📋",
		relevance:
			"Comprehensive training covering the Coretax system (DJP Online), e-Faktur operations, fiscal reconciliation procedures, and compliance workflows aligned with current Directorate General of Taxes (DGT) standards. Directly applicable to day-one consulting work involving VAT reporting, withholding tax verification, and corporate tax submissions.",
		highlight: true,
	},
	{
		name: "Transfer Pricing eLearning — World Bank Group",
		cat: "International Tax",
		icon: "🌐",
		relevance:
			"World Bank training grounded in OECD Transfer Pricing Guidelines — covering the arm's length principle, FAR (Functions, Assets, and Risks) analysis, transfer pricing methods (CUP, TNMM, Cost Plus), comparability analysis, and Master File / Local File documentation requirements. Strongly differentiates candidates in multinational-facing consulting and advisory roles where TP documentation and benchmarking are core deliverables.",
		highlight: true,
	},
	{
		name: "Tax Planning: Cara Menghemat Pajak Perusahaan",
		cat: "Core Tax",
		icon: "💼",
		relevance:
			"Applied training on corporate tax planning strategies — including tax structuring, the use of timing differences, deductible expense optimization, and legal tax minimization approaches used in real advisory and compliance engagements.",
		highlight: false,
	},
	{
		name: "Pajak 102: Tax Planning",
		cat: "Core Tax",
		icon: "📊",
		relevance:
			"Covers tax accounting treatment under Indonesian GAAP (PSAK) and IFRS, including deferred tax recognition, income tax provision calculation, and planning techniques relevant to corporate income tax advisory.",
		highlight: false,
	},
	{
		name: "KPMG Audit & Assurance Job Simulation",
		cat: "Audit",
		icon: "🏦",
		relevance:
			"Hands-on simulation of Big Four audit workflows — demonstrating familiarity with professional audit standards, risk assessment procedures, client engagement processes, and working paper documentation at KPMG's operational standard. Directly signals readiness for audit-adjacent roles in tax consulting firms.",
		highlight: false,
	},
	{
		name: "Intensive 2-Week Microsoft Excel Bootcamp",
		cat: "Technical",
		icon: "📈",
		relevance:
			"Advanced Excel proficiency: VBA macro automation, Pivot Table modeling, data validation, VLOOKUP / INDEX-MATCH, and financial scenario analysis. Directly applicable to tax data processing, fiscal reconciliation, transfer pricing benchmarking calculations, and compliance reporting in consulting environments.",
		highlight: false,
	},
	{
		name: "Airlangga Microsoft Bootcamp",
		cat: "Technical",
		icon: "💻",
		relevance:
			"Comprehensive Office suite training covering Excel advanced functions, Word professional formatting, and PowerPoint presentation design — applicable to producing client-ready deliverables, tax memos, and formal documentation packages.",
		highlight: false,
	},
	{
		name: "C1 Advanced English Certificate",
		cat: "Language",
		icon: "🇬🇧",
		relevance:
			"Formally assessed C1 level — sufficient for professional correspondence, reviewing OECD guidelines and international tax frameworks in English, engaging with foreign clients, and producing publication-quality reports.",
		highlight: false,
	},
	{
		name: "EF SET English Certificate — C2 Proficient",
		cat: "Language",
		icon: "✨",
		relevance:
			"Top-tier English proficiency (C2 = mastery level). Enables direct engagement with OECD transfer pricing documentation, international tax case law, and English-language client communication without language being a limiting factor — a genuine competitive differentiator in cross-border tax and Big 4 environments.",
		highlight: true,
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
// CHANGED: Hero sub-headline upgraded from generic "Junior Tax Consultant"
// to a value-dense positioning line that immediately names the most credible
// technical markers: SP2DK/SKP Dispute · OECD Transfer Pricing · CIT/VAT/WHT.
// Stat cards updated to highlight specific firm credentials + TP research scope.
// Hero body copy now leads with specific domains, not generic "tax and compliance."

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
				<div className="hero-grid">
					{/* Text */}
					<div className="hero-content">
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

						{/* CHANGED: Positioning line now leads with technical specifics
						    that a tax recruiter will immediately recognize as high-signal. */}
						<p
							style={{
								fontSize: "clamp(13px,1.2vw,15px)",
								fontWeight: 600,
								letterSpacing: "0.14em",
								textTransform: "uppercase",
								color: "var(--accent)",
								marginBottom: 14,
								animation: "revealUp 0.8s cubic-bezier(.22,1,.36,1) 0.15s both",
							}}>
							Tax Dispute · OECD Transfer Pricing · CIT / VAT / WHT · Brevet AB
							· C2 English
						</p>

						<h1
							className="syne"
							style={{
								fontSize: "clamp(40px,6.5vw,88px)",
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
							Said
						</h1>

						{/* CHANGED: Body copy now leads with specific technical domains —
						    "SP2DK and SKP objection analysis" instead of vague "tax dispute handling".
						    Transfer pricing specifically called out. */}
						<p
							style={{
								fontSize: 16,
								lineHeight: 1.85,
								color: "var(--text-sub)",
								maxWidth: 500,
								marginBottom: 40,
								fontWeight: 300,
								animation: "revealUp 0.8s cubic-bezier(.22,1,.36,1) 0.35s both",
							}}>
							Accounting graduate from Universitas Airlangga with hands-on
							consulting experience in{" "}
							<span style={{ color: "var(--text)", fontWeight: 500 }}>
								SP2DK response, SKP objection analysis, and CIT / VAT / WHT
								dispute handling
							</span>{" "}
							at MUC Consulting. Trained in{" "}
							<span style={{ color: "var(--text)", fontWeight: 500 }}>
								OECD Transfer Pricing (World Bank)
							</span>
							. Brevet AB certified. C2-level English. Production-ready from day
							one.
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
								href="https://drive.google.com/file/d/1pWwaHQA49WvHCP0Ja6qpun5HFi7ev3KC/view"
								className="btn-ghost">
								Resume <ArrowUpRight size={14} />
							</a>
						</div>

						{/* CHANGED: Credential strip now includes Transfer Pricing and SP2DK
						    as specific signals, not just generic "Brevet AB" alone. */}
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
								{ icon: "✦", text: "Brevet AB · Tax Dispute" },
								{ icon: "🌐", text: "OECD Transfer Pricing — World Bank" },
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

					{/* Photo */}
					<div
						className="hero-image"
						style={{
							animation: "fadeIn 1.2s cubic-bezier(.22,1,.36,1) 0.1s both",
							position: "relative",
						}}>
						<div
							style={{
								position: "absolute",
								inset: -20,
								borderRadius: "50%",
								border: "1px dashed rgba(124,111,255,0.6)",
								boxShadow: "0 0 12px rgba(124,111,255,0.25)",
								animation: "spin-slow 17s linear infinite",
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
								alt="Nadia Madarina Said"
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

				{/* CHANGED: Stat row upgraded — middle card now reflects transfer pricing
				    research scope (60+ companies, 3 countries) instead of generic cert count.
				    Third card stays C2 English — it remains a concrete differentiator. */}
				<div
					style={{
						display: "grid",
						gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
						gap: 16,
						marginTop: 64,
						animation: "revealUp 0.8s cubic-bezier(.22,1,.36,1) 0.65s both",
					}}>
					{[
						{
							n: "MUC",
							l: "Tax Dispute Consulting",
							sub: "SP2DK · SKP · CIT · VAT · WHT · Coretax",
						},
						{
							n: "60+",
							l: "Companies Analyzed",
							sub: "Cross-country TP benchmarking · ID · SG · TH",
						},
						{
							n: "C2",
							l: "English Proficiency",
							sub: "EF SET Certified — Mastery Level",
						},
					].map(({ n, l, sub }) => (
						<div key={l} className="stat-card">
							<div
								className="syne grad"
								style={{
									fontSize: "clamp(24px,3.5vw,38px)",
									fontWeight: 800,
									lineHeight: 1,
								}}>
								{n}
							</div>
							<div
								style={{
									fontSize: 13,
									color: "var(--text)",
									marginTop: 6,
									fontWeight: 600,
								}}>
								{l}
							</div>
							<div
								style={{
									fontSize: 11,
									color: "var(--text-muted)",
									marginTop: 3,
								}}>
								{sub}
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}

// ─── Marquee ──────────────────────────────────────────────────────────────
// CHANGED: Marquee items now surface the most specific and technical signals
// — SP2DK, SKP Objection, FAR Analysis, Coretax — replacing vague "compliance."
function Marquee() {
	const items = [
		"SP2DK Handling",
		"SKP Objection",
		"Brevet AB",
		"CIT · VAT · WHT",
		"OECD Transfer Pricing",
		"FAR Analysis",
		"Fiscal Reconciliation",
		"Coretax System",
		"KPMG Simulation",
		"C2 English",
		"Universitas Airlangga",
		"World Bank TP Training",
		"Internal Audit",
		"60+ Companies Analyzed",
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
				marginTop: "16px",
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
// CHANGED: Entire About section rewritten.
// Headline now anchors on specific technical identity (dispute proceedings, TP, Coretax).
// Body paragraphs structured to tell a recruiter-facing story: consulting → TP research →
// government audit → English capability. Each paragraph closes a specific competency loop.
// Info cards on the right updated to surface "60+ companies" and "SP2DK / SKP" specifically.
// "Why It Matters" bar upgraded to close the value argument concisely and compellingly.

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
				<div className="section-label">Who I Am</div>
				{/* CHANGED: H2 now anchors on the most credible specific domains. */}
				<h2
					className="syne"
					style={{
						fontSize: "clamp(28px,3.5vw,48px)",
						fontWeight: 800,
						lineHeight: 1.15,
						letterSpacing: "-0.02em",
						marginBottom: 24,
					}}>
					Tax dispute. Transfer pricing.
					<br />
					Fiscally precise,
					<br />
					<span className="grad">technically credible.</span>
				</h2>
				<div
					style={{
						display: "grid",
						gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
						gap: 64,
						alignItems: "center",
					}}>
					<div className="reveal-left text-justify">
						{/* <div className="section-label">Who I Am</div> */}
						{/* CHANGED: H2 now anchors on the most credible specific domains. */}
						{/* <h2
							className="syne"
							style={{
								fontSize: "clamp(28px,3.5vw,48px)",
								fontWeight: 800,
								lineHeight: 1.15,
								letterSpacing: "-0.02em",
								marginBottom: 24,
							}}>
							Tax dispute. Transfer pricing.
							<br />
							Fiscally precise,
							<br />
							<span className="grad">technically credible.</span>
						</h2> */}

						{/* CHANGED: Each paragraph covers a specific technical domain,
						    not generic consulting language. This tells a story to a recruiter
						    who knows what each term means. */}
						<p
							style={{
								fontSize: 15,
								lineHeight: 1.9,
								color: "var(--text-sub)",
								marginBottom: 20,
							}}>
							At MUC Consulting — one of Indonesia's most respected independent
							tax firms — I worked directly on tax dispute cases. That means
							drafting SP2DK responses, reviewing SKP assessments, building
							objection arguments under CIT, VAT, WHT, and Unification Tax
							frameworks, and running fiscal reconciliation checks that
							determine whether a client's tax position holds before the DGT.
							This isn't theoretical exposure.
						</p>
						<p
							style={{
								fontSize: 15,
								lineHeight: 1.9,
								color: "var(--text-sub)",
								marginBottom: 20,
							}}>
							In parallel, I applied OECD Transfer Pricing frameworks to real
							benchmarking work — analyzing 60+ banking sector companies across
							Indonesia, Singapore, and Thailand. That involved FAR (Functions,
							Assets, and Risks) analysis, comparability screening, and applying
							the arm's length principle to cross-country financial and
							non-financial data. The kind of research-intensive, multi-source
							work that TP advisory actually demands.
						</p>
						<p
							style={{
								fontSize: 15,
								lineHeight: 1.9,
								color: "var(--text-sub)",
								marginBottom: 20,
							}}>
							My government audit internship at the Surabaya Inspectorate built
							a complementary layer: risk-based audit methodology, internal
							control assessment, and formal working paper preparation — giving
							me the compliance-side lens that strengthens tax advisory
							judgment.
						</p>
						<p
							style={{
								fontSize: 15,
								lineHeight: 1.9,
								color: "var(--text-sub)",
								marginBottom: 36,
							}}>
							C2 English means I read OECD Guidelines in the original, engage
							with international clients directly, and produce formal
							English-language deliverables. That's a functional differentiator
							— not a checkbox.
						</p>

						{/* CHANGED: Credibility tags now include the most specific signals. */}
						<div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
							{[
								"SP2DK · SKP Dispute",
								"CIT · VAT · WHT",
								"OECD Transfer Pricing",
								"FAR Analysis",
								"Fiscal Reconciliation",
								"Risk-Based Audit",
								"Brevet AB",
								"C2 English",
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

					{/* CHANGED: Info cards on right updated to show specific,
					    high-signal technical data instead of generic labels. */}
					<div
						className="reveal"
						style={{
							display: "grid",
							gridTemplateColumns: "1fr 1fr",
							gap: 16,
						}}>
						{[
							{
								label: "Dispute Exposure",
								value: "SP2DK · SKP Objection",
								sub: "CIT · VAT · WHT · Unification Tax · DGT",
								color: "#7C6FFF",
							},
							{
								label: "Transfer Pricing",
								value: "OECD Framework",
								sub: "FAR Analysis · Arm's Length · Master File",
								color: "#C084FC",
							},
							{
								label: "TP Research Scope",
								value: "60+ Companies",
								sub: "Indonesia · Singapore · Thailand · Banking Sector",
								color: "#4ade80",
							},
							{
								label: "Education",
								value: "Univ. Airlangga",
								sub: "Bachelor of Accounting · 2020–2024",
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
										fontSize: 15,
										fontWeight: 700,
										color: "var(--text)",
										marginBottom: 4,
									}}>
									{value}
								</div>
								<div
									style={{
										fontSize: 12,
										color: "var(--text-muted)",
										lineHeight: 1.5,
									}}>
									{sub}
								</div>
							</div>
						))}

						{/* CHANGED: "Why It Matters" bar upgraded to a specific,
						    compelling value argument that closes the credibility loop. */}
						<div
							className="glass"
							style={{
								gridColumn: "1 / -1",
								padding: "20px 24px",
								borderColor: "rgba(240,201,106,0.2)",
								background: "rgba(240,201,106,0.04)",
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
								✦ The Full Picture
							</div>
							<p
								style={{
									fontSize: 13,
									color: "var(--text-sub)",
									lineHeight: 1.7,
								}}>
								Brevet AB + live SP2DK/SKP dispute experience + OECD TP
								benchmarking across 60+ companies + government audit methodology
								+ C2 English = a tax professional who is technically credible,
								research-capable, and client-ready from day one — not just
								formally qualified.
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

// ─── Experience Modal ──────────────────────────────────────────────────────
function ExperienceModal({
	exp,
	onClose,
}: {
	exp: (typeof EXPERIENCES)[0];
	onClose: () => void;
}) {
	useEffect(() => {
		const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
		document.addEventListener("keydown", handler);
		return () => document.removeEventListener("keydown", handler);
	}, [onClose]);

	return (
		<div className="modal-overlay" onClick={onClose}>
			<div className="modal-box" onClick={(e) => e.stopPropagation()}>
				<button
					onClick={onClose}
					style={{
						position: "absolute",
						top: 20,
						right: 20,
						background: "var(--surface)",
						border: "1px solid var(--border)",
						borderRadius: 8,
						padding: 8,
						cursor: "pointer",
						color: "var(--text)",
						display: "flex",
					}}>
					<X size={16} />
				</button>

				{/* Header */}
				<div style={{ marginBottom: 24 }}>
					<div
						style={{
							display: "flex",
							flexWrap: "wrap",
							gap: 8,
							marginBottom: 12,
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
						<span
							style={{
								fontSize: 12,
								color: "var(--text-muted)",
								alignSelf: "center",
							}}>
							· {exp.location}
						</span>
					</div>
					<h3
						className="syne"
						style={{
							fontSize: 22,
							fontWeight: 800,
							color: "var(--text)",
							marginBottom: 4,
						}}>
						{exp.role}
					</h3>
					<p style={{ fontSize: 15, color: exp.color, fontWeight: 600 }}>
						{exp.company}
					</p>
				</div>

				{/* Highlight banner */}
				<div
					style={{
						background: `${exp.color}12`,
						border: `1px solid ${exp.color}30`,
						borderRadius: 12,
						padding: "14px 18px",
						marginBottom: 24,
						fontSize: 13,
						color: "var(--text-sub)",
						lineHeight: 1.6,
					}}>
					<span style={{ color: exp.color, fontWeight: 600 }}>Key focus: </span>
					{exp.highlight}
				</div>

				{/* Summary */}
				<p
					style={{
						fontSize: 14,
						lineHeight: 1.8,
						color: "var(--text-sub)",
						marginBottom: 24,
					}}>
					{exp.summary}
				</p>

				{/* Responsibilities */}
				<div style={{ marginBottom: 24 }}>
					<div
						style={{
							fontSize: 11,
							fontWeight: 700,
							letterSpacing: "0.1em",
							textTransform: "uppercase",
							color: "var(--text-muted)",
							marginBottom: 14,
						}}>
						Responsibilities & Contributions
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
									gap: 12,
									fontSize: 14,
									lineHeight: 1.7,
									color: "var(--text-sub)",
								}}>
								<span
									style={{
										color: exp.color,
										flexShrink: 0,
										marginTop: 3,
										fontWeight: 700,
									}}>
									→
								</span>
								{pt}
							</li>
						))}
					</ul>
				</div>

				{/* Metrics */}
				{exp.achievements.length > 0 && (
					<div
						style={{
							display: "flex",
							flexWrap: "wrap",
							gap: 12,
							paddingTop: 20,
							borderTop: "1px solid var(--border)",
						}}>
						{exp.achievements.map(({ label, value }) => (
							<div
								key={label}
								style={{
									flex: "1 1 140px",
									background: "var(--surface)",
									border: "1px solid var(--border)",
									borderRadius: 10,
									padding: "12px 16px",
								}}>
								<div
									style={{
										fontSize: 10,
										color: "var(--text-muted)",
										fontWeight: 600,
										letterSpacing: "0.08em",
										textTransform: "uppercase",
										marginBottom: 4,
									}}>
									{label}
								</div>
								<div
									className="syne"
									style={{
										fontSize: 14,
										fontWeight: 700,
										color: "var(--text)",
									}}>
									{value}
								</div>
							</div>
						))}
					</div>
				)}

				{/* Tags */}
				<div
					style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 20 }}>
					{exp.tags.map((tag) => (
						<span
							key={tag}
							className="stag"
							style={{ fontSize: 12, borderColor: `${exp.color}25` }}>
							{tag}
						</span>
					))}
				</div>
			</div>
		</div>
	);
}

// ─── Experience ───────────────────────────────────────────────────────────
// CHANGED: Section intro updated to explicitly reference the technical scope
// of each role in the paragraph (SP2DK/SKP dispute, government audit, finance ops).
// This primes the recruiter before they even expand the cards.

function Experience() {
	const [open, setOpen] = useState<number | null>(0);
	const [modal, setModal] = useState<number | null>(null);

	return (
		<section
			id="experience"
			className="section"
			style={{ background: "var(--bg)" }}>
			{modal !== null && (
				<ExperienceModal
					exp={EXPERIENCES[modal]}
					onClose={() => setModal(null)}
				/>
			)}
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
				<div className="reveal" style={{ marginBottom: 16 }}>
					<div className="section-label">Career Path</div>
					<h2
						className="syne"
						style={{
							fontSize: "clamp(28px,3.5vw,48px)",
							fontWeight: 800,
							letterSpacing: "-0.02em",
							marginBottom: 12,
						}}>
						Professional <span className="grad">Experience</span>
					</h2>
					{/* CHANGED: Intro paragraph now explicitly names the specific
					    technical domains in each role — primes the recruiter. */}
					<p
						style={{
							fontSize: 14,
							color: "var(--text-muted)",
							maxWidth: 600,
							lineHeight: 1.7,
							marginBottom: 48,
						}}>
						Three distinct professional layers: frontline tax dispute work at a
						national consulting firm (SP2DK, SKP, CIT/VAT/WHT proceedings) —
						risk-based audit practice in a government inspectorate — and finance
						leadership in a university programme. Each role built a capability
						that makes the next one stronger. Click any role for full technical
						detail.
					</p>
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
											open === i ? `rgba(124,111,255,0.05)` : "var(--surface)",
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
													fontWeight: 600,
													marginBottom: 8,
												}}>
												{exp.company}
											</p>
											<p
												style={{
													fontSize: 13,
													color: "var(--text-muted)",
													fontStyle: "italic",
												}}>
												{exp.highlight}
											</p>
										</div>
										<div
											style={{
												display: "flex",
												flexDirection: "column",
												gap: 8,
												flexShrink: 0,
											}}>
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
												}}>
												<ChevronDown
													size={14}
													style={{ color: "var(--text-muted)" }}
												/>
											</div>
										</div>
									</div>

									{/* Expanded preview */}
									{open === i && (
										<div
											style={{
												marginTop: 20,
												paddingTop: 20,
												borderTop: `1px solid ${exp.color}20`,
											}}>
											<p
												style={{
													fontSize: 14,
													lineHeight: 1.75,
													color: "var(--text-sub)",
													marginBottom: 16,
												}}>
												{exp.summary}
											</p>
											<ul
												style={{
													listStyle: "none",
													display: "flex",
													flexDirection: "column",
													gap: 8,
													marginBottom: 16,
												}}>
												{exp.points.slice(0, 2).map((pt, j) => (
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
											<button
												onClick={(e) => {
													e.stopPropagation();
													setModal(i);
												}}
												style={{
													background: `${exp.color}15`,
													border: `1px solid ${exp.color}40`,
													borderRadius: 8,
													padding: "8px 16px",
													cursor: "pointer",
													fontSize: 12,
													fontWeight: 600,
													color: exp.color,
													display: "flex",
													alignItems: "center",
													gap: 6,
													fontFamily: "'Syne', sans-serif",
													letterSpacing: "0.04em",
												}}>
												View Full Details <ArrowUpRight size={12} />
											</button>
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
// CHANGED: New "Research & Analysis" tab added as a dedicated group.
// Tab labels now reflect the upgraded group names.
// Active group descriptions are more specific and anchor on use-cases.

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
				<div className="reveal" style={{ marginBottom: 16 }}>
					<div className="section-label">Capabilities</div>
					<h2
						className="syne"
						style={{
							fontSize: "clamp(28px,3.5vw,48px)",
							fontWeight: 800,
							letterSpacing: "-0.02em",
							marginBottom: 12,
						}}>
						Skills &amp; <span className="grad">Expertise</span>
					</h2>
					{/* CHANGED: Intro copy now explicitly calls out that the research group
					    reflects real benchmarking work, not just theoretical knowledge. */}
					<p
						style={{
							fontSize: 14,
							color: "var(--text-muted)",
							maxWidth: 580,
							lineHeight: 1.7,
							marginBottom: 36,
						}}>
						Organized by working capability — not just alphabetical keywords.
						Each group represents real applied exposure. Note the Research &
						Analysis group: it reflects actual transfer pricing benchmarking
						work across 60+ companies in three countries.
					</p>
				</div>

				{/* Tab switcher */}
				<div
					className="reveal"
					style={{
						display: "flex",
						gap: 8,
						marginBottom: 32,
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
								display: "flex",
								alignItems: "center",
								gap: 8,
							}}>
							<span>{g.icon}</span>
							{g.label}
						</button>
					))}
				</div>

				{/* Active group */}
				<div
					className="reveal skill-group"
					style={{ borderColor: `${SKILLS_GROUPS[activeTab].color}25` }}>
					<p
						style={{
							fontSize: 14,
							color: "var(--text-muted)",
							marginBottom: 20,
							lineHeight: 1.65,
						}}>
						{SKILLS_GROUPS[activeTab].description}
					</p>
					<div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
						{SKILLS_GROUPS[activeTab].tags.map((tag, i) => (
							<span
								key={tag}
								className="stag"
								style={{
									animation: `revealUp 0.35s cubic-bezier(.22,1,.36,1) ${i * 0.04}s both`,
									borderColor: `${SKILLS_GROUPS[activeTab].color}30`,
								}}>
								{tag}
							</span>
						))}
					</div>
				</div>

				{/* Languages */}
				<div
					className="reveal"
					style={{
						marginTop: 32,
						display: "grid",
						gridTemplateColumns: "repeat(auto-fit, minmax(260px,1fr))",
						gap: 16,
					}}>
					{[
						{
							lang: "Bahasa Indonesia",
							level: "Native Speaker",
							flag: "🇮🇩",
							color: "#7C6FFF",
							note: "Professional & everyday fluency — primary working language",
						},
						{
							lang: "English",
							level: "C2 Proficient",
							flag: "🇬🇧",
							color: "#F0C96A",
							// CHANGED: Note updated to reflect actual use case (OECD guidelines,
							// international client correspondence) not just certification.
							note: "EF SET certified · Reads OECD guidelines · International client-ready",
						},
					].map(({ lang, level, flag, color, note }) => (
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
										marginBottom: 2,
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
										marginBottom: 3,
									}}>
									{level}
								</div>
								<div style={{ fontSize: 11, color: "var(--text-muted)" }}>
									{note}
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
// CHANGED: Education body copy now explicitly connects university curriculum
// to professional tax consulting practice (DGT-aligned, case-method, audit methodology).
// Achievement description made more contextually specific (national competition context).
// Academic highlights rewritten to reflect real consulting-adjacent outputs.

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
						gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
						gap: 24,
						alignItems: "start",
					}}>
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
						{/* CHANGED: Description now explicitly maps degree content to
						    consulting-applicable skills (DGT, audit methodology, tax law). */}
						<p
							style={{
								fontSize: 14,
								lineHeight: 1.85,
								color: "var(--text-sub)",
								marginBottom: 24,
							}}>
							Graduated from one of Indonesia's top-ranked public universities
							with a taxation concentration. Academic curriculum directly
							aligned with DGT professional standards — covering corporate and
							individual income tax law, VAT, audit methodology, cost
							accounting, and financial statement analysis. Built a strong
							technical foundation through case-based learning in corporate tax
							dispute and compliance scenarios.
						</p>
						<div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
							{[
								"Tax Law & Regulations",
								"Auditing & Assurance",
								"Corporate Finance",
								"Financial Statement Analysis",
								"Cost Accounting",
								"Business Reporting",
							].map((t) => (
								<span key={t} className="stag" style={{ fontSize: 12 }}>
									{t}
								</span>
							))}
						</div>
					</div>

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
									marginBottom: 6,
								}}>
								1st Place — Lomba Konten Medsos
							</h4>
							{/* CHANGED: Context added to explain significance (national competition,
							    IAI-level, financial content communication). */}
							<p
								style={{
									fontSize: 13,
									color: "var(--text-muted)",
									lineHeight: 1.65,
								}}>
								APA Fest 2021 · Ikatan Akuntan Indonesia · November 2021.
								National-level competition among accounting students, judged on
								clarity, accuracy, and professional quality of financial content
								communication — demonstrating technical knowledge beyond
								coursework.
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
								Academic Highlights
							</div>
							{/* CHANGED: Highlights rewritten to be consulting-outcome specific,
							    not generic bullet points about "being active." */}
							{[
								"Tax law curriculum directly aligned with DGT assessment and compliance standards — not just theoretical framework",
								"Case-method learning in corporate income tax, VAT dispute, and fiscal reconciliation scenarios",
								"Completed MBKM government audit internship (Inspektorat Kota Surabaya) as an embedded programme credit",
								"Active contributor to Himpunan Mahasiswa Akuntansi UNAIR (HMA) — event coordination and organizational finance",
								"Brevet AB certification pursued and completed concurrently with final-year studies",
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

// ─── Cert Detail Modal ─────────────────────────────────────────────────────
function CertModal({
	cert,
	onClose,
}: {
	cert: (typeof CERTS)[0];
	onClose: () => void;
}) {
	useEffect(() => {
		const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
		document.addEventListener("keydown", handler);
		return () => document.removeEventListener("keydown", handler);
	}, [onClose]);

	return (
		<div className="modal-overlay" onClick={onClose}>
			<div
				className="modal-box"
				style={{ maxWidth: 480 }}
				onClick={(e) => e.stopPropagation()}>
				<button
					onClick={onClose}
					style={{
						position: "absolute",
						top: 20,
						right: 20,
						background: "var(--surface)",
						border: "1px solid var(--border)",
						borderRadius: 8,
						padding: 8,
						cursor: "pointer",
						color: "var(--text)",
						display: "flex",
					}}>
					<X size={16} />
				</button>
				<div style={{ fontSize: 36, marginBottom: 16 }}>{cert.icon}</div>
				<div style={{ marginBottom: 8 }}>
					<span
						className="pill"
						style={{
							borderColor: "rgba(124,111,255,0.3)",
							background: "rgba(124,111,255,0.08)",
							color: "var(--accent)",
							fontSize: 10,
						}}>
						{cert.cat}
					</span>
				</div>
				<h3
					className="syne"
					style={{
						fontSize: 20,
						fontWeight: 800,
						color: "var(--text)",
						marginBottom: 16,
						lineHeight: 1.3,
					}}>
					{cert.name}
				</h3>
				<div
					style={{
						background: "rgba(124,111,255,0.06)",
						border: "1px solid rgba(124,111,255,0.15)",
						borderRadius: 12,
						padding: "16px 18px",
					}}>
					<div
						style={{
							fontSize: 11,
							fontWeight: 700,
							letterSpacing: "0.1em",
							textTransform: "uppercase",
							color: "var(--accent)",
							marginBottom: 8,
						}}>
						Why This Matters
					</div>
					<p
						style={{
							fontSize: 14,
							lineHeight: 1.75,
							color: "var(--text-sub)",
						}}>
						{cert.relevance}
					</p>
				</div>
			</div>
		</div>
	);
}

// ─── Certifications ───────────────────────────────────────────────────────
// CHANGED: Section intro now explains WHY the cert stack is unusually strong —
// specifically calling out the combination of national standard (Brevet AB) +
// international framework (World Bank/OECD) + Big 4 simulation (KPMG).
// Highlight row updated to surface the 4 highest-signal credentials.
// Filter categories unchanged (same structure, no UI change needed).

function Certifications() {
	const cats = [
		"All",
		"Core Tax",
		"International Tax",
		"Audit",
		"Technical",
		"Language",
	];
	const [active, setActive] = useState("All");
	const [selectedCert, setSelectedCert] = useState<(typeof CERTS)[0] | null>(
		null,
	);
	const filtered =
		active === "All" ? CERTS : CERTS.filter((c) => c.cat === active);

	return (
		<section
			id="certifications"
			className="section"
			style={{ background: "var(--bg2)" }}>
			{selectedCert && (
				<CertModal cert={selectedCert} onClose={() => setSelectedCert(null)} />
			)}
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
				<div className="reveal" style={{ marginBottom: 12 }}>
					<div className="section-label">Credentials</div>
					<h2
						className="syne"
						style={{
							fontSize: "clamp(28px,3.5vw,48px)",
							fontWeight: 800,
							letterSpacing: "-0.02em",
							marginBottom: 16,
						}}>
						Certifications &amp; <span className="grad">Training</span>
					</h2>
					{/* CHANGED: Intro paragraph now makes an explicit argument for WHY
					    this cert stack is unusually differentiated — not just "I have certs." */}
					<p
						style={{
							fontSize: 14,
							lineHeight: 1.75,
							color: "var(--text-sub)",
							maxWidth: 680,
							marginBottom: 12,
						}}>
						Most junior candidates hold one or two certifications. This
						credential stack spans Indonesia's national tax practitioner
						benchmark (Brevet AB), an internationally recognized OECD transfer
						pricing programme from the World Bank Group, Big Four audit
						methodology through KPMG simulation, advanced Excel for financial
						data processing, and C2-level English certification. Together they
						signal a candidate who has invested seriously in technical depth —
						not just academic exposure. Click any certification to understand
						its specific relevance to tax consulting practice.
					</p>
					{/* CHANGED: Highlight row now leads with the most credible signals
					    in recruiter-readable order. */}
					<div
						style={{
							display: "flex",
							flexWrap: "wrap",
							gap: 10,
							marginBottom: 28,
							paddingBottom: 24,
							borderBottom: "1px solid var(--border)",
						}}>
						{[
							{
								label: "Brevet AB",
								note: "Indonesia's gold-standard tax practitioner certification",
								icon: "🏛️",
							},
							{
								label: "World Bank — Transfer Pricing",
								note: "OECD framework · FAR analysis · arm's length principle",
								icon: "🌐",
							},
							{
								label: "KPMG Audit Simulation",
								note: "Big Four audit standards & working paper methodology",
								icon: "🏦",
							},
							{
								label: "C2 English (EF SET)",
								note: "Mastery-level · OECD guideline–ready · International client-facing",
								icon: "✨",
							},
						].map(({ label, note, icon }) => (
							<div
								key={label}
								style={{
									display: "flex",
									alignItems: "center",
									gap: 10,
									background: "rgba(124,111,255,0.07)",
									border: "1px solid rgba(124,111,255,0.2)",
									borderRadius: 10,
									padding: "10px 16px",
								}}>
								<span style={{ fontSize: 16 }}>{icon}</span>
								<div>
									<div
										className="syne"
										style={{
											fontSize: 12,
											fontWeight: 700,
											color: "var(--text)",
										}}>
										{label}
									</div>
									<div style={{ fontSize: 11, color: "var(--text-muted)" }}>
										{note}
									</div>
								</div>
							</div>
						))}
					</div>

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
							onClick={() => setSelectedCert(cert)}
							style={{
								animation: `revealUp .5s cubic-bezier(.22,1,.36,1) ${(i % 6) * 0.06}s both`,
								cursor: "pointer",
								borderColor: cert.highlight
									? "rgba(124,111,255,0.3)"
									: "var(--border)",
								background: cert.highlight
									? "rgba(124,111,255,0.05)"
									: "var(--surface)",
							}}>
							<span style={{ fontSize: 22, flexShrink: 0 }}>{cert.icon}</span>
							<div style={{ flex: 1 }}>
								<div
									style={{
										fontSize: 14,
										fontWeight: 500,
										color: "var(--text)",
										marginBottom: 3,
										lineHeight: 1.4,
									}}>
									{cert.name}
								</div>
								{cert.highlight && (
									<div
										style={{
											fontSize: 11,
											color: "var(--accent)",
											fontWeight: 600,
											letterSpacing: "0.04em",
										}}>
										Key credential ·
									</div>
								)}
							</div>
							<div
								style={{
									display: "flex",
									flexDirection: "column",
									alignItems: "flex-end",
									gap: 6,
									flexShrink: 0,
								}}>
								<span
									className="pill"
									style={{
										borderColor: "rgba(124,111,255,0.3)",
										background: "rgba(124,111,255,0.08)",
										color: "var(--accent)",
										fontSize: 10,
									}}>
									{cert.cat}
								</span>
								<span style={{ fontSize: 10, color: "var(--text-muted)" }}>
									tap for details <ArrowUpRight size={14} />
								</span>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}

// ─── Contact ──────────────────────────────────────────────────────────────
// CHANGED: Contact headline now names specific target roles at the technical level
// (Tax Dispute Consultant, Transfer Pricing Associate, Tax Compliance Specialist).
// Subtext updated to position as ready-to-contribute not just "seeking opportunities."

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
					{/* CHANGED: Headline now names specific role types at the technical level —
					    much stronger than generic "tax professional." */}
					<h2
						className="syne"
						style={{
							fontSize: "clamp(28px,3.5vw,56px)",
							fontWeight: 800,
							letterSpacing: "-0.02em",
							marginBottom: 16,
						}}>
						Open to Tax Dispute, Transfer Pricing
						<br />
						<span className="grad">&amp; Advisory Roles</span>
					</h2>
					{/* CHANGED: Subtext now signals immediate technical readiness
					    and names the specific role types she's targeting. */}
					<p
						style={{
							fontSize: 15,
							color: "var(--text-sub)",
							maxWidth: 520,
							margin: "0 auto",
							lineHeight: 1.75,
						}}>
						Actively seeking Tax Consultant, Tax Associate, Transfer Pricing
						Analyst, and Tax Compliance Specialist roles — full-time or
						contract. Brevet AB certified, Coretax-experienced, OECD TP trained,
						and C2 English. Available to contribute at a technical level from
						day one.
					</p>
				</div>

				<div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 32 }}>
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
								icon: <ExternalLink size={16} />,
								label: "LinkedIn",
								value: "linkedin.com/in/nadiamadarinas",
								href: "https://linkedin.com/in/nadiamadarinas",
							},
							{
								icon: <MapPin size={16} />,
								label: "Location",
								value: "Sidoarjo, East Java — open to Surabaya & remote roles",
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
				</div>
			</div>
		</section>
	);
}

// ─── Footer ───────────────────────────────────────────────────────────────
// CHANGED: Footer tagline updated to include Transfer Pricing alongside Tax Dispute
// to reinforce positioning across the full page.
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
					Nadia Madarina Said
				</span>
			</p>
			{/* CHANGED: Tagline now includes Transfer Pricing & Brevet AB — consistent
			    with the full-site positioning. */}
			<p style={{ fontSize: 12, color: "var(--text-muted)" }}>
				Sidoarjo, Indonesia · Tax Dispute & Transfer Pricing · Brevet AB · C2
				English
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
