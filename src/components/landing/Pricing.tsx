import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { content } from '../../content';

export default function Pricing() {
    const navigate = useNavigate();

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
        <section
            id="pricing"
            className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8"
        >
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
                        Fiyatlandırma
                    </h2>
                    <p className="text-textSecondary text-lg max-w-2xl mx-auto">
                        İhtiyacınıza uygun planı seçin
                    </p>
                </motion.div>

                {/* Pricing Cards */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-100px' }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
                >
                    {content.pricing.tiers.map((tier, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            whileHover={{ y: -8, transition: { duration: 0.2 } }}
                            className={`relative p-8 rounded-xl border ${tier.highlight
                                    ? 'border-accent bg-surface lg:scale-105 shadow-lg shadow-accent/10'
                                    : 'border-stroke bg-surface/50 hover:bg-surface'
                                } transition-all duration-300`}
                        >
                            {/* Highlight Badge */}
                            {tier.highlight && (
                                <div className="absolute top-0 right-0 bg-accent text-base px-4 py-1 rounded-bl-xl rounded-tr-xl font-semibold">
                                    Önerilen
                                </div>
                            )}

                            {/* Plan Name */}
                            <h3 className="text-2xl font-bold text-textPrimary mb-2">
                                {tier.name}
                            </h3>

                            {/* Description */}
                            <p className="text-textSecondary mb-6 text-sm">{tier.desc}</p>

                            {/* Price */}
                            <div className="mb-6">
                                <div className="flex items-baseline gap-2">
                                    <span className="text-4xl lg:text-5xl font-bold text-textPrimary">
                                        ${tier.priceMonthly}
                                    </span>
                                    <span className="text-textSecondary">/ay</span>
                                </div>
                            </div>

                            {/* Features */}
                            <ul className="space-y-3 mb-8">
                                {tier.features.map((feature, featureIndex) => (
                                    <li key={featureIndex} className="flex items-start gap-3">
                                        <Check
                                            size={20}
                                            className={`mt-0.5 flex-shrink-0 ${tier.highlight ? 'text-accent' : 'text-textSecondary'
                                                }`}
                                        />
                                        <span className="text-textSecondary text-sm">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* CTA Button */}
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => navigate('/register')}
                                className={`w-full py-3 rounded-lg font-semibold transition-colors ${tier.highlight
                                        ? 'bg-accent hover:bg-accent/90 text-base'
                                        : 'bg-surface border border-stroke hover:bg-surface/80 text-textPrimary'
                                    }`}
                            >
                                {tier.cta}
                            </motion.button>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
