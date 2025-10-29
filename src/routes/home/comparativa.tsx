import { Link } from "react-router-dom";

export default function Comparativa({
  rows,
}: {
  rows: { fila: string; custom: string; rebote: string }[];
}) {
  return (
    <section className="section">
      <div className="container">
        <h2 className="h2 text-center">Comparativa rápida</h2>
        <table className="comparison-table">
          <thead>
            <tr>
              <th></th>
              <th>CUSTOM PADEL 360</th>
              <th>REBOTE</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i}>
                <th>{row.fila}</th>
                <td>{row.custom}</td>
                <td>{row.rebote}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="grid cols-2 gap-16">
          <Link className="btn btn-primary" to="/custom">
            Explorar CUSTOM
          </Link>
          <Link className="btn btn-primary" to="/pelotas">
            Explorar REBOTE
          </Link>
        </div>
      </div>
    </section>
  );
}