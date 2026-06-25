// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = document.querySelector('.nav').offsetHeight;
            window.scrollTo({
                top: target.offsetTop - navHeight - 20,
                behavior: 'smooth'
            });
        }
    });
});

// Navigation scroll effect (theme-aware via CSS class)
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.nav');
    if (!nav) return;
    nav.classList.toggle('scrolled', window.pageYOffset > 50);
});

// ============================================
// THEME TOGGLE (dark / light)
// ============================================
function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    try { localStorage.setItem('theme', theme); } catch (e) {}
    const btn = document.getElementById('themeToggle');
    if (btn) btn.setAttribute('aria-label', theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode');
}

function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    applyTheme(current === 'light' ? 'dark' : 'light');
}

// Sync aria-label on load (without forcing a persisted choice)
(function () {
    const t = document.documentElement.getAttribute('data-theme') || 'dark';
    const btn = document.getElementById('themeToggle');
    if (btn) btn.setAttribute('aria-label', t === 'light' ? 'Switch to dark mode' : 'Switch to light mode');
})();

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Animate elements on scroll
document.querySelectorAll('.project, .skill-circle, .cert-card, .stat-card, .tool-pill').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Stats counter
const stats = document.querySelectorAll('.stat-number');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = entry.target;
            const text = target.textContent;
            const hasPlus = text.includes('+');
            const number = parseInt(text.replace(/\D/g, ''));
            
            if (!isNaN(number)) {
                let current = 0;
                const increment = number / 40;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= number) {
                        clearInterval(timer);
                        current = number;
                    }
                    target.textContent = Math.floor(current) + (hasPlus ? '+' : '');
                }, 40);
            }
            
            statsObserver.unobserve(target);
        }
    });
}, observerOptions);

stats.forEach(stat => statsObserver.observe(stat));

// Skill circles stagger animation
const skillCircles = document.querySelectorAll('.skill-circle');
skillCircles.forEach((circle, index) => {
    circle.style.transitionDelay = `${index * 0.1}s`;
});

// Parallax effect
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const bgGradient = document.querySelector('.bg-gradient');
    if (bgGradient) {
        bgGradient.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// Timeline toggle
const timelineToggleBtn = document.getElementById('timelineToggleBtn');
const timelineExtra = document.getElementById('timeline-extra');
const timelineToggleText = document.getElementById('timelineToggleText');
const timelineToggleIcon = document.getElementById('timelineToggleIcon');

if (timelineToggleBtn) {
    timelineToggleBtn.addEventListener('click', () => {
        const isExpanded = timelineToggleBtn.getAttribute('aria-expanded') === 'true';
        timelineToggleBtn.setAttribute('aria-expanded', !isExpanded);
        timelineExtra.hidden = isExpanded;
        timelineToggleText.textContent = isExpanded ? 'See My Full Journey' : 'Show Less';
        timelineToggleIcon.style.transform = isExpanded ? 'rotate(0deg)' : 'rotate(180deg)';
    });
}

// Certifications toggle
const certToggleBtn = document.getElementById('certToggleBtn');
const certExtra = document.getElementById('cert-extra');
const certToggleText = document.getElementById('certToggleText');
const certToggleIcon = document.getElementById('certToggleIcon');

if (certToggleBtn) {
    certToggleBtn.addEventListener('click', () => {
        const isExpanded = certToggleBtn.getAttribute('aria-expanded') === 'true';
        certToggleBtn.setAttribute('aria-expanded', !isExpanded);
        certExtra.hidden = isExpanded;
        certToggleText.textContent = isExpanded ? 'Show More Certifications' : 'Show Less';
        certToggleIcon.style.transform = isExpanded ? 'rotate(0deg)' : 'rotate(180deg)';
    });
}

console.log('%c🎨 Portfolio by Magdy Saad', 'color: #6366f1; font-size: 16px; font-weight: bold;');

// Copy to clipboard function
function copyToClipboard(text, btn) {
    navigator.clipboard.writeText(text).then(() => {
        const svg = btn.querySelector('svg');
        const original = btn.innerHTML;
        btn.innerHTML = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`;
        btn.style.color = 'var(--color-success)';
        btn.style.borderColor = 'var(--color-success-border)';
        setTimeout(() => {
            btn.innerHTML = original;
            btn.style.color = '';
            btn.style.borderColor = '';
        }, 2000);
    });
}

// Open email — tries mailto first, falls back to Gmail web
function openEmail(e) {
    const email = 'magdy10151125@gmail.com';
    const mailtoLink = `mailto:${email}`;
    const gmailLink = `https://mail.google.com/mail/?view=cm&to=${email}`;

    // Try mailto, if it doesn't open within 500ms fallback to Gmail
    const start = Date.now();
    window.location.href = mailtoLink;

    setTimeout(() => {
        if (Date.now() - start < 1000) {
            window.open(gmailLink, '_blank');
        }
    }, 500);
}

// ============================================
// CV MODAL
// ============================================
// Holds the latest CV config loaded from Supabase (set by supabase-loader.js).
window.cvConfig = window.cvConfig || { enabled: false, url: '', imageUrl: '', buttonText: 'View CV' };

function renderCvButton() {
    const btn = document.getElementById('cvNavBtn');
    const txt = document.getElementById('cvNavBtnText');
    if (!btn) return;
    const c = window.cvConfig || {};
    if (txt && c.buttonText) txt.textContent = c.buttonText;
    const show = !!(c.enabled && (c.url || c.imageUrl));
    btn.hidden = !show;
    // Also control display directly: a CSS `display` rule overrides the [hidden]
    // attribute, so we must set inline display too.
    btn.style.display = show ? 'inline-flex' : 'none';
}

function openCvModal() {
    const modal = document.getElementById('cvModal');
    const body = document.getElementById('cvModalBody');
    const dl = document.getElementById('cvDownloadBtn');
    if (!modal || !body) return;
    const c = window.cvConfig || {};

    // Header title text + show/hide (both controlled from the dashboard)
    const titleEl = document.getElementById('cvModalTitle');
    if (titleEl) {
        titleEl.textContent = c.modalTitle || 'Résumé';
        titleEl.hidden = (c.titleEnabled === false);
    }

    // Preview source: the dedicated preview (image OR an HTML page), else the download file.
    const previewSrc = c.imageUrl || c.url;
    const isImage = /\.(png|jpe?g|webp|gif|avif)(\?.*)?$/i.test(previewSrc || '');
    if (!previewSrc) {
        body.innerHTML = `<div class="cv-modal-loading">CV not available yet.</div>`;
    } else if (isImage) {
        body.innerHTML = `<img src="${previewSrc}" alt="CV preview" class="cv-preview-img">`;
    } else {
        body.innerHTML = `<iframe src="${previewSrc}${previewSrc.includes('.pdf') ? '#toolbar=0&navpanes=0' : ''}" class="cv-preview-frame" title="CV preview"></iframe>`;
    }

    if (dl) {
        const file = c.url || c.imageUrl || '';
        const ext = (file.split('.').pop() || 'pdf').split('?')[0];
        const fname = `Magdy-Saad-CV.${ext}`;
        dl.href = file || '#';
        dl.setAttribute('download', fname);
        dl.style.display = file ? '' : 'none';
        // Force a real download even for cross-origin files (e.g. Supabase storage),
        // where the browser would otherwise ignore the download attribute.
        dl.onclick = async (ev) => {
            if (!file) return;
            ev.preventDefault();
            try {
                const res = await fetch(file, { mode: 'cors' });
                if (!res.ok) throw new Error('fetch failed');
                const blob = await res.blob();
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = fname;
                document.body.appendChild(a);
                a.click();
                a.remove();
                setTimeout(() => URL.revokeObjectURL(url), 4000);
            } catch (e) {
                // Fallback: open in a new tab so the user can still save it
                window.open(file, '_blank', 'noopener');
            }
        };
    }

    modal.hidden = false;
    // next frame -> trigger CSS transition
    requestAnimationFrame(() => modal.classList.add('cv-modal-open'));
    document.body.style.overflow = 'hidden';

    // Accessibility: remember opener, move focus into the modal
    window._cvOpener = document.activeElement;
    const closeBtn = modal.querySelector('.cv-modal-close');
    if (closeBtn) closeBtn.focus();
}

function closeCvModal() {
    const modal = document.getElementById('cvModal');
    if (!modal) return;
    modal.classList.remove('cv-modal-open');
    document.body.style.overflow = '';
    setTimeout(() => { modal.hidden = true; }, 280);
    // Restore focus to whatever opened the modal
    if (window._cvOpener && typeof window._cvOpener.focus === 'function') {
        window._cvOpener.focus();
    }
}

// Keyboard: Escape closes, Tab is trapped inside the modal
document.addEventListener('keydown', (e) => {
    const modal = document.getElementById('cvModal');
    if (!modal || modal.hidden) return;
    if (e.key === 'Escape') { closeCvModal(); return; }
    if (e.key === 'Tab') {
        const focusables = modal.querySelectorAll('a[href], button:not([disabled]), iframe, [tabindex]:not([tabindex="-1"])');
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
});

// Hidden admin access — click copyright 5 times quickly
(function() {
    let clicks = 0;
    let timer = null;
    const el = document.getElementById('footerCopy');
    if (!el) return;
    el.addEventListener('click', () => {
        clicks++;
        clearTimeout(timer);
        timer = setTimeout(() => { clicks = 0; }, 2000);
        if (clicks >= 5) {
            clicks = 0;
            window.location.href = 'login.html';
        }
    });
})();
