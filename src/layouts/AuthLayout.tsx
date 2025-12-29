import { Outlet, Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

const AuthLayout = () => {
    return (
        <div className="min-h-screen grid lg:grid-cols-2 bg-base">
            {/* Left Side - Brand & Visual */}
            <div className="hidden lg:flex flex-col justify-between p-12 bg-surface border-r border-stroke">
                <div>
                    <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-white">
                        <Sparkles className="w-8 h-8 text-accent" />
                        <span>MarTech</span>
                    </Link>
                    <div className="mt-20">
                        <h1 className="text-4xl font-bold text-white leading-tight">
                            Fikirden markaya.<br />Adım adım.
                        </h1>
                        <p className="mt-6 text-lg text-textSecondary max-w-md">
                            Markanızı inşa etmek için ihtiyacınız olan tüm araçlar, analizler ve yol haritası tek bir yerde.
                        </p>
                    </div>
                </div>
                <div className="text-textSecondary text-sm">
                    © 2024 MarTech. Tüm hakları saklıdır.
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="flex flex-col justify-center items-center p-6 lg:p-12">
                <div className="w-full max-w-md">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
