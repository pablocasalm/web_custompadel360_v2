import { Link } from "react-router-dom";

export default function Cta() {
  return (
    <section id="empieza-hoy" className="cta-start">
      <div className="container">
        <div className="cta-card">
          <div className="cta-start__inner">
            <h2 className="cta-title">EMPIEZA HOY</h2>
            <p className="cta-lead">
              Cuéntanos tu proyecto o solicita una estimación. Te respondemos rápido con la mejor opción para tu club o empresa.
            </p>
            <div className="cta-actions">
              <a className="btn btn-lg primary" href="mailto:info@custompadel360.com">
                Solicitar presupuesto
              </a>
              <Link className="btn btn-lg ghost" to="/pelotas#planes">
                Ver planes
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}