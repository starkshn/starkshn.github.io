// ==================== Navigation Toggle ====================
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// Close nav on link click (mobile)
document.querySelectorAll('.nav-links a').forEach((link) => {
    link.addEventListener('click', () => {
        if (navLinks) navLinks.classList.remove('active');
    });
});

// ==================== Project Filter ====================
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active button
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;

        projectCards.forEach(card => {
            if (filter === 'all' || card.dataset.category === filter) {
                card.classList.remove('hidden');
                card.style.animation = 'fadeInUp 0.4s ease forwards';
            } else {
                card.classList.add('hidden');
            }
        });
    });
});

// 초기 로드 시 active 필터 적용
const activeBtn = document.querySelector('.filter-btn.active');
if (activeBtn && activeBtn.dataset.filter !== 'all') {
    const filter = activeBtn.dataset.filter;
    projectCards.forEach(card => {
        if (card.dataset.category !== filter) {
            card.classList.add('hidden');
        }
    });
}

// 프로젝트 카드 전체 클릭
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', (e) => {
        if (e.target.closest('a')) return;
        const link = card.querySelector('.project-links a');
        if (link) window.location.href = link.href;
    });
});

// ==================== Scroll Fade In ====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all cards and sections
document.querySelectorAll('.skill-card, .project-card, .exp-card, .contact-card, .youtube-card, .abilities').forEach(el => {
    observer.observe(el);
});

// ==================== Nav Background on Scroll ====================
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.nav');
    if (!nav) return;
    if (window.scrollY > 50) {
        nav.style.borderBottomColor = '#333';
    } else {
        nav.style.borderBottomColor = '#222';
    }
});

// ==================== Content Protection (Best Effort) ====================
function blockEvent(e) {
    e.preventDefault();
    e.stopPropagation();
    return false;
}

document.addEventListener('contextmenu', blockEvent, { capture: true });
document.addEventListener('selectstart', blockEvent, { capture: true });
document.addEventListener('dragstart', blockEvent, { capture: true });
document.addEventListener('copy', blockEvent, { capture: true });
document.addEventListener('cut', blockEvent, { capture: true });
document.addEventListener('paste', blockEvent, { capture: true });
document.addEventListener('mousedown', (e) => {
    if (e.button === 1) return blockEvent(e);
}, { capture: true });
document.addEventListener('selectionchange', () => {
    const sel = window.getSelection ? window.getSelection() : null;
    if (sel && sel.rangeCount > 0) {
        try { sel.removeAllRanges(); } catch (_) {}
    }
}, { capture: true });

document.addEventListener('keydown', (e) => {
    const key = (e.key || '').toLowerCase();
    const ctrlOrMeta = e.ctrlKey || e.metaKey;
    const blockedCtrlKeys = ['a', 'c', 's', 'u', 'p', 'x'];

    if (e.key === 'F12') return blockEvent(e);
    if (ctrlOrMeta && e.shiftKey && (key === 'i' || key === 'j' || key === 'c')) return blockEvent(e);
    if (ctrlOrMeta && blockedCtrlKeys.includes(key)) return blockEvent(e);
    if (key === 'printscreen') {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText('');
        }
        return blockEvent(e);
    }
});
