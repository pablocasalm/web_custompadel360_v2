// Tipos compartidos y utilidades del configurador

export type Coefs = {
    base: number;
    estructura: Record<'Panorámica' | 'Clásica', number>;
    vidrio: Record<'10' | '12', number>;
    cesped: Record<'Pro' | 'Alta', number>;
    iluminacion: Record<'LED' | 'Halógena', number>;
  };
  
  export type Opciones = {
    estructura: 'Panorámica' | 'Clásica';
    vidrio: 10 | 12;
    cesped: 'Pro' | 'Alta';
    iluminacion: 'LED' | 'Halógena';
  };
  
  export function calcularPrecio(op: Opciones, coefs: Coefs): number {
    const total =
      (coefs.base || 0) +
      (coefs.estructura?.[op.estructura] || 0) +
      (coefs.vidrio?.[String(op.vidrio) as '10' | '12'] || 0) +
      (coefs.cesped?.[op.cesped] || 0) +
      (coefs.iluminacion?.[op.iluminacion] || 0);
    return Math.max(0, Math.round(total));
  }
  
  export function resumen(op: Opciones, total: number): string {
    return [
      'Estimación Pista de Pádel',
      `Estructura: ${op.estructura} · Vidrio: ${op.vidrio}mm`,
      `Césped: ${op.cesped} · Iluminación: ${op.iluminacion}`,
      '',
      `TOTAL estimado: € ${total.toLocaleString('es-ES')}`,
    ].join('\n');
  }