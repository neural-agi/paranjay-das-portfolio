export const projects = [
  {
    number: "01",
    title: "RISC-V Architectural Parameter Extraction",
    kind: "Structured extraction",
    description: "Extracts architectural parameters with schema-driven prompts, a defined parameter taxonomy, and evidence-grounded outputs.",
    engineeringNoteLabel: "Output shape",
    engineeringNote: "Schema validation and evidence grounding keep extracted values tied to source material and a defined output shape.",
    stack: ["Python", "LLMs", "JSON Schema"],
  },
  {
    number: "02",
    title: "Cartel Smart Cart Optimizer",
    kind: "Deterministic data pipeline",
    description: "A product-intelligence pipeline for price tracking, cleaning, and normalization.",
    engineeringNoteLabel: "Data trace",
    engineeringNote: "Audit trails and governance checks make the pipeline’s data handling explicit.",
    stack: ["Python", "Data pipelines", "Validation"],
    href: "https://github.com/neural-agi/Cartel-Smart-Cart-Optimizer",
  },
  {
    number: "03",
    title: "Qwen3-Coder-Next",
    kind: "Local-first coding agent",
    description: "An open-source coding-agent framework built around modular architecture and reusable workflows.",
    engineeringNoteLabel: "Workflow design",
    engineeringNote: "The focus is extensible, maintainable orchestration with testing as part of the framework.",
    stack: ["Python", "Agentic workflows", "Testing"],
    href: "https://github.com/neural-agi/Qwen3-Coder-Next",
  },
  {
    number: "04",
    title: "EngageAI",
    kind: "Workflow orchestration",
    description: "A multi-agent system for automated workflow generation and execution monitoring.",
    engineeringNoteLabel: "Application split",
    engineeringNote: "The application separates FastAPI backend responsibilities from the Next.js interface.",
    stack: ["FastAPI", "Next.js", "Multi-agent systems"],
    href: "https://github.com/neural-agi/EngageAI",
  },
  {
    number: "05",
    title: "Healthcare Documentation Retrieval System",
    kind: "Retrieval-augmented generation",
    description: "A documentation retrieval system using normalization, chunking, embeddings, and FAISS.",
    engineeringNoteLabel: "Retrieval check",
    engineeringNote: "Retrieval validation supports responses grounded in the indexed documentation.",
    stack: ["Python", "FAISS", "RAG"],
  },
];

export const skillGroups = [
  { name: "Languages", items: ["Python", "C++", "SQL", "JavaScript"] },
  { name: "AI / ML", items: ["LLMs", "Prompt Engineering", "RAG", "Information Extraction", "Multi-Agent Systems", "Prompt Injection Detection", "JSON Schema Validation"] },
  { name: "Application / infrastructure", items: ["FastAPI", "Next.js", "REST APIs", "Docker", "Linux", "Git", "Google Cloud Functions", "API Gateway"] },
  { name: "Data / retrieval", items: ["Pandas", "NumPy", "scikit-learn", "FAISS"] },
];

export const education = [
  { title: "Netaji Subhash Engineering College", subtitle: "B.Tech in Computer Science & Engineering (AI & ML)", date: "Sep 2025 — Present" },
  { title: "Future Campus School", subtitle: "Higher Secondary Education · PCM + Computer Science", date: "2023 — 2024" },
];

export const certifications = [
  "Kaggle · Intermediate Machine Learning",
  "Google Cloud · API Gateway and Cloud Functions Associate",
];
