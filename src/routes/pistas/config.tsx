import { useMemo } from "react";
import Field from "../../components/forms/Field";
import ConfigCard from "../../components/ui/ConfigCard";
import { Coefs, Opciones, calcularPrecio, resumen } from "./utils";

export default function Config({
  id,
  op,
  setOp,
  coefs,
}: {
  id: string;
  op: Opciones;
  setOp: React.Dispatch<React.SetStateAction<Opciones>>;
  coefs: Coefs;
}) {
  const precio = useMemo(() => calcularPrecio(op, coefs), [op, coefs]);

  const copiar = async () => {
    await navigator.clipboard.writeText(resumen(op, precio));
    alert("Estimación copiada al portapapeles");
  };

  return (
    <section id={id} className="section">
      <div className="container">
        <h2 className="h2 text-center">Configura tu pista</h2>
        <div className="config-grid">
          <ConfigCard title="Opciones">
            <Field label="Estructura">
              <select
                value={op.estructura}
                onChange={(e) =>
                  setOp((s) => ({ ...s, estructura: e.target.value as Opciones["estructura"] }))
                }
              >
                <option>Panorámica</option>
                <option>Clásica</option>
              </select>
            </Field>
            <Field label="Vidrio (mm)">
              <select
                value={op.vidrio}
                onChange={(e) =>
                  setOp((s) => ({ ...s, vidrio: Number(e.target.value) as Opciones["vidrio"] }))
                }
              >
                <option value={10}>10</option>
                <option value={12}>12</option>
              </select>
            </Field>
            <Field label="Césped">
              <select
                value={op.cesped}
                onChange={(e) =>
                  setOp((s) => ({ ...s, cesped: e.target.value as Opciones["cesped"] }))
                }
              >
                <option>Pro</option>
                <option>Alta</option>
              </select>
            </Field>
            <Field label="Iluminación">
              <select
                value={op.iluminacion}
                onChange={(e) =>
                  setOp((s) => ({ ...s, iluminacion: e.target.value as Opciones["iluminacion"] }))
                }
              >
                <option>LED</option>
                <option>Halógena</option>
              </select>
            </Field>
          </ConfigCard>

          <ConfigCard title="Estimación">
            <div className="result">
              <div className="badge-kpi">Precio: {precio.toLocaleString("es-ES")} €</div>
            </div>
            <button className="btn btn-primary" onClick={copiar}>
              Copiar estimación
            </button>
          </ConfigCard>
        </div>
      </div>
    </section>
  );
}