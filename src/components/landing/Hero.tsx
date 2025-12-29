import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { content } from '../../content';

export default function Hero() {
    const navigate = useNavigate();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: 'easeOut',
            },
        },
    };

    return (
        <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20 lg:pt-32">
            <div className="container mx-auto max-w-5xl">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="text-center"
                >
                    {/* Headline */}
                    <motion.h1
                        variants={itemVariants}
                        className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-textPrimary mb-6 leading-tight"
                    >
                        {content.hero.headline}
                    </motion.h1>

                    {/* Subheadline */}
                    <motion.p
                        variants={itemVariants}
                        className="text-lg sm:text-xl lg:text-2xl text-textSecondary mb-12 max-w-3xl mx-auto leading-relaxed"
                    >
                        {content.hero.subheadline}
                    </motion.p>

                    {/* CTAs */}
                    <motion.div
                        variants={itemVariants}
                        className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
                    >
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => navigate('/login')}
                            className="px-8 py-4 bg-accent text-base font-semibold rounded-lg hover:bg-accent/90 transition-colors flex items-center gap-2 group"
                        >
                            {content.hero.primaryCTA}
                            <ArrowRight
                                size={20}
                                className="group-hover:translate-x-1 transition-transform"
                            />
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => navigate('/register')}
                            className="px-8 py-4 border border-stroke text-textPrimary font-semibold rounded-lg hover:bg-surface transition-colors"
                        >
                            {content.hero.secondaryCTA}
                        </motion.button>
                    </motion.div>

                    {/* Value Props */}
                    <motion.div
                        variants={itemVariants}
                        className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-3xl mx-auto"
                    >
                        {content.hero.valueProps.map((prop, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 + index * 0.1 }}
                                className="p-6 rounded-xl border border-stroke bg-surface/50 hover:bg-surface transition-colors"
                            >
                                <h3 className="text-xl font-semibold text-textPrimary mb-2">
                                    {prop.title}
                                </h3>
                                <p className="text-textSecondary text-sm">{prop.desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
