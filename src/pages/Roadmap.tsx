import { useState, useEffect } from 'react';
import { Calendar, CheckCircle2, Circle, MoreHorizontal, Plus } from 'lucide-react';
import { apiClient } from '../services/api';
import { RoadmapTask } from '../types';

const Roadmap = () => {
    const [tasks, setTasks] = useState<RoadmapTask[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadTasks = async () => {
            const data = await apiClient.roadmap.getTasks();
            setTasks(data);
            setLoading(false);
        };
        loadTasks();
    }, []);

    const getTasksByStatus = (status: RoadmapTask['status']) =>
        tasks.filter(t => t.status === status);

    const calculateProgress = () => {
        if (tasks.length === 0) return 0;
        const completed = tasks.filter(t => t.status === 'done').length;
        return Math.round((completed / tasks.length) * 100);
    };

    return (
        <div className="space-y-8">
            {/* Header & Progress */}
            <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                <div>
                    <h2 className="text-2xl font-bold text-white">Kişiselleştirilmiş Yol Haritası</h2>
                    <p className="text-textSecondary mt-1">Haftalık hedefleriniz ve ilerleme durumunuz.</p>
                </div>
                <div className="w-full md:w-1/3 bg-surface p-4 rounded-xl border border-stroke">
                    <div className="flex justify-between text-sm mb-2">
                        <span className="text-white font-medium">Toplam İlerleme</span>
                        <span className="text-accent font-bold">%{calculateProgress()}</span>
                    </div>
                    <div className="w-full bg-base rounded-full h-2.5">
                        <div
                            className="bg-accent h-2.5 rounded-full transition-all duration-1000"
                            style={{ width: `${calculateProgress()}%` }}
                        ></div>
                    </div>
                </div>
            </div>

            {/* Kanban Board */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 overflow-x-auto pb-4">
                <Column
                    title="Yapılacaklar"
                    tasks={getTasksByStatus('todo')}
                    icon={<Circle className="w-5 h-5 text-textSecondary" />}
                />
                <Column
                    title="Devam Edenler"
                    tasks={getTasksByStatus('in-progress')}
                    icon={<MoreHorizontal className="w-5 h-5 text-blue-400" />}
                />
                <Column
                    title="Tamamlananlar"
                    tasks={getTasksByStatus('done')}
                    icon={<CheckCircle2 className="w-5 h-5 text-green-500" />}
                />
            </div>
        </div>
    );
};

const Column = ({ title, tasks, icon }: { title: string, tasks: RoadmapTask[], icon: React.ReactNode }) => (
    <div className="flex flex-col h-full">
        <div className="flex items-center gap-2 mb-4 px-2">
            {icon}
            <h3 className="font-bold text-white text-lg">{title}</h3>
            <span className="bg-surface border border-stroke text-xs px-2 py-0.5 rounded-full text-textSecondary">
                {tasks.length}
            </span>
        </div>

        <div className="flex-1 bg-surface/50 rounded-xl p-4 min-h-[400px] border border-stroke space-y-3">
            {tasks.map(task => (
                <TaskCard key={task.id} task={task} />
            ))}
            <button className="w-full py-3 border border-dashed border-stroke rounded-lg text-textSecondary hover:text-white hover:border-white/20 transition-colors flex items-center justify-center gap-2 text-sm">
                <Plus className="w-4 h-4" />
                Görev Ekle
            </button>
        </div>
    </div>
);

const TaskCard = ({ task }: { task: RoadmapTask }) => (
    <div className="bg-surface p-4 rounded-lg border border-stroke hover:border-accent/50 cursor-pointer group transition-all">
        <div className="flex justify-between items-start mb-2">
            <span className={`text-[10px] px-2 py-1 rounded bg-base border border-stroke uppercase font-bold tracking-wider ${task.impact === 'high' ? 'text-accent' : 'text-textSecondary'
                }`}>
                {task.impact === 'high' ? 'Kritik Etki' : 'Normal'}
            </span>
            <MoreHorizontal className="w-4 h-4 text-textSecondary opacity-0 group-hover:opacity-100" />
        </div>
        <h4 className="text-white font-bold text-sm mb-1">{task.title}</h4>
        <p className="text-textSecondary text-xs line-clamp-2 mb-3">{task.description}</p>

        {task.whyImportant && (
            <div className="bg-base/50 p-2 rounded text-[10px] text-textSecondary border border-stroke/50">
                <span className="font-bold text-accent">Neden?</span> {task.whyImportant}
            </div>
        )}
    </div>
);

export default Roadmap;
