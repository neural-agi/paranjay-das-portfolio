import { certifications, education, projects, skillGroups } from "@/data/portfolio";
import { experience as sharedExperience } from "@/data/design-study";

export const profile = {
  name: "Paranjay Das",
  email: "paranjaydas2006@gmail.com",
  github: "https://github.com/neural-agi",
  linkedin: "https://linkedin.com/in/paranjay-das-10b167384",
};

export type ProjectStructure = {
  label: string;
  steps?: string[];
  groups?: { title: string; items: string[] }[];
};

export type TechnologyReference = {
  id: string;
  label: string;
  role: string;
};

export type TechnologyIndexEntry = TechnologyReference & {
  projects: { id: string; number: string; title: string; role: string }[];
  experience?: { label: string; role: string }[];
};

export const productionProjects = [
  {
    ...projects[0],
    id: "system-riscv" as const,
    kind: "Structured extraction",
    description: "Extracts structured architectural parameters from technical material.",
    buildNote: "I structured the extraction around identified parameters, a defined taxonomy, evidence-grounded outputs, and schema validation.",
    engineeringNote: "A parameter taxonomy and JSON Schema shape each extraction. Evidence stays attached to outputs for validation and reproducible parsing.",
    stack: ["Python", "LLMs", "JSON Schema"],
    technologies: [
      { id: "python", label: "Python", role: "Extraction tooling" },
      { id: "llms", label: "LLMs", role: "Schema-shaped extraction" },
      { id: "json-schema", label: "JSON Schema", role: "Checked output structure" },
      { id: "output-validation", label: "Output Validation", role: "Extraction validation" },
    ],
    repository: null,
    structure: {
      label: "Extraction and validation",
      steps: ["Technical material", "Parameter identification", "Taxonomy + JSON Schema", "Evidence-grounded output", "Validation + parsing"],
    },
  },
  {
    ...projects[1],
    id: "system-cartel" as const,
    kind: "Product identity and cost planning",
    description: "A grocery price intelligence and cart planning application. Its pipeline normalizes provider responses before observation and identity resolution.",
    buildNote: "I worked on the path from provider response to raw artifact, normalized observation, and canonical product or variant identity.",
    engineeringNote: "Provider data is recorded with provenance, normalized into retailer observations, then resolved against governed product and variant identities. Outcomes are exact match, mismatch, or unresolved.",
    stack: ["Python", "FastAPI", "Next.js", "PostgreSQL", "Redis"],
    technologies: [
      { id: "python", label: "Python", role: "Data and application services" },
      { id: "fastapi", label: "FastAPI", role: "Backend API" },
      { id: "nextjs", label: "Next.js", role: "Web application" },
      { id: "docker", label: "Docker", role: "Application stack" },
    ],
    repository: "https://github.com/neural-agi/Cartel-Smart-Cart-Optimizer",
    structure: {
      label: "Provider data to product identity",
      steps: ["Provider response", "Raw artifact + provenance", "Normalization", "Retailer observation", "Product / variant identity"],
    },
  },
  {
    ...projects[2],
    id: "system-qwen" as const,
    kind: "Local-first coding-agent framework",
    description: "An open-source, local-first framework for coding-agent workflows. The project is under active development.",
    buildNote: "I built out the framework's modular layers; the end-to-end Agent Core and execution integration are still being developed.",
    engineeringNote: "Documented components include planning, a model gateway, controlled tools, repository intelligence, recovery, and audit logs. Agent Core and execution integration remain in progress.",
    stack: ["Python", "Model gateway", "Repository intelligence", "Audit log"],
    technologies: [
      { id: "python", label: "Python", role: "Framework implementation" },
      { id: "llms", label: "LLMs", role: "Model gateway" },
    ],
    repository: "https://github.com/neural-agi/Qwen3-Coder-Next",
    structure: {
      label: "Documented framework components",
      groups: [
        { title: "Plan", items: ["Planning layer", "Model gateway", "Tool framework"] },
        { title: "Understand", items: ["Repository intelligence", "Code knowledge graph"] },
        { title: "Control", items: ["Workspace-bounded tools", "Artifact registry", "Append-only audit log"] },
        { title: "Recover", items: ["Failure recovery", "Checkpoint / rollback"] },
      ],
    },
  },
  {
    ...projects[3],
    id: "system-engage" as const,
    kind: "Workflow orchestration",
    description: "A Next.js dashboard backed by a FastAPI service. Runs pass to an orchestration pipeline for generation and execution tracking.",
    buildNote: "I connected the dashboard and API to an orchestration pipeline that separates generation work from execution records.",
    engineeringNote: "The REST API passes a run to a pipeline orchestrator, which coordinates feed scraping, opportunity ranking, response generation, and execution tracking.",
    stack: ["Next.js", "FastAPI", "Playwright", "PostgreSQL", "Redis"],
    technologies: [
      { id: "nextjs", label: "Next.js", role: "Dashboard" },
      { id: "fastapi", label: "FastAPI", role: "REST service" },
      { id: "docker", label: "Docker", role: "Full-stack runtime" },
      { id: "multi-agent", label: "Multi-Agent", role: "Engagement pipeline" },
    ],
    repository: "https://github.com/neural-agi/EngageAI",
    structure: {
      label: "Dashboard to execution record",
      steps: ["Next.js dashboard", "FastAPI REST API", "Pipeline orchestrator", "Generation + execution", "Result record"],
    },
  },
  {
    ...projects[4],
    id: "system-healthcare" as const,
    kind: "Healthcare document retrieval",
    description: "Retrieves relevant passages from healthcare documentation and displays their source context.",
    buildNote: "I built the normalization, chunking, embedding, and FAISS retrieval path, then deduplicated results by document ID.",
    engineeringNote: "Documents are normalized and split into overlapping chunks, embedded with all-MiniLM-L6-v2, and searched with FAISS inner-product top-k retrieval. Results are deduplicated by document ID; the demo stops at retrieved context.",
    stack: ["Python", "all-MiniLM-L6-v2", "FAISS", "Streamlit"],
    technologies: [
      { id: "python", label: "Python", role: "Retrieval pipeline" },
      { id: "rag", label: "RAG", role: "Documentation retrieval" },
      { id: "faiss", label: "FAISS", role: "Vector similarity search" },
    ],
    repository: "https://github.com/neural-agi/Healthcare-RAG",
    structure: {
      label: "Document retrieval path",
      steps: ["Normalize + chunk", "Embed documents", "FAISS top-k search", "Deduplicate by document", "Show source context"],
    },
  },
  {
    id: "system-aura" as const,
    number: "06",
    title: "Aura",
    kind: "Windows desktop control surface",
    description: "A Windows-native floating surface for clipboard history and quick system actions.",
    buildNote: "I built the clipboard history path around capture, retention, filtering, pinning, deletion, and restore operations.",
    engineeringNote: "An explicit intent-driven state machine keeps the UI derived from runtime state, while serialized clipboard work avoids blocking the UI thread. The project is under active development.",
    stack: ["C#", ".NET 9", "WinUI 3", "Windows App SDK"],
    technologies: [
      { id: "csharp", label: "C#", role: "Desktop application development" },
      { id: "dotnet", label: ".NET 9", role: "Application runtime" },
      { id: "winui", label: "WinUI 3", role: "Native Windows surface" },
    ],
    repository: "https://github.com/neural-agi/Aura",
    structure: {
      label: "Clipboard artifact path",
      steps: ["Clipboard listener", "Serialized capture worker", "Artifact manager", "State projection", "WinUI surface"],
    },
  },
  {
    id: "system-postmortem" as const,
    number: "07",
    title: "Agent Postmortem Generator",
    kind: "Evidence-backed trace analysis",
    description: "A Python CLI that turns generic JSON execution traces into structured postmortems and deterministic execution graphs.",
    buildNote: "I built trace validation, normalization, analysis, and Markdown, JSON, and Mermaid export paths around V1 and V2 trace contracts.",
    engineeringNote: "The pipeline keeps conclusions tied to recorded evidence: unknown outcomes stay unknown, and repeated inputs produce reproducible artifacts without an LLM or network call.",
    stack: ["Python", "JSON", "Mermaid", "uv"],
    technologies: [
      { id: "python", label: "Python", role: "Trace analysis CLI" },
    ],
    repository: "https://github.com/neural-agi/agent-postmortem-generator",
    structure: {
      label: "Trace to evidence-backed artifacts",
      steps: ["Generic JSON trace", "Parsing + validation", "Canonical trace + evidence", "Normalization + analysis", "Markdown / JSON / Mermaid"],
    },
  },
  {
    id: "system-raft-kv" as const,
    number: "08",
    title: "Raft KV",
    kind: "Distributed key-value store",
    description: "A Go-based Raft key-value store focused on consensus, persistence, recovery, and failure behavior.",
    buildNote: "I implemented the replicated log and deterministic key-value state machine around leader proposals, majority commitment, and ordered application.",
    engineeringNote: "Persistent Raft state, restart recovery, deterministic fault injection, and correctness-oriented tests make appended, committed, applied, and completed states explicit.",
    stack: ["Go", "Raft", "Docker"],
    technologies: [
      { id: "go", label: "Go", role: "Distributed store implementation" },
      { id: "raft", label: "Raft / KV State", role: "Consensus and deterministic command application" },
      { id: "docker", label: "Docker", role: "Cluster workflow" },
    ],
    repository: "https://github.com/neural-agi/raft-kv",
    structure: {
      label: "Consensus and application path",
      steps: ["Client proposal", "Raft leader", "Replicated log", "Majority commit", "KV state machine"],
    },
  },
];

const experienceTechnologyReferences: TechnologyReference[] = [
  { id: "prompt-injection", label: "Prompt Injection", role: "Detection" },
  { id: "output-validation", label: "Output Validation", role: "Validation for reliability" },
  { id: "pseudonymization", label: "Pseudonymization", role: "Sensitive-data handling" },
];

export function buildTechnologyIndex(projects: typeof productionProjects): TechnologyIndexEntry[] {
  const index = new Map<string, TechnologyIndexEntry>();
  for (const project of projects) {
    for (const technology of project.technologies ?? []) {
      const entry = index.get(technology.id) ?? { ...technology, projects: [] };
      entry.projects.push({ id: project.id, number: project.number, title: project.title, role: technology.role });
      index.set(technology.id, entry);
    }
  }
  for (const technology of experienceTechnologyReferences) {
    const entry = index.get(technology.id) ?? { ...technology, projects: [] };
    entry.experience = [...(entry.experience ?? []), { label: "Foretyx", role: technology.role }];
    index.set(technology.id, entry);
  }
  return [...index.values()];
}

export const technologyIndex = buildTechnologyIndex(productionProjects);
const keyboardTechnologyIds = ["python", "csharp", "dotnet", "go", "llms", "rag", "faiss", "raft", "fastapi", "nextjs", "docker", "json-schema", "multi-agent", "prompt-injection", "output-validation", "winui", "pseudonymization"];

export const technologyKeys = keyboardTechnologyIds
  .map((id) => technologyIndex.find((technology) => technology.id === id))
  .filter((technology): technology is TechnologyIndexEntry => Boolean(technology));

export const experience = {
  ...sharedExperience,
  description: "Co-founder and AI/ML researcher at Foretyx. Work includes prompt-injection detection, filtering unsafe outputs, protecting against sensitive-data leakage, pseudonymization, and validation for reliability. The detection work covers Hindi, Hinglish, and English, alongside low-latency model and integration logic.",
  workAreas: [
    { title: "Detection", detail: "Prompt injection and multilingual attack detection" },
    { title: "Language coverage", detail: "Hindi / Hinglish / English" },
    { title: "Output handling", detail: "Unsafe output filtering, sensitive-data protection, pseudonymization" },
    { title: "Integration", detail: "Low-latency model logic and validation for reliability" },
  ],
};

export { certifications, education, skillGroups };
