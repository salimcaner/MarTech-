import { useState } from 'react';
import { Presentation, Plus, Trash2, FileText, Share2, Sparkles } from 'lucide-react';
import { apiClient } from '../services/api';
import { PitchDeck } from '../types';

const PitchDeckGenerator = () => {
    const [deck, setDeck] = useState<PitchDeck | null>(null);
    const [loading, setLoading] = useState(false);
    const [activeSlide, setActiveSlide] = useState(0);

    const [pros, setPros] = useState<string[]>(['']);
    const [cons, setCons] = useState<string[]>(['']);

    const handleAddItem = (setter: any, list: string[]) => {
        setter([...list, '']);
    };

    const handleUpdateItem = (setter: any, list: string[], index: number, value: string) => {
        const newList = [...list];
        newList[index] = value;
        setter(newList);
    };

    const handleRemoveItem = (setter: any, list: string[], index: number) => {
        const newList = list.filter((_, i) => i !== index);
        setter(newList);
    };

    const handleGenerate = async () => {
        setLoading(true);
        try {
            const data = await apiClient.pitch.generate();
            setDeck(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[calc(100vh-140px)]">
            {/* Sidebar Inputs */}
            <div className="lg:col-span-1 bg-surface p-6 rounded-xl border border-stroke overflow-y-auto">
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <Presentation className="w-6 h-6 text-accent" />
                    Sunum Sihirbazı
                </h2>

                <div className="space-y-6">
                    {/* Analyze Inputs */}
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <label className="text-sm font-bold text-green-400">Avantajlar (+)</label>
                            <button onClick={() => handleAddItem(setPros, pros)} className="p-1 hover:bg-white/10 rounded">
                                <Plus className="w-4 h-4 text-white" />
                            </button>
                        </div>
                        <div className="space-y-2">
                            {pros.map((item, i) => (
                                <div key={i} className="flex gap-2">
                                    <input
                                        value={item}
                                        onChange={(e) => handleUpdateItem(setPros, pros, i, e.target.value)}
                                        className="w-full bg-base border border-stroke rounded px-3 py-2 text-sm text-white"
                                        placeholder="Avantaj ekle..."
                                    />
                                    <button onClick={() => handleRemoveItem(setPros, pros, i)} className="text-textSecondary hover:text-red-400">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <label className="text-sm font-bold text-red-400">Riskler (-)</label>
                            <button onClick={() => handleAddItem(setCons, cons)} className="p-1 hover:bg-white/10 rounded">
                                <Plus className="w-4 h-4 text-white" />
                            </button>
                        </div>
                        <div className="space-y-2">
                            {cons.map((item, i) => (
                                <div key={i} className="flex gap-2">
                                    <input
                                        value={item}
                                        onChange={(e) => handleUpdateItem(setCons, cons, i, e.target.value)}
                                        className="w-full bg-base border border-stroke rounded px-3 py-2 text-sm text-white"
                                        placeholder="Risk ekle..."
                                    />
                                    <button onClick={() => handleRemoveItem(setCons, cons, i)} className="text-textSecondary hover:text-red-400">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <button
                        onClick={handleGenerate}
                        disabled={loading}
                        className="w-full py-4 bg-accent text-base font-bold rounded-xl hover:bg-accent/90 transition-all flex items-center justify-center gap-2 mt-8"
                    >
                        {loading ? <Sparkles className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
                        {loading ? 'Oluşturuluyor...' : 'Pitch Deck Oluştur'}
                    </button>
                </div>
            </div>

            {/* Preview Area */}
            <div className="lg:col-span-2 bg-base rounded-xl border border-stroke flex flex-col overflow-hidden relative">
                {deck ? (
                    <>
                        {/* Toolbar */}
                        <div className="p-4 border-b border-stroke bg-surface flex justify-between items-center">
                            <span className="text-textSecondary text-sm">Otomatik Kaydedildi</span>
                            <div className="flex gap-2">
                                <button className="flex items-center gap-2 px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-sm text-white transition-colors">
                                    <Share2 className="w-4 h-4" />
                                    Paylaş
                                </button>
                                <button className="flex items-center gap-2 px-3 py-1.5 bg-accent text-base font-bold rounded-lg text-sm hover:bg-accent/90 transition-colors">
                                    <FileText className="w-4 h-4" />
                                    PDF İndir
                                </button>
                            </div>
                        </div>

                        {/* Slide View */}
                        <div className="flex-1 flex items-center justify-center p-8 bg-[#1a1a1a]">
                            <div className="aspect-video w-full max-w-2xl bg-white text-black p-12 shadow-2xl rounded-sm flex flex-col justify-center relative">
                                <div className="absolute top-6 left-8 text-xs text-gray-400 uppercase tracking-widest font-bold">
                                    MarTech Pitch Deck
                                </div>
                                <h2 className="text-4xl font-bold mb-8 text-gray-900 border-b-4 border-accent inline-block pb-2 pr-8">
                                    {deck.sections[activeSlide].title}
                                </h2>
                                <ul className="space-y-4">
                                    {deck.sections[activeSlide].content.map((point, i) => (
                                        <li key={i} className="text-xl text-gray-700 flex items-start gap-3">
                                            <span className="w-2 h-2 bg-accent rounded-full mt-2.5 flex-shrink-0"></span>
                                            {point}
                                        </li>
                                    ))}
                                </ul>
                                <div className="absolute bottom-6 right-8 text-5xl font-black text-gray-100 select-none">
                                    {activeSlide + 1}
                                </div>
                            </div>
                        </div>

                        {/* Thumbnails */}
                        <div className="h-32 bg-surface border-t border-stroke p-4 flex gap-4 overflow-x-auto">
                            {deck.sections.map((section, i) => (
                                <div
                                    key={section.id}
                                    onClick={() => setActiveSlide(i)}
                                    className={`aspect-video h-full bg-white rounded cursor-pointer relative overflow-hidden transition-all ${activeSlide === i ? 'ring-2 ring-accent scale-105' : 'opacity-50 hover:opacity-100'
                                        }`}
                                >
                                    <div className="p-2 text-[8px] font-bold text-black border-b border-gray-200">
                                        {section.title}
                                    </div>
                                    <div className="p-2 text-[6px] text-gray-500 space-y-1">
                                        {section.content.map((l, idx) => <div key={idx} className="truncate">• {l}</div>)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-textSecondary">
                        <Presentation className="w-16 h-16 mb-4 text-white/10" />
                        <p className="text-lg">Önizleme için sol taraftan sunum oluşturun</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PitchDeckGenerator;
