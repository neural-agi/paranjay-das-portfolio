"use client";

import { profile, experience, education, certifications, skillGroups } from "@/data/production";
import { ProjectExplorer } from "@/components/production/project-explorer";
import { AnimatedKeyboardScene } from "@/components/production/animated-keyboard-scene";
import styles from "@/app/reference-home.module.css";

export default function ReferenceHomepage() {
  return <div className={styles.site}>
    <a className={styles.skip} href="#content">Skip to content</a>
    <header className={styles.header}><a href="#top" className={styles.logo}>PD<span>.</span></a><nav aria-label="Primary"><a href="#systems">Systems</a><a href="#experience">Experience</a><a href="#contact">Contact</a></nav></header>
    <AnimatedKeyboardScene />
    <main id="content">
      <section id="top" className={`${styles.scene} ${styles.hero}`} aria-labelledby="hero-title">
        <div className={styles.heroCopy}><p className={styles.kicker}>AI / ML / SYSTEMS</p><h1 id="hero-title">PARANJAY<br />DAS</h1><p className={styles.heroLead}>I build language-model applications, retrieval pipelines, coding tools, and systems for structured extraction.</p><p className={styles.heroMeta}>BTech Computer Science &amp; Engineering (AI/ML)<br />Netaji Subhash Engineering College</p><a className={styles.enter} href="#systems">Explore systems <span>↘</span></a></div><p className={styles.sceneIndex}>01 / IDENTITY</p>
      </section>
      <section id="stack" className={`${styles.scene} ${styles.stackScene}`} aria-labelledby="stack-title"><div className={styles.sceneHeading}><p className={styles.kicker}>TECHNOLOGY</p><h2 id="stack-title">Select a key.<br />Trace the work.</h2></div></section>
      <section id="systems" className={`${styles.scene} ${styles.systems}`} aria-labelledby="systems-title"><div className={styles.sectionHeader}><p className={styles.kicker}>SYSTEMS / 01—08</p><h2 id="systems-title">Projects</h2><p>Eight systems, selected for the engineering problems they make visible.</p></div><ProjectExplorer /></section>
      <section id="experience" className={`${styles.scene} ${styles.experience}`} aria-labelledby="experience-title"><div className={styles.sectionHeader}><p className={styles.kicker}>EXPERIENCE</p><h2 id="experience-title">Foretyx</h2><p>{experience.role}<br />{experience.period}</p></div><div className={styles.experienceGrid}>{experience.workAreas.map((area) => <div key={area.title}><span>{area.title}</span><p>{area.detail}</p></div>)}</div></section>
      <section className={`${styles.scene} ${styles.support}`} aria-labelledby="stack-support-title"><div className={styles.sectionHeader}><p className={styles.kicker}>SUPPORTING STACK</p><h2 id="stack-support-title">Tools &amp; methods</h2></div><div className={styles.tools}>{skillGroups.map((group) => <div key={group.name}><h3>{group.name}</h3><p>{group.items.join(" · ")}</p></div>)}</div><div className={styles.credentials}><div><p className={styles.kicker}>EDUCATION</p>{education.map((item) => <p key={item.title}><strong>{item.title}</strong><br />{item.subtitle}<br /><small>{item.date}</small></p>)}</div><div><p className={styles.kicker}>CERTIFICATIONS</p>{certifications.map((item) => <p key={item}>{item}</p>)}</div></div></section>
    </main>
    <footer id="contact" className={`${styles.scene} ${styles.footer}`}><div><p className={styles.kicker}>CONTACT</p><h2>{profile.name}</h2></div><nav aria-label="Contact links"><a href={`mailto:${profile.email}`}>{profile.email}</a><a href={profile.github} target="_blank" rel="noreferrer">GitHub</a><a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a></nav></footer>
  </div>;
}
