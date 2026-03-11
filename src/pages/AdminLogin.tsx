import { useState } from 'react';
import { motion } from 'motion/react';
import { supabase } from '../lib/supabase';
import { useNavigate, Link } from 'react-router-dom';
import { Shield, Mail, Lock, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signOut } = useAuth(); // If someone is logged in as user, sign them out

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // First, sign in
      const { data: { user }, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) throw signInError;
      if (!user) throw new Error("No user returned");

      // Verify the user is an admin by checking their profile
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();
        
      if (profileError) throw profileError;
      
      if (profile?.role !== 'admin') {
        // Not an admin, sign out immediately
        await signOut();
        throw new Error("Access Denied: You do not have administrator privileges.");
      }

      // Successful admin login
      navigate('/admin/dashboard');
    } catch (err: any) {
      setError(err.message || 'Failed to sign in as Admin');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black pt-24 pb-12 flex flex-col justify-center sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center"
        >
          <Link to="/" className="flex items-center gap-2 text-white">
            <Shield className="w-10 h-10 text-orange-accent" />
            <span className="text-2xl font-display font-bold tracking-wider">RK ADMIN</span>
          </Link>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-6 text-center text-3xl font-display font-bold text-white uppercase tracking-wider"
        >
          Access Control
        </motion.h2>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"
      >
        <div className="bg-white/5 py-8 px-4 shadow-[0_0_50px_rgba(255,87,34,0.15)] sm:rounded-lg sm:px-10 border border-orange-accent/20 backdrop-blur-sm relative overflow-hidden">
          {/* Decorative scanner line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-orange-accent/30 shadow-[0_0_20px_rgba(255,87,34,1)] animate-ping" />
          
          <form className="space-y-6 relative z-10" onSubmit={handleAdminLogin}>
            {error && (
              <div className="bg-red-500/10 border border-red-500/50 rounded-md p-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-200">{error}</p>
              </div>
            )}
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                Admin Email
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 bg-white/5 border border-white/10 rounded-md py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-accent focus:border-transparent transition-all"
                  placeholder="admin@rkfitness.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                Admin Token / Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 bg-white/5 border border-white/10 rounded-md py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-accent focus:border-transparent transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-bold text-black bg-orange-accent hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-orange-accent uppercase tracking-wider transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Authenticating...' : 'Authorize Access'}
              </button>
            </div>
          </form>

        </div>
      </motion.div>
    </div>
  );
}
