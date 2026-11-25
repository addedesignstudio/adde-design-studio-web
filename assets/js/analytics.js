import { ADDE_CONFIG } from './config.js';
import { getLang } from './i18n.js';

const CONSENT_KEY = 'adde_analytics_consent';

function loadGA4(measurementId) {
  if (!measurementId || window._addeGaLoaded) return;
  window._addeGaLoaded = true;

  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
  document.head.appendChild(s);

  window.dataLayer = window.dataLayer || [];
  function gtag(){ window.dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', measurementId, { anonymize_ip: true });
}

export function trackEvent(name, params = {}) {
  if (typeof window.gtag === 'function') {
    window.gtag('event', name, params);
  }
}

export function initAnalyticsAndConsent() {
  const id = ADDE_CONFIG.ga4MeasurementId;
  if (!id || id.indexOf('G-') !== 0) return; // Wait until GA4 ID is pasted in config.js

  const saved = localStorage.getItem(CONSENT_KEY);
  if (saved === 'granted') {
    loadGA4(id);
  } else if (!saved) {
    renderConsentBanner(id);
  }

  // Track WhatsApp & Key Actions automatically
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href*="wa.me"]');
    if (a) trackEvent('whatsapp_click', { page: location.pathname });
  });
  window.addEventListener('adde:track', (e) => {
    if (e.detail && e.detail.name) trackEvent(e.detail.name, e.detail.params || {});
  });
}

function renderConsentBanner(measurementId) {
  const isSo = getLang() === 'so';
  const bar = document.createElement('div');
  bar.id = 'addeConsentBar';
  bar.style.cssText = 'position:fixed;bottom:1.25rem;left:1.25rem;z-index:95;max-width:360px;background:#121212;color:#F7F6F2;padding:1rem 1.15rem;border:1px solid rgba(255,255,255,0.16);border-left:3px solid #B86B35;font-size:0.78rem;box-shadow:0 12px 30px rgba(0,0,0,0.3);';
  bar.innerHTML = `
    <p style="margin-bottom:0.75rem;color:#D4D0C5;">${isSo ? 'Waxaan adeegsanaa Analytics si aan u hagaajinno khibradda website-ka.' : 'We use privacy-safe analytics to improve our architectural experience.'}</p>
    <div style="display:flex;gap:0.5rem;">
      <button id="consentAccept" style="background:#B86B35;color:#fff;border:none;padding:0.45rem 0.9rem;font-weight:700;cursor:pointer;font-size:0.72rem;text-transform:uppercase;">${isSo ? 'Ogolow' : 'Accept'}</button>
      <button id="consentDecline" style="background:transparent;color:#D4D0C5;border:1px solid rgba(255,255,255,0.25);padding:0.45rem 0.9rem;cursor:pointer;font-size:0.72rem;text-transform:uppercase;">${isSo ? 'Diid' : 'Decline'}</button>
    </div>`;
  document.body.appendChild(bar);

  document.getElementById('consentAccept').onclick = () => {
    localStorage.setItem(CONSENT_KEY, 'granted');
    bar.remove();
    loadGA4(measurementId);
  };
  document.getElementById('consentDecline').onclick = () => {
    localStorage.setItem(CONSENT_KEY, 'denied');
    bar.remove();
  };
}
