export default function Funciona({
    titulo,
    descripcion,
    pasos,
    destacado,
  }: {
    titulo: string;
    descripcion: string;
    pasos: string[];
    destacado: { titulo: string; texto: string };
  }) {
    return (
      <section id="funciona" className="section">
        <div className="container">
          <h2 className="h2 text-center">{titulo}</h2>
          <p className="lead text-center reading">{descripcion}</p>
  
          <div className="grid cols-2 gap-16 mt-6">
            <div className="card">
              <ul className="list">
                {pasos.map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ul>
            </div>
            <div className="card">
              <h3 className="h3">{destacado.titulo}</h3>
              <p className="mt-1">{destacado.texto}</p>
            </div>
          </div>
        </div>
      </section>
    );
  }