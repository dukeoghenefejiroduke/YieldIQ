import { useState, useEffect } from 'react';
import { MainLayout } from '../../components/layout/MainLayout';
import { db, type TaskEntry } from '../../db/db';
import { useAuthStore } from '../../store/authStore';
import { CheckCircle, Circle, Plus } from 'lucide-react';

const MOCK_TASKS = [
    { title: 'Check irrigation system', completed: false },
    { title: 'Apply fertilizer to maize field', completed: true },
];

export const TodoView = () => {
    const [tasks, setTasks] = useState<TaskEntry[]>([]);
    const [newTask, setNewTask] = useState('');
    const { user } = useAuthStore();

    useEffect(() => {
        loadTasks();
    }, [user]);

    const loadTasks = async () => {
        if (!user?.id) return;
        
        let dbTasks = await db.tasks.where('userId').equals(user.id).toArray();
        
        // Mock fallback if empty
        if (dbTasks.length === 0) {
            console.warn('No tasks found locally, populating with mock data');
            dbTasks = MOCK_TASKS.map((t, i) => ({ id: i + 1, userId: user.id, ...t }));
        }
        setTasks(dbTasks);
    };

    const addTask = async () => {
        if (!newTask.trim() || !user?.id) return;
        await db.tasks.add({ userId: user.id, title: newTask, completed: false });
        setNewTask('');
        loadTasks();
    };

    const toggleTask = async (task: TaskEntry) => {
        if (!task.id) return;
        await db.tasks.update(task.id, { completed: !task.completed });
        loadTasks();
    };

    return (
        <MainLayout>
            <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white">Today's Farm Tasks</h2>
                <div className="flex gap-2">
                    <input 
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                        placeholder="Add a new task..."
                        className="flex-1 p-3 rounded-lg bg-slate-800 text-white"
                    />
                    <button onClick={addTask} className="bg-green-700 p-3 rounded-lg"><Plus /></button>
                </div>
                <div className="space-y-2">
                    {tasks.map(task => (
                        <div key={task.id} className="bg-slate-700 p-3 rounded-lg flex items-center justify-between">
                            <button onClick={() => toggleTask(task)} className="flex items-center gap-3">
                                {task.completed ? <CheckCircle className="text-green-400" /> : <Circle className="text-gray-400" />}
                                <span className={task.completed ? 'line-through text-gray-500' : 'text-white'}>{task.title}</span>
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </MainLayout>
    );
};
