import React, { useState, useEffect } from 'react';
import logo from '/src/assets/apple-touch-icon.png';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Navbar({ onOpenModal }) {
  const [menuHamb, setMenuHamb] = useState(false);
  const [theme, setTheme] = useState('light');

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('wb_theme') || 'light';
    setTheme(savedTheme);
    applyTheme(savedTheme);
  }, []);

  // Apply theme to the document
  const applyTheme = (themeName) => {
    const html = document.documentElement;
    html.classList.remove('light', 'dark');
    html.classList.add(themeName);
    if (themeName === 'dark') {
      document.body.classList.add('bg-gray-800', 'text-white');
    } else {
      document.body.classList.remove('bg-gray-800', 'text-white');
      document.body.classList.add('bg-white', 'text-black');
    }
  };

  // Toggle theme
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('wb_theme', newTheme);
    applyTheme(newTheme);
  };

  // Handle links that require authentication
  const handleProtectedLink = (linkName) => {
    const currentUser = localStorage.getItem('wb_current_user');
    if (!currentUser) {
      toast.info('Please sign in to access this feature.', {
        position: 'top-center',
        autoClose: 2000,
        theme: 'colored',
      });
      return;
    }
    console.log(`Navigating to ${linkName}...`);
  };

  // Close menu and open modal
  const handleLinkClick = (action) => {
    setMenuHamb(false);
    if (action) onOpenModal(action);
  };

  return (
    <div className="w-full">
      <header
        className={`shadow-md sticky top-0 z-50 transition-all duration-300 ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        }`}
      >
        <nav className="flex justify-between w-full lg:w-[85%] mx-auto px-4 py-3 transition-all duration-300">
          {/* Logo + Links */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <img src={logo} alt="logo" className="rounded-full h-10 w-10" />
              <span
                className={`text-2xl font-bold tracking-wide hidden lg:block ${
                  theme === 'dark' ? 'text-blue-300' : 'text-blue-500'
                }`}
                style={{ fontFamily: 'cursive' }}
              >
                Wina Bwangu
              </span>
            </div>

            <div
              className={`hidden lg:flex space-x-8 font-medium ${
                theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
              }`}
            >
              <a
                href="#"
                onClick={() => handleProtectedLink('HowItWorks')}
                className="hover:text-blue-400 transition"
              >
                How it works
              </a>
              <a
                href="#"
                onClick={() => handleProtectedLink('Services')}
                className="hover:text-blue-400 transition"
              >
                Services
              </a>
              <a
                href="#"
                onClick={() => handleProtectedLink('Transactions')}
                className="hover:text-blue-400 transition"
              >
                Transactions
              </a>
              <a
                href="#"
                onClick={() => handleProtectedLink('History')}
                className="hover:text-blue-400 transition"
              >
                History
              </a>
            </div>
          </div>

          {/* Buttons */}
          <div className=" flex  items-center gap-4">
            <button
              onClick={toggleTheme}
              className={` ${theme === 'light' ? 'bg-gray-200' : 'bg-gray-800'} cursor-pointer p-2 rounded-full   hover:scale-105 transition"`}
            >
              <ion-icon
                name={theme === 'light' ? 'moon-outline' : 'sunny-outline'}
                class="text-xl text-blue-300"
              ></ion-icon>
            </button>

            <button
              onClick={() => onOpenModal('register')}
              className="border-2 hidden lg:flex border-blue-400 text-blue-400 px-5 py-1 rounded-lg  items-center gap-2 hover:bg-blue-400 hover:text-white transition"
            >
              <em>Sign Up</em>
              <ion-icon name="log-out-outline"></ion-icon>
            </button>

            <button
              onClick={() => onOpenModal('login')}
              className="border-2 hidden lg:flex border-blue-400 text-blue-400 px-5 py-1 rounded-lg  items-center gap-2 hover:bg-blue-400 hover:text-white transition"
            >
              <em>Sign In</em>
              <ion-icon name="lock-closed-outline"></ion-icon>
            </button>
          </div>

          {/* Mobile Menu Icon */}
          <span
            className="block lg:hidden cursor-pointer"
            onClick={() => setMenuHamb(!menuHamb)}
          >
            <ion-icon
              name={menuHamb ? 'close-outline' : 'filter-outline'}
              class={`text-4xl ${!theme === 'light' ? 'text-gray-200' : 'text-blue-300'
              }`}
            ></ion-icon>
          </span>
        </nav>

        {/* Mobile Menu */}
        {menuHamb && (
          <div
            className={`border-t border-gray-200 px-4 py-4 flex flex-col space-y-5 lg:hidden ${
              theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-blue-700 text-white'
            }`}
          >
            <div className="flex flex-col space-y-4 text-center">
              <a href="#" onClick={() => handleProtectedLink('HowItWorks')} className="hover:text-yellow-300">
                How it works
              </a>
              <a href="#" onClick={() => handleProtectedLink('Services')} className="hover:text-yellow-300">
                Services
              </a>
              <a href="#" onClick={() => handleProtectedLink('Transactions')} className="hover:text-yellow-300">
                Transactions
              </a>
              <a href="#" onClick={() => handleProtectedLink('History')} className="hover:text-yellow-300">
                History
              </a>
            </div>

          

            <div className="flex flex-col space-y-3 pt-3">
              <button
                onClick={() => handleLinkClick('register')}
                className="border text-white py-2 rounded-md hover:bg-teal-700 transition"
              >
                Sign Up
              </button>
              <button
                onClick={() => handleLinkClick('login')}
                className="border text-white py-2 rounded-md hover:bg-teal-700 transition"
              >
                Sign In
              </button>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}

export default Navbar;
