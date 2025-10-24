import { useState, useEffect, useRef, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, logout, isLoggedIn } from '../lib/auth';
import { getContent, setContent, exportToFile, importFromFile } from '../lib/storage';

export default function Admin() {
  const [loggedIn, setLoggedIn] = useState(isLoggedIn());
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const [inicioData, setInicioData] = useState(getContent('inicio', {}));
  const [customData, setCustomData] = useState(getContent('custom', {}));
  const [reboteData, setReboteData] = useState(getContent('rebote', {}));

  const defaultParams = {
    custom: {
      config: {
        coeficientes: {
          base: 10000,
          estructura: { Panorámica: 3500, Clásica: 0 },
          vidrio: { '10': 0, '12': 1200 },
          cesped: { Pro: 800, Alta: 400 },
          iluminacion: { LED: 900, Halógena: 0 }
        }
      }
    },
    rebote: {
      calcParams: {
        precioTubo: 6.0,
        pelotasPorTubo: 3,
        factorCO2porPelotaKg: 0.08,
        ciclosMax: 4,
        ahorroPorCicloPct: 0.6
      }
    }
  };

  const [params, setParams] = useState(() => {
    const stored = getContent('cms', {});
    return {
      custom: stored.custom || defaultParams.custom,
      rebote: stored.rebote || defaultParams.rebote
    };
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setLoggedIn(isLoggedIn());
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const success = await login(username, password);
    if (success) {
      setLoggedIn(true);
      setUsername('');
      setPassword('');
    } else {
      setError('Credenciales incorrectas');
    }
  };

  const handleLogout = () => {
    logout();
    setLoggedIn(false);
    navigate('/');
  };

  const handleSave = () => {
    setContent('inicio', inicioData);
    setContent('custom', customData);
    setContent('rebote', reboteData);
    setContent('cms', params);
    alert('Contenidos guardados correctamente');
  };

  const handleExport = () => {
    const allData = {
      inicio: inicioData,
      custom: customData,
      rebote: reboteData,
      cms: params,
    };
    exportToFile(allData, 'padel-content.json');
  };

  const handleImport = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const data = (await importFromFile(file)) as {
        inicio?: typeof inicioData;
        custom?: typeof customData;
        rebote?: typeof reboteData;
        cms?: typeof params;
      };
      if (data.inicio) setInicioData(data.inicio);
      if (data.custom) setCustomData(data.custom);
      if (data.rebote) setReboteData(data.rebote);
      if (data.cms) setParams(data.cms);
      alert('Contenidos importados correctamente');
    } catch {
      alert('Error al importar el archivo');
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  if (!loggedIn) {
    return (
      <div className="section">
        <div className="container">
          <h1 className="section-title">Acceso administración</h1>
          <form onSubmit={handleLogin} className="form">
            {error && (
              <p className="card-text error-text">
                {error}
              </p>
            )}
            <div className="form-group">
              <label className="form-label" htmlFor="username">
                Usuario
              </label>
              <input
                id="username"
                type="text"
                className="form-input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="password">
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                className="form-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary full-width">
              Entrar
            </button>
            <p className="card-text text-center mt-1">
              Puedes establecer la contraseña en la primera configuración.
            </p>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="section">
      <div className="container">
        <h1 className="section-title">Editor de contenidos</h1>

        <div className="editor-section">
          <h2 className="editor-title">Inicio</h2>
          {Object.keys(inicioData).map((key) => (
            <div key={key} className="form-group">
              <label className="form-label" htmlFor={`inicio-${key}`}>
                {key}
              </label>
              <textarea
                id={`inicio-${key}`}
                className="form-textarea"
                value={inicioData[key as keyof typeof inicioData] as string}
                onChange={(e) =>
                  setInicioData({ ...inicioData, [key]: e.target.value })
                }
              />
            </div>
          ))}
        </div>

        <div className="editor-section">
          <h2 className="editor-title">Custom Padel 360</h2>
          {Object.keys(customData).map((key) => (
            <div key={key} className="form-group">
              <label className="form-label" htmlFor={`custom-${key}`}>
                {key}
              </label>
              <textarea
                id={`custom-${key}`}
                className="form-textarea"
                value={customData[key as keyof typeof customData] as string}
                onChange={(e) =>
                  setCustomData({ ...customData, [key]: e.target.value })
                }
              />
            </div>
          ))}
        </div>

        <div className="editor-section">
          <h2 className="editor-title">Rebote</h2>
          {Object.keys(reboteData).map((key) => (
            <div key={key} className="form-group">
              <label className="form-label" htmlFor={`rebote-${key}`}>
                {key}
              </label>
              <textarea
                id={`rebote-${key}`}
                className="form-textarea"
                value={reboteData[key as keyof typeof reboteData] as string}
                onChange={(e) =>
                  setReboteData({ ...reboteData, [key]: e.target.value })
                }
              />
            </div>
          ))}
        </div>

        <div className="editor-section">
          <h2 className="editor-title">Parámetros del Configurador (Custom)</h2>
          <div className="form-group">
            <label className="form-label">Base (€)</label>
            <input
              type="number"
              className="form-input"
              value={params.custom.config.coeficientes.base}
              onChange={(e) =>
                setParams({
                  ...params,
                  custom: {
                    ...params.custom,
                    config: {
                      ...params.custom.config,
                      coeficientes: {
                        ...params.custom.config.coeficientes,
                        base: Number(e.target.value)
                      }
                    }
                  }
                })
              }
            />
          </div>
          <div className="form-group">
            <label className="form-label">Panorámica (€)</label>
            <input
              type="number"
              className="form-input"
              value={params.custom.config.coeficientes.estructura.Panorámica}
              onChange={(e) =>
                setParams({
                  ...params,
                  custom: {
                    ...params.custom,
                    config: {
                      ...params.custom.config,
                      coeficientes: {
                        ...params.custom.config.coeficientes,
                        estructura: { ...params.custom.config.coeficientes.estructura, Panorámica: Number(e.target.value) }
                      }
                    }
                  }
                })
              }
            />
          </div>
          <div className="form-group">
            <label className="form-label">Vidrio 12mm (€)</label>
            <input
              type="number"
              className="form-input"
              value={params.custom.config.coeficientes.vidrio['12']}
              onChange={(e) =>
                setParams({
                  ...params,
                  custom: {
                    ...params.custom,
                    config: {
                      ...params.custom.config,
                      coeficientes: {
                        ...params.custom.config.coeficientes,
                        vidrio: { ...params.custom.config.coeficientes.vidrio, '12': Number(e.target.value) }
                      }
                    }
                  }
                })
              }
            />
          </div>
          <div className="form-group">
            <label className="form-label">Césped Pro (€)</label>
            <input
              type="number"
              className="form-input"
              value={params.custom.config.coeficientes.cesped.Pro}
              onChange={(e) =>
                setParams({
                  ...params,
                  custom: {
                    ...params.custom,
                    config: {
                      ...params.custom.config,
                      coeficientes: {
                        ...params.custom.config.coeficientes,
                        cesped: { ...params.custom.config.coeficientes.cesped, Pro: Number(e.target.value) }
                      }
                    }
                  }
                })
              }
            />
          </div>
          <div className="form-group">
            <label className="form-label">Iluminación LED (€)</label>
            <input
              type="number"
              className="form-input"
              value={params.custom.config.coeficientes.iluminacion.LED}
              onChange={(e) =>
                setParams({
                  ...params,
                  custom: {
                    ...params.custom,
                    config: {
                      ...params.custom.config,
                      coeficientes: {
                        ...params.custom.config.coeficientes,
                        iluminacion: { ...params.custom.config.coeficientes.iluminacion, LED: Number(e.target.value) }
                      }
                    }
                  }
                })
              }
            />
          </div>
        </div>

        <div className="editor-section">
          <h2 className="editor-title">Parámetros de la Calculadora (Rebote)</h2>
          <div className="form-group">
            <label className="form-label">Precio por tubo (€)</label>
            <input
              type="number"
              step="0.1"
              className="form-input"
              value={params.rebote.calcParams.precioTubo}
              onChange={(e) =>
                setParams({
                  ...params,
                  rebote: {
                    ...params.rebote,
                    calcParams: { ...params.rebote.calcParams, precioTubo: Number(e.target.value) }
                  }
                })
              }
            />
          </div>
          <div className="form-group">
            <label className="form-label">Pelotas por tubo</label>
            <input
              type="number"
              className="form-input"
              value={params.rebote.calcParams.pelotasPorTubo}
              onChange={(e) =>
                setParams({
                  ...params,
                  rebote: {
                    ...params.rebote,
                    calcParams: { ...params.rebote.calcParams, pelotasPorTubo: Number(e.target.value) }
                  }
                })
              }
            />
          </div>
          <div className="form-group">
            <label className="form-label">Factor CO₂ por pelota (kg)</label>
            <input
              type="number"
              step="0.01"
              className="form-input"
              value={params.rebote.calcParams.factorCO2porPelotaKg}
              onChange={(e) =>
                setParams({
                  ...params,
                  rebote: {
                    ...params.rebote,
                    calcParams: { ...params.rebote.calcParams, factorCO2porPelotaKg: Number(e.target.value) }
                  }
                })
              }
            />
          </div>
          <div className="form-group">
            <label className="form-label">Ciclos máximos</label>
            <input
              type="number"
              className="form-input"
              value={params.rebote.calcParams.ciclosMax}
              onChange={(e) =>
                setParams({
                  ...params,
                  rebote: {
                    ...params.rebote,
                    calcParams: { ...params.rebote.calcParams, ciclosMax: Number(e.target.value) }
                  }
                })
              }
            />
          </div>
          <div className="form-group">
            <label className="form-label">Ahorro por ciclo (%)</label>
            <input
              type="number"
              step="0.01"
              className="form-input"
              value={params.rebote.calcParams.ahorroPorCicloPct}
              onChange={(e) =>
                setParams({
                  ...params,
                  rebote: {
                    ...params.rebote,
                    calcParams: { ...params.rebote.calcParams, ahorroPorCicloPct: Number(e.target.value) }
                  }
                })
              }
            />
          </div>
        </div>

        <div className="btn-group">
          <button className="btn btn-primary" onClick={handleSave}>
            Guardar
          </button>
          <button className="btn btn-secondary" onClick={handleExport}>
            Exportar JSON
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => fileInputRef.current?.click()}
          >
            Importar JSON
          </button>
          <button className="btn btn-secondary" onClick={handleLogout}>
            Cerrar sesión
          </button>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="application/json"
          onChange={handleImport}
          className="hidden"
        />
      </div>
    </div>
  );
}
