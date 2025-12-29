import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { content } from '../../content';

export default function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        if (href.startsWith('#')) {
            const element = document.querySelector(href);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
        setIsMobileMenuOpen(false);
    };

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                    ? 'bg-base/80 backdrop-blur-md border-b border-stroke'
                    : 'bg-transparent'
                }`}
        >
            <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 lg:h-20">
                    {/* Logo */}
                    <motion.a
                        href="/"
                        className="flex items-center space-x-2 text-textPrimary font-semibold text-lg lg:text-xl"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <span>{content.brand.name}</span>
                    </motion.a>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center space-x-8">
                        {content.navigation.links.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                onClick={(e) => handleNavClick(e, link.href)}
                                className="text-textSecondary hover:text-textPrimary transition-colors duration-200 text-sm font-medium"
                            >
                                {link.label}
                            </a>
                        ))}
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate('/login')}
                            className="px-6 py-2 bg-accent text-base font-medium rounded-lg hover:bg-accent/90 transition-colors"
                        >
                            {content.navigation.cta}
                        </motion.button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="lg:hidden p-2 text-textPrimary"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Menu"
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="lg:hidden bg-surface border-t border-stroke overflow-hidden"
                    >
                        <div className="container mx-auto px-4 py-6 space-y-4">
                            {content.navigation.links.map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    onClick={(e) => handleNavClick(e, link.href)}
                                    className="block text-textSecondary hover:text-textPrimary transition-colors duration-200 py-2"
                                >
                                    {link.label}
                                </a>
                            ))}
                            <motion.button
                                whileTap={{ scale: 0.95 }}
                                onClick={() => navigate('/login')}
                                className="w-full mt-4 px-6 py-3 bg-accent text-base font-medium rounded-lg hover:bg-accent/90 transition-colors"
                            >
                                {content.navigation.cta}
                            </motion.button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
