"use client";

import React from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
  useModal,
} from "../ui/animated-modal";
import SmoothScroll from "../smooth-scroll";
import projects, { type Project } from "@/data/projects";
import { SectionHeader } from "./section-header";
import SectionWrapper from "../ui/section-wrapper";

const ProjectsSection = () => {
  return (
    <SectionWrapper id="projects" className="mx-auto max-w-7xl md:min-h-[130vh]">
      <SectionHeader id="projects" title="Projects" />
      <div className="grid grid-cols-1 md:grid-cols-3">
        {projects.map((project) => <ProjectModal key={project.number} project={project} />)}
      </div>
    </SectionWrapper>
  );
};

const ProjectModal = ({ project }: { project: Project }) => (
  <article id={`project-${project.id}`} className="flex scroll-mt-24 items-center justify-center">
    <Modal>
      <ModalTrigger className="group/modal-btn flex min-h-11 w-full justify-center bg-transparent">
        <div className="relative flex aspect-[3/2] w-[min(400px,90vw)] flex-col justify-between overflow-hidden rounded-lg border border-white/10 bg-neutral-950 p-6 text-left text-white transition-colors hover:border-white/30">
          <span className="font-mono text-sm text-white/60">{project.number}</span>
          <div>
            <div className="mb-3 text-xs text-white/70">{project.category}</div>
            <ProjectArtifact project={project} />
            <h3 className="text-lg leading-tight">{project.title}</h3>
          </div>
        </div>
      </ModalTrigger>
      <ModalBody ariaLabel={`${project.title} project details`} className="overflow-auto md:max-h-[80%] md:max-w-4xl">
        <SmoothScroll isInsideModal>
          <ModalContent>
            <ProjectContents project={project} />
          </ModalContent>
        </SmoothScroll>
        <ProjectModalFooter project={project} />
      </ModalBody>
    </Modal>
  </article>
);

function ProjectArtifact({ project }: { project: Project }) {
  const structure = project.structure;
  if (!structure) {
    return <p className="mb-4 max-w-[28ch] text-xs leading-relaxed text-white/55">Project details are available in the full view.</p>;
  }

  const labels = structure.steps?.slice(0, 5) ?? structure.groups?.map((group) => group.title).slice(0, 4) ?? [];
  return (
    <div aria-label={`${project.title} documented flow`} className="mb-5 border-y border-white/10 py-3">
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[10px] uppercase tracking-[0.08em] text-white/65">
        {labels.map((label, index) => (
          <React.Fragment key={label}>
            <span>{label}</span>
            {index < labels.length - 1 && <span aria-hidden="true" className="text-white/35">→</span>}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

const ProjectContents = ({ project }: { project: Project }) => (
  <div className="space-y-6">
    <header className="space-y-2 pr-8">
      <p className="text-xs font-medium uppercase tracking-wide text-neutral-500 dark:text-neutral-400">{project.category}</p>
      <h2 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 md:text-3xl">{project.title}</h2>
    </header>
    {project.content}
    {project.stack.length > 0 && (
      <section aria-labelledby={`stack-${project.id}`} className="border-t border-neutral-200 pt-5 dark:border-neutral-800">
        <h3 id={`stack-${project.id}`} className="mb-3 text-xs font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">Stack and methods</h3>
        <ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-neutral-700 dark:text-neutral-200">
          {project.stack.map((technology) => <li key={technology}>{technology}</li>)}
        </ul>
      </section>
    )}
  </div>
);

const ProjectModalFooter = ({ project }: { project: Project }) => {
  const { setOpen } = useModal();

  return (
    <ModalFooter className="flex-wrap gap-3">
      <button
        type="button"
        onClick={() => setOpen(false)}
        className="min-h-11 rounded-md border border-gray-300 bg-gray-200 px-4 text-sm text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:border-neutral-700 dark:bg-neutral-900 dark:text-white"
      >
        Close
      </button>
      {project.repository && (
        <a aria-label={`Open ${project.title} repository on GitHub`} className="inline-flex min-h-11 items-center rounded-md border border-black bg-black px-4 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:border-white dark:bg-white dark:text-black" href={project.repository} target="_blank" rel="noreferrer">
          Open repository
        </a>
      )}
      {project.profileLink && (
        <a className="inline-flex min-h-11 items-center rounded-md border border-black bg-black px-4 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:border-white dark:bg-white dark:text-black" href="https://github.com/neural-agi" target="_blank" rel="noreferrer">
          GitHub profile
        </a>
      )}
      {project.repositoryStatus === "unavailable" && (
        <span className="px-1 text-sm text-neutral-500 dark:text-neutral-400">Public repository link unavailable</span>
      )}
    </ModalFooter>
  );
};

export default ProjectsSection;
