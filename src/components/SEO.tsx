import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title: string;
  description: string;
}

const routeTitles: Record<string, SEOProps> = {
  '/': {
    title: 'CUSTOM PADEL 360 | Construcción de pistas y reciclaje de pelotas',
    description: 'Soluciones B2B para clubes: construcción de pistas de pádel profesionales y servicio de re-presurización de pelotas.',
  },
  '/custom': {
    title: 'CUSTOM PADEL 360 | Pistas a medida para clubes',
    description: 'Diseño, fabricación e instalación de pistas de pádel. Proyecto llave en mano con garantías.',
  },
  '/rebote': {
    title: 'REBOTE | Re-presurización y reciclaje de pelotas',
    description: 'Alarga la vida de las pelotas de pádel y reduce residuos. Economía circular para tu club.',
  },
  '/admin': {
    title: 'Admin | CUSTOM PADEL 360',
    description: 'Panel de administración',
  },
};

export default function SEO() {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    const seo = routeTitles[path] || routeTitles['/'];

    document.title = seo.title;

    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', seo.description);

    let metaOGTitle = document.querySelector('meta[property="og:title"]');
    if (!metaOGTitle) {
      metaOGTitle = document.createElement('meta');
      metaOGTitle.setAttribute('property', 'og:title');
      document.head.appendChild(metaOGTitle);
    }
    metaOGTitle.setAttribute('content', seo.title);

    let metaOGDescription = document.querySelector('meta[property="og:description"]');
    if (!metaOGDescription) {
      metaOGDescription = document.createElement('meta');
      metaOGDescription.setAttribute('property', 'og:description');
      document.head.appendChild(metaOGDescription);
    }
    metaOGDescription.setAttribute('content', seo.description);

    let metaOGImage = document.querySelector('meta[property="og:image"]');
    if (!metaOGImage) {
      metaOGImage = document.createElement('meta');
      metaOGImage.setAttribute('property', 'og:image');
      document.head.appendChild(metaOGImage);
    }
    metaOGImage.setAttribute('content', '/og-image.jpg');
  }, [location.pathname]);

  return null;
}
