import Field from "../../components/forms/Field";
import ConfigCard from "../../components/ui/ConfigCard";

export default function Calc({
  pelotasMes, setPelotasMes,
  precioTubo, setPrecioTubo,
  ciclosRebote, setCiclosRebote,
  ahorro, co2,
  beneficios,
}: {
  pelotasMes: number;
  setPelotasMes: (n: number) => void;
  precioTubo: number;
  setPrecioTubo: (n: number) => void;
  ciclosRebote: number;
  setCiclosRebote: (n: number) => void;
  ahorro: number;
  co2: number;
  beneficios: { titulo: string; texto: string }[];
}) {
  return (
    <section id="calc" className="section">
      <div className="container">
        <h2 className="h2 text-center">Calculadora</h2>
        <p className="lead text-center">Ajusta los parámetros para estimar tu ahorro y el impacto ambiental.</p>

        <div className="config-grid mt-6">
          <ConfigCard title="Parámetros">
            <Field label="Pelotas usadas al mes">
              <input
                type="number"
                min={0}
                value={pelotasMes}
                onChange={(e) => setPelotasMes(Number(e.target.value) || 0)}
              />
            </Field>

            <Field label="Precio por tubo (€)" hint={`Predeterminado: ${precioTubo.toFixed(2)} €`}>
              <input
                type="number"
                min={0}
                step={0.1}
                value={precioTubo}
                onChange={(e) => setPrecioTubo(Number(e.target.value) || 0)}
              />
            </Field>

            <Field label="Ciclos de re-presurización (veces)">
              <input
                type="number"
                min={1}
                step={1}
                value={ciclosRebote}
                onChange={(e) => setCiclosRebote(Number(e.target.value) || 1)}
              />
            </Field>
          </ConfigCard>

          <ConfigCard title="Resultado">
            <div className="result">
              <div className="badge-kpi">Ahorro mensual · € {ahorro.toFixed(0)}</div>
              <p className="muted mt-1">CO₂ evitado: {co2.toFixed(1)} kg</p>
            </div>

            <div className="stack-sm mt-4">
              {beneficios.map((b, i) => (
                <div key={i} className="card card-quiet">
                  <h4 className="h4">{b.titulo}</h4>
                  <p className="mt-1">{b.texto}</p>
                </div>
              ))}
            </div>
          </ConfigCard>
        </div>
      </div>
    </section>
  );
}