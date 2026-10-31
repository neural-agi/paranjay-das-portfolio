import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Paranjay Das — AI/ML Engineer · Researcher · Builder",
  description: "Paranjay Das builds AI systems that are actually engineered. Exploring LLM applications, agentic systems, RAG, and AI security from Kolkata, India.",
  openGraph: { title: "Paranjay Das — AI/ML Engineer", description: "I build AI systems that are actually engineered.", type: "website", locale: "en_IN" },
  twitter: { card: "summary", title: "Paranjay Das — AI/ML Engineer", description: "I build AI systems that are actually engineered." },
};

export const viewport: Viewport = { themeColor: "#0c0d0d", colorScheme: "dark" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
