import { useEffect, useRef, useState, useCallback } from 'react';

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    opacity: number;
    baseOpacity: number;
}

/**
 * BackgroundFlow - Arka planda akan organik şekiller
 * Mouse hover ve tıklama ile etkileşimli
 */
export default function BackgroundFlow() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationFrameRef = useRef<number | undefined>();
    const particlesRef = useRef<Particle[]>([]);
    const mouseRef = useRef({ x: 0, y: 0, isHovering: false });
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

    // Reduced motion kontrolü
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        setPrefersReducedMotion(mediaQuery.matches);

        const handleChange = (e: MediaQueryListEvent) => {
            setPrefersReducedMotion(e.matches);
        };

        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    // Parçacıkları oluştur
    useEffect(() => {
        if (prefersReducedMotion) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // 8-14 arası parçacık oluştur
        const particleCount = Math.floor(Math.random() * 7) + 8;
        particlesRef.current = Array.from({ length: particleCount }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.3,
            vy: (Math.random() - 0.5) * 0.3,
            radius: Math.random() * 60 + 40,
            opacity: Math.random() * 0.15 + 0.05,
            baseOpacity: Math.random() * 0.15 + 0.05,
        }));

        return () => {
            window.removeEventListener('resize', resizeCanvas);
        };
    }, [prefersReducedMotion]);

    // Mouse pozisyonunu takip et
    const handleMouseMove = useCallback((e: MouseEvent) => {
        mouseRef.current.x = e.clientX;
        mouseRef.current.y = e.clientY;
        mouseRef.current.isHovering = true;
    }, []);

    const handleMouseLeave = useCallback(() => {
        mouseRef.current.isHovering = false;
    }, []);

    // Tıklama etkisi
    const handleClick = useCallback((e: MouseEvent) => {
        const clickX = e.clientX;
        const clickY = e.clientY;

        particlesRef.current.forEach((particle) => {
            const dx = particle.x - clickX;
            const dy = particle.y - clickY;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 200) {
                // Yakındaki parçacıkları it
                const angle = Math.atan2(dy, dx);
                const force = (200 - distance) / 200;
                particle.vx += Math.cos(angle) * force * 2;
                particle.vy += Math.sin(angle) * force * 2;

                // Pulse efekti
                particle.opacity = Math.min(particle.baseOpacity * 2, 0.3);
            }
        });
    }, []);

    useEffect(() => {
        if (prefersReducedMotion) return;

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseleave', handleMouseLeave);
        window.addEventListener('click', handleClick);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseleave', handleMouseLeave);
            window.removeEventListener('click', handleClick);
        };
    }, [prefersReducedMotion, handleMouseMove, handleMouseLeave, handleClick]);

    // Animasyon döngüsü
    useEffect(() => {
        if (prefersReducedMotion) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particlesRef.current.forEach((particle) => {
                // Mouse etkileşimi
                if (mouseRef.current.isHovering) {
                    const dx = particle.x - mouseRef.current.x;
                    const dy = particle.y - mouseRef.current.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 150) {
                        // Hafif itme (repel)
                        const angle = Math.atan2(dy, dx);
                        const force = (150 - distance) / 150 * 0.5;
                        particle.vx += Math.cos(angle) * force * 0.02;
                        particle.vy += Math.sin(angle) * force * 0.02;

                        // Opacity değişimi
                        particle.opacity = Math.min(particle.baseOpacity * 1.5, 0.25);
                    } else {
                        // Opacity normale dön
                        particle.opacity += (particle.baseOpacity - particle.opacity) * 0.1;
                    }
                } else {
                    particle.opacity += (particle.baseOpacity - particle.opacity) * 0.1;
                }

                // Hızı yavaş yavaş azalt (sürtünme)
                particle.vx *= 0.98;
                particle.vy *= 0.98;

                // Pozisyon güncelle
                particle.x += particle.vx;
                particle.y += particle.vy;

                // Sınırlardan sekme (yumuşak)
                if (particle.x < 0 || particle.x > canvas.width) {
                    particle.vx *= -0.8;
                    particle.x = Math.max(0, Math.min(canvas.width, particle.x));
                }
                if (particle.y < 0 || particle.y > canvas.height) {
                    particle.vy *= -0.8;
                    particle.y = Math.max(0, Math.min(canvas.height, particle.y));
                }

                // Parçacığı çiz (blur efekti ile organik görünüm)
                const gradient = ctx.createRadialGradient(
                    particle.x,
                    particle.y,
                    0,
                    particle.x,
                    particle.y,
                    particle.radius
                );
                gradient.addColorStop(0, `rgba(255, 184, 77, ${particle.opacity})`);
                gradient.addColorStop(0.5, `rgba(255, 184, 77, ${particle.opacity * 0.5})`);
                gradient.addColorStop(1, `rgba(255, 184, 77, 0)`);

                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
                ctx.fill();
            });

            animationFrameRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [prefersReducedMotion]);

    // Reduced motion durumunda hiçbir şey çizme
    if (prefersReducedMotion) {
        return null;
    }

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-0"
            style={{ opacity: 0.6 }}
            aria-hidden="true"
        />
    );
}
