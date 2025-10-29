import { Hammer, Wrench, Shield } from "lucide-react";

type Servicio = { title: string; description: string };

export default function Servicios({
  id,
  items,
}: {
  id: string;
  items: Servicio[];
}) {
  return (
    <section id={id} className="section">
      <div className="container">
        <h2 className="h2 text-center">Servicios</h2>
        <div className="grid cols-3 gap-16">
          {items.map((servicio, i) => (
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
  );
}