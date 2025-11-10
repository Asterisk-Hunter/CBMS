import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../services/database';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const demoAccounts = [
    { name: 'John Doe', email: 'john@email.com', password: 'password123' },
    { name: 'Jane Smith', email: 'jane@email.com', password: 'password123' },
    { name: 'Admin', email: 'admin@cinema.com', password: 'admin123' }
  ];

  const fillDemoAccount = (demoEmail, demoPassword) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = authService.login(email, password);
    if (result.success) {
      navigate('/');
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="min-h-screen bg-background-dark flex items-center justify-center p-4">
      <div className="bg-card-dark p-8 rounded-xl shadow-2xl w-full max-w-md border border-border-dark">
        <div className="flex items-center justify-center gap-3 mb-8">
          <span className="material-symbols-outlined text-primary text-4xl">movie</span>
          <h1 className="text-white text-2xl font-bold">CinemaSphere</h1>
        </div>
        
        <h2 className="text-white text-xl font-semibold mb-6 text-center">Welcome Back</h2>
        
        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-background-dark border border-border-dark rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="your@email.com"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-background-dark border border-border-dark rounded-lg px-4 py-3 pr-12 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              >
                <span className="material-symbols-outlined text-xl">
                  {showPassword ? 'visibility_off' : 'visibility'}
                </span>
              </button>
            </div>
          </div>
          
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-primary-light to-primary-dark text-white font-semibold py-3 rounded-lg hover:scale-105 transition-transform shadow-lg shadow-primary/30"
          >
            Sign In
          </button>
        </form>
        
        <p className="text-gray-400 text-sm text-center mt-6">
          Don't have an account?{' '}
          <Link to="/register" className="text-primary hover:underline font-medium">
            Sign up
          </Link>
        </p>
        
        <div className="mt-6 pt-6 border-t border-border-dark">
          <p className="text-gray-400 text-xs font-medium mb-3 text-center">Quick Login (Demo)</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {demoAccounts.map((account, index) => (
              <button
                key={index}
                type="button"
                onClick={() => fillDemoAccount(account.email, account.password)}
                className="px-4 py-2 bg-primary/20 hover:bg-primary/30 border border-primary/50 text-primary rounded-lg text-xs font-medium transition-all"
              >
                {account.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
