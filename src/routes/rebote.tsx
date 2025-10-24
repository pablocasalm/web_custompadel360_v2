import { useEffect, useMemo, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { getContent, setContent } from '../lib/storage';
import { ReboteContent, defaultCMSContent } from '../lib/types';
import Field from '../components/Field';
import ConfigCard from '../components/ConfigCard';
import { ahorroMensualEuros, co2EvitadoKg } from '../lib/calc';

const sections = [
  { id: 'funciona', label: 'Cómo funciona' },
  { id: 'calc', label: 'Calculadora' },
  { id: 'planes', label: 'Planes' },
  { id: 'faqs', label: 'FAQs' },
  { id: 'contacto', label: 'Contacto' },
];

export default function Rebote() {
  const content = getContent<ReboteContent>('cms_rebote', defaultCMSContent.rebote);
  const [activeSection, setActiveSection] = useState('funciona');

  const cms = getContent<any>('cms', {});
  const p = cms?.rebote?.calcParams ?? {
    precioTubo: 6,
    pelotasPorTubo: 3,
    factorCO2porPelotaKg: 0.08,
    ciclosMax: 4,
    ahorroPorCicloPct: 0.6
  };

  const [pelotasMes, setPelotasMes] = useState(300);
  const [precioTubo, setPrecioTubo] = useState<number>(p.precioTubo);
  const [ciclos, setCiclos] = useState<number>(2);

  const euros = useMemo(
    () => ahorroMensualEuros(pelotasMes, precioTubo, p.pelotasPorTubo, ciclos, p.ahorroPorCicloPct),
    [pelotasMes, precioTubo, p, ciclos]
  );
  const co2 = useMemo(() => co2EvitadoKg(pelotasMes, p.factorCO2porPelotaKg, ciclos), [pelotasMes, p, ciclos]);

  useEffect(() => {
    window.scrollTo(0,0);
    const existing = localStorage.getItem('cms_rebote');
    if (!existing) {
      setContent('cms_rebote', defaultCMSContent.rebote);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-100px 0px -66% 0px' }
    );

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="theme-reciclaje">
      <nav className="subnav">
        <div className="container">
          <div className="pills">
            {sections.map((section) => (
              <button
                key={section.id}
                className="pill"
                aria-current={activeSection === section.id ? 'true' : undefined}
                onClick={() => scrollToSection(section.id)}
              >
                {section.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <section className="section">
        <div className="max-w">
          <div className="hero hero-split hero--bleed">
            <div className="hero-card">
              <span className="eyebrow">ECONOMÍA CIRCULAR</span>
              <h1 className="h1">REBOTE — Re-presurización y reciclaje</h1>
              <p className="lead">Alarga la vida de las pelotas y reduce residuos en tu club o empresa.</p>
              <div className="btn-row">
                <a className="btn primary" href="#/rebote#planes">Ver planes</a>
                <a className="btn btn-outline" href="#/rebote#faqs">Preguntas frecuentes</a>
              </div>
            </div>

            <div className="hero-card hero-blob" aria-hidden="true" />
          </div>
        </div>
      </section>

      <section id="funciona" className="section">
        <div className="container">
          <h2 className="h2 text-center">Cómo funciona</h2>
          <div className="timeline">
            {content.proceso.map((step, i) => (
              <div key={i} className="timeline-step">
                <div className="timeline-number">{i + 1}</div>
                <div className="timeline-title">{step}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="calc" className="section">
        <div className="container">
          <h2 className="h2 text-center">Calculadora de ahorro & CO₂</h2>
          <div className="config-grid">
            <ConfigCard title="Tus datos">
              <Field label="Pelotas al mes">
                <input
                  type="number"
                  min={0}
                  value={pelotasMes}
                  onChange={(e) => setPelotasMes(Number(e.target.value) || 0)}
                />
              </Field>
              <Field label="Precio por tubo (€)" hint={`Predeterminado: ${p.precioTubo} €`}>
                <input
                  type="number"
                  min={0}
                  step="0.1"
                  value={precioTubo}
                  onChange={(e) => setPrecioTubo(Number(e.target.value) || 0)}
                />
              </Field>
              <Field label={`Ciclos de re-presurización (0–${p.ciclosMax})`}>
                <input
                  type="range"
                  min={0}
                  max={p.ciclosMax}
                  value={ciclos}
                  onChange={(e) => setCiclos(Number(e.target.value))}
                />
                <div>{ciclos} ciclos</div>
              </Field>
            </ConfigCard>

            <ConfigCard title="Resultados">
              <div className="result">
                <div className="badge-kpi">Ahorro/mes: {euros.toLocaleString('es-ES')} €</div>
                <div className="badge-kpi">CO₂ evitado: {co2} kg</div>
              </div>
            </ConfigCard>
          </div>
        </div>
      </section>

      <section id="rebote-planes" className="section">
        <div className="container">
          <h2 className="h2 text-center">Planes</h2>
          <div className="grid cols-3 gap-16">
            {content.planes.map((plan, i) => (
              <div key={i} className="card">
                <div className="eyebrow">{plan.badge}</div>
                <h3 className="h3">{plan.t}</h3>
                <p>{plan.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="rebote-preguntas" className="section">
        <div className="container">
          <h2 className="h2 text-center">Preguntas frecuentes</h2>
          <div className="details-list">
            {content.faqs.map((faq, i) => (
              <details key={i} className="details-item">
                <summary className="details-summary">
                  {faq.q}
                  <ChevronDown size={20} />
                </summary>
                <div className="details-content">{faq.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="contacto" className="section">
        <div className="container">
          <h2 className="h2 text-center">Empieza hoy</h2>
          <p className="lead text-center reading">Solicita información sobre nuestros planes y ahorra en costes de pelotas.</p>
          <div className="text-center">
            <a href="mailto:info@custompadel360.com" className="btn btn-primary">
              Contactar
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
