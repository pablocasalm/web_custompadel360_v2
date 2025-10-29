import { STORAGE_KEYS } from './constants';

/** Hash SHA-256 en hex */
async function sha256Hex(text: string): Promise<string> {
  const enc = new TextEncoder().encode(text);
  const buf = await crypto.subtle.digest('SHA-256', enc);
  const arr = Array.from(new Uint8Array(buf));
  return arr.map(b => b.toString(16).padStart(2, '0')).join('');
}

/** Establece/actualiza contraseña (guarda hash). Úsalo desde dashboard la primera vez. */
export async function setPassword(plain: string): Promise<void> {
  const hash = await sha256Hex(plain);
  localStorage.setItem(STORAGE_KEYS.authHash, hash);
}

/** Comprueba login contra el hash guardado (si no hay hash, acepta la primera y lo establece) */
export async function login(username: string, password: string): Promise<boolean> {
  const savedHash = localStorage.getItem(STORAGE_KEYS.authHash);
  const passHash = await sha256Hex(password);

  if (!savedHash) {
    // Primera configuración: guardamos esta contraseña
    localStorage.setItem(STORAGE_KEYS.authHash, passHash);
  } else if (savedHash !== passHash) {
    return false;
  }

  // Sesión muy simple
  localStorage.setItem(STORAGE_KEYS.authSession, JSON.stringify({ u: username, t: Date.now() }));
  return true;
}

export function logout(): void {
  localStorage.removeItem(STORAGE_KEYS.authSession);
}

export function isLoggedIn(): boolean {
  return !!localStorage.getItem(STORAGE_KEYS.authSession);
}