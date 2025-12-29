export interface Brand {
    id: string;
    name: string;
    sector: string;
    audience: string;
    priceRange: 'budget' | 'mid' | 'premium' | 'luxury';
    stage: 'idea' | 'early' | 'growing' | 'scaling';
}

export interface AnalysisReport {
    id: string;
    brandId: string;
    generatedAt: string;
    swot: {
        strengths: string[];
        weaknesses: string[];
        opportunities: string[];
        threats: string[];
    };
    positioning: {
        archetype: string;
        statement: string;
        targetPersona: string;
    };
}

export interface RoadmapTask {
    id: string;
    title: string;
    description: string;
    status: 'todo' | 'in-progress' | 'done';
    impact: 'high' | 'medium' | 'low';
    effort: 'high' | 'medium' | 'low';
    whyImportant: string;
    dueDate?: string;
    week: number;
}

export interface Milestone {
    id: string;
    title: string;
    date: string;
    achieved: boolean;
}

export interface SpaceDesignRequest {
    id: string;
    photoUrl: string; // Base64 or local blob url
    spaceType: 'cafe' | 'retail' | 'showcase' | 'office';
    style: 'minimal' | 'industrial' | 'boho' | 'modern' | 'retro';
    consent: boolean;
}

export interface SpaceDesignOutput {
    id: string;
    requestId: string;
    conceptImageUrl: string;
    colorPalette: string[];
    lightingTips: string[];
    layoutSuggestions: string[];
}

export interface PitchDeckSection {
    id: string;
    title: string;
    content: string[]; // Bullet points
    type: 'problem' | 'solution' | 'market' | 'team' | 'financials';
}

export interface PitchDeck {
    id: string;
    sections: PitchDeckSection[];
    pros: string[];
    cons: string[];
}

export interface AccountingStep {
    id: string;
    title: string;
    description: string;
    completed: boolean;
    requiredDocs: string[];
}

export interface Post {
    id: string;
    author: {
        name: string;
        title: string;
        avatarUrl?: string;
    };
    content: string;
    type: 'experience' | 'question' | 'advice' | 'collaboration';
    likes: number;
    comments: number;
    timestamp: string;
}

export interface Connection {
    id: string;
    name: string;
    role: string;
    company: string;
    matchScore: number; // 0-100
    commonInterests: string[];
}
