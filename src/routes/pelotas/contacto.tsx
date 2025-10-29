export default function Contacto({
    copy,
    email,
  }: {
    copy: string;
    email: string;
  }) {
    return (
      <section id="contacto" className="section">
        <div className="container">
          <h2 className="h2 text-center">Empieza hoy</h2>
          <p className="lead text-center">{copy}</p>
          <div className="text-center">
            <a href={`mailto:${email}`} className="btn btn-primary">
              Contactar
            </a>
          </div>
        </div>
      </section>
    );
  }