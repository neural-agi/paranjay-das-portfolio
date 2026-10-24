import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { certifications, education, experience, profile, skillGroups, studyProjects } from "@/data/design-study";
import { ProjectIndex } from "@/components/production/project-index";
import styles from "@/app/production.module.css";

function ExternalLink({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) {
  return <a className={className} href={href} target="_blank" rel="noreferrer">{children}<ArrowUpRight size={14} aria-hidden="true" /></a>;
}

function Artifact({ project }: { project: (typeof studyProjects)[number] }) {
  if (project.visualKind === "identity") return <div className={styles.identityDiagram} role="group" aria-label="Documented Cartel product identity flow"><ol className={styles.identityStages}><li>Provider response</li><li>Raw artifact + provenance</li><li>Parse and normalize</li><li>Retailer observation registry</li><li>Canonical product / variant resolution</li></ol><p>Documented outcomes</p><div className={styles.identityOutput}><span>EXACT MATCH</span><span>MISMATCH</span><span>UNRESOLVED</span></div></div>;
  if (project.visualKind === "qwen") return <div className={styles.moduleDiagram} role="group" aria-label="Repository-documented components; Agent Core remains in progress"><p>DOCUMENTED FOUNDATION</p><div>{project.steps.slice(0, -1).map((step) => <span key={step}>{step}</span>)}</div><strong>{project.steps.at(-1)}</strong></div>;
  if (project.visualKind === "engage") return <ol className={`${styles.flowDiagram} ${styles.verticalFlow}`} aria-label={project.visualLabel}>{project.steps.slice(0, 4).map((step) => <li key={step}>{step}</li>)}<li className={styles.flowBranches}><span>LinkedIn scraper</span><span>AI generation</span><span>Execution tracker</span></li></ol>;
  return <ol className={styles.flowDiagram} aria-label={project.visualLabel}>{project.steps.map((step) => <li key={step}>{step}</li>)}</ol>;
}

export default function ProductionHomepage() {
  return <div className={styles.page}>
    <a className={styles.skipLink} href="#main-content">Skip to content</a>
    <header className={styles.header}><a className={styles.brand} href="#top">Paranjay Das<b>.</b></a><nav aria-label="Page navigation"><a href="#systems">Systems</a><a href="#approach">Approach</a><a href="#background">Background</a><a href="#contact">Contact</a></nav></header>
    <main id="main-content" tabIndex={-1}>
      <section className={styles.hero} id="top" aria-labelledby="hero-title"><div className={styles.heroName}><p className={styles.kicker}>AI / ML ENGINEERING · KOLKATA, INDIA</p><h1 id="hero-title">Paranjay<br /><span>Das</span><b>.</b></h1></div><div className={styles.heroStatement}><p>{profile.statement}</p></div><div className={styles.heroSummary}><p>Language-model applications, retrieval, and agent workflows—built with attention to how outputs are checked, evidence is traced, and unsafe behavior is handled.</p><a href="#systems">Explore the systems <ArrowDownRight size={16} aria-hidden="true" /></a></div></section>

      <section className={styles.systems} id="systems" aria-labelledby="systems-title"><div className={styles.sectionIntro}><p className={styles.kicker}>01 / SELECTED WORK</p><h2 id="systems-title">Systems with<br />different questions.</h2><p>Five projects, each making a different engineering concern visible.</p></div><ProjectIndex /><div className={styles.projectList}>
        {studyProjects.map((project, index) => <article className={`${styles.project} ${styles[`project${index + 1}`]}`} id={project.id} key={project.id}><div className={styles.projectAside}><span>{project.number}</span><p>{project.theme}</p></div><div className={styles.projectBody}><h3>{project.title}</h3><p className={styles.projectDescription}>{project.description}</p><p className={styles.projectNote}><strong>{project.visualKind === "identity" ? "Identity rule" : project.visualKind === "qwen" ? "Documented scope" : project.visualKind === "engage" ? "Application structure" : project.visualKind === "retrieval" ? "Retrieval detail" : "Extraction shape"}</strong>{project.note}</p><p className={styles.projectMethods}><strong>Methods</strong>{project.stack.join(" · ")}</p><div className={styles.artifact}><p>{project.visualLabel}</p><Artifact project={project} /></div>{project.repository ? <ExternalLink className={styles.projectLink} href={project.repository}>Open repository<span className={styles.srOnly}> — {project.title}</span></ExternalLink> : <ExternalLink className={styles.projectLink} href={profile.github}>GitHub profile<span className={styles.srOnly}> — {project.title} has no supplied repository link</span></ExternalLink>}</div></article>)}
      </div></section>

      <section className={styles.approach} id="approach" aria-labelledby="approach-title"><p className={styles.kicker}>02 / ENGINEERING POINT OF VIEW</p><div><h2 id="approach-title">The questions are practical.</h2><p>Does retrieval surface useful evidence? Can an output be checked against a schema? Can a decision be traced to its source? Can the workflow be maintained? The project work keeps returning to these checks.</p><ul>{["Retrieval quality", "Structured outputs", "Validation", "Auditability", "Security", "Orchestration", "Maintainable workflows"].map((item) => <li key={item}>{item}</li>)}</ul></div></section>

      <section className={styles.experience} aria-labelledby="experience-title"><p className={styles.kicker}>03 / EXPERIENCE</p><div><h2 id="experience-title">{experience.organization}</h2><p className={styles.role}>{experience.role} <span>{experience.period}</span></p><dl className={styles.experienceFacts}>{experience.highlights.map((item) => <div key={item.label}><dt>{item.label}</dt><dd>{item.detail}</dd></div>)}</dl></div></section>

      <section className={styles.support} id="background" aria-label="Supporting background"><section aria-labelledby="skills-title"><p className={styles.kicker}>TOOLS & METHODS</p><h2 id="skills-title">Skills in context.</h2><div className={styles.skills}>{skillGroups.map((group) => <p key={group.name}><strong>{group.name}</strong>{group.items.join(" · ")}</p>)}</div></section><div><section aria-labelledby="education-title"><h2 id="education-title">Education</h2>{education.map((item) => <p className={styles.credential} key={item.title}><strong>{item.title}</strong>{item.subtitle}<span>{item.date}</span></p>)}</section><section aria-labelledby="certifications-title"><h2 id="certifications-title">Certifications</h2>{certifications.map((item) => <p className={styles.credential} key={item}>{item}</p>)}</section></div></section>
    </main>
    <footer className={styles.footer} id="contact"><div><p className={styles.kicker}>CONTACT</p><h2>{profile.name}</h2></div><nav className={styles.contactLinks} aria-label="Contact links"><a href={`mailto:${profile.email}`}>Email Paranjay · {profile.email}</a><ExternalLink href={profile.github}>GitHub profile</ExternalLink><ExternalLink href={profile.linkedin}>LinkedIn profile</ExternalLink></nav></footer>
  </div>;
}
