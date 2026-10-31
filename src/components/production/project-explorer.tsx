"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { ArrowUpRight } from "lucide-react";
import { profile, productionProjects } from "@/data/production";
import { ProjectStructure } from "@/components/production/project-structure";
import styles from "@/app/production.module.css";

export function ProjectExplorer() {
  const [activeId, setActiveId] = useState<string>(productionProjects[0].id);
  const [compactTabs, setCompactTabs] = useState(false);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const writeHashOnSelection = useRef(false);
  const activeIndex = Math.max(0, productionProjects.findIndex((project) => project.id === activeId));
  const activeProject = productionProjects[activeIndex];

  useEffect(() => {
    const syncFromHash = () => {
      const project = productionProjects.find((item) => item.id === window.location.hash.slice(1));
      if (project) setActiveId(project.id);
    };
    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    window.addEventListener("popstate", syncFromHash);
    return () => {
      window.removeEventListener("hashchange", syncFromHash);
      window.removeEventListener("popstate", syncFromHash);
    };
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 820px)");
    const updateOrientation = () => setCompactTabs(media.matches);
    updateOrientation();
    media.addEventListener("change", updateOrientation);
    return () => media.removeEventListener("change", updateOrientation);
  }, []);

  useEffect(() => {
    if (!writeHashOnSelection.current) return;
    writeHashOnSelection.current = false;
    const project = productionProjects.find((item) => item.id === activeId);
    if (project && window.location.hash !== `#${project.id}`) window.location.hash = project.id;
  }, [activeId]);

  const selectProject = (index: number, focusTab = false) => {
    const project = productionProjects[index];
    writeHashOnSelection.current = true;
    setActiveId(project.id);
    if (focusTab) tabRefs.current[index]?.focus();
  };

  const handleTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex: number | undefined;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") nextIndex = (index + 1) % productionProjects.length;
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") nextIndex = (index - 1 + productionProjects.length) % productionProjects.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = productionProjects.length - 1;
    if (nextIndex !== undefined) {
      event.preventDefault();
      selectProject(nextIndex, true);
    }
  };

  return (
    <div className={styles.projectExplorer}>
      <div className={styles.projectSelector} role="tablist" aria-label="Featured systems" aria-orientation={compactTabs ? "horizontal" : "vertical"}>
        {productionProjects.map((project, index) => (
          <button
            aria-controls="system-details"
            aria-selected={activeProject.id === project.id}
            aria-label={`${project.number}: ${project.title}`}
            className={styles.projectTab}
            id={project.id}
            key={project.id}
            onClick={() => selectProject(index)}
            onKeyDown={(event) => handleTabKeyDown(event, index)}
            ref={(element) => { tabRefs.current[index] = element; }}
            role="tab"
            tabIndex={activeProject.id === project.id ? 0 : -1}
            type="button"
          >
            <span className={styles.projectTabNumber}>{project.number}</span>
            <span className={styles.projectTabName}>{project.title}</span>
          </button>
        ))}
      </div>

      <article
        aria-labelledby={activeProject.id}
        className={styles.projectDetail}
        id="system-details"
        aria-live="polite"
        role="tabpanel"
        tabIndex={0}
      >
        <div className={styles.projectDetailHeader}>
          <div>
            <p className={styles.projectKind}>{activeProject.kind}</p>
            <h3>{activeProject.title}</h3>
          </div>
          <span className={styles.detailNumber} aria-hidden="true">{activeProject.number}</span>
        </div>
        <div className={styles.projectCopyBlock}>
          <p className={styles.projectFieldLabel}>What it is</p>
          <p className={styles.projectDescription}>{activeProject.description}</p>
        </div>
        <div className={styles.projectCopyBlock}>
          <p className={styles.projectFieldLabel}>What I built</p>
          <p className={styles.projectBuild}>{activeProject.buildNote}</p>
        </div>
        <div className={styles.projectCopyBlock}>
          <p className={styles.projectFieldLabel}>Technical detail</p>
          <p className={styles.projectEngineering}>{activeProject.engineeringNote}</p>
        </div>
        <p className={styles.projectStack}><span>Stack</span>{activeProject.stack.join(" · ")}</p>
        <ProjectStructure structure={activeProject.structure} projectId={activeProject.id} />
        <div className={styles.projectDetailFooter}>
          {activeProject.repository ? (
            <a href={activeProject.repository} target="_blank" rel="noreferrer">
              View {activeProject.title} repository <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          ) : (
            <a href={profile.github} target="_blank" rel="noreferrer">
              GitHub profile <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          )}
        </div>
      </article>
    </div>
  );
}
