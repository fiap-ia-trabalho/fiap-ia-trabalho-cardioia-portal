export const AUTH_KEY = 'cardioia.portal.auth.v1';
export const DEMO_EMAIL = 'demo@cardioia.local';
export const DEMO_PASSWORD = 'cardioia123';

const encode = (object) => btoa(JSON.stringify(object)).replaceAll('+', '-').replaceAll('/', '_').replace(/=+$/, '');

// JWT didático: sem assinatura verificável ou autenticação em servidor.
export function createDemoSession(email, password) {
  if (email.trim().toLowerCase() !== DEMO_EMAIL || password !== DEMO_PASSWORD) {
    throw new Error('Use o e-mail e a senha de demonstração indicados abaixo.');
  }
  const payload = { sub: 'demo', name: 'Equipe CardioIA', email: DEMO_EMAIL, exp: Math.floor(Date.now() / 1000) + 8 * 60 * 60 };
  const token = `${encode({ alg: 'none', typ: 'JWT' })}.${encode(payload)}.simulacao`;
  localStorage.setItem(AUTH_KEY, token);
  return { token, user: payload };
}

export function readDemoSession() {
  try {
    const token = localStorage.getItem(AUTH_KEY);
    if (!token) return null;
    const parts = token.split('.');
    if (parts.length !== 3 || parts[2] !== 'simulacao') throw new Error('Token inválido');
    const user = JSON.parse(atob(parts[1].replaceAll('-', '+').replaceAll('_', '/')));
    if (user.sub !== 'demo' || user.email !== DEMO_EMAIL || !Number.isFinite(user.exp) || user.exp * 1000 <= Date.now()) {
      throw new Error('Sessão inválida ou expirada');
    }
    return { token, user };
  } catch {
    localStorage.removeItem(AUTH_KEY);
    return null;
  }
}

export function clearDemoSession() {
  localStorage.removeItem(AUTH_KEY);
}
