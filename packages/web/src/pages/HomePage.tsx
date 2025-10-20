import { Link } from 'react-router-dom';
import { Play } from 'lucide-react';

const HomePage = () => {
  return (
    <div className="text-center">
        {/* KBC Logo Shape */}
        <div className="relative w-48 h-48 md:w-64 md:h-64 mx-auto mb-8 flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-800 to-indigo-900 rounded-full animate-spin-slow"></div>
            <div className="absolute inset-2 bg-[#060822] rounded-full"></div>
            <span className="relative text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-br from-yellow-300 to-orange-500">
                ₹
            </span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] mb-2">
          Kaun Banega
        </h1>
        <h2 className="text-6xl md:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 tracking-wider drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]">
          Crorepati
        </h2>
        <p className="text-gray-400 mt-8 max-w-lg mx-auto text-lg">
          Welcome to the game where knowledge meets fortune. Are you ready to face the hot seat?
        </p>
      
      <div className="mt-16 z-10">
        <Link
          to="/play"
          className="group flex items-center justify-center gap-4 px-10 py-5 bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 font-bold text-2xl rounded-full shadow-lg transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-2xl hover:shadow-yellow-500/50"
        >
          <Play className="h-8 w-8 transition-transform duration-300 group-hover:rotate-12 fill-current" />
          Start Game
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
