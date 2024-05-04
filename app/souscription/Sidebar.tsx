import Step from "@/components/Step";
import React from "react";

export default function Sidebar() {
  return (
    <aside className="hidden lg:flex lg:w-[274px] lg:h-[568px] lg:flex-col lg:flex-shrink-0 rounded-lg  lg:px-8 pt-10 lg:gap-8">
      <Step  stepNumber={1} smallTitle="Etape 1" sectionTitle="Information personnel" />
      <Step stepNumber={2} smallTitle="Etape 2" sectionTitle="Choix du pack" />
      <Step stepNumber={3} smallTitle="Etape 3" sectionTitle="Resumé" />
    </aside>
  );
}