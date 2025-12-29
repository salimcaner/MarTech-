import { useState, useEffect } from 'react';
import { MessageSquare, ThumbsUp, Share2, UserPlus, Filter, Send } from 'lucide-react';
import { apiClient } from '../services/api';
import { Post, Connection } from '../types';

const SocialNetwork = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [connections, setConnections] = useState<Connection[]>([]);
    const [activeTab, setActiveTab] = useState('feed');

    useEffect(() => {
        const fetchData = async () => {
            const feedData = await apiClient.network.getFeed();
            const connData = await apiClient.network.getConnections();
            setPosts(feedData);
            setConnections(connData);
        };
        fetchData();
    }, []);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Left Sidebar - Menu */}
            <div className="hidden lg:block space-y-6">
                <div className="bg-surface p-4 rounded-xl border border-stroke">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center font-bold text-xl text-black">
                            CY
                        </div>
                        <div>
                            <h3 className="font-bold text-white">Salim Caner</h3>
                            <p className="text-xs text-textSecondary">Start-up Kurucusu</p>
                        </div>
                    </div>
                    <div className="space-y-1">
                        <SidebarBtn active={activeTab === 'feed'} onClick={() => setActiveTab('feed')} label="Akış" />
                        <SidebarBtn active={activeTab === 'connections'} onClick={() => setActiveTab('connections')} label="Bağlantılarım" />
                        <SidebarBtn active={activeTab === 'saved'} onClick={() => setActiveTab('saved')} label="Kaydedilenler" />
                    </div>
                </div>
            </div>

            {/* Main Feed */}
            <div className="lg:col-span-2 space-y-6">
                {/* Composer */}
                <div className="bg-surface p-4 rounded-xl border border-stroke">
                    <div className="flex gap-4">
                        <div className="w-10 h-10 bg-accent rounded-full flex-shrink-0 flex items-center justify-center font-bold text-black">CY</div>
                        <div className="flex-1">
                            <input
                                className="w-full bg-base rounded-lg border border-stroke p-3 text-white focus:outline-none focus:border-accent mb-3"
                                placeholder="Deneyimini veya sorunu paylaş..."
                            />
                            <div className="flex justify-between items-center">
                                <div className="flex gap-2">
                                    {['Deneyim', 'Soru', 'Tavsiye'].map(tag => (
                                        <span key={tag} className="text-xs px-2 py-1 bg-white/5 rounded text-textSecondary hover:text-white cursor-pointer border border-transparent hover:border-white/20">
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                                <button className="bg-white text-black px-4 py-1.5 rounded-lg font-bold text-sm flex items-center gap-2 hover:bg-gray-200">
                                    <Send className="w-4 h-4" /> Paylaş
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filter */}
                <div className="flex items-center justify-between text-sm text-textSecondary border-b border-stroke pb-2">
                    <span>En Yeniler</span>
                    <button className="flex items-center gap-1 hover:text-white">
                        <Filter className="w-4 h-4" /> Filtrele
                    </button>
                </div>

                {/* Posts */}
                <div className="space-y-4">
                    {posts.map(post => (
                        <div key={post.id} className="bg-surface p-6 rounded-xl border border-stroke">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white font-bold">
                                        {post.author.name.substring(0, 2)}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white text-sm">{post.author.name}</h4>
                                        <p className="text-xs text-textSecondary">{post.author.title} • {post.timestamp}</p>
                                    </div>
                                </div>
                                <span className={`text-[10px] px-2 py-1 rounded border uppercase font-bold ${post.type === 'question' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                                    post.type === 'experience' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                                        'bg-blue-500/10 text-blue-400 border-blue-500/20'
                                    }`}>
                                    {post.type === 'question' ? 'Soru' : post.type === 'experience' ? 'Deneyim' : 'Tavsiye'}
                                </span>
                            </div>

                            <p className="text-gray-300 text-sm leading-relaxed mb-4">
                                {post.content}
                            </p>

                            <div className="flex items-center gap-6 pt-4 border-t border-stroke text-textSecondary text-sm">
                                <button className="flex items-center gap-2 hover:text-accent transition-colors">
                                    <ThumbsUp className="w-4 h-4" /> {post.likes}
                                </button>
                                <button className="flex items-center gap-2 hover:text-accent transition-colors">
                                    <MessageSquare className="w-4 h-4" /> {post.comments} Yorum
                                </button>
                                <button className="flex items-center gap-2 hover:text-accent transition-colors">
                                    <Share2 className="w-4 h-4" /> Paylaş
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Right Sidebar - Suggestions */}
            <div className="hidden lg:block space-y-6">
                <div className="bg-surface p-4 rounded-xl border border-stroke">
                    <h3 className="font-bold text-white mb-4">Önerilen Bağlantılar</h3>
                    <div className="space-y-4">
                        {connections.map(conn => (
                            <div key={conn.id} className="flex items-start gap-3">
                                <div className="w-8 h-8 bg-white/5 rounded-full flex items-center justify-center text-xs text-white">
                                    {conn.name.substring(0, 1)}
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-sm font-bold text-white">{conn.name}</h4>
                                    <p className="text-xs text-textSecondary mb-2">{conn.role}, {conn.company}</p>
                                    <div className="flex flex-wrap gap-1 mb-2">
                                        {conn.commonInterests.map(tag => (
                                            <span key={tag} className="text-[10px] bg-white/5 px-1.5 rounded text-textSecondary">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <button className="w-full py-1 border border-accent text-accent rounded text-xs font-bold hover:bg-accent hover:text-black transition-colors flex items-center justify-center gap-1">
                                        <UserPlus className="w-3 h-3" /> Bağlan
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

const SidebarBtn = ({ label, active, onClick }: any) => (
    <button
        onClick={onClick}
        className={`w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition-colors ${active ? 'bg-accent/10 text-accent' : 'text-textSecondary hover:text-white hover:bg-white/5'
            }`}
    >
        {label}
    </button>
);

export default SocialNetwork;
