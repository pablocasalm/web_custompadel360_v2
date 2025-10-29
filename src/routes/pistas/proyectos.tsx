type Proyecto = { t: string; d: string };

export default function Proyectos({
  id,
  items,
}: {
  id: string;
  items: Proyecto[];
}) {
  return (
    <section id={id} className="section">
      <div className="container">
        <h2 className="h2 text-center">Proyectos</h2>
        <div className="grid cols-3 gap-16">
          {items.map((proyecto, i) => (
            <div key={i} className="card">
              <div className="illustration" aria-hidden="true" />
              <h3 className="h3">{proyecto.t}</h3>
              <p>{proyecto.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}