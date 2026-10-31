import type { ProjectStructure as ProjectStructureData } from "@/data/production";
import styles from "@/app/production.module.css";

export function ProjectStructure({
  structure,
  projectId,
}: {
  structure: ProjectStructureData | null;
  projectId: string;
}) {
  if (!structure) return null;
  return (
    <figure className={`${styles.structure} ${styles[`structure_${projectId}`]}`}>
      <figcaption>{structure.label}</figcaption>
      {structure.steps ? (
        <ol className={styles.structureFlow}>
          {structure.steps.map((step) => <li key={step}>{step}</li>)}
        </ol>
      ) : structure.groups ? (
        <div className={styles.componentMap}>
          {structure.groups.map((group) => (
            <section className={styles.componentGroup} key={group.title}>
              <h4>{group.title}</h4>
              <p>{group.items.join(" · ")}</p>
            </section>
          ))}
        </div>
      ) : null}
    </figure>
  );
}
