import { initAnalyticsAndConsent } from './analytics.js';
import { ADDE_CONFIG } from './config.js';
import { getLang, setLang, applyTranslations } from './i18n.js';

const LOGO_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 230 48" width="185" height="38" fill="none" aria-label="Adde Design Studio">
  <rect x="2" y="2" width="42" height="42" stroke="currentColor" stroke-width="2"/>
  <path d="M10 38L23 11L36 38" stroke="currentColor" stroke-width="2.4" stroke-linecap="square"/>
  <line x1="15" y1="29" x2="31" y2="29" stroke="#B86B35" stroke-width="2.4"/>
  <rect x="21" y="2" width="4" height="5" fill="#B86B35"/>
  <text x="56" y="23" font-family="'Plus Jakarta Sans', sans-serif" font-weight="700" font-size="16" letter-spacing="3.5" fill="currentColor">ADDE</text>
  <text x="56" y="38" font-family="'Plus Jakarta Sans', sans-serif" font-weight="500" font-size="8.5" letter-spacing="2.2" fill="#B86B35">DESIGN • BUILD</text>
</svg>`;

export function initShell({ transparentHero = false, activePath = '' } = {}) {
  const header = document.getElementById('site-header');
  if (header) {
    header.className = `site-header ${transparentHero ? 'hero-transparent' : 'solid'}`;
    header.innerHTML = `
      <div class="container nav-inner">
        <a href="/index.html" aria-label="Home">${LOGO_SVG}</a>
        <nav class="nav-links">
          <a href="/index.html" class="${activePath==='home'?'active':''}" data-i18n="nav.home">Home</a>
          <a href="/projects.html" class="${activePath==='projects'?'active':''}" data-i18n="nav.projects">Projects</a>
          <a href="/services.html" class="${activePath==='services'?'active':''}" data-i18n="nav.services">Services</a>
          <a href="/process.html" class="${activePath==='process'?'active':''}" data-i18n="nav.process">Process & QA</a>
          <a href="/estimator.html" class="${activePath==='estimator'?'active':''}" data-i18n="nav.estimator">Estimator</a>
          <a href="/about.html" class="${activePath==='about'?'active':''}" data-i18n="nav.about">About</a>
          <a href="/journal.html" class="${activePath==='journal'?'active':''}" data-i18n="nav.journal">Journal</a>
        </nav>
        <div class="nav-actions">
          <div class="lang-toggle" role="group" aria-label="Language toggle">
            <button type="button" class="lang-btn-en">EN</button>
            <button type="button" class="lang-btn-so">SO</button>
          </div>
          <a href="/portal.html" class="btn btn-outline" style="padding:0.5rem 0.9rem;font-size:0.72rem;border-color:currentColor;color:inherit;" data-i18n="nav.portal">Client Portal</a>
          <a href="/contact.html" class="btn btn-bronze" style="padding:0.52rem 1rem;font-size:0.72rem;" data-i18n="nav.contact">Start Project</a>
          <button type="button" id="mobileMenuOpen" class="mobile-menu-btn">MENU</button>
        </div>
      </div>`
      initAnalyticsAndConsent();
  }

  // Mobile Drawer
  const drawer = document.createElement('div');
  drawer.className = 'mobile-drawer';
  drawer.id = 'mobileDrawer';
  drawer.innerHTML = `
    <div>
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:2.5rem;">
        <span style="font-weight:700;letter-spacing:0.2em;">ADDE DESIGN STUDIO</span>
        <button type="button" id="mobileMenuClose" style="background:none;border:1px solid #F7F6F2;color:#F7F6F2;padding:0.4rem 0.8rem;cursor:pointer;">CLOSE ✕</button>
      </div>
      <div style="display:flex;flex-direction:column;gap:1.15rem;font-size:1.35rem;font-family:var(--font-serif);">
        <a href="/index.html" data-i18n="nav.home">Home</a>
        <a href="/projects.html" data-i18n="nav.projects">Projects</a>
        <a href="/services.html" data-i18n="nav.services">Services</a>
        <a href="/process.html" data-i18n="nav.process">Process & QA</a>
        <a href="/estimator.html" data-i18n="nav.estimator">Estimator</a>
        <a href="/about.html" data-i18n="nav.about">About</a>
        <a href="/journal.html" data-i18n="nav.journal">Journal</a>
        <a href="/careers.html" data-i18n="footer.careers">Careers & Vendors</a>
        <a href="/portal.html" style="color:var(--bronze);" data-i18n="nav.portal">Client Portal</a>
      </div>
    </div>
    <div style="border-top:1px solid rgba(255,255,255,0.15);padding-top:1.25rem;display:flex;flex-direction:column;gap:0.75rem;">
      <a href="/contact.html" class="btn btn-bronze" data-i18n="nav.contact">Start Project</a>
      <div style="font-size:0.85rem;color:#A5A29B;">WhatsApp: ${ADDE_CONFIG.whatsappDisplay}</div>
    </div>`;
  document.body.appendChild(drawer);

  // Footer
  const footer = document.getElementById('site-footer');
  if (footer) {
    footer.className = 'site-footer';
    footer.innerHTML = `
      <div class="container">
        <div class="footer-grid">
          <div>
            <div style="color:#F7F6F2;margin-bottom:1rem;">${LOGO_SVG}</div>
            <p style="color:#A5A29B;max-width:360px;font-size:0.9rem;margin-bottom:1.25rem;" data-i18n="footer.tagline"></p>
            <div style="font-size:0.85rem;color:#F7F6F2;">WhatsApp / Tel: <a href="https://wa.me/${ADDE_CONFIG.whatsappNumber}" style="color:var(--bronze);font-weight:700;">${ADDE_CONFIG.whatsappDisplay}</a></div>
            <div style="font-size:0.85rem;color:#A5A29B;margin-top:0.25rem;">Email: ${ADDE_CONFIG.email}</div>
          </div>
          <div>
            <div class="eyebrow" data-i18n="footer.company">Studio</div>
            <ul style="list-style:none;display:flex;flex-direction:column;gap:0.6rem;font-size:0.88rem;color:#D4D0C5;">
              <li><a href="/projects.html" data-i18n="nav.projects">Projects</a></li>
              <li><a href="/services.html" data-i18n="nav.services">Services</a></li>
              <li><a href="/process.html" data-i18n="nav.process">Process & QA</a></li>
              <li><a href="/about.html" data-i18n="nav.about">About</a></li>
              <li><a href="/careers.html" data-i18n="footer.careers">Careers & Vendors</a></li>
            </ul>
          </div>
          <div>
            <div class="eyebrow" data-i18n="footer.tools">Client Tools</div>
            <ul style="list-style:none;display:flex;flex-direction:column;gap:0.6rem;font-size:0.88rem;color:#D4D0C5;">
              <li><a href="/estimator.html" data-i18n="nav.estimator">Cost Estimator</a></li>
              <li><a href="/contact.html" data-i18n="nav.contact">Start Project</a></li>
              <li><a href="/portal.html" data-i18n="nav.portal">Client Portal</a></li>
              <li><a href="/journal.html" data-i18n="nav.journal">Journal</a></li>
            </ul>
          </div>
          <div>
            <div class="eyebrow" data-i18n="footer.legal">Legal & Compliance</div>
            <ul style="list-style:none;display:flex;flex-direction:column;gap:0.6rem;font-size:0.88rem;color:#D4D0C5;">
              <li><a href="/legal.html#privacy" data-i18n="footer.privacy">Privacy Policy</a></li>
              <li><a href="/legal.html#terms" data-i18n="footer.terms">Terms of Service</a></li>
              <li><a href="/legal.html#disclaimer" data-i18n="footer.disclaimer">Engineering Disclaimer</a></li>
            </ul>
          </div>
        </div>
        <div style="padding-top:1.75rem;display:flex;flex-wrap:wrap;justify-content:space-between;gap:1rem;font-size:0.8rem;color:#7A7770;">
          <span data-i18n="footer.copyright">© 2026 Adde Design Studio. All rights reserved.</span>
          <span>Mogadishu • Hargeisa • Garowe • Nairobi • Djibouti • Addis Ababa</span>
        </div>
      </div>`;
  }

  // Sticky Quick Action Bar
  const sticky = document.createElement('div');
  sticky.className = 'sticky-cta-bar';
  sticky.innerHTML = `
    <a href="https://wa.me/${ADDE_CONFIG.whatsappNumber}?text=${encodeURIComponent('Salam Adde Design Studio, I would like to discuss a project.')}" target="_blank" rel="noopener" class="sticky-wa-btn">
      <span>💬</span><span data-i18n="sticky.wa">WhatsApp</span>
    </a>
    <a href="/contact.html" class="sticky-brief-btn" data-i18n="sticky.brief">Start Project</a>`;
  document.body.appendChild(sticky);

  // Events
  document.querySelectorAll('.lang-btn-en').forEach((b) => b.addEventListener('click', () => setLang('en')));
  document.querySelectorAll('.lang-btn-so').forEach((b) => b.addEventListener('click', () => setLang('so')));
  document.getElementById('mobileMenuOpen')?.addEventListener('click', () => drawer.classList.add('open'));
  document.getElementById('mobileMenuClose')?.addEventListener('click', () => drawer.classList.remove('open'));
  window.addEventListener('scroll', () => {
    header?.classList.toggle('scrolled', window.scrollY > 40);
  });

  // Scroll Reveal Observer
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

  applyTranslations(getLang());

  // Register PWA Service Worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').catch(() => {});
  }
}
