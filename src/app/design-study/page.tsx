import type { Metadata } from "next";
import Link from "next/link";
import s from "./selection.module.css";

export const metadata: Metadata = { title: "Portfolio design study — Paranjay Das", description: "Compare two visual directions for Paranjay Das’s engineering portfolio." };

export default function DesignStudyIndex() {
  return <main className={s.page}>
    <header><Link href="/" className={s.brand}>PARANJAY DAS <span>／ DESIGN STUDY</span></Link><span>Two directions · same work</span></header>
    <section className={s.intro}><p>PORTFOLIO / ART DIRECTION</p><h1>Different ways<br />to see the systems.</h1><p>Both concepts use the same projects and verified details. Compare the composition, project storytelling, and interaction—not different claims.</p></section>
    <section className={s.options} aria-label="Design concepts">
      <Link href="/design-study/a" className={`${s.option} ${s.optionA}`}><div className={s.optionTop}><span>CONCEPT A</span><span>STATIC · EDITORIAL</span></div><div className={s.sampleA}><span>Paranjay</span><strong>Das.</strong><i>SYSTEMS, MADE VISIBLE</i></div><div className={s.optionBottom}><h2>Systems, made visible</h2><p>Warm paper, ink, and vermilion. A print-inspired project composition with documented and conceptual system diagrams.</p><span className={s.open}>Open concept <b>↗</b></span></div></Link>
      <Link href="/design-study/b" className={`${s.option} ${s.optionB}`}><div className={s.optionTop}><span>CONCEPT B</span><span>INTERACTIVE · EXPLORATORY</span></div><div className={s.sampleB}><span>01&nbsp; RISC-V extraction</span><span>02&nbsp; Cartel Smart Cart</span><strong>03&nbsp; Qwen3-Coder-Next</strong><span>04&nbsp; EngageAI</span><span>05&nbsp; Healthcare retrieval</span></div><div className={s.optionBottom}><h2>The systems atlas</h2><p>Cobalt, pale blue, and acid yellow. Select a project to inspect its own structure and evidence in a single stage.</p><span className={s.open}>Open concept <b>↗</b></span></div></Link>
    </section>
    <footer><span>Shared portfolio data · Existing homepage unchanged</span><Link href="/">Return to current portfolio</Link></footer>
  </main>;
}
