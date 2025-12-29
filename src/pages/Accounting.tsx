import { useState } from 'react';
import { ChevronRight, FileCheck, HelpCircle, AlertTriangle } from 'lucide-react';

const Accounting = () => {
    const [activeStep, setActiveStep] = useState(0);

    const steps = [
        {
            title: 'Şirket Türü Seçimi',
            description: 'Girişiminiz için en uygun şirket yapısını belirleyin.',
            content: (
                <div className="space-y-4">
                    <div className="p-4 border border-stroke rounded-lg bg-base hover:border-accent cursor-pointer transition-colors">
                        <h4 className="font-bold text-white mb-2">Şahıs Şirketi</h4>
                        <p className="text-sm text-textSecondary">Hızlı kuruluş, düşük maliyet. Küçük ölçekli başlangıçlar için ideal.</p>
                    </div>
                    <div className="p-4 border border-stroke rounded-lg bg-base hover:border-accent cursor-pointer transition-colors">
                        <h4 className="font-bold text-white mb-2">Limited Şirket</h4>
                        <p className="text-sm text-textSecondary">Prestij ve kurumsallık. Ortaklı yapılar için daha uygun.</p>
                    </div>
                </div>
            )
        },
        {
            title: 'Vergi Dairesi Başvurusu',
            description: 'İşe başlama bildirimi ve gerekli evraklar.',
            content: (
                <ul className="space-y-3">
                    {['İkametgah Belgesi', 'Kimlik Fotokopisi', 'İmza Beyannamesi', 'Kira Kontratı'].map((doc, i) => (
                        <li key={i} className="flex items-center gap-3 p-3 bg-base rounded-lg border border-stroke">
                            <div className="w-5 h-5 rounded border border-textSecondary flex items-center justify-center">
                                {/* Checkbox Placeholder */}
                            </div>
                            <span className="text-textSecondary">{doc}</span>
                        </li>
                    ))}
                </ul>
            )
        },
        {
            title: 'Fatura & Ön Muhasebe',
            description: 'E-fatura süreçleri ve makbuz düzenleme.',
            content: (
                <div className="text-textSecondary">
                    <p className="mb-4">E-arşiv fatura portalı kurulumu için mali mühür başvurunuzu tamamladınız mı?</p>
                    <button className="px-4 py-2 bg-accent text-base rounded font-bold">Mali Mühür Başvurusu Rehberi</button>
                </div>
            )
        }
    ];

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Step Wizard */}
            <div className="lg:col-span-2 space-y-6">
                <div>
                    <h2 className="text-2xl font-bold text-white">Muhasebe Mentorluğu</h2>
                    <p className="text-textSecondary mt-1">Adım adım şirket kurulum ve finansal yönetim rehberi.</p>
                </div>

                <div className="bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-xl flex gap-3 items-start">
                    <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-yellow-200/80">
                        Bu rehber genel bilgilendirme amaçlıdır. Yasal ve vergisel işlemleriniz için lütfen profesyonel bir mali müşavirden destek alın.
                    </p>
                </div>

                <div className="bg-surface border border-stroke rounded-xl overflow-hidden">
                    {/* Progress Header */}
                    <div className="border-b border-stroke p-6 flex justify-between items-center">
                        <div>
                            <span className="text-xs uppercase text-textSecondary font-bold text-accent">Adım {activeStep + 1} / {steps.length}</span>
                            <h3 className="text-xl font-bold text-white mt-1">{steps[activeStep].title}</h3>
                            <p className="text-sm text-textSecondary mt-1">{steps[activeStep].description}</p>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-8 min-h-[300px]">
                        {steps[activeStep].content}
                    </div>

                    {/* Footer Navigation */}
                    <div className="border-t border-stroke p-6 flex justify-between">
                        <button
                            onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
                            disabled={activeStep === 0}
                            className="px-6 py-2 rounded-lg text-textSecondary hover:text-white disabled:opacity-50"
                        >
                            Geri
                        </button>
                        <button
                            onClick={() => setActiveStep(Math.min(steps.length - 1, activeStep + 1))}
                            className="px-6 py-2 bg-white text-black font-bold rounded-lg hover:bg-white/90 flex items-center gap-2"
                        >
                            {activeStep === steps.length - 1 ? 'Tamamla' : 'Sonraki Adım'}
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Checklist Sidebar */}
            <div className="space-y-6">
                <div className="bg-surface p-6 rounded-xl border border-stroke">
                    <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                        <FileCheck className="w-5 h-5 text-accent" />
                        Evrak Kontrol Listesi
                    </h3>
                    <div className="space-y-3">
                        {[
                            { label: 'İş Planı', done: true },
                            { label: 'Sermaye Belirleme', done: true },
                            { label: 'Kira/Tapu Fotokopisi', done: false },
                            { label: 'İmza Sirküleri', done: false },
                            { label: 'Banka Hesap Açılışı', done: false }
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-3 group cursor-pointer">
                                <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${item.done ? 'bg-green-500 border-green-500' : 'border-textSecondary group-hover:border-white'
                                    }`}>
                                    {item.done && <CheckIcon className="w-3 h-3 text-black" />}
                                </div>
                                <span className={`text-sm ${item.done ? 'text-white line-through opacity-50' : 'text-textSecondary group-hover:text-white'}`}>
                                    {item.label}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-gradient-to-br from-accent/20 to-transparent p-6 rounded-xl border border-accent/20">
                    <HelpCircle className="w-8 h-8 text-accent mb-3" />
                    <h4 className="font-bold text-white">Takıldınız mı?</h4>
                    <p className="text-sm text-textSecondary mt-2 mb-4">
                        Uzman muhasebe mentorlarımızla 15 dakikalık ücretsiz görüşme planlayın.
                    </p>
                    <button className="w-full py-2 bg-accent text-base font-bold rounded text-sm hover:bg-accent/90">
                        Randevu Al
                    </button>
                </div>
            </div>
        </div>
    );
};

const CheckIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
);

export default Accounting;
