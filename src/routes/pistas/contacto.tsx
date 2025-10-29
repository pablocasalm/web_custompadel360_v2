export default function Contacto({ id }: { id: string }) {
    return (
      <section id={id} className="section">
        <div className="container">
          <h2 className="h2 text-center">Solicita tu presupuesto</h2>
          <p className="lead text-center">Cuéntanos las necesidades de tu proyecto y te responderemos.</p>
          <div className="text-center">
            <a href="mailto:info@custompadel360.com" className="btn btn-primary">
              Contactar
            </a>
          </div>
        </div>
      </section>
    );
  }