export default function Hero({
    title,
    subtitle,
  }: {
    title: string;
    subtitle: string;
  }) {
    return (
      <section className="section">
        <div className="max-w">
          <div className="hero hero-split hero--bleed">
            <div className="hero-card">
              <span className="eyebrow">SOSTENIBILIDAD</span>
              <h1 className="h1">{title}</h1>
              <p className="lead">{subtitle}</p>
              <div className="btn-row">
                <a className="btn primary" href="#/pelotas#calc">Abrir calculadora</a>
                <a className="btn btn-outline" href="#/pelotas#planes">Ver planes</a>
              </div>
            </div>
            <div className="hero-card hero-blob" aria-hidden="true" />
          </div>
        </div>
      </section>
    );
  }