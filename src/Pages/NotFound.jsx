import React from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '/src/assets/apple-touch-icon.png'

export default function NotFound() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex flex-col">
      {/* Bande bleue en haut */}
      <div className="h-16 bg-blue-400"></div>

      {/* Contenu central */}
      <div className="flex-1 flex flex-col items-center justify-center bg-white p-4">
        <img src={logo} alt="Wina Bwangu Logo" className="w-20 h-20 mb-6" />
        <h1 className="text-6xl font-bold text-blue-500 mb-4">404</h1>
        <p className="text-xl sm:text-2xl text-gray-700 mb-6 text-center">
          Oops! The page you are looking for  does not exist.
        </p>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition font-semibold"
        >
          Return to Dashboard
        </button>
        <span className='text-gray-500 pt-2'>winaBwangu.com</span>
      </div>

      {/* Bande bleue en bas */}
      <div className="h-16 bg-blue-400"></div>
    </div>
  )
}
