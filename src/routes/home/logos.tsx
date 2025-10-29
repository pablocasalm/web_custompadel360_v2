export default function Logos({ items }: { items: { name: string }[] }) {
    return (
      <section className="section">
        <div className="container">
          <h2 className="h2 text-center">Clientes y Colaboradores</h2>
          <div className="logos-grid">
            {items.map((logo, i) => (
              <div key={i} className="logo-placeholder">
                {logo.name}
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }