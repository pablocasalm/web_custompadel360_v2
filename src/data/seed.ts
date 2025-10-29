import { CMSContent } from './schema';

export const defaultCMSContent: CMSContent = {
  rebote: {
    hero: {
      titulo: 'Re-presurización y reciclaje de pelotas',
      subtitulo: 'Reduce costes y huella de CO₂ alargando la vida útil de tus pelotas.',
    },
    funciona: {
      titulo: 'Cómo funciona',
      descripcion: 'Recolectamos, re-presurizamos y reintroducimos las pelotas en tu circuito con garantías.',
      pasos: [
        'Recogida programada en tus instalaciones',
        'Clasificación por estado y marcas',
        'Re-presurización en cámaras seguras',
        'Control de calidad y trazabilidad',
        'Entrega y seguimiento de rendimiento',
      ],
      destacado: {
        titulo: 'Resultados consistentes',
        texto: 'Proceso estandarizado con parámetros ajustables según tus necesidades.',
      },
    },
    calculadora: {
      beneficios: [
        { titulo: 'Ahorro directo', texto: 'Reduce la compra de tubos nuevos gracias a ciclos de re-uso.' },
        { titulo: 'Menos residuos', texto: 'Disminuye la cantidad de pelotas desechadas cada mes.' },
        { titulo: 'CO₂ evitado', texto: 'Evita emisiones asociadas a producción y transporte.' },
      ],
    },
    planes: {
      descripcion: 'Elige el plan que mejor se adapte al volumen de tu club.',
      items: [
        { id: 'starter', nombre: 'Starter', precio: 49, puntos: ['Hasta 300 pelotas/mes', 'Recogida mensual', 'Informe básico'] },
        { id: 'pro', nombre: 'Pro', precio: 129, puntos: ['Hasta 1.200 pelotas/mes', 'Recogida quincenal', 'Informe detallado'] },
        { id: 'enterprise', nombre: 'Enterprise', puntos: ['Volumen a medida', 'SLA dedicado', 'Integración operativa'] },
      ],
    },
    faqs: [
      { q: '¿La sensación es igual que una pelota nueva?', a: 'No exactamente, pero se aproxima mucho según el ciclo aplicado.' },
      { q: '¿Cuántos ciclos puedo hacer?', a: 'Recomendamos 2–4 ciclos según estado y uso.' },
      { q: '¿Qué garantía ofrecéis?', a: 'Sustitución sin coste si el lote no cumple el nivel acordado.' },
    ],
    ajustes: {
      factorAprovechamiento: 0.7,
      co2KgPorPelotaEvitable: 0.02,
    },
  },
  contacto: {
    email: 'info@custompadel360.com',
    copy: 'Solicita información sobre nuestros planes y ahorra en costes de pelotas.',
  },
};