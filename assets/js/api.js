import { ADDE_CONFIG } from './config.js';

export async function fetchStaticJson(path) {
  const res = await fetch(path, { cache: 'no-cache' });
  if (!res.ok) throw new Error('Failed loading data: ' + path);
  return res.json();
}

/**
 * Sends CORS-simple POST to Google Apps Script doPost() without triggering OPTIONS preflight!
 */
export async function postToGas(action, payloadObj = {}) {
  const body = JSON.stringify({ action, ...payloadObj });
  const res = await fetch(ADDE_CONFIG.gasExecUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    redirect: 'follow',
    body
  });
  const json = await res.json();
  if (!json.ok) {
    throw new Error(json.error || 'Server request failed.');
  }
  return json.data;
}

export function escHtml(str) {
  return String(str === null || str === undefined ? '' : str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
