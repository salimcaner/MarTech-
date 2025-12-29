import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { Bell, User } from 'lucide-react';

const DashboardLayout = () => {
    return (
        <div className="min-h-screen bg-base">
            <Sidebar />

            {/* Main Content Area */}
            <div className="ml-64 p-8">
                {/* Top Header */}
                <header className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-white">Hoş Geldiniz 👋</h1>
                        <p className="text-textSecondary text-sm">Bugün markanız için harika bir gün.</p>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="p-2 text-textSecondary hover:text-white rounded-full hover:bg-white/5 transition-colors relative">
                            <Bell className="w-6 h-6" />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-accent rounded-full"></span>
                        </button>
                        <div className="flex items-center gap-3 pl-4 border-l border-stroke">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-medium text-white">Salim Caner</p>
                                <p className="text-xs text-textSecondary">Founder</p>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-surface border border-stroke flex items-center justify-center">
                                <User className="w-6 h-6 text-accent" />
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <Outlet />
            </div>
        </div>
    );
};

export default DashboardLayout;
