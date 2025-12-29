import {
    AnalysisReport,
    RoadmapTask,
    SpaceDesignOutput,
    PitchDeck,
    Post,
    Connection
} from '../types';

// Mock data helpers
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock API Client
export const apiClient = {
    brand: {
        analyze: async (data: any): Promise<AnalysisReport> => {
            await delay(1500);
            return {
                id: 'rep_1',
                brandId: 'brand_1',
                generatedAt: new Date().toISOString(),
                swot: {
                    strengths: ['Güçlü kurucu hikayesi', 'Niş pazar odağı', 'Esnek operasyon yapısı'],
                    weaknesses: ['Sınırlı pazarlama bütçesi', 'Henüz kanıtlanmamış ürün'],
                    opportunities: ['Artan e-ticaret trendi', 'Yerel üretici teşvikleri'],
                    threats: ['Global rakipler', 'Hammadde fiyat artışları']
                },
                positioning: {
                    archetype: 'Kâşif (Explorer)',
                    statement: 'Şehirli profesyoneller için sürdürülebilir ve estetik deneyim sunan yenilikçi marka.',
                    targetPersona: '25-35 yaş, beyaz yaka, çevre bilinci yüksek, tasarımı önemseyen.'
                }
            };
        }
    },

    roadmap: {
        getTasks: async (): Promise<RoadmapTask[]> => {
            await delay(800);
            return [
                {
                    id: 't1',
                    title: 'Rakip Analizi',
                    description: 'İlk 5 rakibin sosyal medya ve fiyatlandırma analizi.',
                    status: 'done',
                    impact: 'high',
                    effort: 'medium',
                    whyImportant: 'Pazara giriş stratejisi için kritik.',
                    week: 1
                },
                {
                    id: 't2',
                    title: 'Marka Kimliği Kılavuzu',
                    description: 'Logo, renk, font ve ton-of-voice belirleme.',
                    status: 'in-progress',
                    impact: 'high',
                    effort: 'high',
                    whyImportant: 'Müşteri algısı ve tutarlılık için temel.',
                    week: 1
                },
                {
                    id: 't3',
                    title: 'Domain ve Hosting',
                    description: '.com ve sosyal medya handle\'larını alma.',
                    status: 'todo',
                    impact: 'medium',
                    effort: 'low',
                    whyImportant: 'Dijital varlıkların güvenceye alınması.',
                    week: 2
                }
            ];
        }
    },

    space: {
        generateConcept: async (constraints: any): Promise<SpaceDesignOutput> => {
            await delay(3000); // AI generation simulation
            return {
                id: 'space_1',
                requestId: 'req_1',
                conceptImageUrl: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1000&auto=format&fit=crop', // Placeholder image
                colorPalette: ['#E6D5B8', '#1A4D2E', '#FFB84D', '#2C2C2C'],
                lightingTips: [
                    'Tezgah üzerinde 3000K sıcak sarkıt aydınlatma kullanın.',
                    'Giriş alanında spotlar ile ürünleri vurgulayın.',
                    'Oturma alanlarında dim edilebilir aplik tercih edin.'
                ],
                layoutSuggestions: [
                    'Girişi ferah tutun, karşılama bankosunu kapının tam karşısına koymayın.',
                    'Cam kenarlarını bar oturma düzeni ile değerlendirin.',
                    'Müşteri akışı için en az 90cm koridor boşluğu bırakın.'
                ]
            };
        }
    },

    pitch: {
        generate: async (): Promise<PitchDeck> => {
            await delay(2000);
            return {
                id: 'deck_1',
                pros: ['Yüksek kar marjı potansiyeli', 'Ölçeklenebilir model'],
                cons: ['Rekabetçi pazar', 'Müşteri edinme maliyeti yüksek olabilir'],
                sections: [
                    { id: 's1', type: 'problem', title: 'Problem', content: ['Müşteriler kaliteli ürüne ulaşamıyor.', 'Mevcut çözümler çok pahalı.'] },
                    { id: 's2', type: 'solution', title: 'Çözüm', content: ['AI destekli kişiselleştirme.', 'Doğrudan üreticiden tüketiciye model.'] },
                    { id: 's3', type: 'market', title: 'Pazar', content: ['TAM: 50 Milyar $', 'SAM: 10 Milyar $', 'Büyüme: Yıllık %15'] },
                    { id: 's4', type: 'financials', title: 'Finansal Hedef', content: ['Yıl 1: $100K Ciro', 'Yıl 3: $1M Ciro'] }
                ]
            };
        }
    },

    network: {
        getFeed: async (): Promise<Post[]> => {
            await delay(1000);
            return [
                {
                    id: 'p1',
                    author: { name: 'Ahmet Y.', title: 'Kafe İşletmecisi' },
                    type: 'experience',
                    content: 'Geçen ay tedarikçi değişikliği yaptık ve maliyetleri %15 düşürdük. Yerel kavurucularla çalışmak operasyonu çok rahatlattı.',
                    likes: 24,
                    comments: 5,
                    timestamp: '2 saat önce'
                },
                {
                    id: 'p2',
                    author: { name: 'Selin K.', title: 'E-Ticaret Uzmanı' },
                    type: 'question',
                    content: 'Shopify altyapısında kargo entegrasyonu için önerisi olan var mı? Yurt dışı gönderimlerinde sorun yaşıyoruz.',
                    likes: 12,
                    comments: 8,
                    timestamp: '5 saat önce'
                }
            ];
        },
        getConnections: async (): Promise<Connection[]> => {
            return [
                { id: 'c1', name: 'Mehmet Demir', rote: 'Yatırımcı', company: 'Angel Network', matchScore: 95, commonInterests: ['Perakende', 'Teknoloji'] },
                { id: 'c2', name: 'Ayşe Yılmaz', role: 'Mimar', company: 'Studio Design', matchScore: 88, commonInterests: ['Mekan Tasarımı', 'Sürdürülebilirlik'] }
            ];
        }
    }
};
