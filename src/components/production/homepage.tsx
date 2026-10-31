import { ArrowUpRight } from "lucide-react";
import { certifications, education, experience, profile, skillGroups } from "@/data/production";
import { ProjectExplorer } from "@/components/production/project-explorer";
import { AnimatedKeyboardScene } from "@/components/production/animated-keyboard-scene";
import styles from "@/app/production.module.css";

function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return <a href={href} target="_blank" rel="noreferrer">{children}<ArrowUpRight size={15} aria-hidden="true" /></a>;
}

export default function ProductionHomepage() {
  return (
    <div className={styles.page}>
      <a className={styles.skipLink} href="#main-content">Skip to content</a>
      <header className={styles.header} id="top">
        <a className={styles.brand} href="#top" aria-label="Paranjay Das, home">Paranjay Das</a>
        <nav aria-label="Main navigation">
          <a href="#systems">Systems</a>
          <a href="#experience">Experience</a>
          <a href="#stack">Stack</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main id="main-content" tabIndex={-1}>
        <section className={styles.hero} aria-labelledby="hero-title">
          <div className={styles.heroAtmosphere} aria-hidden="true" />
          <div className={styles.heroCopy}>
            <p className={styles.heroLabel}>AI / ML / SYSTEMS</p>
            <h1 id="hero-title">PARANJAY<br />DAS</h1>
            <p className={styles.heroLead}>I build language-model applications, retrieval pipelines, coding tools, and systems for structured extraction.</p>
            <p className={styles.heroDetail}>B.Tech Computer Science &amp; Engineering (AI &amp; ML)<br />Netaji Subhash Engineering College</p>
            <div className={styles.heroActions}>
              <a className={styles.primaryAction} href="#systems">Explore systems</a>
              <ExternalLink href={profile.github}>GitHub profile</ExternalLink>
            </div>
          </div>

          <section className={styles.stackSection} id="stack" aria-labelledby="stack-title">
            <div className={styles.stackHeading}>
              <div><p className={styles.sectionCode}>TECHNOLOGY STACK</p><h2 id="stack-title">Select a technology</h2></div>
              <p>See which systems use it.</p>
            </div>
            <AnimatedKeyboardScene />
          </section>
        </section>

        <section className={styles.systemsSection} id="systems" aria-labelledby="systems-title">
          <div className={styles.sectionHeading}>
            <div><p className={styles.sectionCode}>PROJECTS</p><h2 id="systems-title">Systems</h2></div>
            <p>Select a project to inspect its implementation and source.</p>
          </div>
          <ProjectExplorer />
        </section>

        <section className={styles.experienceSection} id="experience" aria-labelledby="experience-title">
          <div className={styles.sectionHeading}>
            <div><p className={styles.sectionCode}>EXPERIENCE</p><h2 id="experience-title">Foretyx</h2></div>
            <div className={styles.experienceRole}>
              <h3>{experience.role}</h3>
              <p>{experience.period}</p>
            </div>
          </div>
          <dl className={styles.experienceGrid}>
            {experience.workAreas.map((area) => (
              <div key={area.title}>
                <dt>{area.title}</dt>
                <dd>{area.detail}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className={styles.supportSection} aria-label="Supporting information">
          <section className={styles.toolsSection} aria-labelledby="tools-title">
            <div className={styles.sectionHeadingCompact}><p className={styles.sectionCode}>SUPPORTING STACK</p><h2 id="tools-title">Tools &amp; methods</h2></div>
            <div className={styles.toolGroups}>
              {skillGroups.map((group) => (
                <p key={group.name}><strong>{group.name}</strong><span>{group.items.join(" · ")}</span></p>
              ))}
            </div>
          </section>

          <div className={styles.credentials}>
            <section aria-labelledby="education-title">
              <div className={styles.sectionHeadingCompact}><p className={styles.sectionCode}>EDUCATION</p><h2 id="education-title">Education</h2></div>
              {education.map((item) => (
                <div className={styles.credential} key={item.title}>
                  <h3>{item.title}</h3><p>{item.subtitle}</p><span>{item.date}</span>
                </div>
              ))}
            </section>
            <section aria-labelledby="certifications-title">
              <div className={styles.sectionHeadingCompact}><p className={styles.sectionCode}>CERTIFICATIONS</p><h2 id="certifications-title">Certifications</h2></div>
              <ul className={styles.certifications}>{certifications.map((item) => <li key={item}>{item}</li>)}</ul>
            </section>
          </div>
        </section>
      </main>

      <footer className={styles.footer} id="contact">
          <div><p className={styles.sectionCode}>CONTACT</p><h2>{profile.name.toUpperCase()}</h2></div>
        <nav aria-label="Contact links">
          <a href={`mailto:${profile.email}`}>Email Paranjay · {profile.email}</a>
          <ExternalLink href={profile.github}>GitHub profile</ExternalLink>
          <ExternalLink href={profile.linkedin}>LinkedIn profile</ExternalLink>
        </nav>
      </footer>
    </div>
  );
}
