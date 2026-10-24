import { certifications, education, projects, skillGroups } from "@/data/portfolio";

export const profile = {
  name: "Paranjay Das",
  role: "AI / ML engineering student and builder",
  statement: "I build AI systems that are actually engineered.",
  email: "paranjaydas2006@gmail.com",
  github: "https://github.com/neural-agi",
  linkedin: "https://linkedin.com/in/paranjay-das-10b167384",
};

export const studyProjects = projects.map((project, index) => {
  const specific = [
    {
      theme: "Structured extraction",
      description: "Extracts architectural parameters through schema-driven prompts, a defined parameter taxonomy, and evidence-grounded outputs.",
      note: "The supplied project details emphasize a defined output shape, evidence grounding, JSON Schema validation, and reproducible parsing.",
      visualKind: "extraction",
      visualLabel: "Conceptual illustration · based on supplied project details",
      steps: ["Source material", "Parameter taxonomy", "Evidence-grounded extraction", "Schema validation", "Reproducible parse"],
    },
    {
      theme: "Product identity & evidence",
      description: "Cartel tracks retailer listings and turns provider data into normalized observations for product identity checks and deterministic grocery planning.",
      note: "The repository documents provenance-preserving normalization and explicit EXACT_MATCH, MISMATCH, and UNRESOLVED outcomes. Listing prices are not presented as verified checkout totals.",
      visualKind: "identity",
      visualLabel: "Documented product-identity flow · Cartel README",
      steps: ["Provider response", "Raw artifact + provenance", "Parse & normalize", "Observation registry", "Exact match / mismatch / unresolved"],
    },
    {
      theme: "Local-first coding agent",
      description: "An open-source framework for repository assistance, built from modular, testable components and local tooling.",
      note: "The README documents planning, workspace-bounded tooling, audit logs, artifact provenance, failure recovery, and repository intelligence. Agent Core and end-to-end execution remain in progress.",
      visualKind: "qwen",
      visualLabel: "Documented components · current integration status retained",
      steps: ["Planning", "Local tooling", "Audit + artifacts", "Failure recovery", "Repository intelligence", "Agent Core: in progress"],
    },
    {
      theme: "Multi-agent workflow orchestration",
      description: "A full-stack application that generates workflows and monitors their execution through a multi-agent pipeline.",
      note: "The repository describes a Next.js frontend communicating with a FastAPI backend, then a pipeline orchestrator coordinating scraping, AI generation, and execution tracking.",
      visualKind: "engage",
      visualLabel: "Documented application structure · EngageAI README",
      steps: ["Next.js interface", "REST API", "FastAPI backend", "Pipeline orchestrator", "Scraper / AI generation / execution tracker"],
    },
    {
      theme: "Grounded document retrieval",
      description: "A healthcare-documentation retrieval system using normalized text, chunking, embeddings, and FAISS.",
      note: "The supplied details include retrieval validation to support grounded responses. No repository URL or further system documentation was supplied.",
      visualKind: "retrieval",
      visualLabel: "Conceptual illustration · based on supplied project details",
      steps: ["Documentation", "Normalize + chunk", "Embeddings", "FAISS retrieval", "Validate retrieved context", "Grounded response"],
    },
  ][index];

  return { ...project, ...specific, id: `system-${index + 1}`, repository: project.href };
});

export { certifications, education, skillGroups };

export const experience = {
  organization: "Foretyx",
  role: "Co-Founder — AI/ML Researcher",
  period: "Apr 2026 — Present",
  description: "Work includes prompt injection detection, unsafe output filtering, sensitive data leakage protection, and multilingual attack detection for Hindi, Hinglish, and English. Related work includes pseudonymization, low-latency model and integration logic, and validation for reliability.",
  highlights: [
    { label: "Detection", detail: "Prompt injection, unsafe output, and sensitive data leakage." },
    { label: "Languages", detail: "Attack detection for Hindi, Hinglish, and English." },
    { label: "Handling", detail: "Pseudonymization and low-latency model / integration logic." },
    { label: "Reliability", detail: "Validation for reliability." },
  ],
};
