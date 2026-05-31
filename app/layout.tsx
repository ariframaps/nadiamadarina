import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
	title: "Nadia Madarina Said — Tax Consultant & Accounting Professional",
	description:
		"Portfolio of Nadia Madarina Said | Accounting graduate with expertise in tax consulting, documentation, and client coordination. Based in Sidoarjo, Indonesia.",
	keywords: [
		"tax consultant",
		"accounting",
		"Indonesia",
		"Universitas Airlangga",
		"Nadia Madarina",
	],
	openGraph: {
		title: "Nadia Madarina Said | Tax",
		description: "Accounting Graduate with Tax Consulting Experience",
		type: "website",
		images: ["/og-image.webp"],
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className="h-full">
			<head>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link
					rel="preconnect"
					href="https://fonts.gstatic.com"
					crossOrigin="anonymous"
				/>
			</head>
			<body className="min-h-full noise-bg">{children}</body>
		</html>
	);
}
