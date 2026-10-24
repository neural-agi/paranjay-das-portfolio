"use client";

import { useEffect, useState } from "react";
import { studyProjects } from "@/data/design-study";
import styles from "@/app/production.module.css";

export function ProjectIndex() {
  const [active, setActive] = useState(studyProjects[0]?.id ?? "");

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const targets = studyProjects
      .map((project) => document.getElementById(project.id))
      .filter((target): target is HTMLElement => target !== null);
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((left, right) => left.boundingClientRect.top - right.boundingClientRect.top);
      if (visible[0]) setActive(visible[0].target.id);
    }, { rootMargin: "-22% 0px -62% 0px", threshold: 0 });
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  return (
    <nav className={styles.projectIndex} aria-label="Selected systems">
      {studyProjects.map((project) => (
        <a key={project.id} href={`#${project.id}`} aria-current={active === project.id ? "location" : undefined}>
          <span>{project.number}</span>{project.title}
        </a>
      ))}
    </nav>
  );
}
