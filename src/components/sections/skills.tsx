"use client";

import SectionWrapper from "../ui/section-wrapper";
import { SectionHeader } from "./section-header";
import { technologyIndex } from "@/data/production";
import { useTechnologySelection } from "@/contexts/technology-selection";

const SkillsSection = () => {
  const { selectedTechnology, selectTechnology } = useTechnologySelection();

  return (
    <SectionWrapper id="skills" className="w-full min-h-screen md:min-h-[150dvh] py-16 pointer-events-none">
      <SectionHeader
        id="skills"
        title="Technology"
        desc="Select a technology to see where it appears in my work."
        className="top-[70px] sticky mb-12"
      />

      <div className="pointer-events-auto mx-auto grid w-full max-w-6xl gap-8 px-4 md:px-8 lg:grid-cols-[1.1fr_0.9fr]">
        <section aria-labelledby="technology-index-heading">
          <h3 id="technology-index-heading" className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Technology index
          </h3>
          <ul className="grid grid-cols-2 gap-x-5">
            {technologyIndex.map((technology) => {
              const isSelected = selectedTechnology?.id === technology.id;
              return (
                <li key={technology.id} className="border-b border-border/70">
                  <button
                    type="button"
                    aria-pressed={isSelected}
                    aria-controls="technology-details"
                    onClick={() => selectTechnology(technology.id)}
                    className={`min-h-11 w-full py-2 text-left text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background ${isSelected ? "font-semibold text-primary" : "text-foreground hover:text-primary"}`}
                  >
                    {technology.label}
                    {isSelected && <span className="sr-only">, selected</span>}
                  </button>
                </li>
              );
            })}
          </ul>
        </section>

        <section
          id="technology-details"
          aria-live="polite"
          aria-atomic="true"
          aria-labelledby="technology-details-heading"
          className="min-h-56 border-t border-border pt-5 lg:sticky lg:top-28 lg:self-start"
        >
          {selectedTechnology ? (
            <>
              <p className="text-sm text-muted-foreground">Selected technology</p>
              <h3 id="technology-details-heading" className="mt-1 text-2xl font-semibold tracking-tight">
                {selectedTechnology.label}
              </h3>
              {selectedTechnology.projects.length === 0 && !selectedTechnology.experience?.length && (
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{selectedTechnology.role}</p>
              )}

              <div className="mt-6">
                <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Used in projects</h4>
                {selectedTechnology.projects.length > 0 ? (
                  <ul className="mt-2 space-y-2">
                    {selectedTechnology.projects.map((project) => (
                      <li key={project.id}>
                        <a className="inline-flex min-h-11 items-center gap-2 text-sm hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" href={`#project-${project.id}`}>
                          <span className="font-mono text-xs text-muted-foreground">{project.number}</span>
                          <span>{project.title}<span className="ml-2 text-xs text-muted-foreground">— {project.role}</span></span>
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-2 text-sm text-muted-foreground">No project relationship is recorded in the portfolio data.</p>
                )}
              </div>

              {selectedTechnology.experience && selectedTechnology.experience.length > 0 && (
                <div className="mt-5">
                  <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Experience</h4>
                  <ul className="mt-2 space-y-2">
                    {selectedTechnology.experience.map((item) => (
                      <li key={`${item.label}-${item.role}`}>
                        <a className="inline-flex min-h-11 items-center text-sm hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" href="#experience">
                          {item.label}<span className="ml-2 text-xs text-muted-foreground">— {item.role}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          ) : (
            <div>
              <h3 id="technology-details-heading" className="text-lg font-medium">Choose a technology</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Its role and any linked projects or experience will appear here.</p>
            </div>
          )}
        </section>
      </div>
    </SectionWrapper>
  );
};

export default SkillsSection;
