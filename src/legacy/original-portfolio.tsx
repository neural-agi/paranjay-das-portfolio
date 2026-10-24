"use client";

import { useState } from "react";
import { ArrowDownRight, ArrowUpRight, Menu, X } from "lucide-react";
import { certifications, education, projects, skillGroups } from "@/data/portfolio";

const links = [
  { label: "Point of view", href: "#point-of-view" },
  { label: "Systems", href: "#systems" },
  { label: "Experience", href: "#experience" },
  { label: "Background", href: "#background" },
  { label: "Contact", href: "#contact" },
];

function SectionHeading({ index, title, aside }: { index: string; title: string; aside?: string }) {
  return (
    <div className="section-heading">
      <div className="section-title">
        <span className="mono section-index">{index}</span>
        <h2>{title}</h2>
      </div>
      {aside && <span className="section-aside mono">{aside}</span>}
    </div>
  );
}

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <nav className="nav-shell" aria-label="Main navigation">
        <a className="wordmark" href="#top" aria-label="Paranjay Das, home">
          <span className="wordmark-mark" aria-hidden="true">P<span>.</span></span>
          <span>PARANJAY DAS</span>
        </a>
        <div className="nav-links">
          {links.map((link) => <a key={link.href} href={link.href}>{link.label}</a>)}
        </div>
        <a className="nav-connect" href="mailto:paranjaydas2006@gmail.com">Email <ArrowUpRight size={14} aria-hidden="true" /></a>
        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
        </button>
        <div className={`mobile-nav${menuOpen ? " is-open" : ""}`} id="mobile-navigation" hidden={!menuOpen}>
          {links.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>{link.label}<ArrowDownRight size={15} aria-hidden="true" /></a>
          ))}
        </div>
      </nav>
    </header>
  );
}

export function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero-inner">
        <div className="hero-main">
          <div className="hero-copy">
            <p className="eyebrow">AI / ML ENGINEERING &nbsp;·&nbsp; KOLKATA, INDIA</p>
            <h1 id="hero-title">Paranjay<br /><span>Das.</span></h1>
            <p className="hero-statement">I build AI systems that are<br /><em>actually engineered.</em></p>
            <p className="hero-description">My projects work with language models, retrieval, and agentic workflows. I pay attention to what makes them dependable: structured outputs, validation, and security.</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#systems">Selected systems <ArrowDownRight size={16} aria-hidden="true" /></a>
              <a className="button button-quiet" href="https://github.com/neural-agi" target="_blank" rel="noreferrer">GitHub profile <ArrowUpRight size={15} aria-hidden="true" /></a>
            </div>
          </div>
          <p className="hero-side-note">Retrieval.<br />Structure.<br />Validation.<br />Security.</p>
        </div>
        <div className="hero-bottom mono"><span>AI SYSTEMS &nbsp; / &nbsp; ENGINEERING DETAILS</span><a href="#point-of-view">Read the point of view <ArrowDownRight size={14} aria-hidden="true" /></a></div>
      </div>
    </section>
  );
}

export function EngineeringPointOfView() {
  return (
    <section className="content-section point-section" id="point-of-view" aria-labelledby="point-title">
      <SectionHeading index="01" title="What I pay attention to" aside="A RECURRING THREAD IN THE WORK" />
      <div className="point-layout">
        <h2 id="point-title">Check the retrieval.<br />Validate the output.</h2>
        <div className="point-copy">
          <p>The project work brings a consistent set of engineering concerns into view: retrieval validation in the documentation system; schema validation and evidence grounding in parameter extraction; audit trails in the product pipeline; and reusable, maintainable orchestration in the coding-agent framework.</p>
          <ul className="concern-list" aria-label="Recurring engineering concerns">
            <li>Retrieval quality</li><li>Structured outputs</li><li>Validation</li><li>Auditability</li><li>Security</li><li>Orchestration</li><li>Maintainability</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export function ProjectGrid() {
  return (
    <section className="content-section systems-section" id="systems" aria-labelledby="systems-title">
      <SectionHeading index="02" title="Selected systems" aside="PROJECTS & TECHNICAL WORK" />
      <div className="systems-intro"><h2 id="systems-title">Selected systems</h2><p>Five projects across structured extraction, data pipelines, coding agents, workflow orchestration, and retrieval-augmented generation.</p></div>
      <div className="system-list">
        {projects.map((project) => (
          <article className={`system-item system-${project.number}`} key={project.number}>
            <div className="system-label"><span className="mono system-number">{project.number}</span><span className="system-kind">{project.kind}</span></div>
            <div className="system-content">
              <h3>{project.title}</h3>
              <p className="system-description">{project.description}</p>
              <p className="engineering-note"><span>{project.engineeringNoteLabel}</span>{project.engineeringNote}</p>
              <ul className="tag-list" aria-label={`${project.title} methods and technologies`}>
                {project.stack.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
            {project.href ? (
              <a className="system-link" href={project.href} target="_blank" rel="noreferrer">Repository <ArrowUpRight size={14} aria-hidden="true" /><span className="sr-only"> for {project.title}</span></a>
            ) : (
              <a className="system-link profile-link" href="https://github.com/neural-agi" target="_blank" rel="noreferrer">GitHub profile <ArrowUpRight size={14} aria-hidden="true" /><span className="sr-only"> (project repository link not supplied)</span></a>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}

export function TechnicalFocus() {
  return (
    <section className="content-section skills-section" id="skills" aria-labelledby="skills-title">
      <SectionHeading index="03" title="Tools & methods" aside="SUPPORTING CONTEXT" />
      <h2 className="sr-only" id="skills-title">Tools and methods</h2>
      <div className="skill-groups">
        {skillGroups.map((group) => (
          <div className="skill-group" key={group.name}><h3>{group.name}</h3><ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul></div>
        ))}
      </div>
    </section>
  );
}

export function Experience() {
  return (
    <section className="content-section experience-section" id="experience" aria-labelledby="experience-title">
      <SectionHeading index="04" title="Experience" aside="APPLIED AI SECURITY" />
      <article className="experience-entry">
        <div className="entry-heading"><div><h2 id="experience-title">Foretyx</h2><p>Co-Founder — AI/ML Researcher</p></div><span className="entry-date">Apr 2026 — Present</span></div>
        <p className="entry-copy">Work includes prompt injection detection, unsafe output filtering, and sensitive data leakage protection. Attack detection covers Hindi, Hinglish, and English; related work includes pseudonymization, low-latency model and integration logic, and validation for reliability.</p>
      </article>
    </section>
  );
}

export function Background() {
  return (
    <section className="content-section background-section" id="background" aria-labelledby="background-title">
      <SectionHeading index="05" title="Background" aside="EDUCATION & CERTIFICATIONS" />
      <h2 className="sr-only" id="background-title">Education and certifications</h2>
      <div className="background-grid">
        <div className="background-column"><h3>Education</h3>{education.map((item) => <article className="background-item" key={item.title}><div><h4>{item.title}</h4><p>{item.subtitle}</p></div><span>{item.date}</span></article>)}</div>
        <div className="background-column"><h3>Certifications</h3>{certifications.map((item) => <p className="credential" key={item}>{item}</p>)}</div>
      </div>
    </section>
  );
}

export function Contact() {
  return (
    <section className="contact-section" id="contact" aria-labelledby="contact-title">
      <div className="contact-content"><p className="eyebrow">CONTACT</p><h2 id="contact-title">Continue the conversation.</h2><a className="contact-email" href="mailto:paranjaydas2006@gmail.com">paranjaydas2006@gmail.com <ArrowUpRight size={15} aria-hidden="true" /></a></div>
      <nav className="contact-links" aria-label="Contact links"><a href="https://github.com/neural-agi" target="_blank" rel="noreferrer">GitHub profile <ArrowUpRight size={13} aria-hidden="true" /></a><a href="https://linkedin.com/in/paranjay-das-10b167384" target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={13} aria-hidden="true" /></a><a href="mailto:paranjaydas2006@gmail.com">Email <ArrowUpRight size={13} aria-hidden="true" /></a></nav>
    </section>
  );
}

export function Footer() {
  return <footer className="site-footer"><a className="footer-mark" href="#top" aria-label="Back to top">P<span>.</span></a><span className="footer-copy">Paranjay Das · AI / ML engineering</span><a className="back-top" href="#top">Back to top ↑</a></footer>;
}
