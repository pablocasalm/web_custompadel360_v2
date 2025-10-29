import { useEffect, useMemo, useState } from "react";
import { getContent, setContent } from "../../lib/storage";
import { CMSContent } from "../../data/schema";
import { defaultCMSContent } from "../../data/seed";
import { ahorroMensualEuros, co2EvitadoKg } from "../../lib/calc";

import Subnav, { SectionLink } from "./subnav";
import Hero from "./hero";
import Funciona from "./funciona";
import Calc from "./calc";
import Planes from "./planes";
import Faqs from "./faqs";
import Contacto from "./contacto";

const sections: SectionLink[] = [
  { id: "funciona", label: "Cómo funciona" },
  { id: "calc", label: "Calculadora" },
  { id: "planes", label: "Planes" },
  { id: "faqs", label: "FAQs" },
  { id: "contacto", label: "Contacto" },
];

const STORAGE_KEY = "cms:rebote";

export default function PelotasRoute() {
  // CMS local
  const [cms, setCms] = useState<CMSContent>(() => {
    const saved = getContent<CMSContent>(STORAGE_KEY);
    return saved ?? defaultCMSContent;
  });
  useEffect(() => { setContent(STORAGE_KEY, cms); }, [cms]);

  // Estado de calculadora
  const [pelotasMes, setPelotasMes] = useState<number>(300);
  const [precioTubo, setPrecioTubo] = useState<number>(6.0);
  const [ciclosRebote, setCiclosRebote] = useState<number>(3);

  const p = cms.rebote;

  const ahorro = useMemo(
    () => ahorroMensualEuros(pelotasMes, precioTubo, ciclosRebote, p.ajustes.factorAprovechamiento),
    [pelotasMes, precioTubo, ciclosRebote, p.ajustes.factorAprovechamiento]
  );
  const co2 = useMemo(
    () => co2EvitadoKg(pelotasMes, p.ajustes.co2KgPorPelotaEvitable, ciclosRebote),
    [pelotasMes, p.ajustes.co2KgPorPelotaEvitable, ciclosRebote]
  );

  // Subnav activo por scroll
  const [active, setActive] = useState<string>("funciona");
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-100px 0px -66% 0px" }
    );
    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  const jump = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="theme-reciclaje">
      <Subnav sections={sections} active={active} onJump={jump} />

      <Hero title={p.hero.titulo} subtitle={p.hero.subtitulo} />

      <Funciona
        titulo={p.funciona.titulo}
        descripcion={p.funciona.descripcion}
        pasos={p.funciona.pasos}
        destacado={p.funciona.destacado}
      />

      <Calc
        pelotasMes={pelotasMes}
        setPelotasMes={setPelotasMes}
        precioTubo={precioTubo}
        setPrecioTubo={setPrecioTubo}
        ciclosRebote={ciclosRebote}
        setCiclosRebote={setCiclosRebote}
        ahorro={ahorro}
        co2={co2}
        beneficios={p.calculadora.beneficios}
      />

      <Planes
        descripcion={p.planes.descripcion}
        items={p.planes.items}
        email={cms.contacto.email}
      />

      <Faqs faqs={p.faqs} />

      <Contacto copy={cms.contacto.copy} email={cms.contacto.email} />
    </div>
  );
}