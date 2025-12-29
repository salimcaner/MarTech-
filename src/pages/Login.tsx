import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (username === 'Salim Caner' && password === '725466637') {
            navigate('/dashboard');
        } else {
            setError('Kullanıcı adı veya şifre hatalı');
        }
    };

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold text-white">Giriş Yap</h2>
                <p className="mt-2 text-textSecondary">
                    Hesabınıza erişmek için bilgilerinizi girin.
                </p>
                {error && (
                    <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-sm">
                        {error}
                    </div>
                )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <label htmlFor="username" className="block text-sm font-medium text-textSecondary">
                        Kullanıcı Adı
                    </label>
                    <input
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full px-4 py-3 bg-base border border-stroke rounded-lg focus:outline-none focus:border-accent text-white"
                        placeholder="Kullanıcı Adı"
                        required
                    />
                </div>

                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <label htmlFor="password" className="block text-sm font-medium text-textSecondary">
                            Şifre
                        </label>
                        <Link to="/forgot-password" className="text-sm text-accent hover:text-accent/80">
                            Şifremi unuttum?
                        </Link>
                    </div>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-3 bg-base border border-stroke rounded-lg focus:outline-none focus:border-accent text-white"
                        placeholder="••••••••"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full py-3 px-4 bg-accent text-base font-bold rounded-lg hover:bg-accent/90 transition-colors"
                >
                    Giriş Yap
                </button>
            </form>

            <div className="text-center text-textSecondary">
                Henüz hesabınız yok mu?{' '}
                <Link to="/register" className="text-accent hover:text-accent/80 font-medium">
                    Kayıt Ol
                </Link>
            </div>
        </div>
    );
};

export default Login;
