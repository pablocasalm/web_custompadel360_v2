import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../lib/auth';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const ok = await login(username, password);
    if (ok) {
      navigate('/admin/dashboard', { replace: true });
    } else {
      setError('Credenciales incorrectas');
    }
  };

  return (
    <div className="section">
      <div className="container" style={{ maxWidth: 560 }}>
        <h1 className="section-title">Acceso administración</h1>
        <form onSubmit={handleLogin} className="form">
          {error && <p className="card-text error-text">{error}</p>}
          <div className="form-group">
            <label className="form-label" htmlFor="username">Usuario</label>
            <input id="username" type="text" className="form-input"
              value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="password">Contraseña</label>
            <input id="password" type="password" className="form-input"
              value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="btn btn-primary full-width">Entrar</button>
          <p className="card-text text-center mt-1">
            Si es tu primera vez, la contraseña que introduzcas quedará establecida.
          </p>
        </form>
      </div>
    </div>
  );
}