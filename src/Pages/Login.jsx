import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '/src/assets/apple-touch-icon.png';

export default function Login({ onClose }) {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState('light');
  const navigate = useNavigate();

  useEffect(() => {
    const storedTheme = localStorage.getItem('wb_theme') || 'light';
    setTheme(storedTheme);
    document.body.className =
      storedTheme === 'light'
        ? 'bg-white text-black font-sans'
        : 'bg-gray-800 text-white font-sans';
  }, []);

  const togglePassword = (id) => {
    const input = document.getElementById(id);
    if (input) input.type = input.type === 'password' ? 'text' : 'password';
  };

  const showToast = (message) => {
    setMsg(message);
    setTimeout(() => setMsg(''), 3000);
  };

  const handleLogin = () => {
    if (!email || !password) {
      showToast('Please fill in all fields.');
      return;
    }
    setLoading(true);
    setMsg('');

    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem('wb_users') || '[]');
      const found = users.find((u) => u.email === email && u.password === password);
      if (!found) {
        showToast('Invalid email or password.');
        setLoading(false);
        return;
      }
      localStorage.setItem('wb_current_user', JSON.stringify(found));
      setLoading(false);
      navigate('/dashboard');
    }, 1000);
  };

  const handleRegister = () => {
    if (!email || !password) {
      showToast('Please fill in all fields.');
      return;
    }
    if (password.length < 8) {
      showToast('Password must be at least 8 characters.');
      return;
    }
    setLoading(true);
    setMsg('');

    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem('wb_users') || '[]');
      if (users.some((u) => u.email === email)) {
        showToast('Email already registered.');
        setLoading(false);
        return;
      }
      users.push({ email, password });
      localStorage.setItem('wb_users', JSON.stringify(users));
      showToast('Account created successfully.');
      setIsRegister(false);
      setEmail('');
      setPassword('');
      setLoading(false);
    }, 1000);
  };

  const containerClass = `relative w-full max-w-lg sm:max-w-sm md:max-w-md rounded-2xl shadow-xl p-6 sm:p-8 z-10 transition-all ${
    theme === 'light'
      ? 'bg-white/40 border border-gray-200 text-black'
      : 'bg-gray-900/70 border border-gray-700 text-white'
  }`;

  const inputClass = `w-full p-3 rounded-xl border focus:ring-2 focus:outline-none text-sm sm:text-base ${
    theme === 'light'
      ? 'border-gray-300 bg-white text-gray-800 focus:ring-blue-500'
      : 'border-gray-700 bg-gray-800 text-gray-100 focus:ring-blue-400'
  }`;

  return (
    <div
      className={`relative flex items-center justify-center min-h-[80vh] sm:min-h-[60vh] rounded-2xl transition-colors duration-500 ${
        theme === 'light' ? 'bg-gray-50' : 'bg-gray-800'
      }`}
    >
      <div className="absolute inset-0 backdrop-blur-lg rounded-2xl"></div>

      <div className={containerClass}>
        {!isRegister ? (
          <>
            <span
              onClick={onClose}
              className="absolute right-4 top-3 cursor-pointer hover:text-blue-500 text-2xl transition-all"
            >
              <ion-icon name="close-outline"></ion-icon>
            </span>

            <div className="text-center mb-5">
              <img src={logo} alt="Logo" className="mx-auto w-16 h-16 mb-2 rounded-full shadow" />
              <h2
                className={`text-lg sm:text-xl font-semibold ${
                  theme === 'light' ? 'text-blue-500' : 'text-blue-300'
                }`}
              >
                Wina Bwangu Agent Portal
              </h2>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClass}
              />

              <div className="relative">
                <input
                  id="loginPassword"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={inputClass}
                />
                <span
                  className="absolute right-3 top-3 cursor-pointer text-gray-500"
                  onClick={() => togglePassword('loginPassword')}
                >
                  👁️
                </span>
              </div>

              <button
                onClick={handleLogin}
                disabled={loading}
                className={`w-full p-3 rounded-xl text-sm sm:text-base text-white transition ${
                  loading
                    ? 'bg-blue-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/20'
                }`}
              >
                {loading ? 'Signing in...' : 'Sign in'}
              </button>

              <p
                className={`text-xs sm:text-sm text-center ${
                  theme === 'light' ? 'text-gray-700' : 'text-gray-300'
                }`}
              >
                No account?{' '}
                <button
                  onClick={() => setIsRegister(true)}
                  className={`font-semibold hover:underline ${
                    theme === 'light' ? 'text-blue-600' : 'text-blue-400'
                  }`}
                >
                  Register
                </button>
              </p>

              {msg && (
                <div
                  className={`mt-2 text-center text-xs sm:text-sm py-2 rounded-md ${
                    msg.includes('successfully')
                      ? theme === 'light'
                        ? 'bg-green-100 text-green-600'
                        : 'bg-green-800/50 text-green-300'
                      : theme === 'light'
                      ? 'bg-red-100 text-red-600'
                      : 'bg-red-800/50 text-red-300'
                  }`}
                >
                  {msg}
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <h2
              className={`text-lg sm:text-xl font-bold text-center mb-3 sm:mb-4 ${
                theme === 'light' ? 'text-gray-800' : 'text-gray-100'
              }`}
            >
              Create account
            </h2>
            <p
              className={`text-center text-xs sm:text-sm mb-4 ${
                theme === 'light' ? 'text-gray-500' : 'text-gray-400'
              }`}
            >
              Register as an agent
            </p>

            <div className="space-y-4">
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClass}
              />

              <div className="relative">
                <input
                  id="regPassword"
                  type="password"
                  placeholder="Password (min 8 characters)"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={inputClass}
                />
                <span
                  className="absolute right-3 top-3 cursor-pointer text-gray-500"
                  onClick={() => togglePassword('regPassword')}
                >
                  👁️
                </span>
              </div>

              <button
                onClick={handleRegister}
                disabled={loading}
                className={`w-full p-3 rounded-xl text-sm sm:text-base text-white transition ${
                  loading
                    ? 'bg-green-400 cursor-not-allowed'
                    : 'bg-green-600 hover:bg-green-700 shadow-lg shadow-green-500/20'
                }`}
              >
                {loading ? 'Creating account...' : 'Create account'}
              </button>

              <p
                className={`text-xs sm:text-sm text-center ${
                  theme === 'light' ? 'text-gray-700' : 'text-gray-300'
                }`}
              >
                Already have an account?{' '}
                <button
                  onClick={() => setIsRegister(false)}
                  className={`font-semibold hover:underline ${
                    theme === 'light' ? 'text-blue-600' : 'text-blue-400'
                  }`}
                >
                  Sign in
                </button>
              </p>

              {msg && (
                <div
                  className={`mt-2 text-center text-xs sm:text-sm py-2 rounded-md ${
                    msg.includes('successfully')
                      ? theme === 'light'
                        ? 'bg-green-100 text-green-600'
                        : 'bg-green-800/50 text-green-300'
                      : theme === 'light'
                      ? 'bg-red-100 text-red-600'
                      : 'bg-red-800/50 text-red-300'
                  }`}
                >
                  {msg}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
