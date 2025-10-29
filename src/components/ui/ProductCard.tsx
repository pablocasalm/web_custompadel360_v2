import type { Product } from "../../data/products";

export default function ProductCard({ p }: { p: Product }) {
  return (
    <article className="card product">
      <div className="product__media" aria-hidden="true">
        {/* placeholder simple si no hay imagen */}
        {p.img ? (
          <img src={p.img} alt={p.nombre} style={{ width: '100%', height: 160, objectFit: 'cover', borderRadius: 12 }} />
        ) : (
          <div style={{ width: '100%', height: 160, borderRadius: 12, border: '1px dashed rgba(0,0,0,.12)' }} />
        )}
      </div>

      <header className="product__head">
        <h3 className="h3">{p.nombre}</h3>
        <div className="muted">{p.categoria}</div>
      </header>

      <p className="product__desc">{p.descripcion}</p>

      <div className="product__meta">
        <div className="price">€ {p.precio.toLocaleString('es-ES')}</div>
        <div className="tags">
          {p.etiquetas.map(t => (
            <span key={t} className="chip">{t}</span>
          ))}
        </div>
      </div>

      {p.url && (
        <a href={p.url} className="btn btn-primary" target="_blank" rel="noreferrer">
          Ver detalle
        </a>
      )}
    </article>
  );
}