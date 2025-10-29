import { useEffect, useRef, useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { isLoggedIn, logout, setPassword } from '../../lib/auth';
import { getContent, setContent } from '../../lib/storage';
import { exportToFile, importFromFile } from '../../lib/exportImport';
import { STORAGE_KEYS } from '../../lib/constants';

type AnyRecord = Record<string, any>;

export default function AdminDashboard() {
  const navigate = useNavigate();
  const fileRef = useRef<HTMLInputElement>(null);

  const [ok, setOk] = useState(isLoggedIn());
  useEffect(() => {
    if (!ok) navigate('/admin', { replace: true });
  }, [ok, navigate]);

  // Cargas iniciales (JSON plano para simplificar edición)
  const [home, setHome] = useState<AnyRecord>(() => getContent(STORAGE_KEYS.cmsHome) ?? {});
  const [custom, setCustom] = useState<AnyRecord>(() => getContent(STORAGE_KEYS.cmsCustom) ?? {});
  const [pelotas, setPelotas] = useState<AnyRecord>(() => getContent(STORAGE_KEYS.cmsPelotas) ?? {});
  const [params, setParams] = useState<AnyRecord>(() => getContent(STORAGE_KEYS.cmsParams) ?? {
    custom: { config: { coeficientes: {} } },
    rebote: { calcParams: {} },
  });

  // Cambio de password
  const [newPass, setNewPass] = useState('');

  const handleSave = () => {
    setContent(STORAGE_KEYS.cmsHome.replace(`${STORAGE_KEYS.cmsHome.split(':')[0]}:`, ''), home); // compat legacy
    setContent('cms_home', home); // además guardamos sin NS por si venías de legacy
    setContent('custom', custom);
    setContent('pelotas', pelotas);
    setContent('cms', params);
    alert('Contenidos guardados correctamente');
  };

  const handleExport = () => {
    exportToFile('padel-content.json', {
      home, custom, pelotas, cms: params
    });
  };

  const handleImport = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const data = (await importFromFile(file)) as {
        home?: AnyRecord; custom?: AnyRecord; pelotas?: AnyRecord; cms?: AnyRecord;
      };
      if (data.home) setHome(data.home);
      if (data.custom) setCustom(data.custom);
      if (data.pelotas) setPelotas(data.pelotas);
      if (data.cms) setParams(data.cms);
      alert('Contenidos importados correctamente (recuerda Guardar)');
    } catch {
      alert('Error al importar el archivo');
    } finally {
      if (fileRef.current) fileRef.current.value = '';
    }
  };

  const handleLogout = () => { logout(); setOk(false); };

  const applyNewPassword = async () => {
    if (!newPass) { alert('Introduce una contraseña'); return; }
    await setPassword(newPass);
    setNewPass('');
    alert('Contraseña actualizada');
  };

  if (!ok) return null;

  return (
    <div className="section">
      <div className="container">
        <h1 className="section-title">Editor de contenidos</h1>

        <details open className="editor-section">
          <summary className="editor-title">Inicio (Home)</summary>
          <TextareaJSON value={home} onChange={setHome} />
        </details>

        <details className="editor-section">
          <summary className="editor-title">Custom Padel 360</summary>
          <TextareaJSON value={custom} onChange={setCustom} />
        </details>

        <details className="editor-section">
          <summary className="editor-title">Pelotas (Rebote)</summary>
          <TextareaJSON value={pelotas} onChange={setPelotas} />
        </details>

        <details className="editor-section">
          <summary className="editor-title">Parámetros (Custom + Rebote)</summary>
          <TextareaJSON value={params} onChange={setParams} />
        </details>

        <div className="editor-section">
          <h2 className="editor-title">Copia de seguridad</h2>
          <div className="btn-group">
            <button className="btn btn-secondary" onClick={handleExport}>Exportar JSON</button>
            <button className="btn btn-secondary" onClick={() => fileRef.current?.click()}>Importar JSON</button>
            <input ref={fileRef} type="file" accept="application/json" onChange={handleImport} hidden />
          </div>
          <p className="card-text">Importa un archivo exportado previamente para restaurar.</p>
        </div>

        <div className="editor-section">
          <h2 className="editor-title">Seguridad</h2>
          <div className="form-group">
            <label className="form-label">Nueva contraseña</label>
            <input type="password" className="form-input" value={newPass}
              onChange={(e) => setNewPass(e.target.value)} placeholder="••••••••" />
          </div>
          <div className="btn-group">
            <button className="btn btn-secondary" onClick={applyNewPassword}>Actualizar contraseña</button>
            <button className="btn" onClick={handleLogout}>Cerrar sesión</button>
          </div>
        </div>

        <div className="btn-group">
          <button className="btn btn-primary" onClick={handleSave}>Guardar</button>
        </div>
      </div>
    </div>
  );
}

/* ---------- Pequeño editor JSON ---------- */
function TextareaJSON({
  value, onChange,
}: { value: any; onChange: (v: any) => void }) {
  const [text, setText] = useState(JSON.stringify(value ?? {}, null, 2));
  useEffect(() => { setText(JSON.stringify(value ?? {}, null, 2)); }, [value]);

  const handleBlur = () => {
    try {
      const parsed = JSON.parse(text || '{}');
      onChange(parsed);
    } catch {
      alert('JSON inválido. Revisa el formato.');
    }
  };

  return (
    <textarea
      className="form-textarea"
      style={{ width: '100%', minHeight: 220, fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace' }}
      value={text}
      onChange={(e) => setText(e.target.value)}
      onBlur={handleBlur}
    />
  );
}