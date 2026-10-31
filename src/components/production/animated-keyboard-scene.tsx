"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Application, SplineEvent } from "@splinetool/runtime";
import Spline from "@splinetool/react-spline";
import { technologyIndex } from "@/data/production";
import styles from "@/app/production.module.css";

gsap.registerPlugin(ScrollTrigger);

type SceneSection = "hero" | "stack" | "systems" | "experience" | "contact";

const states: Record<SceneSection, { scale: number; position: [number, number]; rotation: [number, number, number] }> = {
  hero: { scale: 0.2, position: [225, -100], rotation: [0, 0, 0] },
  stack: { scale: 0.28, position: [0, -40], rotation: [0, Math.PI / 12, 0] },
  systems: { scale: 0.25, position: [0, -40], rotation: [Math.PI, Math.PI / 3, Math.PI] },
  experience: { scale: 0.25, position: [0, -40], rotation: [Math.PI / 12, -Math.PI / 4, 0] },
  contact: { scale: 0.2, position: [350, -250], rotation: [0, 0, 0] },
};

function stateFor(section: SceneSection, mobile: boolean) {
  const state = states[section];
  const width = typeof window === "undefined" ? 1280 : window.innerWidth;
  const scaleOffset = Math.min(Math.max(width / (mobile ? 390 : 1280), 0.5), mobile ? 0.6 : 1.15);
  return {
    scale: { x: state.scale * scaleOffset, y: state.scale * scaleOffset, z: state.scale * scaleOffset },
    position: { x: mobile ? 0 : state.position[0], y: mobile ? (section === "systems" ? 150 : -40) : state.position[1], z: 0 },
    rotation: { x: mobile ? (section === "systems" ? Math.PI : state.rotation[0]) : state.rotation[0], y: mobile ? Math.PI / 6 : state.rotation[1], z: mobile ? (section === "systems" ? Math.PI : 0) : state.rotation[2] },
  };
}

function findTech(name: string) {
  const aliases: Record<string, string> = { nextjs: "nextjs", docker: "docker", python: "python", fastapi: "fastapi", linux: "linux", postgres: "sql" };
  return technologyIndex.find((entry) => entry.id === (aliases[name.toLowerCase()] ?? name.toLowerCase()));
}

export function AnimatedKeyboardScene({ onSelect }: { onSelect?: (id: string) => void }) {
  const appRef = useRef<Application | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const [app, setApp] = useState<Application | null>(null);
  const [section, setSection] = useState<SceneSection>("hero");
  const [mobile, setMobile] = useState(false);
  const [selectedId, setSelectedId] = useState("python");
  const selected = technologyIndex.find((entry) => entry.id === selectedId) ?? technologyIndex[0];
  const reducedMotion = useRef(false);
  const visibleKeys = ["python","csharp","dotnet","go","llms","rag","faiss","raft","fastapi","nextjs","docker","json-schema","multi-agent","prompt-injection","output-validation","winui","pseudonymization"];

  useEffect(() => {
    const update = () => setMobile(window.matchMedia("(max-width: 767px)").matches);
    update(); window.addEventListener("resize", update); return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    if (!app) return;
    const keyboard = app.findObjectByName("keyboard");
    if (!keyboard) return;
    reducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    gsap.set(keyboard.scale, stateFor("hero", mobile).scale);
    gsap.set(keyboard.position, stateFor("hero", mobile).position);
    gsap.set(keyboard.rotation, stateFor("hero", mobile).rotation);
    if (overlayRef.current) gsap.set(overlayRef.current, { x: 0, y: 0, scale: 0.72, rotationX: 18, rotationZ: -6 });
    if (reducedMotion.current) return;
    const createSectionTimeline = (trigger: string, target: SceneSection, previous: SceneSection, start = "top 50%", end = "bottom bottom") => {
      const next = stateFor(target, mobile);
      return gsap.timeline({ scrollTrigger: { trigger, start, end, scrub: true,
        onEnter: () => setSection(target), onLeaveBack: () => setSection(previous),
      }}).to(keyboard.scale, { ...next.scale, ease: "none" }, 0)
        .to(keyboard.position, { ...next.position, ease: "none" }, 0)
        .to(keyboard.rotation, { ...next.rotation, ease: "none" }, 0)
        .to(overlayRef.current, { x: (next.position.x - stateFor(previous, mobile).position.x) * 0.28, y: (next.position.y - stateFor(previous, mobile).position.y) * 0.18, scale: next.scale.x / 0.2, rotationX: next.rotation.x * 57.3 + 18, rotationZ: next.rotation.z * 57.3 - 6, ease: "none" }, 0);
    };
    const timelines = [
      createSectionTimeline("#stack", "stack", "hero"),
      createSectionTimeline("#systems", "systems", "stack", "top 70%"),
      createSectionTimeline("#experience", "experience", "systems", "top 55%"),
      createSectionTimeline("#contact", "contact", "experience", "top 30%"),
    ];
    return () => timelines.forEach((timeline) => timeline.kill());
  }, [app, mobile]);

  useEffect(() => {
    if (!app) return;
    const handle = (event: SplineEvent) => {
      const tech = findTech(event.target.name);
      if (tech) { setSelectedId(tech.id); onSelect?.(tech.id); }
    };
    app.addEventListener("keyDown", handle);
    app.addEventListener("mouseHover", handle);
    return () => { app.removeEventListener("keyDown", handle); app.removeEventListener("mouseHover", handle); };
  }, [app, onSelect]);

  return <div className={styles.sceneCanvas} aria-label="Interactive technology keyboard" data-scene-section={section}>
    <Suspense fallback={null}>
      <Spline scene="/assets/skills-keyboard.spline" onLoad={(loaded) => {
        appRef.current = loaded;
        ["text-desktop-dark", "text-desktop", "text-mobile-dark", "text-mobile", "bongo-cat"].forEach((name) => loaded.findObjectByName(name)?.hide());
        setApp(loaded);
      }} />
    </Suspense>
    <div ref={overlayRef} className={`${styles.sceneKeyOverlay} ${mobile ? styles.sceneKeyOverlayMobile : ""}`} aria-label="Select a technology">
      {visibleKeys.map((id) => {
        const technology = technologyIndex.find((entry) => entry.id === id);
        if (!technology) return null;
        return <button key={id} type="button" className={`${styles.sceneKey} ${selectedId === id ? styles.sceneKeySelected : ""}`} aria-label={`${technology.label}. Used in ${technology.projects.map((project) => project.title).join(", ")}${technology.experience?.length ? `, ${technology.experience.map((item) => item.label).join(", ")}` : ""}.`} aria-pressed={selectedId === id} onClick={() => { setSelectedId(id); onSelect?.(id); }} onFocus={() => { setSelectedId(id); onSelect?.(id); }}><span aria-hidden="true">{technology.label}</span></button>;
      })}
    </div>
    <div className={styles.sceneReadout} aria-live="polite">
      <p>Technology</p><h3>{selected.label}</h3>
      <p>Used in</p><div>{selected.projects.map((project) => <a key={project.id} href={`#${project.id}`}>{project.number} {project.title}</a>)}{selected.experience?.map((item) => <a key={item.label} href="#experience">{item.label}</a>)}</div>
    </div>
  </div>;
}
