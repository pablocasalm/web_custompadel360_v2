export interface ValueProp {
  t: string;
  d: string;
}

export interface ComparisonRow {
  fila: string;
  custom: string;
  rebote: string;
}

export interface Logo {
  name: string;
}

export interface KPI {
  label: string;
  value: string;
}

export interface HomeContent {
  hero: {
    badge: string;
    title: string;
    lead: string;
  };
  valueProps: ValueProp[];
  comparativa: ComparisonRow[];
  logos: Logo[];
  proceso: string[];
  kpis: KPI[];
}

export interface Service {
  title: string;
  description: string;
}

export interface Project {
  t: string;
  d: string;
}

export interface CaseStudy {
  reto: string;
  sol: string;
  res: string;
}

export interface ConfigOptions {
  estructura: string[];
  vidrio: number[];
  cesped: string[];
  luz: string[];
}

export interface ConfigCoefficients {
  base: number;
  estructura: Record<string, number>;
  vidrio: Record<string, number>;
  cesped: Record<string, number>;
  luz: Record<string, number>;
}

export interface CustomContent {
  hero: {
    badge: string;
    title: string;
    lead: string;
  };
  oferta: {
    title: string;
    text: string;
  };
  servicios: Service[];
  proyectos: Project[];
  casos: CaseStudy[];
  normativa: string[];
  config: {
    opciones: ConfigOptions;
    coeficientes: ConfigCoefficients;
  };
}

export interface Plan {
  t: string;
  d: string;
  badge: string;
  sla?: {
    respuesta: string;
    recogida: string;
  };
}

export interface FAQ {
  q: string;
  a: string;
}

export interface ReboteContent {
  hero: {
    badge: string;
    title: string;
    lead: string;
  };
  proceso: string[];
  planes: Plan[];
  faqs: FAQ[];
  impacto: {
    pelotasRecuperadas: number;
  };
  calcParams: {
    precioTubo: number;
    factorCO2: number;
    ciclosMax: number;
  };
}

export interface Testimonial {
  nombre: string;
  rol: string;
  texto: string;
}

export interface GlobalContent {
  testimonios: Testimonial[];
  faq: FAQ[];
  aviso: {
    texto: string;
    visible: boolean;
  };
}

export interface CMSContent {
  home: HomeContent;
  custom: CustomContent;
  rebote: ReboteContent;
  global: GlobalContent;
}

export const defaultCMSContent: CMSContent = {
  home: {
    hero: {
      badge: 'Bienvenido',
      title: 'Soluciones de pádel para clubes y empresas',
      lead: 'Construcción de pistas profesionales y reciclaje de pelotas. Elige tu camino.',
    },
    valueProps: [
      { t: 'Instalación llave en mano', d: 'De proyecto a puesta en marcha' },
      { t: 'Materiales de calidad', d: 'Homologados y certificados' },
      { t: 'Economía circular', d: 'Re-presurización y reciclaje' },
      { t: 'Soporte continuo', d: 'Mantenimiento y asesoría' },
    ],
    comparativa: [
      { fila: 'Para quién', custom: 'Clubes y Promotores', rebote: 'Clubes y Empresas' },
      { fila: 'Qué resuelve', custom: 'Construcción de pistas', rebote: 'Vida útil de pelotas' },
      { fila: 'Tiempo', custom: '3-6 meses', rebote: 'Servicio mensual' },
      { fila: 'Coste estimado', custom: 'Desde 15.000€', rebote: 'Desde 49€/mes' },
      { fila: 'Sostenibilidad', custom: 'Materiales eco', rebote: 'Reducción residuos' },
    ],
    logos: [
      { name: 'Club Madrid' },
      { name: 'Pádel Barcelona' },
      { name: 'Complejo Valencia' },
      { name: 'Deportivo Sevilla' },
      { name: 'Centro Bilbao' },
      { name: 'Empresa Sports' },
    ],
    proceso: ['Descubrimiento', 'Propuesta', 'Ejecución', 'Soporte'],
    kpis: [
      { label: 'Pistas instaladas', value: '+120' },
      { label: 'Pelotas recuperadas', value: '+25.000' },
      { label: 'Reducción residuos', value: '-35%' },
    ],
  },
  custom: {
    hero: {
      badge: 'Soluciones B2B',
      title: 'CUSTOM PADEL 360 — Pistas a medida',
      lead: 'Diseño, fabricación e instalación de pistas de pádel profesionales.',
    },
    oferta: {
      title: 'Qué ofrecemos',
      text: 'Soluciones completas para la construcción de pistas. Desde el diseño hasta la entrega final.',
    },
    servicios: [
      { title: 'Proyecto y visado', description: 'Diseño técnico y tramitación de permisos' },
      { title: 'Fabricación y montaje', description: 'Construcción con materiales de calidad' },
      { title: 'Mantenimiento', description: 'Servicio postventa y mantenimiento' },
    ],
    proyectos: [
      { t: 'Club Deportivo La Moraleja', d: 'Instalación panorámica exterior' },
      { t: 'Complejo Pádel Valencia', d: '4 pistas cubiertas LED' },
      { t: 'Centro Deportivo Madrid Norte', d: '2 pistas clásicas' },
    ],
    casos: [
      {
        reto: 'Instalación en terreno irregular',
        sol: 'Nivelación y estructura reforzada',
        res: 'Pistas operativas en 4 meses',
      },
      {
        reto: 'Normativa municipal estricta',
        sol: 'Visado completo y seguimiento',
        res: 'Licencias aprobadas sin retrasos',
      },
    ],
    normativa: [
      'UNE-EN 15330 (Superficies deportivas)',
      'Vidrio templado 10/12mm certificado',
      'Césped artificial homologado FIP',
      'Iluminación LED >500 lux',
      'Estructura metálica galvanizada',
    ],
    config: {
      opciones: {
        estructura: ['Panorámica', 'Clásica'],
        vidrio: [10, 12],
        cesped: ['Pro', 'Alta gama'],
        luz: ['LED', 'Halógena'],
      },
      coeficientes: {
        base: 15000,
        estructura: { Panorámica: 3500, Clásica: 0 },
        vidrio: { '10': 0, '12': 1200 },
        cesped: { Pro: 800, 'Alta gama': 400 },
        luz: { LED: 900, Halógena: 0 },
      },
    },
  },
  rebote: {
    hero: {
      badge: 'Economía circular',
      title: 'REBOTE — Re-presurización y reciclaje',
      lead: 'Alarga la vida de las pelotas y reduce residuos.',
    },
    proceso: ['Recogida', 'Clasificación', 'Re-presión', 'Control de calidad', 'Entrega'],
    planes: [
      {
        t: 'Club',
        d: 'Servicio mensual recurrente hasta 150 pelotas',
        badge: 'Desde 49€/mes',
        sla: { respuesta: '24h', recogida: 'Mensual' },
      },
      {
        t: 'Empresa',
        d: 'Volumen flexible con logística incluida',
        badge: 'A medida',
        sla: { respuesta: '12h', recogida: 'Quincenal' },
      },
      {
        t: 'Eventos',
        d: 'Servicio bajo demanda para torneos',
        badge: 'Bajo demanda',
        sla: { respuesta: '6h', recogida: 'In situ' },
      },
    ],
    faqs: [
      {
        q: '¿Cuántas veces se puede re-presurizar una pelota?',
        a: 'Dependiendo del uso, entre 3 y 5 veces antes del reciclaje final.',
      },
      {
        q: '¿Cómo es el proceso de recogida?',
        a: 'Recogemos en tu instalación según plan (mensual, quincenal o bajo demanda).',
      },
      {
        q: '¿Qué hacéis con las pelotas que no se pueden re-presurizar?',
        a: 'Las reciclamos mediante procesos certificados, aprovechando materiales.',
      },
    ],
    impacto: {
      pelotasRecuperadas: 25000,
    },
    calcParams: {
      precioTubo: 6.0,
      factorCO2: 0.08,
      ciclosMax: 4,
    },
  },
  global: {
    testimonios: [
      {
        nombre: 'Laura Martínez',
        rol: 'Directora Club Pádel Madrid',
        texto: 'Resultados excelentes. Las pistas quedaron perfectas y el plazo se cumplió.',
      },
      {
        nombre: 'Carlos Ruiz',
        rol: 'Responsable Mantenimiento Sports SA',
        texto: 'El servicio de re-presurización nos ahorra miles de euros al año.',
      },
      {
        nombre: 'Ana López',
        rol: 'Gerente Complejo Valencia',
        texto: 'Profesionalidad y calidad. Totalmente recomendable.',
      },
    ],
    faq: [
      { q: '¿Instaláis en toda España?', a: 'Sí, cobertura nacional con equipos propios.' },
      { q: '¿Ofrecéis financiación?', a: 'Sí, colaboramos con entidades financieras.' },
      { q: '¿Qué garantía tienen las pistas?', a: '2 años de garantía en estructura y materiales.' },
    ],
    aviso: {
      texto: 'Promoción clubes verano 2025: 10% descuento en instalaciones antes de junio',
      visible: true,
    },
  },
};
