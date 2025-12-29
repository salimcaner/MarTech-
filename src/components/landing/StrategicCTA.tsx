import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { content } from '../../content';

export default function StrategicCTA() {
    const [email, setEmail] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Navigate to login/register instead of alert
        navigate('/login');
    };

    return (
        <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
            <div className="container mx-auto max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="relative rounded-2xl border border-stroke bg-surface/50 p-8 sm:p-12 lg:p-16 text-center overflow-hidden"
                >
                    {/* Background glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-transparent to-accent/5 opacity-50" />

                    <div className="relative z-10">
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-textPrimary mb-6">
                            {content.strategicCTA.headline}
                        </h2>

                        <form
                            onSubmit={handleSubmit}
                            className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto"
                        >
                            <div className="flex-1 relative">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    onFocus={() => setIsFocused(true)}
                                    onBlur={() => setIsFocused(false)}
                                    placeholder={content.strategicCTA.placeholder}
                                    className={`w-full px-6 py-4 rounded-lg bg-base border ${isFocused
                                            ? 'border-accent shadow-lg shadow-accent/20'
                                            : 'border-stroke'
                                        } text-textPrimary placeholder-textSecondary focus:outline-none transition-all duration-300`}
                                    required
                                />
                                {isFocused && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="absolute inset-0 rounded-lg border-2 border-accent pointer-events-none"
                                        style={{ boxShadow: '0 0 20px rgba(255, 184, 77, 0.3)' }}
                                    />
                                )}
                            </div>

                            <motion.button
                                type="submit"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="px-8 py-4 bg-accent text-base font-semibold rounded-lg hover:bg-accent/90 transition-colors flex items-center justify-center gap-2 group whitespace-nowrap"
                            >
                                {content.strategicCTA.buttonText}
                                <ArrowRight
                                    size={20}
                                    className="group-hover:translate-x-1 transition-transform"
                                />
                            </motion.button>
                        </form>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
