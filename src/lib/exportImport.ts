/** Descarga un objeto como JSON */
export function exportToFile(filename: string, data: unknown): void {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename.endsWith('.json') ? filename : `${filename}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }
  
  /** Lee un .json desde un <input type="file"> y devuelve su contenido parseado */
  export function importFromFile(file: File): Promise<unknown> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = () => reject(reader.error);
      reader.onload = () => {
        try {
          resolve(JSON.parse(String(reader.result)));
        } catch (e) {
          reject(e);
        }
      };
      reader.readAsText(file, 'utf-8');
    });
  }