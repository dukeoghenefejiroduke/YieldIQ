import { useState, useEffect } from 'react';
import { MessageSquare, Send } from 'lucide-react';
import api from '../../services/api';
import { useAuthStore } from '../../store/authStore';

export const CommunityHub = ({ cooperativeId }: { cooperativeId: string }) => {
  const [posts, setPosts] = useState<any[]>([]);
  const [newPost, setNewPost] = useState('');
  const { user } = useAuthStore();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await api.get(`/community/${cooperativeId}`);
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts', error);
      }
    };
    fetchPosts();
  }, [cooperativeId]);

  const handleSubmit = async () => {
    if (!newPost.trim() || !user?.id) return;
    try {
        await api.post('/community', { cooperativeId, farmerId: user.id, content: newPost });
        setNewPost('');
        // Refresh posts (simplified)
        const { data } = await api.get(`/community/${cooperativeId}`);
        setPosts(data);
    } catch (error) {
        console.error('Error posting', error);
    }
  };

  return (
    <div className="glass-card p-6">
      <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
        <MessageSquare className="w-5 h-5 text-primary" /> Community Hub
      </h2>
      <div className="space-y-4 mb-4 h-64 overflow-y-auto">
        {posts.map(post => (
          <div key={post._id} className="p-3 bg-background rounded-lg border border-glass-border">
            <p className="text-sm font-bold text-primary">Farmer {post.farmerId.slice(-4)}</p>
            <p className="text-sm">{post.content}</p>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input 
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            className="flex-1 rounded-lg p-2 bg-background border border-glass-border"
            placeholder="Share best practices..."
        />
        <button onClick={handleSubmit} className="bg-primary text-white p-2 rounded-lg">
            <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
