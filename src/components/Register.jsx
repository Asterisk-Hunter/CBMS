import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../services/database';

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    
    const result = authService.register({
      username: formData.username,
      email: formData.email,
      password: formData.password
    });
    
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
        
        <h2 className="text-white text-xl font-semibold mb-6 text-center">Create Account</h2>
        
        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full bg-background-dark border border-border-dark rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="johndoe"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
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
                name="password"
                value={formData.password}
                onChange={handleChange}
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
          
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">Confirm Password</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full bg-background-dark border border-border-dark rounded-lg px-4 py-3 pr-12 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              >
                <span className="material-symbols-outlined text-xl">
                  {showConfirmPassword ? 'visibility_off' : 'visibility'}
                </span>
              </button>
            </div>
          </div>
          
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-primary-light to-primary-dark text-white font-semibold py-3 rounded-lg hover:scale-105 transition-transform shadow-lg shadow-primary/30"
          >
            Create Account
          </button>
        </form>
        
        <p className="text-gray-400 text-sm text-center mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-primary hover:underline font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
