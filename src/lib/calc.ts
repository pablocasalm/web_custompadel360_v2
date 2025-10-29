// src/lib/calc.ts

// —— EXISTENTES —— //
export function ahorroMensualEuros(
  pelotasMes: number,
  precioTubo: number,
  ciclosRebote: number,
  factorAprovechamiento: number = 0.7
): number {
  const tubosOriginales = pelotasMes / 3;
  const tubosEquivalentesAhorrados =
    tubosOriginales * Math.max(0, ciclosRebote - 1) * factorAprovechamiento;
  const ahorro = tubosEquivalentesAhorrados * Math.max(0, precioTubo);
  return isFinite(ahorro) ? Math.max(0, Math.round(ahorro)) : 0;
}

export function co2EvitadoKg(
  pelotasMes: number,
  co2KgPorPelotaEvitable: number = 0.02,
  ciclosRebote: number = 2
): number {
  const pelotasExtendidas = pelotasMes * Math.max(0, ciclosRebote - 1) * 0.5;
  const total = pelotasExtendidas * Math.max(0, co2KgPorPelotaEvitable);
  return isFinite(total) ? Math.max(0, total) : 0;
}

// —— NUEVOS EXPORTS QUE ESPERAN EN routes/custom.tsx —— //

/** Coeficientes de cálculo (precios base/ponderaciones) */
export type ConfigCoefs = {
  baseObra: number;       // €/m² base de obra civil
  baseEstructura: number; // €/m² estructura/cubierta
  baseIluminacion: number;// € por punto de luz
  baseCerramiento: number;// €/m² cerramiento/vidrio
  margen: number;         // porcentaje 0..1
  iva: number;            // porcentaje 0..1
};

/** Opciones elegidas por el usuario para una pista */
export type ConfigOpciones = {
  imagenesPuntos: any;
  dimensionesM2: number;       // m² (por ejemplo 200 m² aprox)
  cubierta: 'sin' | 'parcial' | 'completa';
  iluminacionPuntos: number;   // nº focos
  cerramientoM2: number;       // m² de cerramiento/vidrio
  cesped: 'estandar' | 'pro';
  puertasExtra: number;        // nº puertas adicionales
  banquillos: boolean;
};

/** Precio desglosado de la pista */
export type PrecioPistaResultado = {
  subtotal: number;
  margen: number;
  iva: number;
  total: number;
  partidas: Record<string, number>;
};

/**
 * Cálculo simplificado y transparente para un presupuesto estimado de pista.
 * Puedes modificar coeficientes desde el panel admin si lo conectas a CMS.
 */
export function precioPista(
  opciones: ConfigOpciones,
  coefs: ConfigCoefs
): PrecioPistaResultado {
  const partes: Record<string, number> = {};

  // Obra civil
  partes['obra'] = opciones.dimensionesM2 * coefs.baseObra;

  // Estructura / cubierta
  const multCubierta =
    opciones.cubierta === 'sin' ? 0 :
    opciones.cubierta === 'parcial' ? 0.6 : 1.0;
  partes['estructura'] = opciones.dimensionesM2 * coefs.baseEstructura * multCubierta;

  // Iluminación
  partes['iluminacion'] = opciones.imagenesPuntos
    ? opciones.imagenesPuntos * coefs.baseIluminacion
    : opciones.iluminacionPuntos * coefs.baseIluminacion;

  // Cerramiento
  partes['cerramiento'] = opciones.cerramientoM2 * coefs.baseCerramiento;

  // Césped
  const multCesped = opciones.cesped === 'pro' ? 1.25 : 1.0;
  partes['cesped'] = opciones.dimensionesM2 * 12 * multCesped; // €/m² (estimado)

  // Extras
  partes['puertas'] = opciones.puertasExtra * 250;
  partes['banquillos'] = opciones.banquillos ? 600 : 0;

  const subtotal = Object.values(partes).reduce((a, b) => a + b, 0);
  const margen = subtotal * (coefs.margen ?? 0);
  const baseImponible = subtotal + margen;
  const iva = baseImponible * (coefs.iva ?? 0);
  const total = baseImponible + iva;

  return {
    subtotal: Math.round(subtotal),
    margen: Math.round(margen),
    iva: Math.round(iva),
    total: Math.round(total),
    partidas: partes,
  };
}

/** Crea un resumen textual para copiar/pegar en un email o WhatsApp */
export function copiaResumen(
  resultado: PrecioPistaResultado,
  opciones: ConfigOpciones
): string {
  const lineas = [
    `Estimación Pista de Pádel`,
    `Dimensión: ${opciones.dimensionesM2} m² · Cubierta: ${opciones.cubierta} · Césped: ${opciones.cesped}`,
    `Iluminación: ${opciones.iluminacionPuntos} focos · Cerramiento: ${opciones.cerramientoM2} m²`,
    `Extras: puertas ${opciones.puertasExtra} · banquillos ${opciones.banquillos ? 'sí' : 'no'}`,
    ``,
    `Subtotal: € ${resultado.subtotal}`,
    `Margen:   € ${resultado.margen}`,
    `IVA:      € ${resultado.iva}`,
    `TOTAL:    € ${resultado.total}`,
  ];
  return lineas.join('\n');
}