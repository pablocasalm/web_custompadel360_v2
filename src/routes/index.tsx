import { useEffect } from 'react';
import { Check } from 'lucide-react';
import { getContent, setContent } from '../lib/storage';
import { HomeContent, defaultCMSContent } from '../lib/types';

export default function Inicio() {
  const content = getContent<HomeContent>('cms_home', defaultCMSContent.home);

  useEffect(() => {
    window.scrollTo(0,0);
    const existing = localStorage.getItem('cms_home');
    if (!existing) {
      setContent('cms_home', defaultCMSContent.home);
    }
  }, []);

  return (
    <div>
      <section className="hero">
        <div className="container">
          <div className="hero-split">
            <div className="hero-content">
              <div className="eyebrow">{content.hero.badge}</div>
              <h1 className="h1">{content.hero.title}</h1>
              <p className="lead">{content.hero.lead}</p>
              <div className="grid cols-2 gap-16">
                <a className="btn btn-primary" href="#/custom">
                  Ver CUSTOM
                </a>
                <a className="btn" href="#/rebote">
                  Ver REBOTE
                </a>
              </div>
            </div>
            <div className="illustration" aria-hidden="true" />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="h2 text-center">Qué hacemos en 30 segundos</h2>
          <div className="grid cols-auto-fit">
            {content.valueProps.map((prop, i) => (
              <div key={i} className="card">
                <div>
                  <Check size={28} strokeWidth={3} />
                </div>
                <h3 className="h3">{prop.t}</h3>
                <p>{prop.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="h2 text-center">Comparativa rápida</h2>
          <table className="comparison-table">
            <thead>
              <tr>
                <th></th>
                <th>CUSTOM PADEL 360</th>
                <th>REBOTE</th>
              </tr>
            </thead>
            <tbody>
              {content.comparativa.map((row, i) => (
                <tr key={i}>
                  <th>{row.fila}</th>
                  <td>{row.custom}</td>
                  <td>{row.rebote}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="grid cols-2 gap-16">
            <a className="btn btn-primary" href="#/custom">
              Explorar CUSTOM
            </a>
            <a className="btn btn-primary" href="#/rebote">
              Explorar REBOTE
            </a>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="h2 text-center">Clientes y Colaboradores</h2>
          <div className="logos-grid">
            {content.logos.map((logo, i) => (
              <div key={i} className="logo-placeholder">
                {logo.name}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="h2 text-center">Proceso en 4 pasos</h2>
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

      <section className="section">
        <div className="container">
          <h2 className="h2 text-center">Nuestras Métricas</h2>
          <div className="grid cols-3">
            {content.kpis.map((kpi, i) => (
              <div key={i} className="kpi-card">
                <div className="kpi-value">{kpi.value}</div>
                <div className="kpi-label">{kpi.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="empieza-hoy" className="cta-start">
        <div className="container">
          <div className="cta-card">
            <div className="cta-start__inner">
              <h2 className="cta-title">EMPIEZA HOY</h2>
              <p className="cta-lead">
                Cuéntanos tu proyecto o solicita una estimación. Te respondemos rápido con la mejor opción para tu club o empresa.
              </p>
              <div className="cta-actions">
                <a className="btn btn-lg primary" href="mailto:info@custompadel360.com">
                  Solicitar presupuesto
                </a>
                <a className="btn btn-lg ghost" href="#/rebote#rebote-planes">
                  Ver planes
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
