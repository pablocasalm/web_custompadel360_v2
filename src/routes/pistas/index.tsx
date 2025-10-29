import { useEffect, useState } from "react";
import { getContent, setContent } from "../../lib/storage";
import Hero from "./hero";
import Ofrecemos from "./ofrecemos";
import Servicios from "./servicios";
import Config from "./config";
import Proyectos from "./proyectos";
import Contacto from "./contacto";
import Subnav from "./subnav";
import { Coefs, Opciones } from "./utils";

// ------- Defaults mínimos (editables vía Admin JSON si usas 'cms' y 'cms_custom') -------
const DEFAULT_CUSTOM = {
  oferta: {
    title: "CUSTOM PADEL 360 — Pistas a medida",
    text:
      "Diseño, fabricación e instalación de pistas de pádel profesionales. Proyecto llave en mano para clubes y promotores.",
  },
  servicios: [
    { title: "Diseño y obra", description: "Estudio técnico, obra civil y coordinación integral." },
    { title: "Instalación", description: "Estructura, cerramientos, vidrio y césped profesional." },
    { title: "Garantía y soporte", description: "Mantenimiento y SLA según contrato." },
  ],
  proyectos: [
    { t: "Club Norte", d: "4 pistas panorámicas con LED y césped pro." },
    { t: "Centro Deportivo", d: "2 pistas clásicas, cerramiento 12mm." },
    { t: "Resort Costa", d: "3 pistas mixtas con zona de espectadores." },
  ],
};

const SECTIONS = [
  { id: "ofrecemos", label: "Qué ofrecemos" },
  { id: "servicios", label: "Servicios" },
  { id: "config", label: "Configurador" },
  { id: "proyectos", label: "Proyectos" },
  { id: "contacto", label: "Contacto" },
];

export default function PistasRoute() {
  // Contenido CMS (si no existe, siembra default)
  const content = getContent<any>("cms_custom") ?? DEFAULT_CUSTOM;

  const [active, setActive] = useState("ofrecemos");

  // Coeficientes desde "cms" (admin) o defaults
  const cms = getContent<any>("cms") ?? {};
  const coefs: Coefs = cms?.custom?.config?.coeficientes ?? {
    base: 10000,
    estructura: { Panorámica: 3500, Clásica: 0 },
    vidrio: { "10": 0, "12": 1200 },
    cesped: { Pro: 800, Alta: 400 },
    iluminacion: { LED: 900, Halógena: 0 },
  };

  // Estado de opciones del configurador
  const [op, setOp] = useState<Opciones>({
    estructura: "Panorámica",
    vidrio: 12,
    cesped: "Pro",
    iluminacion: "LED",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!getContent("cms_custom")) setContent("cms_custom", DEFAULT_CUSTOM);

    // activar píldora al hacer scroll
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-100px 0px -66% 0px" }
    );
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="theme-pistas">
      {/* Subnav flotante (componente) */}
      <Subnav sections={SECTIONS} activeId={active} onJump={scrollToSection} />

      {/* Hero */}
      <Hero lead={DEFAULT_CUSTOM.oferta.text} />

      {/* Secciones */}
      <Ofrecemos
        id="ofrecemos"
        title={content.oferta?.title ?? DEFAULT_CUSTOM.oferta.title}
        text={content.oferta?.text ?? DEFAULT_CUSTOM.oferta.text}
      />

      <Servicios id="servicios" items={content.servicios ?? DEFAULT_CUSTOM.servicios} />

      <Config id="config" op={op} setOp={setOp} coefs={coefs} />

      <Proyectos id="proyectos" items={content.proyectos ?? DEFAULT_CUSTOM.proyectos} />

      <Contacto id="contacto" />
    </div>
  );
}