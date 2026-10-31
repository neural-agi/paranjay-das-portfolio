import React from "react";
import { motion } from "framer-motion";
import styles from "./style.module.scss";
import { opacity } from "../../anim";
import { cn } from "@/lib/utils";

interface IndexProps {
  label: string;
  isActive: boolean;
}

const LinkPreview: React.FC<IndexProps> = ({ label, isActive }) => {
  return (
    <motion.div
      variants={opacity}
      initial="initial"
      animate={isActive ? "open" : "closed"}
      className={styles.imageContainer}
    >
      <div className="my-32 flex aspect-square w-full items-center justify-center border border-border/50 bg-background/30 p-8" aria-hidden="true">
        <span className="font-display text-5xl font-semibold tracking-tight text-foreground/80">{label}</span>
      </div>
    </motion.div>
  );
};

export default LinkPreview;
