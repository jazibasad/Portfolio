document.addEventListener('DOMContentLoaded', () => {
    // Cursor Glow Effect
    const cursorGlow = document.querySelector('.cursor-glow');
    
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX;
        const y = e.clientY;
        
        cursorGlow.style.left = `${x}px`;
        cursorGlow.style.top = `${y}px`;
    });

    // Intersection Observer for Scroll Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    // Apply animation classes to sections and cards
    const animatableElements = document.querySelectorAll('.project-card, .about-section, .section-title, .hero-content, .hero-image-container');
    
    animatableElements.forEach(el => {
        el.classList.add('reveal-on-scroll');
        observer.observe(el);
    });

    // Add specific styles for the reveal animation via JS to keep CSS clean initially
    const style = document.createElement('style');
    style.textContent = `
        .reveal-on-scroll {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .reveal-on-scroll.visible {
            opacity: 1;
            transform: translateY(0);
        }
        
        .project-card:nth-child(1) { transition-delay: 0.1s; }
        .project-card:nth-child(2) { transition-delay: 0.2s; }
        .project-card:nth-child(3) { transition-delay: 0.3s; }
    `;
    document.head.appendChild(style);

    // Smooth scroll for nav links (already handled by CSS, but good to have fallback if needed)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
