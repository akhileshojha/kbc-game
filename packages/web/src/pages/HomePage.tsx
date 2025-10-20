import { Link } from 'react-router-dom';
import { Play } from 'lucide-react';

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#02041d] to-[#0a0c3d] p-4">
      <div className="text-center">
        <h1 className="text-5xl md:text-7xl font-bold text-yellow-400 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] mb-2">
          Kaun Banega
        </h1>
        <h2 className="text-6xl md:text-8xl font-extrabold text-white tracking-wider drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]">
          Crorepati
        </h2>
        <p className="text-gray-300 mt-6 max-w-md mx-auto">
          Welcome to the game where knowledge meets fortune. Are you ready to face the hot seat?
        </p>
      </div>
      
      <div className="mt-12">
        <Link
          to="/play"
          className="group flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 font-bold text-xl rounded-full shadow-lg transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-2xl hover:shadow-yellow-500/50"
        >
          <Play className="h-7 w-7 transition-transform duration-300 group-hover:rotate-12" />
          Start Game
        </Link>
      </div>

      <footer className="absolute bottom-4 text-xs text-gray-500">
        <p>&copy; 2025 KBC Game. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
