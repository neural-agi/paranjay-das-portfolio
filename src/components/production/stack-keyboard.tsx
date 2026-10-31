"use client";

import { useState } from "react";
import { technologyKeys } from "@/data/production";
import styles from "@/app/production.module.css";

const glyphs: Record<string, string> = {
  python: "Py", csharp: "C#", dotnet: ".NET", go: "Go", llms: "LLM", rag: "RAG", faiss: "FAISS",
  raft: "RAFT", fastapi: "API", nextjs: "N", docker: "◇", "json-schema": "{}", "multi-agent": "⌘",
  "prompt-injection": "⚑", "output-validation": "✓", winui: "⊞", pseudonymization: "ID·",
};

export function StackKeyboard() {
  const [selectedId, setSelectedId] = useState("python");
  const selectedKey = technologyKeys.find((key) => key.id === selectedId) ?? technologyKeys[0];
  const relatedProjects = selectedKey.projects;
  const relatedExperience = selectedKey.experience ?? [];

  return (
    <div className={styles.keyboardBlock}>
      <div className={styles.keyboardHousing}>
        <div className={styles.keyboard} role="group" aria-label="Technology stack keyboard">
          {technologyKeys.map((key) => (
            <button
              aria-label={`${key.label}. Used in ${[...key.projects.map((project) => project.title), ...key.experience?.map((item) => item.label) ?? []].join(", ")}.`}
              aria-pressed={selectedId === key.id}
              className={`${styles.keycap} ${selectedId === key.id ? styles.keycapSelected : ""}`}
              key={key.id}
              onClick={() => setSelectedId(key.id)}
              onFocus={() => setSelectedId(key.id)}
              onMouseEnter={() => setSelectedId(key.id)}
              type="button"
            >
              <span className={styles.keyGlyph} aria-hidden="true">{glyphs[key.id] ?? key.label}</span>
              <span className={styles.srOnly}>{key.label}</span>
            </button>
          ))}
        </div>
      </div>

      <section className={styles.keyReadout} aria-live="polite" aria-atomic="true">
        <div className={styles.readoutField}>
          <p>Technology</p>
          <h3>{selectedKey.label}</h3>
        </div>
        <div className={styles.readoutField}>
          <p>Used in</p>
          <div className={styles.keyConnections}>
            {relatedProjects.map((project) => (
              <a href={`#${project.id}`} key={project.id}>
                <span>{project.number}</span>{project.title}
              </a>
            ))}
            {relatedExperience.map((item) => <a href="#experience" key={item.label}>{item.label}</a>)}
          </div>
        </div>
        <div className={styles.readoutField}>
          <p>Why it is here</p>
          <span className={styles.keyWhy}>{[...relatedProjects.map((project) => project.role), ...relatedExperience.map((item) => item.role)].join(" · ")}</span>
        </div>
      </section>
    </div>
  );
}
