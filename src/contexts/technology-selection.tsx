"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { technologyIndex, type TechnologyIndexEntry } from "@/data/production";

type TechnologySelectionValue = {
  selectedTechnology: TechnologyIndexEntry | null;
  selectTechnology: (id: string) => void;
};

const TechnologySelectionContext = createContext<TechnologySelectionValue | null>(null);

export function TechnologySelectionProvider({ children }: { children: React.ReactNode }) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedTechnology = useMemo(
    () => technologyIndex.find((technology) => technology.id === selectedId) ?? null,
    [selectedId],
  );
  const selectTechnology = useCallback((id: string) => {
    if (technologyIndex.some((technology) => technology.id === id)) setSelectedId(id);
  }, []);

  return (
    <TechnologySelectionContext.Provider value={{ selectedTechnology, selectTechnology }}>
      {children}
    </TechnologySelectionContext.Provider>
  );
}

export function useTechnologySelection() {
  const value = useContext(TechnologySelectionContext);
  if (!value) throw new Error("useTechnologySelection must be used within TechnologySelectionProvider");
  return value;
}
