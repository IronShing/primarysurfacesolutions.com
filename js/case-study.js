/* ============================================
   CASE STUDY PAGE — JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ---------- Lightbox for Photos ----------
    const lightboxHtml = `
        <div class="cs-lightbox" id="csLightbox">
            <button class="cs-lightbox__close" aria-label="Close">
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
            </button>
            <img src="" alt="">
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', lightboxHtml);

    const lightbox = document.getElementById('csLightbox');
    const lightboxImg = lightbox.querySelector('img');
    const lightboxClose = lightbox.querySelector('.cs-lightbox__close');

    // Open lightbox on photo click
    document.querySelectorAll('.cs-photo__frame').forEach(frame => {
        frame.addEventListener('click', () => {
            const img = frame.querySelector('img');
            if (img && img.src) {
                lightboxImg.src = img.src;
                lightboxImg.alt = img.alt;
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    lightboxClose.addEventListener('click', (e) => {
        e.stopPropagation();
        closeLightbox();
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });

    // ---------- Scroll Animations ----------
    const animateElements = document.querySelectorAll(
        '.cs-block, .cs-photos, .cs-callout, .cs-process__step, .cs-result, .cs-specs, .cs-cta'
    );

    animateElements.forEach(el => {
        el.classList.add('animate-in');
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const parent = entry.target.closest('.cs-results, .cs-process');
                const delay = parent
                    ? Array.from(parent.children).indexOf(entry.target) * 100
                    : 0;

                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);

                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -30px 0px'
    });

    animateElements.forEach(el => observer.observe(el));
});
