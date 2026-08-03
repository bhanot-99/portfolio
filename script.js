/* ═══════════════════════════════════════════════════════════════
   JATIN BHANOT — PORTFOLIO JAVASCRIPT (OPTIMIZED RUNTIME)
   Ultra-Smooth 60FPS • Geometric Ambient • Scrollytelling
   ═══════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

    /* ─────────────────────────────────────────
       1. PRELOADER
       ───────────────────────────────────────── */
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.classList.add('hidden');
                document.body.style.overflow = 'auto';
            }, 500);
        });
    }

    /* ─────────────────────────────────────────
       2. SMOOTH SCROLL (LENIS)
       ───────────────────────────────────────── */
    let lenis = null;
    if (typeof Lenis !== 'undefined') {
        lenis = new Lenis({
            duration: 0.95,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1.0,
            touchMultiplier: 1.5,
            infinite: false,
        });

        function lenisRaf(time) {
            lenis.raf(time);
            requestAnimationFrame(lenisRaf);
        }
        requestAnimationFrame(lenisRaf);
    }

    /* ─────────────────────────────────────────
       3. SIDEBAR & MOBILE NAVIGATION
       ───────────────────────────────────────── */
    const sidebar = document.getElementById('sidebar');
    const hamburger = document.getElementById('hamburger');
    const navOverlay = document.getElementById('navOverlay');
    const navItems = document.querySelectorAll('.nav-item');

    const toggleMobileNav = (open) => {
        const isOpen = open !== undefined ? open : !sidebar.classList.contains('active');
        sidebar.classList.toggle('active', isOpen);
        hamburger.classList.toggle('active', isOpen);
        navOverlay.classList.toggle('active', isOpen);
        hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    };

    if (hamburger && sidebar && navOverlay) {
        hamburger.addEventListener('click', () => toggleMobileNav());
        navOverlay.addEventListener('click', () => toggleMobileNav(false));
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => toggleMobileNav(false));
        });
    }

    // Unified Smooth Scroll Navigation for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const targetId = anchor.getAttribute('href').slice(1);
            if (!targetId) return;
            const targetEl = document.getElementById(targetId);
            if (targetEl) {
                e.preventDefault();
                if (lenis) {
                    lenis.scrollTo(targetEl, { offset: -20, duration: 1.0 });
                } else {
                    targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });

    // Back to Top Button
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        backToTop.addEventListener('click', () => {
            if (lenis) {
                lenis.scrollTo(0, { duration: 1.0 });
            } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    }

    /* ─────────────────────────────────────────
       4. INTERSECTION OBSERVER — ENTRANCE ANIMATIONS
       ───────────────────────────────────────── */
    const animObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible', 'in-view');
                animObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.animate-on-scroll, .timeline-entry, #hero, .scroll-story .section').forEach(el => {
        animObserver.observe(el);
    });

    // Skill bars observer
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.querySelectorAll('.skill-progress').forEach(bar => {
                    const width = bar.dataset.width;
                    if (width) bar.style.width = width + '%';
                });
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.25 });

    document.querySelectorAll('.skill-category').forEach(cat => skillObserver.observe(cat));

    // Metric fills observer
    const metricObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.querySelectorAll('.metric-fill').forEach(fill => {
                    const width = fill.dataset.width;
                    if (width) fill.style.width = width + '%';
                });
                metricObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.25 });

    document.querySelectorAll('.journey-chapter').forEach(ch => metricObserver.observe(ch));

    /* ─────────────────────────────────────────
       5. TYPEWRITER EFFECT
       ───────────────────────────────────────── */
    const typewriterEl = document.querySelector('.typewriter-text');
    if (typewriterEl) {
        const strings = [
            'ML Engineer',
            'Edge AI Researcher',
            'Backend Developer',
            'CS Undergrad @ Chitkara'
        ];
        let stringIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeSpeed = 80;

        function typeWrite() {
            const current = strings[stringIndex];

            if (isDeleting) {
                typewriterEl.textContent = current.substring(0, charIndex - 1);
                charIndex--;
                typeSpeed = 40;
            } else {
                typewriterEl.textContent = current.substring(0, charIndex + 1);
                charIndex++;
                typeSpeed = 80;
            }

            if (!isDeleting && charIndex === current.length) {
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                stringIndex = (stringIndex + 1) % strings.length;
                typeSpeed = 500;
            }

            setTimeout(typeWrite, typeSpeed);
        }

        setTimeout(typeWrite, 1000);
    }

    /* ─────────────────────────────────────────
       6. TILT EFFECT ON DESKTOP POINTERS
       ───────────────────────────────────────── */
    const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
    if (!isTouchDevice) {
        document.querySelectorAll('.tilt-card').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -5;
                const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 5;

                card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`;
            }, { passive: true });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
                card.style.transition = 'transform 0.4s ease';
            });

            card.addEventListener('mouseenter', () => {
                card.style.transition = 'transform 0.1s ease';
            });
        });
    }

    /* ─────────────────────────────────────────
       7. PROCEDURAL GEOMETRIC AMBIENT SYSTEM
          Ultra-Optimized 60FPS Continuous Flow
       ───────────────────────────────────────── */
    const canvas = document.getElementById('particles-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d', { alpha: true });
        let animationId = null;
        let isVisible = true;

        const ThemeAdapter = {
            isDark: true,
            primary: { r: 124, g: 58, b: 237 },
            secondary: { r: 6, g: 182, b: 212 },
            tertiary: { r: 168, g: 85, b: 247 },

            parseColor(str, defaultRgb) {
                if (!str) return defaultRgb;
                str = str.trim();
                if (str.startsWith('#')) {
                    let hex = str.slice(1);
                    if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
                    if (hex.length === 6) {
                        return {
                            r: parseInt(hex.substr(0, 2), 16),
                            g: parseInt(hex.substr(2, 2), 16),
                            b: parseInt(hex.substr(4, 2), 16)
                        };
                    }
                } else if (str.startsWith('rgb')) {
                    const match = str.match(/\d+/g);
                    if (match && match.length >= 3) {
                        return {
                            r: parseInt(match[0], 10),
                            g: parseInt(match[1], 10),
                            b: parseInt(match[2], 10)
                        };
                    }
                }
                return defaultRgb;
            },

            update() {
                const doc = document.documentElement;
                this.isDark = doc.getAttribute('data-theme') !== 'light';
                const style = getComputedStyle(doc);

                this.primary = this.parseColor(style.getPropertyValue('--accent-primary'), { r: 124, g: 58, b: 237 });
                this.secondary = this.parseColor(style.getPropertyValue('--accent-secondary'), { r: 6, g: 182, b: 212 });
                this.tertiary = this.parseColor(style.getPropertyValue('--accent-tertiary'), { r: 168, g: 85, b: 247 });
            },

            rgba(c, a) {
                return `rgba(${c.r}, ${c.g}, ${c.b}, ${a})`;
            }
        };

        const BOUNDS_MARGIN = 140;

        class GeometricShape {
            constructor() {
                this.reset();
            }

            reset(viewportW = 1200, viewportH = 800, layerIndex = 0) {
                this.layerIndex = layerIndex;
                this.x = Math.random() * (viewportW + BOUNDS_MARGIN * 2) - BOUNDS_MARGIN;
                this.y = Math.random() * (viewportH + BOUNDS_MARGIN * 2) - BOUNDS_MARGIN;
                this.moveAngle = Math.random() * Math.PI * 2;
                this.curveSpeed = (Math.random() - 0.5) * 0.004;

                const randType = Math.random();
                if (randType < 0.72) {
                    this.type = 'capsule';
                } else if (randType < 0.88) {
                    this.type = 'cross';
                } else {
                    this.type = 'ring';
                }

                let layerScale = 1.0;
                let layerSpeed = 0.5;
                let layerOpacityBase = 0.3;

                if (layerIndex === 0) {
                    layerScale = 0.45 + Math.random() * 0.25;
                    layerSpeed = 0.20 + Math.random() * 0.12;
                    layerOpacityBase = 0.12 + Math.random() * 0.08;
                } else if (layerIndex === 1) {
                    layerScale = 0.75 + Math.random() * 0.30;
                    layerSpeed = 0.40 + Math.random() * 0.18;
                    layerOpacityBase = 0.24 + Math.random() * 0.14;
                } else {
                    layerScale = 1.15 + Math.random() * 0.35;
                    layerSpeed = 0.70 + Math.random() * 0.30;
                    layerOpacityBase = 0.40 + Math.random() * 0.22;
                }

                this.scale = layerScale;
                this.speed = layerSpeed;
                this.baseOpacity = layerOpacityBase;

                if (this.type === 'capsule') {
                    const isSlender = Math.random() < 0.35;
                    if (isSlender) {
                        this.width = (8 + Math.random() * 6) * layerScale;
                        this.length = (50 + Math.random() * 65) * layerScale;
                        this.style = Math.random() < 0.5 ? 'accent-line' : 'outlined';
                    } else {
                        this.width = (16 + Math.random() * 16) * layerScale;
                        this.length = (this.width * 2.2 + Math.random() * 35) * layerScale;
                        const styleRand = Math.random();
                        if (styleRand < 0.38) this.style = 'outlined';
                        else if (styleRand < 0.70) this.style = 'semi-transparent';
                        else if (styleRand < 0.88) this.style = 'filled-gradient';
                        else this.style = 'glowing';
                    }

                    this.baseAngle = Math.random() * Math.PI * 2;
                    this.spinSpeed = (Math.random() - 0.5) * 0.007;
                } else if (this.type === 'cross') {
                    this.size = (16 + Math.random() * 16) * layerScale;
                    this.thickness = Math.max(1.5, (2.0 + Math.random() * 1.5) * layerScale);
                    this.baseAngle = Math.random() * Math.PI * 2;
                    this.spinSpeed = (Math.random() - 0.5) * 0.005;
                    this.style = 'outlined';
                } else {
                    this.radius = (8 + Math.random() * 11) * layerScale;
                    this.thickness = Math.max(1.2, 1.8 * layerScale);
                    this.baseAngle = 0;
                    this.spinSpeed = 0;
                    this.style = Math.random() < 0.5 ? 'outlined' : 'semi-transparent';
                }

                const colorRand = Math.random();
                if (colorRand < 0.52) this.colorType = 'primary';
                else if (colorRand < 0.82) this.colorType = 'secondary';
                else this.colorType = 'tertiary';

                this.strokeWidth = Math.max(1.2, (1.5 + Math.random() * 0.9) * layerScale);
                this.wobblePhase = Math.random() * Math.PI * 2;
                this.wobbleSpeed = 0.008 + Math.random() * 0.010;
                this.wobbleAmp = (2.0 + Math.random() * 3.5) * layerScale;

                this.rotPhase = Math.random() * Math.PI * 2;
                this.rotSpeed = 0.005 + Math.random() * 0.008;
                this.rotAmp = 0.045;

                this.opacityPhase = Math.random() * Math.PI * 2;
                this.opacitySpeed = 0.012 + Math.random() * 0.015;
            }
        }

        const LayerManager = {
            layers: [[], [], []],
            width: 1200,
            height: 800,

            init(width, height) {
                this.width = width;
                this.height = height;
                this.layers = [[], [], []];

                const area = width * height;
                const baseCount = Math.max(45, Math.min(85, Math.floor(area / 20000)));

                const countBg = Math.floor(baseCount * 0.38);
                const countMid = Math.floor(baseCount * 0.38);
                const countFg = Math.floor(baseCount * 0.24);

                for (let i = 0; i < countBg; i++) {
                    const s = new GeometricShape();
                    s.reset(width, height, 0);
                    this.layers[0].push(s);
                }
                for (let i = 0; i < countMid; i++) {
                    const s = new GeometricShape();
                    s.reset(width, height, 1);
                    this.layers[1].push(s);
                }
                for (let i = 0; i < countFg; i++) {
                    const s = new GeometricShape();
                    s.reset(width, height, 2);
                    this.layers[2].push(s);
                }
            }
        };

        const MotionEngine = {
            scrollY: 0,
            scrollVelocity: 0,
            warpFactor: 0,

            updateScroll(vel = 0) {
                const targetScrollY = window.scrollY || 0;
                const delta = targetScrollY - this.scrollY;
                this.scrollY += delta * 0.15;
                this.scrollVelocity = vel || delta;
                const targetWarp = Math.min(Math.abs(this.scrollVelocity) * 0.03, 2.0);
                this.warpFactor += (targetWarp - this.warpFactor) * 0.12;
            },

            update(layers, width, height) {
                const boundsW = width + BOUNDS_MARGIN * 2;
                const boundsH = height + BOUNDS_MARGIN * 2;
                const speedMultiplier = 1 + this.warpFactor * 0.6;

                for (let l = 0; l < 3; l++) {
                    const layer = layers[l];
                    const len = layer.length;
                    for (let i = 0; i < len; i++) {
                        const s = layer[i];
                        s.moveAngle += s.curveSpeed;
                        s.x += Math.cos(s.moveAngle) * (s.speed * speedMultiplier);
                        s.y += Math.sin(s.moveAngle) * (s.speed * speedMultiplier);
                        s.baseAngle += s.spinSpeed * speedMultiplier;

                        if (s.x > width + BOUNDS_MARGIN) s.x -= boundsW;
                        else if (s.x < -BOUNDS_MARGIN) s.x += boundsW;

                        if (s.y > height + BOUNDS_MARGIN) s.y -= boundsH;
                        else if (s.y < -BOUNDS_MARGIN) s.y += boundsH;

                        s.wobblePhase += s.wobbleSpeed;
                        s.rotPhase += s.rotSpeed;
                        s.opacityPhase += s.opacitySpeed;
                    }
                }
            }
        };

        const Renderer = {
            dpr: 1,
            width: 1200,
            height: 800,

            init(canvas, ctx) {
                this.canvas = canvas;
                this.ctx = ctx;
                this.resize();
            },

            resize() {
                const w = window.innerWidth;
                const h = window.innerHeight;
                this.dpr = Math.min(window.devicePixelRatio || 1, 2);
                this.canvas.width = Math.floor(w * this.dpr);
                this.canvas.height = Math.floor(h * this.dpr);
                this.canvas.style.width = w + 'px';
                this.canvas.style.height = h + 'px';

                this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
                this.width = w;
                this.height = h;

                LayerManager.init(w, h);
            },

            getColor(theme, colorType) {
                if (colorType === 'secondary') return theme.secondary;
                if (colorType === 'tertiary') return theme.tertiary;
                return theme.primary;
            },

            drawPill(ctx, width, length, radius) {
                const r = Math.min(radius, width * 0.5, length * 0.5);
                const halfL = length * 0.5;
                const halfW = width * 0.5;

                ctx.beginPath();
                ctx.moveTo(-halfL + r, -halfW);
                ctx.lineTo(halfL - r, -halfW);
                ctx.arc(halfL - r, -halfW + r, r, -Math.PI * 0.5, 0);
                ctx.lineTo(halfL, halfW - r);
                ctx.arc(halfL - r, halfW - r, r, 0, Math.PI * 0.5);
                ctx.lineTo(-halfL + r, halfW);
                ctx.arc(-halfL + r, halfW - r, r, Math.PI * 0.5, Math.PI);
                ctx.lineTo(-halfL, -halfW + r);
                ctx.arc(-halfL + r, -halfW + r, r, Math.PI, -Math.PI * 0.5);
                ctx.closePath();
            },

            renderShape(ctx, shape, theme, scrollY) {
                const parallaxFactors = [0.03, 0.07, 0.12];
                const parallaxOffset = scrollY * parallaxFactors[shape.layerIndex];

                const perpX = -Math.sin(shape.moveAngle);
                const perpY = Math.cos(shape.moveAngle);
                const wobble = Math.sin(shape.wobblePhase) * shape.wobbleAmp;

                const posX = shape.x + perpX * wobble;
                const boundsH = this.height + BOUNDS_MARGIN * 2;
                let rawY = shape.y + perpY * wobble - (parallaxOffset % boundsH);
                let posY = ((rawY + BOUNDS_MARGIN) % boundsH);
                if (posY < 0) posY += boundsH;
                posY -= BOUNDS_MARGIN;

                // Viewport Culling
                if (posX < -BOUNDS_MARGIN || posX > this.width + BOUNDS_MARGIN ||
                    posY < -BOUNDS_MARGIN || posY > this.height + BOUNDS_MARGIN) {
                    return;
                }

                const rotOffset = Math.sin(shape.rotPhase) * shape.rotAmp;
                const currentAngle = shape.baseAngle + rotOffset;

                const opacityMod = 0.85 + 0.15 * Math.sin(shape.opacityPhase);
                const alpha = Math.min(1, Math.max(0, shape.baseOpacity * opacityMod * (theme.isDark ? 1.0 : 0.80)));
                const color = this.getColor(theme, shape.colorType);
                const altColor = shape.colorType === 'primary' ? theme.secondary : theme.primary;

                ctx.save();
                ctx.translate(posX, posY);
                ctx.rotate(currentAngle);

                if (shape.type === 'capsule') {
                    const r = shape.width * 0.5;
                    this.drawPill(ctx, shape.width, shape.length, r);

                    if (shape.style === 'outlined') {
                        ctx.strokeStyle = theme.rgba(color, alpha * 0.9);
                        ctx.lineWidth = shape.strokeWidth;
                        ctx.stroke();
                        ctx.fillStyle = theme.rgba(color, alpha * 0.05);
                        ctx.fill();
                    } else if (shape.style === 'semi-transparent') {
                        ctx.fillStyle = theme.rgba(color, alpha * (theme.isDark ? 0.22 : 0.14));
                        ctx.fill();
                        ctx.strokeStyle = theme.rgba(color, alpha * 0.75);
                        ctx.lineWidth = shape.strokeWidth;
                        ctx.stroke();
                    } else if (shape.style === 'filled-gradient') {
                        const grad = ctx.createLinearGradient(-shape.length * 0.5, 0, shape.length * 0.5, 0);
                        grad.addColorStop(0, theme.rgba(color, alpha * (theme.isDark ? 0.45 : 0.28)));
                        grad.addColorStop(1, theme.rgba(altColor, alpha * (theme.isDark ? 0.20 : 0.10)));
                        ctx.fillStyle = grad;
                        ctx.fill();
                        ctx.strokeStyle = theme.rgba(color, alpha * 0.6);
                        ctx.lineWidth = shape.strokeWidth * 0.8;
                        ctx.stroke();
                    } else if (shape.style === 'glowing') {
                        // High-Performance Multi-Pass Glow (0% CPU Gaussian blur cost)
                        ctx.fillStyle = theme.rgba(color, alpha * (theme.isDark ? 0.35 : 0.20));
                        ctx.fill();
                        ctx.strokeStyle = theme.rgba(color, alpha * 0.35);
                        ctx.lineWidth = shape.strokeWidth + 4;
                        ctx.stroke();
                        ctx.strokeStyle = theme.rgba(color, alpha * 0.9);
                        ctx.lineWidth = shape.strokeWidth;
                        ctx.stroke();
                    } else { // accent-line
                        ctx.fillStyle = theme.rgba(color, alpha * (theme.isDark ? 0.30 : 0.18));
                        ctx.fill();
                        ctx.strokeStyle = theme.rgba(altColor, alpha * 0.85);
                        ctx.lineWidth = Math.max(1, shape.strokeWidth * 0.75);
                        ctx.stroke();
                    }
                } else if (shape.type === 'cross') {
                    const half = shape.size * 0.5;
                    ctx.beginPath();
                    ctx.moveTo(-half, 0);
                    ctx.lineTo(half, 0);
                    ctx.moveTo(0, -half);
                    ctx.lineTo(0, half);
                    ctx.strokeStyle = theme.rgba(color, alpha * 0.75);
                    ctx.lineWidth = shape.thickness;
                    ctx.lineCap = 'round';
                    ctx.stroke();
                } else if (shape.type === 'ring') {
                    ctx.beginPath();
                    ctx.arc(0, 0, shape.radius, 0, Math.PI * 2);
                    if (shape.style === 'outlined') {
                        ctx.strokeStyle = theme.rgba(color, alpha * 0.7);
                        ctx.lineWidth = shape.thickness;
                        ctx.stroke();
                    } else {
                        ctx.fillStyle = theme.rgba(color, alpha * 0.15);
                        ctx.fill();
                        ctx.strokeStyle = theme.rgba(color, alpha * 0.6);
                        ctx.lineWidth = shape.thickness;
                        ctx.stroke();
                    }
                }

                ctx.restore();
            },

            render(layers, theme, scrollY) {
                this.ctx.clearRect(0, 0, this.width, this.height);
                for (let l = 0; l < 3; l++) {
                    const layer = layers[l];
                    const len = layer.length;
                    for (let i = 0; i < len; i++) {
                        this.renderShape(this.ctx, layer[i], theme, scrollY);
                    }
                }
            }
        };

        ThemeAdapter.update();
        Renderer.init(canvas, ctx);

        function tick() {
            if (!isVisible) return;
            MotionEngine.update(LayerManager.layers, Renderer.width, Renderer.height);
            Renderer.render(LayerManager.layers, ThemeAdapter, MotionEngine.scrollY);
            animationId = requestAnimationFrame(tick);
        }

        animationId = requestAnimationFrame(tick);

        let resizeTimeout = null;
        window.addEventListener('resize', () => {
            if (resizeTimeout) clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                Renderer.resize();
            }, 120);
        }, { passive: true });

        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                isVisible = false;
                if (animationId) cancelAnimationFrame(animationId);
            } else {
                isVisible = true;
                ThemeAdapter.update();
                animationId = requestAnimationFrame(tick);
            }
        });

        const themeObserver = new MutationObserver(() => {
            ThemeAdapter.update();
        });
        themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    }

    /* ─────────────────────────────────────────
       8. THEME TOGGLE
       ───────────────────────────────────────── */
    const themeToggle = document.getElementById('themeToggle');
    const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const current = document.documentElement.getAttribute('data-theme');
            const next = current === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', next);
            localStorage.setItem('portfolio-theme', next);
        });
    }

    /* ─────────────────────────────────────────
       9. CONNECT HUB (CLIPBOARD ACTION & TOAST)
       ───────────────────────────────────────── */
    const emailCopyCard = document.getElementById('emailCopyCard');
    const toast = document.getElementById('toast');

    if (emailCopyCard) {
        emailCopyCard.addEventListener('click', (e) => {
            if (e.target.closest('.direct-link')) return;

            const email = 'bhanot1054@gmail.com';
            navigator.clipboard.writeText(email).then(() => {
                if (toast) {
                    const originalText = toast.textContent;
                    toast.textContent = 'Email copied to clipboard: ' + email;
                    toast.classList.add('show');
                    setTimeout(() => {
                        toast.classList.remove('show');
                        setTimeout(() => {
                            toast.textContent = originalText;
                        }, 300);
                    }, 3000);
                }
            }).catch(() => {
                window.location.href = 'mailto:' + email;
            });
        });
    }

    /* ─────────────────────────────────────────
       10. GITHUB REPOS (Dynamic Fetch)
       ───────────────────────────────────────── */
    const reposContainer = document.getElementById('githubRepos');

    const langColors = {
        'Python': '#3572A5',
        'Go': '#00ADD8',
        'JavaScript': '#f1e05a',
        'TypeScript': '#3178c6',
        'Rust': '#dea584',
        'C++': '#f34b7d',
        'C': '#555555',
        'HTML': '#e34c26',
        'CSS': '#563d7c',
        'Solidity': '#AA6746',
        'Jupyter Notebook': '#DA5B0B',
        'Shell': '#89e051',
        null: '#8b8b8b'
    };

    async function fetchGitHubRepos() {
        if (!reposContainer) return;
        try {
            const response = await fetch(
                'https://api.github.com/users/bhanot-99/repos?sort=updated&per_page=15'
            );
            if (!response.ok) throw new Error('GitHub API error');

            const repos = await response.json();
            const excludeKeywords = ['cloud', 'neuropaca', 'bhanot-99'];
            const filtered = repos
                .filter(r => {
                    if (r.fork) return false;
                    const lowerName = (r.name || '').toLowerCase();
                    return !excludeKeywords.some(keyword => lowerName.includes(keyword));
                })
                .slice(0, 6);

            reposContainer.innerHTML = filtered.map(repo => `
                <div class="repo-card">
                    <div class="repo-name">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.087a.249.249 0 0 0-.3 0L5.4 15.7a.25.25 0 0 1-.4-.2Z"></path></svg>
                        <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer">${repo.name}</a>
                    </div>
                    <p class="repo-desc">${repo.description || 'No description available'}</p>
                    <div class="repo-meta">
                        ${repo.language ? `
                            <span class="repo-lang">
                                <span class="repo-lang-dot" style="background: ${langColors[repo.language] || '#8b8b8b'}"></span>
                                ${repo.language}
                            </span>
                        ` : ''}
                        <span class="repo-stat">
                            <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z"></path></svg>
                            ${repo.stargazers_count}
                        </span>
                        <span class="repo-stat">
                            <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z"></path></svg>
                            ${repo.forks_count}
                        </span>
                    </div>
                </div>
            `).join('');
        } catch (error) {
            reposContainer.innerHTML = `
                <div class="repo-card">
                    <div class="repo-name">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.087a.249.249 0 0 0-.3 0L5.4 15.7a.25.25 0 0 1-.4-.2Z"></path></svg>
                        <a href="https://github.com/bhanot-99" target="_blank" rel="noopener noreferrer">View all repositories on GitHub →</a>
                    </div>
                    <p class="repo-desc">Visit my GitHub profile to explore my projects, research code, and open-source contributions.</p>
                </div>
            `;
        }
    }

    fetchGitHubRepos();

    /* ─────────────────────────────────────────
       11. PROJECT MODAL POPUPS
       ───────────────────────────────────────── */
    const projectData = {
        'uav-traffic': {
            icon: '🚁',
            title: 'UAV-Based Real-Time Traffic Monitoring',
            category: 'Edge AI • Computer Vision • Research',
            description: 'A comprehensive UAV-based urban traffic analytics platform integrating AI, data processing, and hardware modules. The system performs real-time vehicle detection, tracking, congestion classification, and parking analysis from aerial footage.',
            details: [
                'End-to-end pipeline: VisDrone-trained YOLO11n (5 classes, conf=0.22) + ByteTrack over 2,049 frames',
                '113K total detections with 2,527 unique vehicle IDs tracked, averaging 55 vehicles per frame',
                'Congestion classifier achieving 96.6% SLOW classification accuracy with 3.2% CONGESTED detection',
                'Parking detector: 174 spaces checked, 15 flagged as violations, 0 false positives',
                'SAHI (Slicing Aided Hyper Inference) for small-object aerial detection',
                'Custom bounding-box heuristic to filter unmapped vehicle categories without retraining'
            ],
            tech: ['Python', 'YOLO11n', 'ByteTrack', 'SAHI', 'VisDrone', 'OpenCV', 'Edge AI'],
            github: 'https://github.com/bhanot-99'
        },
        'tomato-disease': {
            icon: '🍅',
            title: 'Tomato Disease Classification via Class-Aware Selective Mixing',
            category: 'ML Research • Computer Vision • Independent Research',
            description: 'A novel preprocessing architecture that routes each class to its empirically optimal visual domain, achieving significant accuracy improvements over standard approaches. Paper currently in progress.',
            details: [
                'Controlled 5-strategy ablation on MobileNetV2 transfer learning',
                'Dataset: PlantVillage with 18,160 images across 10 disease classes',
                'Proposed Class-Aware Selective Mixing routing each class to optimal visual domain',
                'Achieved 93.88% accuracy with F1 macro score of 0.940',
                '+4.82% absolute improvement over colour-only baseline',
                'Executed entirely on CPU-only hardware — demonstrating efficiency'
            ],
            tech: ['PyTorch', 'MobileNetV2', 'PlantVillage', 'Transfer Learning', 'CPU Inference'],
            github: 'https://github.com/bhanot-99'
        },
        'microservices': {
            icon: '⚙️',
            title: 'Microservices E-Commerce Backend',
            category: 'Backend Engineering • Distributed Systems',
            description: 'A modular microservices backend engineered in Golang to empirically evaluate inter-service communication overhead, database design trade-offs, and concurrent scalability under clean architecture constraints.',
            details: [
                'Built with Golang and gRPC for high-performance inter-service communication',
                'PostgreSQL as primary datastore with carefully designed schemas',
                'Clean architecture with clear separation of concerns across services',
                'Empirical benchmarks measuring communication overhead between services',
                'Concurrent scalability testing under various load patterns',
                'Database design trade-off analysis documented throughout'
            ],
            tech: ['Golang', 'gRPC', 'PostgreSQL', 'Microservices', 'Docker', 'Clean Architecture'],
            github: 'https://github.com/bhanot-99'
        },
        'carbon-credit': {
            icon: '🌱',
            title: 'Carbon Credit Marketplace',
            category: 'Web3 • Smart Contracts • HackIndia',
            description: 'A decentralised system designed to analyse transparency and auditability in carbon credit transactions. Evaluated data immutability vs. system efficiency trade-offs in smart contract architecture. Secured Top 10 at HackIndia Spark 5.',
            details: [
                'Decentralised carbon credit transaction system on blockchain',
                'Smart contract architecture for transparent and auditable trades',
                'Evaluated data immutability vs system efficiency trade-offs',
                'Secured Top 10 finish among 100+ competing teams',
                'Recognised for system design depth and implementation quality',
                'Built under 48-hour hackathon constraints at HackIndia Spark 5'
            ],
            tech: ['Solidity', 'Web3', 'Smart Contracts', 'Ethereum', 'DeFi'],
            github: 'https://github.com/bhanot-99'
        },
        'clapy-manga': {
            icon: '🎨',
            title: 'Clapy JIT Manga Colorization Platform',
            category: 'AI • Creative Technology • Deep Learning',
            description: 'An innovative platform for real-time manga colorization leveraging JIT compilation and deep learning to automatically add colour to black-and-white manga panels while preserving artistic style.',
            details: [
                'Real-time manga panel colorization using deep learning',
                'JIT compilation for optimised inference performance',
                'Style-preserving colorization maintaining original artistic intent',
                'PyTorch-based architecture with custom training pipeline',
                'Interactive web interface for uploading and colorizing manga',
                'Supports batch processing of multi-page manga chapters'
            ],
            tech: ['Python', 'PyTorch', 'JIT', 'Computer Vision', 'Deep Learning'],
            github: 'https://github.com/bhanot-99/Clapy-JIT-Manga-Colorization-Platform'
        },
        'legal-qa': {
            icon: '⚖️',
            title: 'AI-Based Legal Document QA',
            category: 'NLP • RAG Systems • LLM Infrastructure',
            description: 'A local document-grounded QA system using Retrieval-Augmented Generation (RAG). Ingests legal documents, indexes in a vector database, and uses LLMs to provide precise, citation-backed answers.',
            details: [
                'RAG pipeline architecture for precision document QA',
                'Integration with LLaMA and Mistral as base language models',
                'Vector database for semantic document indexing and retrieval',
                'Citation-backed responses grounded in source documents',
                'Modular architecture following clean design principles',
                'Optimised for legal domain terminology and structures'
            ],
            tech: ['LLaMA', 'Mistral', 'Vector DB', 'RAG', 'LangChain', 'Python'],
            github: 'https://github.com/bhanot-99'
        }
    };

    const modalOverlay = document.getElementById('projectModalOverlay');
    const modalCloseBtn = document.getElementById('modalClose');

    function openProjectModal(projectId) {
        const data = projectData[projectId];
        if (!data || !modalOverlay) return;

        document.getElementById('modalIcon').textContent = data.icon;
        document.getElementById('modalTitle').textContent = data.title;
        document.getElementById('modalCategory').textContent = data.category;
        document.getElementById('modalDescription').textContent = data.description;

        document.getElementById('modalDetails').innerHTML = `
            <h4>Key Highlights</h4>
            <ul>${data.details.map(d => `<li>${d}</li>`).join('')}</ul>
        `;

        document.getElementById('modalTech').innerHTML = data.tech.map(t => `<span class="tech-badge">${t}</span>`).join('');
        document.getElementById('modalGithubLink').href = data.github;

        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeProjectModal() {
        if (modalOverlay) {
            modalOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }

    document.querySelectorAll('.project-card[data-project]').forEach(card => {
        card.addEventListener('click', (e) => {
            e.preventDefault();
            openProjectModal(card.dataset.project);
        });
    });

    if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeProjectModal);
    if (modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) closeProjectModal();
        });
    }
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeProjectModal();
    });

    /* ─────────────────────────────────────────
       12. HIGH-PERFORMANCE UNIFIED SCROLL ENGINE
           Zero Layout Thrashing • Batched RAF Updates
       ───────────────────────────────────────── */
    const scrollProgressBar = document.getElementById('scroll-progress');
    const storyHudProgress = document.getElementById('storyHudProgress');
    const storyNodes = document.querySelectorAll('.story-hud .story-node');
    const allSections = Array.from(document.querySelectorAll('section[id]'));
    const heroText = document.querySelector('.hero-text');
    const heroVisual = document.querySelector('.hero-visual');

    // Precalculate Section Geometries to eliminate synchronous DOM queries during scroll
    let sectionCache = [];
    function updateSectionCache() {
        sectionCache = allSections.map((sec, idx) => {
            const top = sec.offsetTop;
            const height = sec.offsetHeight;
            return {
                el: sec,
                id: sec.id,
                top,
                bottom: top + height,
                center: top + height * 0.5,
                index: idx,
                numberEl: sec.querySelector('.section-number')
            };
        });
    }
    updateSectionCache();
    window.addEventListener('resize', updateSectionCache, { passive: true });

    // HUD Story Node Click
    storyNodes.forEach(node => {
        node.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = node.dataset.target;
            const targetEl = document.getElementById(targetId);
            if (targetEl) {
                if (lenis) {
                    lenis.scrollTo(targetEl, { offset: -20, duration: 1.0 });
                } else {
                    targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });

    // Track visible cards via IntersectionObserver so 3D spatial calculations run ONLY on active cards
    const visibleCards = new Set();
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                visibleCards.add(entry.target);
            } else {
                visibleCards.delete(entry.target);
                // Reset card transform when out of view
                entry.target.style.transform = '';
                entry.target.classList.remove('story-focus-active');
            }
        });
    }, { rootMargin: '100px 0px 100px 0px' });

    document.querySelectorAll('.service-card, .project-card, .research-card, .process-step, .journey-chapter, .skill-category, .beyond-item, .achievement-item').forEach(card => {
        cardObserver.observe(card);
    });

    // Unified RAF Scroll Pipeline
    let scrollTicking = false;
    let lastScrollY = window.scrollY || 0;

    function onScrollTick() {
        const scrollY = window.scrollY || 0;
        const viewportHeight = window.innerHeight;
        const viewportCenter = scrollY + viewportHeight * 0.5;
        const docHeight = document.documentElement.scrollHeight - viewportHeight;
        const scrollVelocity = scrollY - lastScrollY;
        lastScrollY = scrollY;

        // 1. Progress Bar
        if (scrollProgressBar && docHeight > 0) {
            scrollProgressBar.style.width = ((scrollY / docHeight) * 100) + '%';
        }

        // 2. Back To Top Toggle
        if (backToTop) {
            backToTop.classList.toggle('visible', scrollY > 400);
        }

        // 3. Ambient Flow Warp Velocity Hook
        if (typeof MotionEngine !== 'undefined') {
            MotionEngine.updateScroll(scrollVelocity);
        }

        // 4. Hero Parallax (only executed when in hero zone)
        if (scrollY < viewportHeight && heroText && heroVisual) {
            const factor = (scrollY * 0.18).toFixed(1);
            heroText.style.transform = `translate3d(0, ${(factor * 0.35).toFixed(1)}px, 0)`;
            heroVisual.style.transform = `translate3d(0, ${(factor * 0.15).toFixed(1)}px, 0)`;
        }

        // 5. Active Section & Story HUD Lookup (Fast Array Lookup with 0 Layout Reflows)
        let activeIdx = 0;
        let activeId = 'hero';
        for (let i = 0; i < sectionCache.length; i++) {
            const s = sectionCache[i];
            if (viewportCenter >= s.top && viewportCenter <= s.bottom) {
                activeIdx = i;
                activeId = s.id;
                break;
            }
        }

        // Update Sidebar Active Link
        navItems.forEach(item => {
            item.classList.toggle('active', item.dataset.section === activeId);
        });

        // Update Story HUD Nodes & Progress
        storyNodes.forEach((node, idx) => {
            node.classList.toggle('active', idx === activeIdx);
        });

        if (storyHudProgress && storyNodes.length > 1) {
            const progressPct = (activeIdx / (storyNodes.length - 1)) * 100;
            storyHudProgress.style.height = progressPct + '%';
        }

        // 6. Watermark Parallax for Active & Nearby Section Only
        for (let i = 0; i < sectionCache.length; i++) {
            const s = sectionCache[i];
            if (s.numberEl && Math.abs(viewportCenter - s.center) < viewportHeight) {
                const offset = ((s.center - viewportCenter) * 0.12).toFixed(1);
                s.numberEl.style.transform = `translate3d(0, ${offset}px, 0)`;
            }
        }

        // 7. 3D Spatial Scrollytelling on Visible Cards ONLY (Desktop Only)
        if (window.innerWidth > 768 && visibleCards.size > 0) {
            visibleCards.forEach(card => {
                const rect = card.getBoundingClientRect();
                const cardCenterY = rect.top + rect.height * 0.5;
                const dist = (cardCenterY - viewportHeight * 0.5) / (viewportHeight * 0.65);
                const normDist = Math.max(-1, Math.min(1, dist));

                const rotateX = (-normDist * 6.5).toFixed(2);
                const translateY = (normDist * 8).toFixed(1);
                const scale = (1 - Math.abs(normDist) * 0.035).toFixed(3);

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) translateY(${translateY}px) scale(${scale})`;
                card.classList.toggle('story-focus-active', Math.abs(normDist) < 0.28);
            });
        }

        scrollTicking = false;
    }

    const requestScrollTick = () => {
        if (!scrollTicking) {
            scrollTicking = true;
            requestAnimationFrame(onScrollTick);
        }
    };

    window.addEventListener('scroll', requestScrollTick, { passive: true });
    if (lenis) {
        lenis.on('scroll', requestScrollTick);
    }

    // Initial Trigger
    requestScrollTick();

}); // END DOMContentLoaded
