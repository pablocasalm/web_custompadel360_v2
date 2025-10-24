import { useEffect, useMemo, useState } from 'react';
import { Hammer, Wrench, Shield } from 'lucide-react';
import { getContent, setContent } from '../lib/storage';
import { CustomContent, defaultCMSContent } from '../lib/types';
import Field from '../components/Field';
import ConfigCard from '../components/ConfigCard';
import { precioPista, copiaResumen, ConfigCoefs, ConfigOpciones } from '../lib/calc';

const sections = [
  { id: 'ofrecemos', label: 'Qué ofrecemos' },
  { id: 'servicios', label: 'Servicios' },
  { id: 'config', label: 'Configurador' },
  { id: 'proyectos', label: 'Proyectos' },
  { id: 'contacto', label: 'Contacto' },
];

export default function Custom() {
  const content = getContent<CustomContent>('cms_custom', defaultCMSContent.custom);
  const [activeSection, setActiveSection] = useState('ofrecemos');

  const cms = getContent<any>('cms', {});
  const coefs: ConfigCoefs = cms?.custom?.config?.coeficientes ?? {
    base: 10000,
    estructura: { Panorámica: 3500, Clásica: 0 },
    vidrio: { '10': 0, '12': 1200 },
    cesped: { Pro: 800, Alta: 400 },
    iluminacion: { LED: 900, Halógena: 0 }
  };

  const [op, setOp] = useState<ConfigOpciones>({
    estructura: 'Panorámica',
    vidrio: 12,
    cesped: 'Pro',
    iluminacion: 'LED'
  });

  const precio = useMemo(() => precioPista(op, coefs), [op, coefs]);

  const copiar = async () => {
    await navigator.clipboard.writeText(copiaResumen(op, precio));
    alert('Estimación copiada al portapapeles');
  };

  useEffect(() => {
    window.scrollTo(0,0);
    const existing = localStorage.getItem('cms_custom');
    if (!existing) {
      setContent('cms_custom', defaultCMSContent.custom);
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
    <div className="theme-pistas">
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
              <span className="eyebrow">SOLUCIONES B2B</span>
              <h1 className="h1">CUSTOM PADEL 360 — Pistas a medida</h1>
              <p className="lead">Diseño, fabricación e instalación de pistas de pádel profesionales. Proyecto llave en mano para clubes y promotores.</p>
              <div className="btn-row">
                <a className="btn primary" href="#/custom#proyectos">Ver proyectos</a>
                <a className="btn btn-outline" href="#/custom#contacto">Solicitar presupuesto</a>
              </div>
          </div>
           

            <div className="hero-card hero-blob" aria-hidden="true" />
          </div>
        </div>
      </section>

      <section id="ofrecemos" className="section">
        <div className="container">
          <h2 className="h2 text-center">{content.oferta.title}</h2>
          <p className="lead text-center reading">{content.oferta.text}</p>
        </div>
      </section>

      <section id="servicios" className="section">
        <div className="container">
          <h2 className="h2 text-center">Servicios</h2>
          <div className="grid cols-3 gap-16">
            {content.servicios.map((servicio, i) => (
              <div key={i} className="card">
                <div>
                  {i === 0 && <Hammer size={24} />}
                  {i === 1 && <Wrench size={24} />}
                  {i === 2 && <Shield size={24} />}
                </div>
                <h3 className="h3">{servicio.title}</h3>
                <p>{servicio.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="config" className="section">
        <div className="container">
          <h2 className="h2 text-center">Configura tu pista</h2>
          <div className="config-grid">
            <ConfigCard title="Opciones">
              <Field label="Estructura">
                <select
                  value={op.estructura}
                  onChange={(e) => setOp((s) => ({ ...s, estructura: e.target.value as any }))}
                >
                  <option>Panorámica</option>
                  <option>Clásica</option>
                </select>
              </Field>
              <Field label="Vidrio (mm)">
                <select
                  value={op.vidrio}
                  onChange={(e) => setOp((s) => ({ ...s, vidrio: Number(e.target.value) as any }))}
                >
                  <option value={10}>10</option>
                  <option value={12}>12</option>
                </select>
              </Field>
              <Field label="Césped">
                <select
                  value={op.cesped}
                  onChange={(e) => setOp((s) => ({ ...s, cesped: e.target.value as any }))}
                >
                  <option>Pro</option>
                  <option>Alta</option>
                </select>
              </Field>
              <Field label="Iluminación">
                <select
                  value={op.iluminacion}
                  onChange={(e) => setOp((s) => ({ ...s, iluminacion: e.target.value as any }))}
                >
                  <option>LED</option>
                  <option>Halógena</option>
                </select>
              </Field>
            </ConfigCard>

            <ConfigCard title="Estimación">
              <div className="result">
                <div className="badge-kpi">Precio: {precio.toLocaleString('es-ES')} €</div>
              </div>
              <button className="btn btn-primary" onClick={copiar}>
                Copiar estimación
              </button>
            </ConfigCard>
          </div>
        </div>
      </section>

      <section id="custom-proyectos" className="section">
        <div className="container">
          <h2 className="h2 text-center">Proyectos</h2>
          <div className="grid cols-3 gap-16">
            {content.proyectos.map((proyecto, i) => (
              <div key={i} className="card">
                <div className="illustration" aria-hidden="true" />
                <h3 className="h3">{proyecto.t}</h3>
                <p>{proyecto.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="custom-contacto" className="section">
        <div className="container">
          <h2 className="h2 text-center">Solicita tu presupuesto</h2>
          <p className="lead text-center">Cuéntanos las necesidades de tu proyecto y te responderemos.</p>
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
