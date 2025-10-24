const AUTH_KEY = 'padel_auth';
const SESSION_KEY = 'padel_session';

export async function sha256(text: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export async function setPassword(password: string): Promise<void> {
  const hash = await sha256(password);
  localStorage.setItem(AUTH_KEY, hash);
}

export async function login(_username: string, password: string): Promise<boolean> {
  const storedHash = localStorage.getItem(AUTH_KEY);

  if (!storedHash) {
    await setPassword(password);
    sessionStorage.setItem(SESSION_KEY, 'true');
    return true;
  }

  const hash = await sha256(password);
  if (hash === storedHash) {
    sessionStorage.setItem(SESSION_KEY, 'true');
    return true;
  }

  return false;
}

export function logout(): void {
  sessionStorage.removeItem(SESSION_KEY);
}

export function isLoggedIn(): boolean {
  return sessionStorage.getItem(SESSION_KEY) === 'true';
}
