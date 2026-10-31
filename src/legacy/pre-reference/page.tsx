import type { Metadata, Viewport } from "next";
import ReferenceHomepage from "@/components/reference-homepage";

export const metadata: Metadata = {
  title: "Paranjay Das — AI / ML Systems",
  description: "AI/ML engineering work by Paranjay Das: local-first coding tools, document retrieval, structured extraction, workflow orchestration, and model security.",
  openGraph: {
    title: "Paranjay Das — AI / ML Systems",
    description: "Explore Paranjay Das's work in retrieval, structured extraction, workflow orchestration, coding-agent infrastructure, and model security.",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Paranjay Das — AI/ML Engineering",
    description: "AI/ML engineering work in retrieval, structured extraction, orchestration, and model security.",
  },
};

export const viewport: Viewport = { themeColor: "#171c1b", colorScheme: "dark" };

export default function Home() {
  return <ReferenceHomepage />;
}
