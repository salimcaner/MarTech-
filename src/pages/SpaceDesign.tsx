import { useState } from 'react';
import { Upload, Image as ImageIcon, Sparkles, Check } from 'lucide-react';
import { apiClient } from '../services/api';
import { SpaceDesignOutput } from '../types';

const SpaceDesign = () => {
    const [file, setFile] = useState<File | null>(null);
    const [consent, setConsent] = useState(false);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<SpaceDesignOutput | null>(null);

    const [settings, setSettings] = useState({
        type: 'cafe',
        style: 'modern'
    });

    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleGenerate = async () => {
        if (!file || !consent) return;
        setLoading(true);
        try {
            const data = await apiClient.space.generateConcept(settings);
            setResult(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            <div>
                <h2 className="text-2xl font-bold text-white">Fiziksel Mekân Tasarımı</h2>
                <p className="text-textSecondary mt-1">Mekânınızın fotoğrafını yükleyin, yapay zeka size tasarım önerileri sunsun.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Input Column */}
                <div className="space-y-6">
                    <div className="bg-surface p-6 rounded-xl border border-stroke">
                        <h3 className="text-lg font-bold text-white mb-4">1. Fotoğraf Yükle</h3>

                        <div className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${file ? 'border-accent bg-accent/5' : 'border-stroke hover:border-white/20'
                            }`}>
                            <input
                                type="file"
                                className="hidden"
                                id="photo-upload"
                                accept="image/*"
                                onChange={handleUpload}
                            />
                            <label htmlFor="photo-upload" className="cursor-pointer block">
                                {file ? (
                                    <div className="flex flex-col items-center">
                                        <Check className="w-8 h-8 text-accent mb-2" />
                                        <span className="text-white font-medium">{file.name}</span>
                                        <span className="text-xs text-textSecondary mt-1">Değiştirmek için tıkla</span>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center">
                                        <Upload className="w-8 h-8 text-textSecondary mb-2" />
                                        <span className="text-textSecondary">Fotoğraf Seç veya Sürükle</span>
                                    </div>
                                )}
                            </label>
                        </div>

                        <div className="mt-4 flex items-start gap-3 p-3 bg-base rounded-lg border border-stroke">
                            <input
                                type="checkbox"
                                id="consent"
                                checked={consent}
                                onChange={(e) => setConsent(e.target.checked)}
                                className="mt-1"
                            />
                            <label htmlFor="consent" className="text-xs text-textSecondary cursor-pointer">
                                Yüklediğim fotoğrafın yapay zeka analizi ve konsept üretimi amacıyla işlenmesine izin veriyorum. (KVKK Aydınlatma Metni)
                            </label>
                        </div>
                    </div>

                    <div className="bg-surface p-6 rounded-xl border border-stroke">
                        <h3 className="text-lg font-bold text-white mb-4">2. Tercihler</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm text-textSecondary mb-2">Mekân Türü</label>
                                <select
                                    value={settings.type}
                                    onChange={(e) => setSettings({ ...settings, type: e.target.value })}
                                    className="w-full bg-base border border-stroke rounded-lg p-3 text-white focus:border-accent outline-none"
                                >
                                    <option value="cafe">Kafe / Restoran</option>
                                    <option value="retail">Perakende Mağaza</option>
                                    <option value="office">Ofis</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm text-textSecondary mb-2">Tasarım Stili</label>
                                <select
                                    value={settings.style}
                                    onChange={(e) => setSettings({ ...settings, style: e.target.value })}
                                    className="w-full bg-base border border-stroke rounded-lg p-3 text-white focus:border-accent outline-none"
                                >
                                    <option value="modern">Modern & Minimal</option>
                                    <option value="industrial">Endüstriyel</option>
                                    <option value="retro">Retro / Vintage</option>
                                    <option value="boho">Bohem</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={handleGenerate}
                        disabled={!file || !consent || loading}
                        className="w-full py-4 bg-accent text-base font-bold rounded-xl hover:bg-accent/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {loading ? <Sparkles className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
                        {loading ? 'Tasarlanıyor...' : 'Konsept Üret'}
                    </button>
                </div>

                {/* Results Column */}
                <div className="lg:col-span-2">
                    {result ? (
                        <div className="space-y-6 animate-in slide-in-from-bottom-4">
                            {/* Main Image */}
                            <div className="relative group rounded-xl overflow-hidden border border-stroke aspect-video">
                                <img
                                    src={result.conceptImageUrl}
                                    alt="AI Concept"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                                    <div>
                                        <span className="bg-accent text-black text-xs font-bold px-2 py-1 rounded mb-2 inline-block">YENİ KONSEPT</span>
                                        <h3 className="text-xl font-bold text-white">Modern Kafe İç Mekânı</h3>
                                    </div>
                                </div>
                            </div>

                            {/* Details Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-surface p-6 rounded-xl border border-stroke">
                                    <h4 className="font-bold text-white mb-4 flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-accent"></div> Renk Paleti
                                    </h4>
                                    <div className="flex gap-2">
                                        {result.colorPalette.map((color, i) => (
                                            <div key={i} className="group relative">
                                                <div
                                                    className="w-12 h-12 rounded-lg border border-white/10 shadow-lg cursor-pointer transform hover:scale-110 transition-transform"
                                                    style={{ backgroundColor: color }}
                                                ></div>
                                                <span className="absolute -bottom-6 left-0 text-[10px] text-textSecondary opacity-0 group-hover:opacity-100 transition-opacity">
                                                    {color}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="bg-surface p-6 rounded-xl border border-stroke">
                                    <h4 className="font-bold text-white mb-4 flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-yellow-400"></div> Aydınlatma
                                    </h4>
                                    <ul className="space-y-2">
                                        {result.lightingTips.map((tip, i) => (
                                            <li key={i} className="text-sm text-textSecondary flex items-start gap-2">
                                                <span className="mt-1.5 w-1 h-1 bg-textSecondary rounded-full flex-shrink-0"></span>
                                                {tip}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="bg-surface p-6 rounded-xl border border-stroke md:col-span-2">
                                    <h4 className="font-bold text-white mb-4 flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-blue-400"></div> Yerleşim Önerileri
                                    </h4>
                                    <ul className="space-y-2">
                                        {result.layoutSuggestions.map((tip, i) => (
                                            <li key={i} className="text-sm text-textSecondary flex items-start gap-2">
                                                <span className="mt-1.5 w-1 h-1 bg-textSecondary rounded-full flex-shrink-0"></span>
                                                {tip}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="h-full bg-surface/30 border-2 border-dashed border-stroke rounded-xl flex flex-col items-center justify-center text-textSecondary p-12">
                            <ImageIcon className="w-16 h-16 mb-4 text-white/10" />
                            <p className="text-lg font-medium">Sonuçlar burada görünecek</p>
                            <p className="text-sm mt-2 max-w-sm text-center">Sol taraftan bir fotoğraf yükleyip konsept türünü seçerek yapay zeka destekli tasarım önerileri alabilirsiniz.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SpaceDesign;
