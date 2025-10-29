export type ReboteContent = {
    hero: {
      titulo: string;
      subtitulo: string;
    };
    funciona: {
      titulo: string;
      descripcion: string;
      pasos: string[];
      destacado: { titulo: string; texto: string };
    };
    calculadora: {
      beneficios: { titulo: string; texto: string }[];
    };
    planes: {
      descripcion: string;
      items: { id: string; nombre: string; precio?: number; puntos: string[] }[];
    };
    faqs: { q: string; a: string }[];
    ajustes: {
      factorAprovechamiento: number;      // 0..1
      co2KgPorPelotaEvitable: number;     // kg
    };
  };
  
  export type CMSContent = {
    rebote: ReboteContent;
    contacto: { email: string; copy: string };
  };