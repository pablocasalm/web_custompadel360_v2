import { useEffect, useState } from 'react';
import { Routes, Route, NavLink, Navigate } from 'react-router-dom';
import { getContent } from './lib/storage';

// Rutas
import Home from './routes/home';
import Custom from './routes/pistas';
import Pelotas from './routes/pelotas/index';
import Tienda from './routes/tienda';
import AdminLogin from './routes/admin/login';
import AdminDashboard from './routes/admin/dashboard';

// Componentes
import NoticeBar from './components/NoticeBar';
import CTASticky from './components/CTASticky';
import SEO from './components/SEO';

/* -----------------------------
   Tipos y seed mínimos (global)
------------------------------ */
type GlobalContent = { aviso: { texto: string; visible: boolean } };
const DEFAULT_GLOBAL: GlobalContent = { aviso: { texto: '', visible: false } };

function getInitialTheme(): 'dark' | 'light' {
  const saved = localStorage.getItem('theme');
  if (saved === 'dark' || saved === 'light') return saved;
  const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
  return prefersDark ? 'dark' : 'light';
}

export default function App() {
  const globalContent =
    getContent<GlobalContent>('cms_global') ?? DEFAULT_GLOBAL;

  const [theme, setTheme] = useState<'dark' | 'light'>(getInitialTheme());

  useEffect(() => {
    const onScroll = () =>
      document.body.classList.toggle('scrolled', window.scrollY > 4);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const navPillClass = ({ isActive }: { isActive: boolean }) =>
    ['nav-pill', isActive ? 'nav-pill--active' : 'nav-pill--outline'].join(' ');

  const toggleTheme = () =>
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'));

  return (
    <div className="app-wrapper">
      <SEO />
      <NoticeBar
        text={globalContent.aviso.texto}
        visible={globalContent.aviso.visible}
      />

      <header className="site-header">
        <div className="container header-bar">
          <div className="brand">
            <div className="logo">P</div>
            <div className="brand-text">
              <div className="brand-title">PADEL</div>
              <div className="brand-subtitle">CUSTOM · REBOTE</div>
            </div>
          </div>
          <nav className="navbar">
            <NavLink to="/" end className={navPillClass}>
              Inicio
            </NavLink>
            <NavLink to="/custom" className={navPillClass}>
              CUSTOM 360
            </NavLink>
            <NavLink to="/pelotas" className={navPillClass}>
              REBOTE
            </NavLink>
            <NavLink to="/tienda" className={navPillClass}>
              Tienda
            </NavLink>
            <button
              className="theme-toggle"
              type="button"
              onClick={toggleTheme}
              aria-pressed={theme === 'dark'}
              aria-label={theme === 'dark' ? 'Cambiar a modo día' : 'Cambiar a modo noche'}
              title={theme === 'dark' ? 'Modo día' : 'Modo noche'}
            >
              <span className="theme-toggle__icon" aria-hidden="true" />
              {theme === 'dark' ? 'Noche' : 'Día'}
            </button>
          </nav>
        </div>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/custom" element={<Custom />} />
          <Route path="/pelotas" element={<Pelotas />} />
          <Route path="/tienda" element={<Tienda />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <footer className="footer">
        <div className="container">
          <p>&copy; 2025 CUSTOM PADEL 360. Todos los derechos reservados.</p>
        </div>
      </footer>

      <CTASticky />
    </div>
  );
}