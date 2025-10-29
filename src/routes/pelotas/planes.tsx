import ConfigCard from "../../components/ui/ConfigCard";

export default function Planes({
  descripcion,
  items,
  email,
}: {
  descripcion: string;
  items: { id: string; nombre: string; precio?: number; puntos: string[] }[];
  email: string;
}) {
  return (
    <section id="planes" className="section">
      <div className="container">
        <h2 className="h2 text-center">Planes</h2>
        <p className="lead text-center">{descripcion}</p>

        <div className="grid cols-3 gap-16 mt-6">
          {items.map((plan) => (
            <ConfigCard
              key={plan.id}
              title={plan.nombre}
              price={plan.precio}
              period="/mes"
              features={plan.puntos}
              ctaLabel="Solicitar"
              ctaHref={`mailto:${email}?subject=Interés%20en%20plan%20${encodeURIComponent(plan.nombre)}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}