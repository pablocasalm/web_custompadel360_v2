export type ConfigOpciones = {
  estructura: "Panorámica" | "Clásica";
  vidrio: 10 | 12;
  cesped: "Pro" | "Alta";
  iluminacion: "LED" | "Halógena";
};

export type ConfigCoefs = {
  base: number;
  estructura: Record<string, number>;
  vidrio: Record<string, number>;
  cesped: Record<string, number>;
  iluminacion: Record<string, number>;
};

export function precioPista(op: ConfigOpciones, cf: ConfigCoefs): number {
  const total =
    cf.base +
    (cf.estructura[op.estructura] || 0) +
    (cf.vidrio[String(op.vidrio)] || 0) +
    (cf.cesped[op.cesped] || 0) +
    (cf.iluminacion[op.iluminacion] || 0);
  return Math.max(0, Math.round(total));
}

export function copiaResumen(op: ConfigOpciones, precio: number): string {
  return `Configuración de pista:
- Estructura: ${op.estructura}
- Vidrio: ${op.vidrio} mm
- Césped: ${op.cesped}
- Iluminación: ${op.iluminacion}
Precio estimado: ${precio.toLocaleString("es-ES")} €`;
}

export function ahorroMensualEuros(
  pelotasMes: number,
  precioTubo: number,
  pelotasPorTubo: number,
  ciclos: number,
  ahorroPorCicloPct: number
): number {
  const tubosMes = pelotasMes / pelotasPorTubo;
  const costeNuevo = tubosMes * precioTubo;
  const ahorro = Math.min(ciclos, 12) * (costeNuevo * ahorroPorCicloPct) / 12;
  return Math.max(0, Math.round(ahorro));
}

export function co2EvitadoKg(pelotasMes: number, factorCO2porPelotaKg: number, ciclos: number): number {
  const evitadas = pelotasMes * (ciclos / 12);
  return Math.max(0, +(evitadas * factorCO2porPelotaKg).toFixed(2));
}
