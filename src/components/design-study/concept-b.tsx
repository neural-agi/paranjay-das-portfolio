"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { certifications, education, experience, profile, skillGroups, studyProjects } from "@/data/design-study";
import b from "@/app/design-study/b/concept-b.module.css";

function ExternalLink({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) {
  return <a className={className} href={href} target="_blank" rel="noreferrer">{children}<ArrowUpRight size={14} aria-hidden="true" /></a>;
}

function Artifact({ project }: { project: (typeof studyProjects)[number] }) {
  if (project.visualKind === "identity") return <div className={b.identityArtifact}><div className={b.artifactStage}><span>01 / ACQUIRE</span><strong>Provider data</strong><small>Raw artifact + provenance</small></div><div className={b.artifactStage}><span>02 / NORMALIZE</span><strong>Observation</strong><small>Parse, normalize, register</small></div><div className={b.resolveStage}><span>03 / RESOLVE IDENTITY</span><div><i>EXACT MATCH</i><i>MISMATCH</i><i>UNRESOLVED</i></div></div></div>;
  if (project.visualKind === "qwen") return <div className={b.qwenArtifact}><p>DOCUMENTED FOUNDATION</p><div className={b.moduleGrid}>{project.steps.slice(0, -1).map((step, index) => <div key={step}><span>0{index + 1}</span>{step}</div>)}</div><div className={b.inProgress}><span>IN PROGRESS</span><strong>{project.steps.at(-1)?.split(":")[0]}</strong><small>End-to-end execution</small></div></div>;
  if (project.visualKind === "engage") return <div className={b.engageArtifact}><div className={b.engageStage}><span>INTERFACE</span><strong>Next.js frontend</strong></div><div className={b.connector}>REST API</div><div className={b.engageStage}><span>APPLICATION</span><strong>FastAPI backend</strong></div><div className={b.connector}>Pipeline orchestrator</div><div className={b.engageModules}>{project.steps.at(-1)?.split(" / ").map((step) => <span key={step}>{step}</span>)}</div></div>;
  return <ol className={b.retrievalArtifact} aria-label={project.visualLabel}>{project.steps.map((step, index) => <li key={step}><span>0{index + 1}</span><strong>{step}</strong></li>)}</ol>;
}

export default function ConceptB() {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const activeProject = studyProjects[activeIndex];

  function handleTabKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let nextIndex = index;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") nextIndex = (index + 1) % studyProjects.length;
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp") nextIndex = (index - 1 + studyProjects.length) % studyProjects.length;
    else if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = studyProjects.length - 1;
    else return;
    event.preventDefault();
    setActiveIndex(nextIndex);
    tabRefs.current[nextIndex]?.focus();
  }

  return <main className={b.page}>
    <header className={b.header}><a href="#top" className={b.brand}>PARANJAY DAS <span>／ SYSTEMS ATLAS</span></a><nav aria-label="Page navigation"><a href="#atlas">Atlas</a><a href="#approach">Approach</a><a href="#contact">Contact</a></nav></header>
    <section className={b.hero} id="top" aria-labelledby="b-title"><div><p className={b.eyebrow}>AI / ML ENGINEERING STUDENT & BUILDER</p><h1 id="b-title">Systems are<br /><span>the work.</span></h1></div><div className={b.heroAside}><p>{profile.statement}</p><p>Language models, retrieval, and agent workflows—with the structure and checks around them.</p><a href="#atlas">Enter the systems atlas <ArrowDownRight size={15} aria-hidden="true" /></a></div><div className={b.heroIndex}><span>COLLECTION / 05 SYSTEMS</span><span>SELECT A PROJECT TO INSPECT ITS STRUCTURE</span></div></section>
    <section className={b.atlas} id="atlas" aria-labelledby="atlas-title"><div className={b.atlasHeading}><div><p className={b.eyebrow}>01 / PROJECT INDEX</p><h2 id="atlas-title">Choose a system.</h2></div></div><div className={b.atlasLayout}>
      <div className={b.navigator} role="tablist" aria-label="Portfolio projects" aria-orientation="vertical">{studyProjects.map((project, index) => <button key={project.id} ref={(element) => { tabRefs.current[index] = element; }} id={`tab-${project.id}`} className={`${b.projectTab}${activeIndex === index ? ` ${b.selected}` : ""}`} type="button" role="tab" aria-selected={activeIndex === index} aria-controls="project-panel" tabIndex={activeIndex === index ? 0 : -1} onClick={() => setActiveIndex(index)} onKeyDown={(event) => handleTabKeyDown(event, index)}><span className={b.tabNumber}>{project.number}</span><span className={b.tabTitle}>{project.title}</span><span className={b.tabState}>{activeIndex === index ? "Selected" : "View project"}</span></button>)}</div>
      <article className={b.projectStage} id="project-panel" role="tabpanel" aria-labelledby={`tab-${activeProject.id}`} tabIndex={0}>
        <div className={b.stageTop}><span>{activeProject.theme}</span><span>{activeProject.number} / 05</span></div><h3>{activeProject.title}</h3><p className={b.stageDescription}>{activeProject.description}</p>
        <div className={b.figure}><div className={b.figureHeader}><span>{activeProject.visualKind === "identity" ? "PRODUCT IDENTITY" : activeProject.visualKind === "qwen" ? "COMPONENT STATUS" : activeProject.visualKind === "engage" ? "APPLICATION STRUCTURE" : activeProject.visualKind === "retrieval" ? "RETRIEVAL PATH" : "EXTRACTION PATH"}</span><span>{activeProject.visualLabel.includes("Conceptual") ? "CONCEPTUAL" : "DOCUMENTED"}</span></div><Artifact project={activeProject} /></div>
        <div className={b.stageBottom}><div><p className={b.noteLabel}>ENGINEERING DETAIL</p><p>{activeProject.note}</p></div><div className={b.stack}><p className={b.noteLabel}>TOOLS / METHODS</p><ul>{activeProject.stack.map((tag) => <li key={tag}>{tag}</li>)}</ul></div></div>
        <ExternalLink className={b.repository} href={activeProject.repository ?? profile.github}>{activeProject.repository ? "Open repository" : "GitHub profile"}<span className={b.srOnly}> — {activeProject.title}</span></ExternalLink>
      </article>
    </div></section>
    <section className={b.approach} id="approach"><div><p className={b.eyebrow}>02 / ENGINEERING POINT OF VIEW</p><h2>Check the source.<br />Check the output.</h2></div><div><p>The recurring work is specific: validate retrieved context, give model outputs a structure that can be checked, preserve evidence through data handling, and keep workflows understandable.</p><ul>{["Retrieval quality", "Structured outputs", "Validation", "Auditability", "Security", "Maintainable orchestration"].map((item) => <li key={item}>{item}</li>)}</ul></div></section>
    <section className={b.experience}><div className={b.experienceHeading}><p className={b.eyebrow}>03 / EXPERIENCE</p><h2>{experience.organization}</h2><span>{experience.role} · {experience.period}</span></div><p>{experience.description}</p></section>
    <section className={b.background} aria-label="Supporting background"><div><p className={b.eyebrow}>TOOLS & METHODS</p>{skillGroups.map((group) => <p key={group.name}><strong>{group.name}</strong><span>{group.items.join(" · ")}</span></p>)}</div><div><p className={b.eyebrow}>EDUCATION & CERTIFICATIONS</p>{education.map((item) => <p key={item.title}><strong>{item.title}</strong><span>{item.subtitle} · {item.date}</span></p>)}{certifications.map((item) => <p key={item}><strong>Certification</strong><span>{item}</span></p>)}</div></section>
    <footer className={b.footer} id="contact"><div><p className={b.eyebrow}>CONTACT</p><h2>Paranjay Das</h2></div><nav className={b.contactLinks} aria-label="Contact links"><a className={b.contactLink} href={`mailto:${profile.email}`}>Email Paranjay <ArrowUpRight size={14} aria-hidden="true" /></a><ExternalLink className={b.contactLink} href={profile.github}>GitHub profile</ExternalLink><ExternalLink className={b.contactLink} href={profile.linkedin}>LinkedIn</ExternalLink></nav><a className={b.back} href="/design-study">Back to concept selection</a></footer>
  </main>;
}
