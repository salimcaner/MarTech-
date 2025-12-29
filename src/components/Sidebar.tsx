import { Link, useLocation } from 'react-router-dom';
import {
    BarChart3,
    Map,
    Target,
    Settings,
    Sparkles,
    LogOut,
    LayoutDashboard,
    Palette,
    Presentation,
    Calculator,
    Users
} from 'lucide-react';

const Sidebar = () => {
    const location = useLocation();
    const isActive = (path: string) => location.pathname === path;

    const menuItems = [
        { icon: LayoutDashboard, label: 'Genel Bakış', path: '/dashboard' },
        { icon: Target, label: 'Marka Analizi', path: '/dashboard/analysis' },
        { icon: Map, label: 'Yol Haritası', path: '/dashboard/roadmap' },
        { icon: Palette, label: 'Mekân Tasarımı', path: '/dashboard/space' },
        { icon: Presentation, label: 'Yatırımcı Sunumu', path: '/dashboard/pitch' },
        { icon: Calculator, label: 'Muhasebe', path: '/dashboard/accounting' },
        { icon: Users, label: 'İş Ağı', path: '/dashboard/network' },
        { icon: Settings, label: 'Ayarlar', path: '/dashboard/settings' },
    ];

    return (
        <div className="h-screen w-64 bg-surface border-r border-stroke flex flex-col fixed left-0 top-0">
            <div className="p-6">
                <Link to="/dashboard" className="flex items-center gap-2 text-xl font-bold text-white">
                    <Sparkles className="w-6 h-6 text-accent" />
                    <span>MarTech</span>
                </Link>
            </div>

            <nav className="flex-1 px-4 space-y-2 mt-4">
                {menuItems.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive(item.path)
                            ? 'bg-accent/10 text-accent'
                            : 'text-textSecondary hover:text-white hover:bg-white/5'
                            }`}
                    >
                        <item.icon className="w-5 h-5" />
                        <span className="font-medium">{item.label}</span>
                    </Link>
                ))}
            </nav>

            <div className="p-4 border-t border-stroke">
                <button className="flex items-center gap-3 px-4 py-3 text-textSecondary hover:text-red-400 hover:bg-red-400/10 w-full rounded-lg transition-colors">
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium">Çıkış Yap</span>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
