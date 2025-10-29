export default function Proceso({ pasos }: { pasos: string[] }) {
    return (
      <section className="section">
        <div className="container">
          <h2 className="h2 text-center">Proceso en 4 pasos</h2>
          <div className="timeline">
            {pasos.map((step, i) => (
              <div key={i} className="timeline-step">
                <div className="timeline-number">{i + 1}</div>
                <div className="timeline-title">{step}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }