// Content configuration - Tüm içerikler buradan yönetilir

export const content = {
    brand: {
        name: "MarTech",
        tagline: "AI destekli Marka Rehberliği Platformu",
    },

    hero: {
        headline: "Fikirden markaya. Adım adım.",
        subheadline: "MarTech; marka analizi, yol haritası ve pratik araçlarla girişiminizi dağınıklıktan çıkarıp uygulanabilir bir plana dönüştürür.",
        primaryCTA: "Giriş Yap",
        secondaryCTA: "Ücretsiz Başla",
        valueProps: [
            {
                title: "Analiz",
                desc: "Güçlü yönlerinizi keşfedin",
            },
            {
                title: "Plan",
                desc: "Net yol haritası oluşturun",
            },
            {
                title: "Uygulama",
                desc: "Adım adım ilerleyin",
            },
        ],
    },

    metrics: [
        {
            label: "Aktif marka",
            value: 108,
            suffix: "+",
        },
        {
            label: "Toplam kullanıcı",
            value: 1200,
            suffix: "+",
        },
        {
            label: "Tamamlanan görev",
            value: 18500,
            suffix: "+",
        },
        {
            label: "Ortalama hedef ilerleme",
            value: 32,
            suffix: "%",
        },
    ],

    features: [
        {
            title: "Marka Analizi Raporu",
            desc: "Güçlü yönler, zayıflıklar, fırsatlar ve konumlandırma önerileri.",
            icon: "FileText",
        },
        {
            title: "Kişiselleştirilmiş Yol Haritası",
            desc: "Haftalık görevler, öncelikler, takip ve kilometre taşları.",
            icon: "Map",
        },
        {
            title: "Fiziksel Mekân Tasarımı",
            desc: "Vitrin/kafe/perakende için renk paleti, aydınlatma ve yerleşim önerileri.",
            icon: "Building",
        },
        {
            title: "Yatırımcı Sunumu",
            desc: "Artı/eksi analizi ve pitch deck taslağı.",
            icon: "Presentation",
        },
        {
            title: "Muhasebe Mentorluğu",
            desc: "Evrak ve belge süreçlerinde adım adım rehberlik.",
            icon: "Calculator",
        },
        {
            title: "İş Sosyal Ağı",
            desc: "Profil, bağlantı kurma, tavsiye alışverişi.",
            icon: "Users",
        },
    ],

    strategicCTA: {
        headline: "Net bir planla ilerleyin.",
        placeholder: "E-posta adresiniz",
        buttonText: "Giriş Yap",
    },

    testimonials: [
        {
            name: "Ece K.",
            title: "Kafe Kurucusu",
            quote: "Kafamda dağınık olan her şeyi planlı bir akışa çevirdi. En iyi tarafı: neyi neden yaptığımı biliyorum.",
        },
        {
            name: "Mert A.",
            title: "E-ticaret Girişimcisi",
            quote: "Yol haritası + görev takibi sayesinde 3 haftada net bir konumlandırma çıkarıp uygulamaya geçtim.",
        },
        {
            name: "Derya S.",
            title: "Perakende Marka Yöneticisi",
            quote: "Mekân önerileri beklediğimden detaylıydı. Basit hamlelerle mağaza deneyimi toparlandı.",
        },
    ],

    pricing: {
        currency: "USD",
        tiers: [
            {
                name: "Starter",
                priceMonthly: 29,
                desc: "Yeni başlayanlar için temel rehberlik",
                features: [
                    "Marka & iş girişi",
                    "Temel analiz raporu",
                    "Haftalık görev listesi",
                ],
                cta: "Başla",
                highlight: false,
            },
            {
                name: "Growth",
                priceMonthly: 79,
                desc: "Büyüyen markalar için tam yol haritası",
                features: [
                    "Gelişmiş analiz",
                    "Kişiselleştirilmiş yol haritası",
                    "Takip & kilometre taşları",
                    "Yatırımcı sunumu taslağı",
                ],
                cta: "Growth'a Geç",
                highlight: false,
            },
            {
                name: "Studio",
                priceMonthly: 149,
                desc: "Fiziksel mekân + operasyon odaklı",
                features: [
                    "Mekân tasarımı önerileri",
                    "Muhasebe mentorluğu",
                    "İş sosyal ağı",
                    "Öncelikli destek",
                ],
                cta: "Studio'yu Seç",
                highlight: true,
            },
        ],
    },

    faq: [
        {
            question: "MarTech nasıl çalışır?",
            answer: "Marka analiziyle başlayıp, kişiselleştirilmiş yol haritası oluşturuyoruz. Haftalık görevler ve takip araçlarıyla planınızı adım adım uygulamanıza yardımcı oluyoruz.",
        },
        {
            question: "Hangi sektörler için uygundur?",
            answer: "Kafe, perakende, e-ticaret, hizmet sektörü ve fiziksel mekânı olan tüm girişimler için tasarlandı.",
        },
        {
            question: "Muhasebe mentorluğu nedir?",
            answer: "Evrak düzeni, belge süreçleri ve temel muhasebe işlemlerinde adım adım rehberlik sağlıyoruz. Uzman bir mentor ile görüşme imkânı sunuyoruz.",
        },
        {
            question: "Yol haritası ne kadar sürede hazırlanır?",
            answer: "Marka analizi sonrasında 48-72 saat içinde kişiselleştirilmiş yol haritanız hazır olur. İlk görevlerinize hemen başlayabilirsiniz.",
        },
        {
            question: "Fiyatlandırma esnek midir?",
            answer: "Evet, ihtiyacınıza göre planlar arasında geçiş yapabilir veya iptal edebilirsiniz. Yıllık ödemelerde indirim fırsatları sunuyoruz.",
        },
        {
            question: "Demo nasıl alabilirim?",
            answer: "Ana sayfadaki 'Demo İste' butonuna tıklayıp e-posta adresinizi bırakın. 24 saat içinde sizinle iletişime geçip platformu detaylıca tanıtıyoruz.",
        },
    ],

    footer: {
        sitemap: {
            product: ["Özellikler", "Fiyatlandırma", "Güvenlik", "Sürüm Notları"],
            company: ["Hakkımızda", "Kariyer", "Basın", "İletişim"],
            resources: ["Blog", "Kılavuzlar", "Sık Sorulan Sorular", "Destek"],
            legal: ["Gizlilik", "Şartlar", "KVKK", "Çerez Politikası"],
        },
        copyright: "© 2024 MarTech. Tüm hakları saklıdır.",
        social: ["Twitter", "LinkedIn", "Instagram"],
    },

    navigation: {
        links: [
            { label: "Özellikler", href: "#features" },
            { label: "Fiyatlandırma", href: "#pricing" },
            { label: "Referanslar", href: "#testimonials" },
            { label: "SSS", href: "#faq" },
        ],
        cta: "Giriş Yap",
    },
};
