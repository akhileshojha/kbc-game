import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '@/store/store';
import { PRIZE_AMOUNTS } from '@/lib/questions';
import { RotateCcw } from 'lucide-react';

const GameOverPage = () => {
  const { questionNumber } = useSelector((state: RootState) => state.game);

  const amountWon = questionNumber > 1 ? PRIZE_AMOUNTS[PRIZE_AMOUNTS.length - (questionNumber - 1)] : 0;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#02041d] to-[#0a0c3d] text-center p-4">
      <h1 className="text-6xl font-bold text-orange-500 mb-4">Game Over</h1>
      <p className="text-2xl text-gray-300 mb-2">Congratulations!</p>
      <p className="text-3xl text-white mb-8">You have won</p>
      
      <div className="bg-yellow-400 text-gray-900 font-bold text-5xl py-4 px-8 rounded-lg shadow-lg mb-12">
        ₹ {amountWon.toLocaleString('en-IN')}
      </div>

      <Link
        to="/"
        className="group flex items-center justify-center gap-3 px-8 py-4 bg-gray-600 text-white font-bold text-xl rounded-full shadow-lg transition-all duration-300 ease-in-out hover:scale-110 hover:bg-gray-700"
      >
        <RotateCcw className="h-7 w-7 transition-transform duration-300 group-hover:rotate-[-90deg]" />
        Play Again
      </Link>
    </div>
  );
};

export default GameOverPage;
