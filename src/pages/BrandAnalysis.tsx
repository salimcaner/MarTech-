import { useState, useEffect } from 'react';
import { RefreshCw, Download, Edit3, Save } from 'lucide-react';
import { apiClient } from '../services/api';
import { AnalysisReport } from '../types';

const BrandAnalysis = () => {
    const [loading, setLoading] = useState(false);
    const [report, setReport] = useState<AnalysisReport | null>(null);
    const [showForm, setShowForm] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        sector: '',
        audience: '',
        priceRange: 'mid',
        competitors: ''
    });

    const handleAnalize = async () => {
        setLoading(true);
        try {
            const data = await apiClient.brand.analyze(formData);
            setReport(data);
            setShowForm(false);
        } catch (error) {
            console.error('Analiz hatası:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Initial fetch mock
        handleAnalize();
    }, []);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-2xl font-bold text-white">Marka Analizi</h2>
                    <p className="text-textSecondary mt-1">SWOT ve konumlandırma stratejiniz.</p>
                </div>
                <div className="flex gap-2">
                    {report && (
                        <button className="flex items-center gap-2 px-4 py-2 bg-surface border border-stroke rounded-lg text-sm text-textSecondary hover:text-white transition-colors">
                            <Download className="w-4 h-4" />
                            PDF İndir
                        </button>
                    )}
                    <button
                        onClick={() => setShowForm(!showForm)}
                        className="flex items-center gap-2 px-4 py-2 bg-accent text-base rounded-lg text-sm font-bold hover:bg-accent/90 transition-colors"
                    >
                        {showForm ? 'İptal' : report ? 'Güncelle' : 'Analiz Başlat'}
                        {showForm ? null : (report ? <Edit3 className="w-4 h-4" /> : <RefreshCw className="w-4 h-4" />)}
                    </button>
                </div>
            </div>

            {/* Input Form */}
            {showForm && (
                <div className="bg-surface border border-stroke rounded-xl p-6 animate-in slide-in-from-top-4">
                    <h3 className="text-lg font-bold text-white mb-4">Marka Detayları</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-textSecondary">Sektör</label>
                            <input
                                value={formData.sector}
                                onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                                placeholder="Örn: Kahve Dükkanı"
                                className="w-full px-4 py-2 bg-base border border-stroke rounded-lg text-white focus:border-accent focus:outline-none"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-textSecondary">Hedef Kitle</label>
                            <input
                                value={formData.audience}
                                onChange={(e) => setFormData({ ...formData, audience: e.target.value })}
                                placeholder="Örn: Öğrenciler ve Freelancerlar"
                                className="w-full px-4 py-2 bg-base border border-stroke rounded-lg text-white focus:border-accent focus:outline-none"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-textSecondary">Fiyat Aralığı</label>
                            <select
                                value={formData.priceRange}
                                onChange={(e) => setFormData({ ...formData, priceRange: e.target.value })}
                                className="w-full px-4 py-2 bg-base border border-stroke rounded-lg text-white focus:border-accent focus:outline-none"
                            >
                                <option value="budget">Ekonomik</option>
                                <option value="mid">Orta Segment</option>
                                <option value="premium">Premium</option>
                                <option value="luxury">Lüks</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-textSecondary">Rakipler</label>
                            <input
                                value={formData.competitors}
                                onChange={(e) => setFormData({ ...formData, competitors: e.target.value })}
                                placeholder="Örn: Starbucks, Espresso Lab"
                                className="w-full px-4 py-2 bg-base border border-stroke rounded-lg text-white focus:border-accent focus:outline-none"
                            />
                        </div>
                    </div>
                    <button
                        onClick={handleAnalize}
                        disabled={loading}
                        className="flex items-center gap-2 px-6 py-2 bg-accent text-base rounded-lg font-bold hover:bg-accent/90 transition-colors disabled:opacity-50"
                    >
                        {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                        {loading ? 'Analiz Ediliyor...' : 'Raporu Oluştur'}
                    </button>
                </div>
            )}

            {/* Report View */}
            {loading && !showForm ? (
                <div className="flex flex-col items-center justify-center py-20 text-textSecondary">
                    <RefreshCw className="w-8 h-8 animate-spin mb-4 text-accent" />
                    <p>Yapay zeka markanızı analiz ediyor...</p>
                </div>
            ) : report ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-in fade-in">
                    {/* SWOT */}
                    <div className="bg-surface border border-stroke rounded-xl overflow-hidden">
                        <div className="p-4 border-b border-stroke bg-white/5">
                            <h3 className="font-bold text-white">SWOT Analizi</h3>
                        </div>
                        <div className="p-6 grid gap-6">
                            <Section title="Güçlü Yönler" items={report.swot.strengths} color="border-green-500" />
                            <Section title="Zayıf Yönler" items={report.swot.weaknesses} color="border-red-500" />
                            <Section title="Fırsatlar" items={report.swot.opportunities} color="border-blue-500" />
                            <Section title="Tehditler" items={report.swot.threats} color="border-yellow-500" />
                        </div>
                    </div>

                    {/* Positioning */}
                    <div className="space-y-6">
                        <div className="bg-surface border border-stroke rounded-xl p-6">
                            <h3 className="text-lg font-bold text-white mb-4">Marka Konumlandırması</h3>
                            <div className="space-y-4">
                                <div>
                                    <span className="text-xs uppercase text-textSecondary font-bold">Arketip</span>
                                    <div className="mt-1 flex items-center gap-2">
                                        <span className="px-3 py-1 bg-accent tree-text-base rounded-full text-base font-bold text-xs">{report.positioning.archetype}</span>
                                    </div>
                                </div>
                                <div>
                                    <span className="text-xs uppercase text-textSecondary font-bold">Hedef Persona</span>
                                    <p className="mt-1 text-white text-sm">{report.positioning.targetPersona}</p>
                                </div>
                                <div>
                                    <span className="text-xs uppercase text-textSecondary font-bold">Konumlandırma Cümlesi</span>
                                    <p className="mt-1 text-white text-sm italic p-4 bg-base rounded-lg border border-stroke">
                                        "{report.positioning.statement}"
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    );
};

const Section = ({ title, items, color }: { title: string, items: string[], color: string }) => (
    <div className={`pl-4 border-l-4 ${color}`}>
        <h4 className="font-bold text-white mb-2 text-sm">{title}</h4>
        <ul className="text-sm text-textSecondary space-y-1 list-disc list-inside">
            {items.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
    </div>
);

export default BrandAnalysis;
