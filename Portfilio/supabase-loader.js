// ============================================
// SUPABASE LOADER — Portfolio Site
// Fetches data from Supabase and updates DOM
// ============================================

const SUPABASE_URL = 'https://xqidbcjswefsslvhoxpe.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhxaWRiY2pzd2Vmc3NsdmhveHBlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk2NTQ1NTcsImV4cCI6MjA5NTIzMDU1N30.FrEj8v5-T3x9SYyxBsJSMZXJ1zChK1XYXdm-jN9PEBQ';

const SB_HEADERS = {
  'apikey': SUPABASE_KEY,
  'Authorization': `Bearer ${SUPABASE_KEY}`
};

// ============================================
// ICONS LIBRARY (shared with admin)
// ============================================
const ICON_LIBRARY = {
  'search':        `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>`,
  'monitor':       `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><polyline points="8 21 12 17 16 21"/></svg>`,
  'grid':          `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18M15 3v18M3 9h18M3 15h18"/></svg>`,
  'layers':        `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>`,
  'pen-tool':      `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/></svg>`,
  'edit':          `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>`,
  'layout':        `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>`,
  'eye':           `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`,
  'users':         `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  'compass':       `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>`,
  'target':        `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>`,
  'bar-chart':     `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/></svg>`,
  'book':          `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>`,
  'smartphone':    `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>`,
  'cpu':           `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>`,
  'zap':           `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
  'code':          `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
  'terminal':      `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>`,
  'message-square':`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`,
  'star':          `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
  'activity':      `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>`,
  'figma':         `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z"/><path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z"/><path d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z"/><path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z"/><path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z"/></svg>`,
  'video':         `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 10l4.553-2.069A1 1 0 0 1 21 8.876v6.248a1 1 0 0 1-1.447.894L15 14"/><rect x="3" y="6" width="12" height="12" rx="2"/></svg>`,
  'clipboard':     `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/></svg>`,
  'file-text':     `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>`,
  'tool':          `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>`,
  'settings':      `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`,
  'clock':         `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
  'globe':         `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
  'award':         `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>`,
  'check-circle':  `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
  'sliders':       `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/></svg>`,
};

async function sbGet(table, query = '') {
  // cache:'no-store' so settings changes show immediately (no URL params —
  // PostgREST would treat an unknown param as a column filter and error out)
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}${query}`, {
    headers: { ...SB_HEADERS, 'Cache-Control': 'no-cache' },
    cache: 'no-store'
  });
  if (!res.ok) throw new Error(`Failed to fetch ${table}`);
  return res.json();
}

// ============================================
// SETTINGS — Hero, About, Contact
// ============================================
async function loadSiteSettings() {
  const data = await sbGet('site_settings');
  const s = {};
  data.forEach(r => s[r.key] = r.value);

  // Hero
  if (s.hero_greeting || s.hero_name) {
    const el = document.querySelector('.hero-greeting');
    if (el) {
      // Update text node (prefix like "Hi, I'm")
      for (const node of el.childNodes) {
        if (node.nodeType === 3 && node.textContent.trim()) {
          node.textContent = (s.hero_greeting || "Hi, I'm") + ' ';
          break;
        }
      }
      // Update name span
      const nameSpan = el.querySelector('.hero-name');
      if (nameSpan && s.hero_name) nameSpan.textContent = s.hero_name;
    }
  }
  if (s.hero_label) { const el = document.querySelector('.hero-label'); if (el) el.textContent = s.hero_label; }
  if (s.hero_title) { const el = document.querySelector('.hero-title'); if (el) el.textContent = s.hero_title; }
  if (s.hero_subtitle) { const el = document.querySelector('.hero-subtitle'); if (el) el.textContent = s.hero_subtitle; }

  // Hero buttons
  const btns = document.querySelectorAll('.hero-cta a');
  if (btns[0]) {
    if (s.hero_btn1_text) btns[0].textContent = s.hero_btn1_text;
    if (s.hero_btn1_url) btns[0].href = s.hero_btn1_url;
  }
  if (btns[1]) {
    if (s.hero_btn2_text) btns[1].textContent = s.hero_btn2_text;
    if (s.hero_btn2_url) btns[1].href = s.hero_btn2_url;
  }

  // About
  if (s.about_title) { const el = document.querySelector('#about .section-title'); if (el) el.textContent = s.about_title; }
  if (s.about_lead) { const el = document.querySelector('.about-content .lead'); if (el) el.textContent = s.about_lead; }
  if (s.about_body) { const el = document.querySelector('.about-content .about-body'); if (el) el.textContent = s.about_body; }
  if (s.about_highlight) { const el = document.querySelector('.about-content .highlight'); if (el) el.textContent = s.about_highlight; }

  // About list items
  const listItems = document.querySelectorAll('.about-list li');
  ['about_list_1','about_list_2','about_list_3','about_list_4'].forEach((key, idx) => {
    if (s[key] && listItems[idx]) listItems[idx].textContent = s[key];
  });

  // Certifications section header
  if (s.certs_label) { const el = document.querySelector('.certifications .section-label'); if (el) el.textContent = s.certs_label; }
  if (s.certs_title) { const el = document.querySelector('.certifications .section-title'); if (el) el.textContent = s.certs_title; }

  // Contact
  if (s.contact_email) {
    document.querySelectorAll('.contact-email-val').forEach(el => el.textContent = s.contact_email);
    document.querySelectorAll('a[href^="mailto"]').forEach(el => el.href = `mailto:${s.contact_email}`);
  }
  if (s.contact_phone) {
    document.querySelectorAll('.contact-phone-val').forEach(el => el.textContent = s.contact_phone);
    document.querySelectorAll('a[href^="tel"]').forEach(el => el.href = `tel:${s.contact_phone.replace(/\s/g,'')}`);
  }
  if (s.linkedin_url) document.querySelectorAll('a[href*="linkedin"]').forEach(el => el.href = s.linkedin_url);
  if (s.behance_url) document.querySelectorAll('a[href*="behance"]').forEach(el => el.href = s.behance_url);

  // Availability badge
  const status = s['availability_status'] || 'available';
  const availText = s['availability_text'] || (status === 'available' ? 'Available for work' : 'Currently Unavailable');
  const isAvailable = status === 'available';

  // Update all availability badges (hero + contact)
  document.querySelectorAll('.status-badge, .cta-badge').forEach(badge => {
    const dot = badge.querySelector('.status-dot, .cta-dot');
    const textSpan = badge.querySelector('span:last-child');

    if (dot) {
      dot.style.background = isAvailable ? 'var(--color-success)' : '#f87171';
      dot.style.boxShadow = isAvailable
        ? '0 0 8px rgba(74,222,128,0.6)'
        : '0 0 8px rgba(248,113,113,0.6)';
    }

    if (textSpan) textSpan.textContent = availText;

    if (isAvailable) {
      badge.style.background = '';
      badge.style.borderColor = '';
      badge.style.color = '';
    } else {
      badge.style.background = 'rgba(248,113,113,0.08)';
      badge.style.borderColor = '';
      badge.style.color = '#f87171';
    }

    // Show badge after updating
    badge.style.opacity = '1';
    badge.style.transition = 'opacity 0.3s ease';
  });

  // Stats
  const statMap = { stat_projects: 0, stat_hours: 1, stat_certs: 2, stat_years: 3 };
  const statNumbers = document.querySelectorAll('.stat-number');
  Object.entries(statMap).forEach(([key, idx]) => {
    if (s[key] && statNumbers[idx]) statNumbers[idx].textContent = s[key];
  });

  // Footer
  if (s.footer_text) { const el = document.querySelector('.footer-bottom p'); if (el) el.textContent = s.footer_text; }

  // CV button + modal config.
  // Falls back to the bundled CV files so it works out of the box; any value
  // set in the dashboard (CV / Resume page) overrides these defaults.
  window.cvConfig = {
    enabled: String(s.cv_enabled).toLowerCase() === 'true',
    url: s.cv_url || 'cv.html',
    imageUrl: s.cv_image_url || 'cv.html',
    buttonText: s.cv_button_text || 'View CV',
    modalTitle: s.cv_modal_title || 'Résumé',
    titleEnabled: s.cv_title_enabled == null ? true : String(s.cv_title_enabled).toLowerCase() === 'true'
  };
  if (typeof renderCvButton === 'function') renderCvButton();
}

// ============================================
// PROJECTS
// ============================================
async function loadProjects() {
  const projects = await sbGet('projects', '?order=sort_order&is_visible=eq.true');
  if (!projects.length) return;

  const workSection = document.querySelector('.work .container');
  if (!workSection) return;

  const existingArticles = workSection.querySelectorAll('article.project');

  // If all projects have no image_url, don't rebuild — just update text
  const hasImages = projects.some(p => p.image_url);

  if (!hasImages) {
    // Just update text content without touching images
    projects.forEach((p, idx) => {
      const article = existingArticles[idx];
      if (!article) return;
      const title = article.querySelector('.project-title');
      const desc = article.querySelector('.project-description');
      const tagsWrap = article.querySelector('.project-tags');
      const toolsWrap = article.querySelector('.project-tools');
      const link = article.querySelector('.project-link');

      if (title) title.textContent = p.title;
      if (desc) desc.textContent = p.description || '';
      if (tagsWrap) tagsWrap.innerHTML = (p.tags||[]).map(t=>`<span class="tag">${t}</span>`).join('');
      if (toolsWrap) toolsWrap.innerHTML = (p.tools||[]).map(t=>`<span>${t}</span>`).join('');
      if (link && p.behance_url) link.href = p.behance_url;
    });
    return;
  }

  // Full rebuild only when images exist in DB
  const viewMore = workSection.querySelector('.view-more');
  if (viewMore) viewMore.remove();
  workSection.querySelectorAll('article.project').forEach(el => el.remove());

  projects.forEach((p, idx) => {
    const isReverse = idx % 2 !== 0;
    const tagsHTML = (p.tags || []).map(t => `<span class="tag">${t}</span>`).join('');
    const toolsHTML = (p.tools || []).map(t => `<span>${t}</span>`).join('');

    const linksHTML = p.live_url
      ? `<div class="project-links">
          <a href="${p.behance_url || '#'}" target="_blank" rel="noopener noreferrer" class="project-link">View Case Study →</a>
          <a href="${p.live_url}" target="_blank" rel="noopener noreferrer" class="project-link-secondary">Live Documentation →</a>
         </div>`
      : `<a href="${p.behance_url || '#'}" target="_blank" rel="noopener noreferrer" class="project-link">View Full Case Study →</a>`;

    const imgHTML = p.image_url
      ? `<img src="${p.image_url}" alt="${p.title}" class="project-image" loading="lazy">`
      : `<div class="project-image-placeholder" style="height:300px;background:var(--bg-tertiary);border-radius:var(--radius-lg)"></div>`;

    const article = document.createElement('article');
    article.className = `project${isReverse ? ' project-reverse' : ''}`;
    article.innerHTML = `
      <div class="project-image-wrapper">
        ${imgHTML}
        <div class="project-overlay"></div>
      </div>
      <div class="project-content">
        <h3 class="project-title">${p.title}</h3>
        <p class="project-description">${p.description || ''}</p>
        <div class="project-tags">${tagsHTML}</div>
        <div class="project-tools">${toolsHTML}</div>
        ${linksHTML}
      </div>`;
    workSection.appendChild(article);
  });

  const vm = document.createElement('div');
  vm.className = 'view-more';
  vm.innerHTML = `<a href="https://www.behance.net/Mersawy_Saad" target="_blank" rel="noopener noreferrer" class="btn btn-outline">View Full Portfolio on Behance</a>`;
  workSection.appendChild(vm);
}

// ============================================
// SKILLS
// ============================================
async function loadSkills() {
  const [cats, skills] = await Promise.all([
    sbGet('skill_categories', '?order=sort_order&is_visible=eq.true'),
    sbGet('skills', '?order=sort_order&is_visible=eq.true')
  ]);
  if (!cats.length) return;

  const skillsMap = {};
  skills.forEach(s => {
    if (!skillsMap[s.category_id]) skillsMap[s.category_id] = [];
    skillsMap[s.category_id].push(s.name);
  });

  // Fallback icons if no icon_type in DB
  const fallbackIcons = [
    `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>`,
    `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18M15 3v18M3 9h18M3 15h18"/></svg>`,
    `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><polyline points="8 21 12 17 16 21"/></svg>`,
    `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 8V4H8"/><rect x="8" y="2" width="8" height="4" rx="1"/><path d="M18.4 6a9 9 0 1 1-12.77.04"/></svg>`
  ];

  const grid = document.querySelector('.skills-grid');
  if (!grid) return;

  grid.innerHTML = cats.map((cat, idx) => {
    const catSkills = skillsMap[cat.id] || [];
    const iconSvg = cat.icon_type && ICON_LIBRARY[cat.icon_type]
      ? ICON_LIBRARY[cat.icon_type]
      : fallbackIcons[idx % fallbackIcons.length];

    return `
      <div class="skill-cat-card">
        <div class="skill-cat-header">
          <div class="skill-cat-icon">${iconSvg}</div>
          <h3 class="skill-cat-title">${cat.name}</h3>
          <span class="skill-cat-count">${catSkills.length} skills</span>
        </div>
        <div class="skill-pills">
          ${catSkills.map(s => `<span class="skill-pill">${s}</span>`).join('')}
        </div>
      </div>`;
  }).join('');
}

// ============================================
// TOOLS
// ============================================
async function loadTools() {
  const tools = await sbGet('tools', '?order=sort_order&is_visible=eq.true');
  if (!tools.length) return;

  const grid = document.querySelector('.tools-grid');
  if (!grid) return;

  const defaultIcon = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/></svg>`;

  grid.innerHTML = tools.map(t => {
    const icon = (t.icon_type && ICON_LIBRARY[t.icon_type])
      ? ICON_LIBRARY[t.icon_type]
      : defaultIcon;

    return `
      <div class="tool-card">
        <div class="tool-icon-wrap">${icon}</div>
        <div class="tool-name">${t.name}<span class="tool-category">${t.category || ''}</span></div>
      </div>`;
  }).join('');
}

// ============================================
// CERTIFICATIONS
// ============================================
const CERT_ICONS = {
  clock: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>`,
  grid: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 9h6M9 15h6"/></svg>`,
  layers: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>`,
  settings: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`,
  star: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
  check: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
  book: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>`,
  award: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>`,
};

async function loadCertifications() {
  const certs = await sbGet('certifications', '?order=sort_order&is_visible=eq.true');
  if (!certs.length) return;

  const certList = document.querySelector('.cert-list');
  const certExtra = document.getElementById('cert-extra');
  const certToggleBtn = document.getElementById('certToggleBtn');
  if (!certList) return;

  const buildCertHTML = (c, idx) => {
    const isReverse = idx % 2 !== 0;
    const icon = CERT_ICONS[c.icon_type || 'clock'];

    // Ongoing placeholder
    const ongoingHTML = `
      <div class="cert-ongoing-wrapper">
        <div class="cert-ongoing-rings">
          <div class="cert-ongoing-ring ring-1"></div>
          <div class="cert-ongoing-ring ring-2"></div>
          <div class="cert-ongoing-ring ring-3"></div>
        </div>
        <div class="cert-ongoing-center">
          <div class="cert-ongoing-dot"></div>
          <span class="cert-ongoing-label">IN PROGRESS</span>
        </div>
      </div>`;

    const imgHTML = c.is_ongoing
      ? ongoingHTML
      : c.cert_image_url
        ? `<img src="${c.cert_image_url}" loading="lazy" alt="${c.title}" class="cert-image">`
        : `<div style="height:240px;background:var(--bg-tertiary);border-radius:var(--radius-lg)"></div>`;

    return `
      <article class="cert-item${isReverse ? ' cert-item-reverse' : ''}"${c.cert_url ? ` onclick="window.open('${c.cert_url}','_blank')" style="cursor:pointer"` : ''}>
        <div class="cert-image-wrapper${c.is_ongoing ? ' cert-ongoing' : ''}">${imgHTML}</div>
        <div class="cert-info">
          <div class="cert-header">
            <div class="cert-icon">${icon}</div>
            <span class="cert-badge${c.is_ongoing ? ' cert-badge-ongoing' : ''}">${c.is_ongoing ? 'Ongoing' : (c.hours || '')}</span>
          </div>
          <h3>${c.title}</h3>
          <p class="cert-org">${c.organization || ''}</p>
          <p class="cert-desc">${c.description || ''}</p>
          <p class="cert-date">${c.is_ongoing ? 'Currently in progress' : (c.completed_date ? 'Completed ' + c.completed_date : '')}</p>
        </div>
      </article>`;
  };

  // First 2 always visible
  certList.innerHTML = certs.slice(0, 2).map((c, i) => buildCertHTML(c, i)).join('');

  // Rest go in cert-extra
  if (certs.length > 2 && certExtra) {
    certExtra.innerHTML = certs.slice(2).map((c, i) => buildCertHTML(c, i + 2)).join('');
    if (certToggleBtn) certToggleBtn.style.display = '';
  }
}

// ============================================
// TIMELINE
// ============================================
async function loadTimeline() {
  const events = await sbGet('timeline', '?order=sort_order&is_visible=eq.true');
  if (!events.length) return;

  // The real container in index.html is `.timeline` (NOT `.timeline-list`).
  const container = document.querySelector('.timeline');
  if (!container) return;

  const leafIcon = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/></svg>`;

  // Build one timeline item. `isLast` controls the connector line.
  const buildItem = (e, isLast) => {
    const current = !!e.is_ongoing;
    const dateBlock = current
      ? `<div class="timeline-date-row">
           <span class="timeline-date timeline-date-current">${e.date_label || ''}</span>
           <span class="timeline-badge"><span class="status-dot" style="width:6px;height:6px;display:inline-block;margin-right:5px;vertical-align:middle;flex-shrink:0;"></span>ONGOING</span>
         </div>`
      : `<div class="timeline-date">${e.date_label || ''}</div>`;

    return `
      <div class="timeline-item${current ? ' timeline-current' : ''}">
        <div class="timeline-marker">
          <div class="timeline-icon${current ? ' timeline-icon-current' : ''}">${leafIcon}</div>
          ${isLast ? '' : '<div class="timeline-line"></div>'}
        </div>
        <div class="timeline-content">
          ${dateBlock}
          <div class="timeline-heading">${e.heading || ''}</div>
          <div class="timeline-desc">${e.description || ''}</div>
        </div>
      </div>`;
  };

  const VISIBLE = 3;
  const head = events.slice(0, VISIBLE);
  const rest = events.slice(VISIBLE);
  const lastIdx = events.length - 1;

  let html = head.map((e, i) => buildItem(e, i === lastIdx)).join('');

  if (rest.length) {
    html += `
      <div class="timeline-toggle-wrapper">
        <button class="timeline-toggle-btn" id="timelineToggleBtn" type="button" aria-expanded="false" aria-controls="timeline-extra">
          <span id="timelineToggleText">See My Full Journey</span>
          <svg id="timelineToggleIcon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
      </div>
      <div class="timeline-extra" id="timeline-extra">
        ${rest.map((e, i) => buildItem(e, (VISIBLE + i) === lastIdx)).join('')}
      </div>`;
  }

  container.innerHTML = html;

  // Re-wire the toggle (the original listener in script.js bound to the old,
  // now-replaced button, so we must attach a fresh handler here).
  const btn = document.getElementById('timelineToggleBtn');
  const extra = document.getElementById('timeline-extra');
  const txt = document.getElementById('timelineToggleText');
  const ico = document.getElementById('timelineToggleIcon');
  if (btn && extra) {
    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      extra.classList.toggle('open', !expanded);
      if (txt) txt.textContent = expanded ? 'See My Full Journey' : 'Show Less';
    });
  }
}

// ============================================
// INIT — Load all on DOM ready
// ============================================
async function initSupabase() {
  try {
    // Load custom icons first so they're available for skills/tools
    const customIcons = await sbGet('custom_icons').catch(() => []);
    customIcons.forEach(ic => {
      ICON_LIBRARY[ic.name] = `<img src="${ic.image_url}" style="width:20px;height:20px;object-fit:contain;filter:invert(40%) sepia(90%) saturate(500%) hue-rotate(210deg) brightness(90%)">`;
    });

    await Promise.all([
      loadSiteSettings(),
      loadProjects(),
      loadSkills(),
      loadTools(),
      loadCertifications(),
      loadTimeline(),
    ]);
    console.log('%c✓ Supabase data loaded', 'color: #4ade80; font-weight: bold;');
  } catch (e) {
    console.warn('Supabase load error:', e.message);
  }
}

// ============================================
// ANALYTICS (anonymous, privacy-light)
// ============================================
function sbInsert(table, row) {
  return fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
    method: 'POST',
    headers: { ...SB_HEADERS, 'Content-Type': 'application/json', 'Prefer': 'return=minimal' },
    body: JSON.stringify(row)
  }).catch(() => {});
}

function getVisitorId() {
  try {
    let id = localStorage.getItem('visitor_id');
    if (!id) { id = 'v_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 8); localStorage.setItem('visitor_id', id); }
    return id;
  } catch (e) { return 'v_anon'; }
}

function detectEnv() {
  const ua = navigator.userAgent;
  let browser = 'Other';
  if (/Edg\//.test(ua)) browser = 'Edge';
  else if (/OPR\/|Opera/.test(ua)) browser = 'Opera';
  else if (/Chrome\//.test(ua) && !/Edg\//.test(ua)) browser = 'Chrome';
  else if (/Firefox\//.test(ua)) browser = 'Firefox';
  else if (/Safari\//.test(ua) && !/Chrome\//.test(ua)) browser = 'Safari';
  let os = 'Other';
  if (/Windows/.test(ua)) os = 'Windows';
  else if (/Android/.test(ua)) os = 'Android';
  else if (/iPhone|iPad|iPod/.test(ua)) os = 'iOS';
  else if (/Mac OS X/.test(ua)) os = 'macOS';
  else if (/Linux/.test(ua)) os = 'Linux';
  const device = /Mobi|Android|iPhone|iPad/.test(ua) ? 'Mobile' : 'Desktop';
  return { browser, os, device };
}

async function getGeo() {
  try {
    const cached = sessionStorage.getItem('geo_info');
    if (cached !== null) return JSON.parse(cached);
    const r = await fetch('https://ipapi.co/json/');
    const j = await r.json();
    const info = { country: j.country_name || '', ip: j.ip || '' };
    sessionStorage.setItem('geo_info', JSON.stringify(info));
    return info;
  } catch (e) { return { country: '', ip: '' }; }
}

async function logEvent(type) {
  const env = detectEnv();
  const geo = await getGeo();
  sbInsert('analytics_events', {
    visitor_id: getVisitorId(),
    event_type: type,
    browser: env.browser,
    os: env.os,
    device: env.device,
    country: geo.country,
    ip: geo.ip,
    referrer: document.referrer || 'direct',
    path: location.pathname || '/'
  });
}

function initAnalytics() {
  try {
    if (!sessionStorage.getItem('pv_logged')) {
      logEvent('pageview');
      sessionStorage.setItem('pv_logged', '1');
    }
  } catch (e) { logEvent('pageview'); }

  document.addEventListener('click', (e) => {
    if (e.target.closest('#cvNavBtn')) { logEvent('click_cv'); return; }
    const a = e.target.closest('a');
    if (!a) return;
    const href = (a.getAttribute('href') || '').toLowerCase();
    if (href.includes('linkedin')) logEvent('click_linkedin');
    else if (href.includes('behance')) logEvent('click_behance');
  }, true);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => { initSupabase(); initAnalytics(); });
} else {
  initSupabase();
  initAnalytics();
}
