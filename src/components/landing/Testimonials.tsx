import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { content } from '../../content';

export default function Testimonials() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
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
        <section
            id="testimonials"
            className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-surface/30"
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
                        Referanslar
                    </h2>
                    <p className="text-textSecondary text-lg max-w-2xl mx-auto">
                        Kullanıcılarımız MarTech ile neler başardı
                    </p>
                </motion.div>

                {/* Testimonials Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-100px' }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
                >
                    {content.testimonials.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            whileHover={{ y: -4, transition: { duration: 0.2 } }}
                            className="p-6 lg:p-8 rounded-xl border border-stroke bg-surface/50 hover:bg-surface transition-all duration-300"
                        >
                            {/* Quote Icon */}
                            <div className="mb-4">
                                <Quote size={32} className="text-accent/50" />
                            </div>

                            {/* Quote Text */}
                            <p className="text-textSecondary leading-relaxed mb-6 text-base">
                                "{testimonial.quote}"
                            </p>

                            {/* Author Info */}
                            <div className="border-t border-stroke pt-4">
                                <div className="font-semibold text-textPrimary">
                                    {testimonial.name}
                                </div>
                                <div className="text-sm text-textSecondary mt-1">
                                    {testimonial.title}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
