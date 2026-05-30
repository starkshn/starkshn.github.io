// Scroll progress bar
window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / scrollHeight) * 100;
    const detail = document.querySelector('.project-detail');
    if (detail) {
        detail.style.setProperty('--scroll-progress', progress + '%');
    }
});

// Lazy image fade-in on scroll
const imgObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            imgObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.project-image').forEach((img) => {
    img.style.opacity = '0';
    img.style.transform = 'translateY(20px)';
    img.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    imgObserver.observe(img);
});

// Image click to fullscreen
document.querySelectorAll('.project-image img').forEach((img) => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', () => {
        const overlay = document.createElement('div');
        overlay.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.9);z-index:9999;display:flex;align-items:center;justify-content:center;cursor:zoom-out;padding:20px;';
        const clone = img.cloneNode();
        clone.style.cssText = 'max-width:95vw;max-height:95vh;object-fit:contain;border-radius:8px;';
        overlay.appendChild(clone);
        overlay.addEventListener('click', () => overlay.remove());
        document.body.appendChild(overlay);
    });
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
