export default function Hero({ lead }: { lead: string }) {
    return (
      <section className="section">
        <div className="max-w">
          <div className="hero hero-split hero--bleed">
            <div className="hero-card">
              <span className="eyebrow">SOLUCIONES B2B</span>
              <h1 className="h1">CUSTOM PADEL 360 — Pistas a medida</h1>
              <p className="lead">{lead}</p>
              <div className="btn-row">
                <a className="btn primary" href="#/custom#proyectos">Ver proyectos</a>
                <a className="btn btn-outline" href="#/custom#contacto">Solicitar presupuesto</a>
              </div>
            </div>
            <div className="hero-card hero-blob" aria-hidden="true" />
          </div>
        </div>
      </section>
    );
  }