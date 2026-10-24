import type { Metadata, Viewport } from "next";
import ProductionHomepage from "@/components/production/homepage";

export const metadata: Metadata = {
  title: "Paranjay Das — AI/ML Engineering",
  description: "Selected AI/ML systems by Paranjay Das, focused on retrieval, structured extraction, workflow orchestration, validation, and security.",
  openGraph: {
    title: "Paranjay Das — AI/ML Engineering",
    description: "I build AI systems that are actually engineered.",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary",
    title: "Paranjay Das — AI/ML Engineering",
    description: "I build AI systems that are actually engineered.",
  },
};

export const viewport: Viewport = { themeColor: "#f3efe5", colorScheme: "light" };

export default function Home() {
  return <ProductionHomepage />;
}
