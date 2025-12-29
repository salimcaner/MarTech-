import { motion } from 'framer-motion';
import {
    FileText,
    Map,
    Building,
    Presentation,
    Calculator,
    Users,
    LucideIcon,
} from 'lucide-react';
import { content } from '../../content';

const iconMap: Record<string, LucideIcon> = {
    FileText,
    Map,
    Building,
    Presentation,
    Calculator,
    Users,
};

export default function Features() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: 'easeOut',
            },
        },
    };

    return (
        <section id="features" className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
            <div className="container mx-auto max-w-6xl">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12 lg:mb-16"
                >
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-textPrimary mb-4">
                        Özellikler
                    </h2>
                    <p className="text-textSecondary text-lg max-w-2xl mx-auto">
                        Marka inşası için ihtiyacınız olan her şey bir arada
                    </p>
                </motion.div>

                {/* Features Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-100px' }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
                >
                    {content.features.map((feature, index) => {
                        const Icon = iconMap[feature.icon] || FileText;

                        return (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                                className="p-6 lg:p-8 rounded-xl border border-stroke bg-surface/50 hover:bg-surface hover:border-accent/30 transition-all duration-300 group"
                            >
                                <div className="mb-4">
                                    <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                                        <Icon size={24} className="text-accent" />
                                    </div>
                                </div>
                                <h3 className="text-xl font-semibold text-textPrimary mb-3">
                                    {feature.title}
                                </h3>
                                <p className="text-textSecondary leading-relaxed">
                                    {feature.desc}
                                </p>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}
