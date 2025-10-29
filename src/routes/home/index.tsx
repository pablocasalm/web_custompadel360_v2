import { useEffect } from "react";
import { getContent, setContent } from "../../lib/storage";

import Hero from "./hero";
import ValueProps from "./valueProps";
import Comparativa from "./comparativa";
import Logos from "./logos";
import Proceso from "./proceso";
import Kpis from "./kpis";
import Cta from "./cta";

export type HomeContent = {
  hero: { badge: string; title: string; lead: string };
  valueProps: { t: string; d: string }[];
  comparativa: { fila: string; custom: string; rebote: string }[];
  logos: { name: string }[];
  proceso: string[];
  kpis: { value: string; label: string }[];
};

const DEFAULT_HOME: HomeContent = {
  hero: {
    badge: "Soluciones integrales",
    title: "Pádel para empresas y clubs",
    lead:
      "Desde proyectos a medida (CUSTOM 360) hasta re-presurización y reciclaje de pelotas (REBOTE).",
  },
  valueProps: [
    { t: "Ahorro y eficiencia", d: "Optimizamos costes sin perder rendimiento." },
    { t: "Sostenibilidad", d: "Reducimos residuos y emisiones con procesos responsables." },
    { t: "Calidad garantizada", d: "Estándares medibles y control de calidad en cada fase." },
  ],
  comparativa: [
    { fila: "Enfoque", custom: "Proyecto a medida", rebote: "Optimización de consumibles" },
    { fila: "Horizonte", custom: "Medio/Largo plazo", rebote: "Corto/Medio plazo" },
    { fila: "Impacto", custom: "Infraestructura/operación", rebote: "Coste mensual / CO₂" },
  ],
  logos: [{ name: "Club A" }, { name: "Empresa B" }, { name: "Partner C" }],
  proceso: ["Análisis", "Propuesta", "Ejecución", "Medición"],
  kpis: [
    { value: "+30", label: "Proyectos" },
    { value: "-25%", label: "Coste en pelotas" },
    { value: "-1.2t", label: "CO₂/año" },
  ],
};

export default function Home() {
  const content = getContent<HomeContent>("cms_home") ?? DEFAULT_HOME;

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!getContent("cms_home")) setContent("cms_home", DEFAULT_HOME);
  }, []);

  return (
    <div>
      <Hero
        badge={content.hero.badge}
        title={content.hero.title}
        lead={content.hero.lead}
      />

      <ValueProps items={content.valueProps} />

      <Comparativa rows={content.comparativa} />

      <Logos items={content.logos} />

      <Proceso pasos={content.proceso} />

      <Kpis items={content.kpis} />

      <Cta />
    </div>
  );
}