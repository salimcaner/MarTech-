import { ArrowUpRight, CheckCircle2, Circle, Clock } from 'lucide-react';
import SwotChart from '../components/SwotChart';

const Overview = () => {
    const stats = [
        { label: 'Tamamlanan Görevler', value: '12', total: '24', suffix: '', color: 'text-accent' },
        { label: 'Marka Skoru', value: '85', total: '100', suffix: '', color: 'text-green-500' },
        { label: 'Haftalık İlerleme', value: '64', total: '', suffix: '%', color: 'text-blue-500' },
    ];

    const recentTasks = [
        { title: 'Rakip analizi tamamla', status: 'completed', date: 'Bugün' },
        { title: 'Instagram biyografisi güncelle', status: 'pending', date: 'Yarın' },
        { title: 'Logo renk paleti onayı', status: 'in-progress', date: '2 gün kaldı' },
    ];

    return (
        <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat, i) => (
                    <div key={i} className="p-6 bg-surface border border-stroke rounded-xl">
                        <p className="text-textSecondary text-sm font-medium">{stat.label}</p>
                        <div className="mt-2 flex items-baseline gap-1">
                            <span className={`text-4xl font-bold ${stat.color}`}>{stat.value}</span>
                            {stat.total && <span className="text-textSecondary text-xl">/{stat.total}</span>}
                            {stat.suffix && <span className={`text-xl ${stat.color}`}>{stat.suffix}</span>}
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Activity Chart Placeholder */}
                <div className="p-6 bg-surface border border-stroke rounded-xl min-h-[300px]">
                    <h3 className="text-lg font-bold text-white mb-4">SWOT Dağılım Özeti</h3>
                    <div className="h-64">
                        <SwotChart />
                    </div>
                </div>

                {/* Recent Tasks */}
                <div className="p-6 bg-surface border border-stroke rounded-xl">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-bold text-white">Son Görevler</h3>
                        <button className="text-accent text-sm hover:underline flex items-center gap-1">
                            Tümünü Gör <ArrowUpRight className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="space-y-4">
                        {recentTasks.map((task, i) => (
                            <div key={i} className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors group">
                                <div className="flex items-center gap-3">
                                    {task.status === 'completed' ? (
                                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                                    ) : task.status === 'in-progress' ? (
                                        <Clock className="w-5 h-5 text-accent" />
                                    ) : (
                                        <Circle className="w-5 h-5 text-textSecondary" />
                                    )}
                                    <span className={`text-sm ${task.status === 'completed' ? 'text-textSecondary line-through' : 'text-white'}`}>
                                        {task.title}
                                    </span>
                                </div>
                                <span className="text-xs text-textSecondary group-hover:text-white transition-colors">
                                    {task.date}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Overview;
