import { EXPERIENCE } from "@/data/constants";
import { SectionHeader } from "./section-header";
import { cn } from "@/lib/utils";
import SectionWrapper from "../ui/section-wrapper";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { certifications, education } from "@/data/production";

const ExperienceSection = () => {
  return (
    <SectionWrapper
      id="experience"
      className="flex flex-col items-center justify-center min-h-[120vh] py-20 z-10"
    >
      <div className="w-full max-w-4xl px-4 md:px-8 mx-auto">
        <SectionHeader
          id="experience"
          title="Experience"
          desc="Security and reliability work across prompt injection, unsafe outputs, sensitive data, and multilingual attack detection."
          className="mb-12 md:mb-20 mt-0"
        />

        <div className="flex flex-col gap-8 md:gap-12 relative">
          {/* Connector Line - simplified to a subtle border */}
          <div className="absolute left-8 md:left-1/2 top-4 bottom-4 w-px bg-border hidden md:block -translate-x-1/2" />

          {EXPERIENCE.map((exp, index) => (
            <div key={exp.id} className="relative">
              <ExperienceCard experience={exp} index={index} />
            </div>
          ))}
        </div>

        <div className="mt-16 grid gap-10 border-t border-border pt-8 md:grid-cols-2 md:gap-12">
          <section aria-labelledby="education-heading">
            <h3 id="education-heading" className="mb-5 text-xl font-semibold">Education</h3>
            <div className="space-y-5">
              {education.map((item) => (
                <div key={item.title}>
                  <h4 className="font-medium">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.subtitle}</p>
                  <p className="text-sm text-muted-foreground">{item.date}</p>
                </div>
              ))}
            </div>
          </section>
          <section aria-labelledby="certifications-heading">
            <h3 id="certifications-heading" className="mb-5 text-xl font-semibold">Certifications</h3>
            <ul className="space-y-3 text-muted-foreground">
              {certifications.map((certification) => <li key={certification}>{certification}</li>)}
            </ul>
          </section>
        </div>
      </div>
    </SectionWrapper>
  );
};

const ExperienceCard = ({
  experience,
  index,
}: {
  experience: (typeof EXPERIENCE)[0];
  index: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: index * 0.1,
        ease: "easeOut",
      }}
      viewport={{ once: true, margin: "-50px" }}
    >
      <Card
        className={cn(
          "bg-card text-card-foreground border-border",
          "hover:border-primary/20 transition-colors duration-300",
          "shadow-sm hover:shadow-md"
        )}
      >
        <CardHeader className="pb-3">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div className="space-y-1">
              <CardTitle className="text-xl font-bold tracking-tight">
                {experience.title}
              </CardTitle>
              <div className="text-base font-medium text-muted-foreground">
                {experience.company}
              </div>
            </div>
            <div className="text-sm text-muted-foreground">{experience.startDate} – {experience.endDate}</div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <ul className="list-disc list-outside ml-4 space-y-2 text-base text-muted-foreground leading-relaxed">
            {experience.description.map((point, i) => (
              <li key={i}>{point}</li>
            ))}
          </ul>

        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ExperienceSection;
