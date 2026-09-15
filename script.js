/* ==========================================================================
   HANZLA AMJAD — Portfolio Interactions
   ========================================================================== */

(function () {
    'use strict';

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // Use capability-based detection (fine pointer + hover support) instead of
    // '!("ontouchstart" in window)'. That old check is unreliable: many hybrid/
    // touchscreen laptops and some embedded preview browsers expose touch APIs
    // even when a real mouse is being used, which was causing isDesktop to
    // evaluate false on genuine desktop setups — hiding the custom cursor via
    // JS while the CSS (media query below) had already hidden the native one,
    // leaving no cursor visible at all.
    const isDesktop = window.matchMedia('(min-width: 981px)').matches &&
        window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    /* ============= BOOT SCREEN ============= */
    const bootScreen = document.getElementById('bootScreen');
    const bootLines = document.getElementById('bootLines');
    const bootBar = document.getElementById('bootBar');
    const bootStatus = document.getElementById('bootStatus');

    const bootMessages = [
        '> BOOT_SEQUENCE initiated...',
        '> Loading kernel modules......... OK',
        '> Mounting GHL_CORE filesystem... OK',
        '> Connecting to automation grid.. OK',
        '> Initializing funnel engine..... OK',
        '> Loading user profile [HANZLA]. OK',
        '> System ready.'
    ];

    function finishBoot() {
        bootScreen.classList.add('hidden');
        document.body.style.overflow = '';
        runRevealOnLoad();
    }

    if (prefersReducedMotion) {
        // Skip the boot animation entirely, respect reduced motion
        bootScreen.classList.add('hidden');
        document.body.style.overflow = '';
    } else {
        let bootIndex = 0;
        function nextBoot() {
            if (bootIndex >= bootMessages.length) {
                bootBar.style.width = '100%';
                bootStatus.textContent = 'System ready ✓';
                setTimeout(finishBoot, 500);
                return;
            }
            const line = document.createElement('div');
            line.className = 'line';
            line.textContent = bootMessages[bootIndex];
            bootLines.appendChild(line);
            bootBar.style.width = ((bootIndex + 1) / bootMessages.length * 95) + '%';
            bootStatus.textContent = bootMessages[bootIndex].replace('> ', '');
            bootIndex++;
            setTimeout(nextBoot, 280);
        }
        document.body.style.overflow = 'hidden';
        setTimeout(nextBoot, 300);
    }

    /* ============= LIVE CLOCK ============= */
    const liveTime = document.getElementById('liveTime');
    function updateClock() {
        const d = new Date();
        const pad = n => String(n).padStart(2, '0');
        liveTime.textContent = `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
    }
    updateClock();
    setInterval(updateClock, 1000);

    /* ============= SCROLL PROGRESS ============= */
    const scrollProgress = document.getElementById('scrollProgress');
    function updateScroll() {
        const h = document.documentElement;
        const total = h.scrollHeight - h.clientHeight;
        const pct = total > 0 ? (h.scrollTop / total) * 100 : 0;
        scrollProgress.style.width = pct + '%';
    }
    document.addEventListener('scroll', updateScroll, { passive: true });

    /* ============= NAV ACTIVE STATE (side nav + mobile nav) ============= */
    const navItems = document.querySelectorAll('.side-nav-item, .mobile-nav-list a');
    const sections = document.querySelectorAll('section[id]');

    function updateActiveNav() {
        let current = '';
        const scrollPos = window.scrollY + window.innerHeight / 3;
        sections.forEach(sec => {
            if (scrollPos >= sec.offsetTop) {
                current = sec.id;
            }
        });
        navItems.forEach(item => {
            item.classList.toggle('active', item.dataset.section === current);
        });
    }
    document.addEventListener('scroll', updateActiveNav, { passive: true });
    updateActiveNav();

    /* ============= MOBILE MENU ============= */
    const menuToggle = document.getElementById('menuToggle');
    const mobileNav = document.getElementById('mobileNav');

    function closeMobileNav() {
        mobileNav.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'Open menu');
        document.body.style.overflow = '';
    }
    function openMobileNav() {
        mobileNav.classList.add('open');
        menuToggle.setAttribute('aria-expanded', 'true');
        menuToggle.setAttribute('aria-label', 'Close menu');
        document.body.style.overflow = 'hidden';
    }
    if (menuToggle && mobileNav) {
        menuToggle.addEventListener('click', () => {
            const isOpen = mobileNav.classList.contains('open');
            isOpen ? closeMobileNav() : openMobileNav();
        });
        mobileNav.querySelectorAll('a').forEach(a => {
            a.addEventListener('click', closeMobileNav);
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileNav.classList.contains('open')) closeMobileNav();
        });
    }

    /* ============= REVEAL ON SCROLL (staggered by section) ============= */
    const revealGroups = document.querySelectorAll(
        '.profile-grid, .services-grid, .stack-grid, .exp-list, .process-row, .contact-grid'
    );
    revealGroups.forEach(group => {
        const children = group.children;
        Array.from(children).forEach((el, i) => {
            el.classList.add('reveal');
            el.style.setProperty('--reveal-delay', Math.min(i * 0.08, 0.4) + 's');
        });
    });

    const singleReveals = document.querySelectorAll(
        '.section-title, .section-line, .section-subtitle, .profile-summary, .terminal'
    );
    singleReveals.forEach(el => el.classList.add('reveal'));

    document.querySelectorAll('.lang-item').forEach(el => el.classList.add('reveal'));

    const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                io.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });
    document.querySelectorAll('.reveal').forEach(el => io.observe(el));

    function runRevealOnLoad() {
        // Hero items reveal immediately after boot
        document.querySelectorAll('.hero .reveal').forEach(el => el.classList.add('visible'));
    }
    if (prefersReducedMotion) runRevealOnLoad();

    /* ============= COUNTER ANIMATION ============= */
    const counters = document.querySelectorAll('.metric-value');
    const counterIO = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterIO.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    counters.forEach(c => counterIO.observe(c));

    function animateCounter(el) {
        const target = parseInt(el.dataset.target, 10);
        const isPercent = el.textContent.includes('%');
        const suffix = isPercent ? '%' : '+';
        if (prefersReducedMotion) {
            el.textContent = target + suffix;
            return;
        }
        const duration = 1400;
        const start = performance.now();
        function tick(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const value = Math.floor(target * eased);
            el.textContent = value + suffix;
            if (progress < 1) requestAnimationFrame(tick);
            else el.textContent = target + suffix;
        }
        requestAnimationFrame(tick);
    }

    /* ============= 3D TILT EFFECT ============= */
    if (isDesktop && !prefersReducedMotion) {
        document.querySelectorAll('[data-tilt]').forEach(card => {
            card.addEventListener('mousemove', e => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const cx = rect.width / 2;
                const cy = rect.height / 2;
                const rotX = ((y - cy) / cy) * -6;
                const rotY = ((x - cx) / cx) * 6;
                card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-3px)`;
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        });
    }

    /* ============= HERO SPOTLIGHT (cursor-follow glow) + PHOTO PARALLAX ============= */
    const heroSpotlight = document.getElementById('heroSpotlight');
    const heroSection = document.getElementById('home');
    const heroPhotoCard = document.getElementById('heroPhotoCard');
    if (heroSpotlight && heroSection && isDesktop && !prefersReducedMotion) {
        heroSection.addEventListener('mousemove', (e) => {
            const rect = heroSection.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            heroSpotlight.style.setProperty('--mx', x + '%');
            heroSpotlight.style.setProperty('--my', y + '%');

            if (heroPhotoCard) {
                // Very subtle drift — the photo should feel alive, not shaky
                const px = ((x - 50) / 50) * 8;
                const py = ((y - 50) / 50) * 8;
                heroPhotoCard.style.transform = `translateY(calc(-50% + ${py * -1}px)) translateX(${px * -1}px)`;
            }
        });
        heroSection.addEventListener('mouseleave', () => {
            if (heroPhotoCard) heroPhotoCard.style.transform = 'translateY(-50%)';
        });
    }

    /* ============= PARTICLE NETWORK BG ============= */
    const canvas = document.getElementById('particleCanvas');
    const ctx = canvas ? canvas.getContext('2d') : null;
    let particles = [];
    let w, h;
    let animFrame = null;

    function resize() {
        if (!canvas || !ctx) return;
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
        const count = Math.min(80, Math.floor((w * h) / 18000));
        particles = [];
        for (let i = 0; i < count; i++) {
            particles.push({
                x: Math.random() * w,
                y: Math.random() * h,
                vx: (Math.random() - 0.5) * 0.4,
                vy: (Math.random() - 0.5) * 0.4,
                r: Math.random() * 1.6 + 0.5
            });
        }
    }

    function animate() {
        if (!canvas || !ctx) return;
        ctx.clearRect(0, 0, w, h);
        particles.forEach(p => {
            p.x += p.vx; p.y += p.vy;
            if (p.x < 0 || p.x > w) p.vx *= -1;
            if (p.y < 0 || p.y > h) p.vy *= -1;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(250, 250, 249, 0.45)';
            ctx.fill();
        });
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 130) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(250, 250, 249, ${0.14 * (1 - dist / 130)})`;
                    ctx.lineWidth = 0.6;
                    ctx.stroke();
                }
            }
        }
        animFrame = requestAnimationFrame(animate);
    }
    window.addEventListener('resize', resize);
    resize();
    if (!prefersReducedMotion && canvas && ctx) {
        animate();
    } else if (canvas) {
        canvas.style.display = 'none';
    }
    document.addEventListener('visibilitychange', () => {
        if (prefersReducedMotion || !canvas || !ctx) return;
        if (document.hidden && animFrame) {
            cancelAnimationFrame(animFrame);
            animFrame = null;
        } else if (!document.hidden && !animFrame) {
            animate();
        }
    });

    /* ============= CONTACT FORM (Web3Forms) ============= */
    const form = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const formStatus = document.getElementById('formStatus');

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const original = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = 'TRANSMITTING...';
            formStatus.className = 'form-status';
            formStatus.textContent = '';

            try {
                const fd = new FormData(form);
                const res = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    body: fd,
                    headers: { 'Accept': 'application/json' }
                });
                const data = await res.json();
                if (data.success) {
                    formStatus.className = 'form-status success';
                    formStatus.textContent = '✓ Message transmitted successfully. I will reply within 24 hours.';
                    form.reset();
                } else {
                    formStatus.className = 'form-status error';
                    formStatus.textContent = '✗ ' + (data.message || 'Transmission failed. Try again or email me directly.');
                }
            } catch (err) {
                formStatus.className = 'form-status error';
                formStatus.textContent = '✗ Network error. Please email hanzala.ghl@gmail.com directly.';
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerHTML = original;
            }
        });
    }

    /* ============= SMOOTH SCROLL FOR ANCHORS ============= */
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', (e) => {
            const id = a.getAttribute('href');
            if (id.length > 1) {
                const target = document.querySelector(id);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
                }
            }
        });
    });

    /* ============= CUSTOM CURSOR (simple, single dot, subtle) ============= */
    const cursorDot = document.getElementById('cursorDot');
    if (cursorDot && isDesktop) {
        let mx = window.innerWidth / 2, my = window.innerHeight / 2;
        let dx = mx, dy = my;
        let hovering = false;

        document.addEventListener('mousemove', (e) => {
            mx = e.clientX; my = e.clientY;
        }, { passive: true });

        // A single, higher lerp factor keeps the dot tight to the real
        // cursor — smooth, but with very little lag (no heavy trailing feel).
        function tick() {
            dx += (mx - dx) * 0.65;
            dy += (my - dy) * 0.65;
            const scale = hovering ? 1.6 : 1;
            cursorDot.style.transform = `translate(${dx}px, ${dy}px) translate(-50%, -50%) scale(${scale})`;
            requestAnimationFrame(tick);
        }
        tick();

        // Subtle hover feedback only — a slight scale-up, no size jump, no ring.
        const hoverables = 'a, button, .btn, input, textarea, [data-tilt]';
        document.body.addEventListener('mouseover', (e) => {
            if (e.target.closest(hoverables)) hovering = true;
        });
        document.body.addEventListener('mouseout', (e) => {
            if (e.target.closest(hoverables)) hovering = false;
        });

        document.addEventListener('mouseleave', () => {
            cursorDot.style.opacity = '0';
        });
        document.addEventListener('mouseenter', () => {
            cursorDot.style.opacity = '1';
        });
    } else if (cursorDot) {
        cursorDot.style.display = 'none';
    }

    /* ============= MAGNETIC BUTTONS ============= */
    if (isDesktop && !prefersReducedMotion) {
        document.querySelectorAll('.btn').forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const r = btn.getBoundingClientRect();
                const x = e.clientX - r.left - r.width / 2;
                const y = e.clientY - r.top - r.height / 2;
                btn.style.transform = `translate(${x * 0.18}px, ${y * 0.28}px) translateY(-3px) scale(1.02)`;
            });
            btn.addEventListener('mouseleave', () => {
                btn.style.transform = '';
            });
        });
    }

    /* ============= MARQUEE PAUSE ON HIDDEN TAB (perf) ============= */
    document.addEventListener('visibilitychange', () => {
        document.querySelectorAll('.marquee-track').forEach(t => {
            t.style.animationPlayState = document.hidden ? 'paused' : 'running';
        });
    });

})();
