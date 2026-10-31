import type { ReactNode } from "react";
import { productionProjects } from "./production";

export type Project = {
  id: string;
  number: string;
  title: string;
  category: string;
  description: string;
  buildNote?: string;
  engineeringNote?: string;
  stack: string[];
  repository: string | null;
  repositoryStatus?: "unavailable";
  profileLink?: boolean;
  structure?: {
    label: string;
    steps?: string[];
    groups?: { title: string; items: string[] }[];
  } | null;
  content: ReactNode;
};

export const projects: Project[] = productionProjects.map((project) => ({
  id: project.id,
  number: project.number,
  title: project.title,
  category: project.kind,
  description: project.description,
  buildNote: "buildNote" in project ? project.buildNote : undefined,
  engineeringNote: "engineeringNote" in project ? project.engineeringNote : undefined,
  stack: project.stack,
  repository: project.repository,
  repositoryStatus: "repositoryStatus" in project ? project.repositoryStatus : undefined,
  profileLink: project.id === "system-riscv",
  structure: "structure" in project ? project.structure ?? null : null,
  content: (
    <article className="space-y-7 text-neutral-600 dark:text-neutral-300">
      <p className="max-w-3xl text-base leading-relaxed">{project.description}</p>

      {project.buildNote && (
        <section aria-labelledby={`${project.id}-built`}>
          <h3 id={`${project.id}-built`} className="mb-2 text-xs font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
            What I built
          </h3>
          <p className="leading-relaxed">{project.buildNote}</p>
        </section>
      )}

      {project.engineeringNote && (
        <section aria-labelledby={`${project.id}-detail`}>
          <h3 id={`${project.id}-detail`} className="mb-2 text-xs font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
            Technical detail
          </h3>
          <p className="leading-relaxed">{project.engineeringNote}</p>
        </section>
      )}

      {project.structure && <ProjectStructure projectId={project.id} structure={project.structure} />}
    </article>
  ),
}));

function ProjectStructure({ projectId, structure }: { projectId: string; structure: NonNullable<Project["structure"]> }) {
  return (
    <figure aria-labelledby={`${projectId}-structure`} className="border-t border-neutral-200 pt-5 dark:border-neutral-800">
      <figcaption id={`${projectId}-structure`} className="mb-4 text-sm font-medium text-neutral-800 dark:text-neutral-100">
        {structure.label}
      </figcaption>
      {structure.steps && (
        <ol className="space-y-0">
          {structure.steps.map((step, index) => (
            <li key={step} className="flex min-h-11 items-start gap-3 border-l border-neutral-300 py-2 pl-4 dark:border-neutral-700">
              <span aria-hidden="true" className="-ml-[21px] mt-1.5 h-2 w-2 shrink-0 rounded-full bg-neutral-500 dark:bg-neutral-400" />
              <span className="text-sm leading-relaxed">{step}</span>
              <span className="sr-only">Step {index + 1}.</span>
            </li>
          ))}
        </ol>
      )}
      {structure.groups && (
        <div className="grid gap-x-6 gap-y-4 sm:grid-cols-2">
          {structure.groups.map((group) => (
            <section key={group.title} className="border-t border-neutral-200 pt-3 dark:border-neutral-800">
              <h4 className="mb-2 text-sm font-semibold text-neutral-800 dark:text-neutral-100">{group.title}</h4>
              <ul className="space-y-1 text-sm leading-relaxed">
                {group.items.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </section>
          ))}
        </div>
      )}
    </figure>
  );
}

export default projects;
