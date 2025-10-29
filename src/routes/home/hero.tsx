import { Link } from "react-router-dom";

export default function Hero({
  badge,
  title,
  lead,
}: {
  badge: string;
  title: string;
  lead: string;
}) {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-split">
          <div className="hero-content">
            <div className="eyebrow">{badge}</div>
            <h1 className="h1">{title}</h1>
            <p className="lead">{lead}</p>
            <div className="grid cols-2 gap-16">
              <Link className="btn btn-primary" to="/custom">
                Ver CUSTOM
              </Link>
              <Link className="btn" to="/pelotas">
                Ver REBOTE
              </Link>
            </div>
          </div>
          <div className="illustration" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}