import { motion } from 'framer-motion';
import { Twitter, Linkedin, Instagram, LucideIcon } from 'lucide-react';
import { content } from '../../content';

const socialIcons: Record<string, LucideIcon> = {
    Twitter,
    LinkedIn: Linkedin,
    Instagram,
};

export default function Footer() {
    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        if (href.startsWith('#')) {
            e.preventDefault();
            const element = document.querySelector(href);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    };

    return (
        <footer className="border-t border-stroke bg-surface py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
            <div className="container mx-auto max-w-6xl">
                {/* Footer Content */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 mb-12">
                    {/* Product */}
                    <div>
                        <h3 className="text-textPrimary font-semibold mb-4">Ürün</h3>
                        <ul className="space-y-3">
                            {content.footer.sitemap.product.map((link, index) => (
                                <li key={index}>
                                    <a
                                        href="#"
                                        onClick={(e) => handleNavClick(e, '#')}
                                        className="text-textSecondary hover:text-textPrimary transition-colors text-sm"
                                    >
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h3 className="text-textPrimary font-semibold mb-4">Şirket</h3>
                        <ul className="space-y-3">
                            {content.footer.sitemap.company.map((link, index) => (
                                <li key={index}>
                                    <a
                                        href="#"
                                        onClick={(e) => handleNavClick(e, '#')}
                                        className="text-textSecondary hover:text-textPrimary transition-colors text-sm"
                                    >
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h3 className="text-textPrimary font-semibold mb-4">Kaynaklar</h3>
                        <ul className="space-y-3">
                            {content.footer.sitemap.resources.map((link, index) => (
                                <li key={index}>
                                    <a
                                        href="#"
                                        onClick={(e) => handleNavClick(e, '#')}
                                        className="text-textSecondary hover:text-textPrimary transition-colors text-sm"
                                    >
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h3 className="text-textPrimary font-semibold mb-4">Yasal</h3>
                        <ul className="space-y-3">
                            {content.footer.sitemap.legal.map((link, index) => (
                                <li key={index}>
                                    <a
                                        href="#"
                                        onClick={(e) => handleNavClick(e, '#')}
                                        className="text-textSecondary hover:text-textPrimary transition-colors text-sm"
                                    >
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-stroke pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <p className="text-textSecondary text-sm">{content.footer.copyright}</p>

                    {/* Social Icons */}
                    <div className="flex items-center gap-4">
                        {content.footer.social.map((social) => {
                            const Icon = socialIcons[social as keyof typeof socialIcons];
                            if (!Icon) return null;

                            return (
                                <motion.a
                                    key={social}
                                    href="#"
                                    whileHover={{ scale: 1.1, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="text-textSecondary hover:text-accent transition-colors"
                                    aria-label={social}
                                >
                                    <Icon size={20} />
                                </motion.a>
                            );
                        })}
                    </div>
                </div>
            </div>
        </footer>
    );
}
