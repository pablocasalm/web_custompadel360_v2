// src/lib/storage.ts
const NAMESPACE = 'cp360';

export function getContent<T = unknown>(key: string): T | null {
  try {
    const raw = localStorage.getItem(`${NAMESPACE}:${key}`);
    if (!raw) return null;
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export function setContent(key: string, value: unknown): void {
  try {
    localStorage.setItem(`${NAMESPACE}:${key}`, JSON.stringify(value));
  } catch {
    // noop
  }
}

/** Descarga un objeto como JSON (para backups del CMS local) */
export function exportToFile(filename: string, data: unknown): void {
  try {
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: 'application/json;charset=utf-8',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename.endsWith('.json') ? filename : `${filename}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  } catch {
    // noop
  }
}

/** Lee un .json desde un <input type="file"> y devuelve su contenido parseado */
export function importFromFile(file: File): Promise<unknown> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(reader.error);
    reader.onload = () => {
      try {
        const obj = JSON.parse(String(reader.result));
        resolve(obj);
      } catch (e) {
        reject(e);
      }
    };
    reader.readAsText(file, 'utf-8');
  });
}