import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        companyName: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Mock register
        console.log('Register attempt:', formData);
        navigate('/dashboard');
    };

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold text-white">Kayıt Ol</h2>
                <p className="mt-2 text-textSecondary">
                    Markanızı büyütmeye başlamak için hesap oluşturun.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-textSecondary">
                        Ad Soyad
                    </label>
                    <input
                        type="text"
                        className="w-full px-4 py-3 bg-base border border-stroke rounded-lg focus:outline-none focus:border-accent text-white"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                    />
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-textSecondary">
                        Marka / Şirket Adı
                    </label>
                    <input
                        type="text"
                        className="w-full px-4 py-3 bg-base border border-stroke rounded-lg focus:outline-none focus:border-accent text-white"
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        required
                    />
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-textSecondary">
                        E-posta
                    </label>
                    <input
                        type="email"
                        className="w-full px-4 py-3 bg-base border border-stroke rounded-lg focus:outline-none focus:border-accent text-white"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                    />
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-textSecondary">
                        Şifre
                    </label>
                    <input
                        type="password"
                        className="w-full px-4 py-3 bg-base border border-stroke rounded-lg focus:outline-none focus:border-accent text-white"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full py-3 px-4 bg-accent text-base font-bold rounded-lg hover:bg-accent/90 transition-colors mt-2"
                >
                    Hesap Oluştur
                </button>
            </form>

            <div className="text-center text-textSecondary">
                Zaten hesabınız var mı?{' '}
                <Link to="/login" className="text-accent hover:text-accent/80 font-medium">
                    Giriş Yap
                </Link>
            </div>
        </div>
    );
};

export default Register;
