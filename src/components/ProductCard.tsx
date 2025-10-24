import type { Product } from "../data/products";

export default function ProductCard({ p }: { p: Product }) {
  return (
    <article className="card product">
      <div className="product__media" aria-hidden="true"></div>
      <div className="product__body">
        <h3 className="product__title">{p.nombre}</h3>
        <p className="product__desc">{p.descripcion}</p>
        <div className="product__meta">
          <span className="chip">{p.categoria}</span>
          {p.etiquetas.map(t => <span key={t} className="chip chip--muted">#{t}</span>)}
        </div>
        <div className="product__footer">
          <span className="price">{p.precio.toLocaleString("es-ES")} €</span>
          <a href="mailto:info@custompadel360.com?subject=Interés%20producto" className="btn">Consultar</a>
        </div>
      </div>
    </article>
  );
}
