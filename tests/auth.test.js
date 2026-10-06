import { test } from 'node:test';
import assert from 'node:assert/strict';
import { AUTH_KEY, DEMO_EMAIL, DEMO_PASSWORD, createDemoSession, readDemoSession, clearDemoSession } from '../src/services/auth.js';

test('o acesso de demonstração persiste, expira e pode ser encerrado', () => {
  const storage = new Map();
  globalThis.localStorage = { getItem: (key) => storage.get(key) ?? null, setItem: (key, value) => storage.set(key, value), removeItem: (key) => storage.delete(key) };
  assert.throws(() => createDemoSession(DEMO_EMAIL, 'incorreta'));
  assert.equal(readDemoSession(), null);
  const session = createDemoSession(DEMO_EMAIL, DEMO_PASSWORD);
  assert.equal(readDemoSession().user.email, DEMO_EMAIL);
  assert.equal(session.token.split('.').length, 3);
  const parts = session.token.split('.');
  parts[1] = btoa(JSON.stringify({ ...session.user, exp: 1 }));
  storage.set(AUTH_KEY, parts.join('.'));
  assert.equal(readDemoSession(), null);
  assert.equal(storage.has(AUTH_KEY), false);
  createDemoSession(DEMO_EMAIL, DEMO_PASSWORD);
  clearDemoSession();
  assert.equal(readDemoSession(), null);
});
