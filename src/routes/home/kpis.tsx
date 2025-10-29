export default function Kpis({
    items,
  }: {
    items: { value: string; label: string }[];
  }) {
    return (
      <section className="section">
        <div className="container">
          <h2 className="h2 text-center">Nuestras Métricas</h2>
          <div className="grid cols-3">
            {items.map((kpi, i) => (
              <div key={i} className="kpi-card">
                <div className="kpi-value">{kpi.value}</div>
                <div className="kpi-label">{kpi.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }