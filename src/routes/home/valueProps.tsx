import { Check } from "lucide-react";

export default function ValueProps({
  items,
}: {
  items: { t: string; d: string }[];
}) {
  return (
    <section className="section">
      <div className="container">
        <h2 className="h2 text-center">Qué hacemos en 30 segundos</h2>
        <div className="grid cols-auto-fit">
          {items.map((prop, i) => (
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
  );
}