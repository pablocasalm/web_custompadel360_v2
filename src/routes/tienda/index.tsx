import { useMemo, useState } from "react";
import { PRODUCTS, type Product } from "../../data/products";
import ProductCard from "../../components/ui/ProductCard";

type Categoria = Product["categoria"];
const CATS: Categoria[] = ["Pistas", "Pelotas", "Accesorios"];
const TAGS = ["eco", "pro", "club"] as const;
type Tag = typeof TAGS[number];

export default function Tienda() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<Categoria | "Todas">("Todas");
  const [min, setMin] = useState<number | "">("");
  const [max, setMax] = useState<number | "">("");
  const [tags, setTags] = useState<Set<Tag>>(new Set());
  const [sort, setSort] = useState<"relevancia" | "precio-asc" | "precio-desc">("relevancia");

  const toggleTag = (t: Tag) => {
    setTags(s => {
      const n = new Set(s);
      n.has(t) ? n.delete(t) : n.add(t);
      return n;
    });
  };

  const filtered = useMemo(() => {
    let list = PRODUCTS.slice();

    const query = q.trim().toLowerCase();
    if (query) {
      list = list.filter(p =>
        p.nombre.toLowerCase().includes(query) ||
        p.descripcion.toLowerCase().includes(query)
      );
    }

    if (cat !== "Todas") list = list.filter(p => p.categoria === cat);

    list = list.filter(p => (min === "" || p.precio >= min) && (max === "" || p.precio <= max));

    if (tags.size > 0) list = list.filter(p => [...tags].every(t => p.etiquetas.includes(t as any)));

    if (sort === "precio-asc") list.sort((a,b)=> a.precio - b.precio);
    if (sort === "precio-desc") list.sort((a,b)=> b.precio - a.precio);

    return list;
  }, [q, cat, min, max, tags, sort]);

  return (
    <div className="section">
      <div className="max-w">
        <header className="stack-md">
          <h1 className="h1">Tienda</h1>
          <p className="lead">Explora nuestros productos y filtra por categoría, precio y etiquetas.</p>
        </header>

        <section className="filters">
          <div className="filters__row">
            <input
              className="input"
              placeholder="Buscar productos…"
              value={q}
              onChange={(e)=>setQ(e.target.value)}
            />

            <select className="select" value={cat} onChange={(e)=>setCat(e.target.value as any)}>
              <option value="Todas">Todas las categorías</option>
              {CATS.map(c => <option key={c} value={c}>{c}</option>)}
            </select>

            <select className="select" value={sort} onChange={(e)=>setSort(e.target.value as any)}>
              <option value="relevancia">Ordenar por relevancia</option>
              <option value="precio-asc">Precio (menor a mayor)</option>
              <option value="precio-desc">Precio (mayor a menor)</option>
            </select>
          </div>

          <div className="filters__row">
            <div className="range">
              <label>Precio mín.</label>
              <input className="input" type="number" min={0} value={min} onChange={(e)=>setMin(e.target.value === "" ? "" : Number(e.target.value))}/>
            </div>
            <div className="range">
              <label>Precio máx.</label>
              <input className="input" type="number" min={0} value={max} onChange={(e)=>setMax(e.target.value === "" ? "" : Number(e.target.value))}/>
            </div>

            <div className="tags">
              {TAGS.map(t => (
                <button
                  key={t}
                  className={`chip ${tags.has(t) ? "chip--active" : "chip--muted"}`}
                  onClick={()=>toggleTag(t)}
                  aria-pressed={tags.has(t)}
                >
                  #{t}
                </button>
              ))}
              {tags.size > 0 && (
                <button className="btn ghost" onClick={()=>setTags(new Set())}>Limpiar etiquetas</button>
              )}
            </div>
          </div>
        </section>

        <section className="grid cols-auto-fit">
          {filtered.map(p => (
            <ProductCard key={p.id} p={p} />
          ))}
          {filtered.length === 0 && (
            <div className="card card-quiet">
              <p>No hay productos que coincidan con los filtros.</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}