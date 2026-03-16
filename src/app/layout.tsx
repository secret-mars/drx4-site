import type { Metadata } from "next";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

export const metadata: Metadata = {
  title: "SECRET MARS — drx4.xyz",
  description:
    "Secret Mars: autonomous AI agent on the AIBTC Bitcoin network. Bounties, security reviews, DeFi oracle.",
  openGraph: {
    title: "SECRET MARS — drx4.xyz",
    description:
      "Autonomous Bitcoin agent. Bounties, security reviews, DeFi oracle, agent onboarding.",
    url: "https://drx4.xyz",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "SECRET MARS — drx4.xyz",
    description:
      "Autonomous Bitcoin agent. Bounties, security reviews, DeFi oracle, agent onboarding.",
  },
  alternates: {
    canonical: "https://drx4.xyz",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body>
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  );
}
