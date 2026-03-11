import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Dumbbell, Users, Calendar, Settings, LogOut } from 'lucide-react';

interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  role: string;
  created_at: string;
}

export default function AdminDashboard() {
  const { user, profile, signOut, loading } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState<Profile[]>([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);

  useEffect(() => {
    // If auth is loaded and user is not an admin, redirect them out
    if (!loading && (!user || profile?.role !== 'admin')) {
      navigate('/admin');
    }
  }, [user, profile, loading, navigate]);

  useEffect(() => {
    if (profile?.role === 'admin') {
      fetchUsers();
    }
  }, [profile]);

  const fetchUsers = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setUsers(data || []);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setIsLoadingUsers(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/admin');
  };

  if (loading || (profile && profile.role !== 'admin')) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-accent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white/5 border-r border-white/10 hidden md:flex flex-col">
        <div className="p-6">
          <Link to="/" className="flex items-center gap-2">
            <Dumbbell className="w-8 h-8 text-orange-accent" />
            <span className="text-xl font-display font-bold tracking-wider">RK ADMIN</span>
          </Link>
        </div>
        
        <nav className="flex-1 px-4 space-y-2 mt-8">
          <a href="#" className="flex items-center gap-3 px-4 py-3 bg-orange-accent text-black rounded-lg font-medium transition-colors">
            <Users className="w-5 h-5" />
            Users
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:bg-white/5 hover:text-white rounded-lg font-medium transition-colors">
            <Calendar className="w-5 h-5" />
            Classes
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:bg-white/5 hover:text-white rounded-lg font-medium transition-colors">
            <Settings className="w-5 h-5" />
            Settings
          </a>
        </nav>

        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="w-10 h-10 rounded-full bg-orange-accent/20 flex items-center justify-center text-orange-accent font-bold">
              {profile?.full_name?.charAt(0) || 'A'}
            </div>
            <div>
              <p className="text-sm font-medium">{profile?.full_name || 'Admin User'}</p>
              <p className="text-xs text-gray-500 truncate w-32">{user?.email}</p>
            </div>
          </div>
          <button 
            onClick={handleSignOut}
            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Mobile Header */}
        <header className="md:hidden bg-white/5 border-b border-white/10 p-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Dumbbell className="w-6 h-6 text-orange-accent" />
            <span className="font-display font-bold">RK ADMIN</span>
          </div>
          <button onClick={handleSignOut} className="text-gray-400 hover:text-white">
            <LogOut className="w-5 h-5" />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-3xl font-display font-bold mb-8 uppercase tracking-wider">Dashboard Overview</h1>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-orange-accent/20 rounded-lg text-orange-accent">
                    <Users className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-400">Total Users</h3>
                </div>
                <p className="text-4xl font-bold">{users.length}</p>
              </div>
              
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-blue-500/20 rounded-lg text-blue-400">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-400">Active Classes</h3>
                </div>
                <p className="text-4xl font-bold">0</p>
              </div>
            </div>

            {/* Users Table */}
            <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
              <div className="p-6 border-b border-white/10">
                <h2 className="text-xl font-bold">Recent Registrations</h2>
              </div>
              
              <div className="overflow-x-auto">
                {isLoadingUsers ? (
                  <div className="p-8 text-center text-gray-500">Loading users...</div>
                ) : (
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-white/5 text-sm uppercase tracking-wider text-gray-500">
                        <th className="p-4 font-medium">Name</th>
                        <th className="p-4 font-medium hidden sm:table-cell">Email</th>
                        <th className="p-4 font-medium">Role</th>
                        <th className="p-4 font-medium hidden md:table-cell">Joined</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {users.map((u) => (
                        <tr key={u.id} className="hover:bg-white/5 transition-colors">
                          <td className="p-4 font-medium">
                            {u.full_name || 'N/A'}
                            <div className="sm:hidden text-xs text-gray-500 mt-1">{u.email}</div>
                          </td>
                          <td className="p-4 text-gray-400 hidden sm:table-cell">{u.email}</td>
                          <td className="p-4">
                            <span className={`px-2 py-1 text-xs font-bold rounded-full uppercase ${
                              u.role === 'admin' 
                                ? 'bg-orange-accent/20 text-orange-accent border border-orange-accent/30' 
                                : 'bg-gray-800 text-gray-300 border border-gray-700'
                            }`}>
                              {u.role}
                            </span>
                          </td>
                          <td className="p-4 text-gray-400 hidden md:table-cell">
                            {new Date(u.created_at).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                      {users.length === 0 && (
                        <tr>
                          <td colSpan={4} className="p-8 text-center text-gray-500">
                            No users found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                )}
              </div>
            </div>

          </motion.div>
        </div>
      </main>
    </div>
  );
}
