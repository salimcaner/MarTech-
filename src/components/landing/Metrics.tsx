import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { content } from '../../content';

interface MetricProps {
    label: string;
    value: number;
    suffix: string;
    isVisible: boolean;
}

function Metric({ label, value, suffix, isVisible }: MetricProps) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!isVisible) return;

        const duration = 1200; // 1.2 saniye
        const steps = 60;
        const increment = value / steps;
        const stepDuration = duration / steps;

        let currentStep = 0;
        const timer = setInterval(() => {
            currentStep++;
            const nextValue = Math.min(
                Math.floor(increment * currentStep),
                value
            );
            setCount(nextValue);

            if (currentStep >= steps) {
                setCount(value);
                clearInterval(timer);
            }
        }, stepDuration);

        return () => clearInterval(timer);
    }, [isVisible, value]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="text-center"
        >
            <div className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-2" style={{ color: '#F5F5F7' }}>
                {count.toLocaleString()}
                {suffix}
            </div>
            <div className="text-sm sm:text-base" style={{ color: '#F5F5F7' }}>{label}</div>
        </motion.div>
    );
}

export default function Metrics() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section
            ref={ref}
            className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-surface/30"
        >
            <div className="container mx-auto max-w-6xl">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
                    {content.metrics.map((metric, index) => (
                        <Metric
                            key={index}
                            label={metric.label}
                            value={metric.value}
                            suffix={metric.suffix}
                            isVisible={isInView}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
