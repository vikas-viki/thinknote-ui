import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-sky-50 flex items-center justify-center font-poppins">
      <div className="text-center px-4">
        <h1 className="text-6xl font-bold text-black mb-6">
          ThinkNote
        </h1>
        <p className="text-xl text-gray-600 mb-12 max-w-lg mx-auto leading-relaxed">
          Your thoughts, organized beautifully. Simple, elegant note-taking for the modern mind.
        </p>
        <button
          onClick={() => navigate('/auth')}
          className="bg-black text-white px-8 py-4 rounded-xl font-medium text-lg hover:bg-gray-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Home;