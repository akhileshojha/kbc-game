import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '@/store/store';
import { PRIZE_AMOUNTS, MOCK_QUESTIONS } from '@/lib/questions';
import { RotateCcw } from 'lucide-react';
import { resetGame } from '@/store/gameSlice';

const GameOverPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { questionNumber, isGameOver } = useSelector((state: RootState) => state.game);

  // Determine the last level the user answered correctly.
  const lastCorrectLevel = isGameOver ? questionNumber - 1 : MOCK_QUESTIONS.length;

  let finalLevelWon = 0;
  if (isGameOver) {
    // If the game ended due to a wrong answer, fall back to the highest safe level reached.
    // Safe levels are at question 5 (prize index 4) and 10 (prize index 9).
    if (lastCorrectLevel >= 10) {
      finalLevelWon = 10;
    } else if (lastCorrectLevel >= 5) {
      finalLevelWon = 5;
    } else {
      finalLevelWon = 0;
    }
  } else {
    // If the game wasn't "over" (i.e., they won), they get the prize for the last level they completed.
    finalLevelWon = lastCorrectLevel;
  }

  // Get the prize money from the array. The index is the level won minus 1.
  const amountWon = finalLevelWon > 0 ? PRIZE_AMOUNTS[finalLevelWon - 1] : 0;

  const handlePlayAgain = () => {
    dispatch(resetGame());
    navigate('/');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-4 overflow-hidden relative">
        <div className="absolute top-[-20%] left-[-20%] w-[60vw] h-[60vw] bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-20%] right-[-20%] w-[50vw] h-[50vw] bg-yellow-500/10 rounded-full blur-3xl"></div>
      
      <div className="z-10">
        <h1 className="text-6xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600 mb-4">
            Game Over
        </h1>
        <p className="text-2xl text-gray-300 mb-2">Congratulations!</p>
        <p className="text-3xl text-white mb-8">You have won</p>
        
        <div className="inline-block bg-gradient-to-r from-yellow-300 to-orange-500 text-gray-900 font-bold text-5xl md:text-6xl py-4 px-10 rounded-lg shadow-lg mb-16 shadow-yellow-500/30">
            ₹ {amountWon.toLocaleString('en-IN')}
        </div>

        <button
            onClick={handlePlayAgain}
            className="group flex items-center justify-center gap-4 mx-auto px-10 py-5 bg-gray-700/50 border border-gray-600 text-white font-bold text-2xl rounded-full shadow-lg transition-all duration-300 ease-in-out hover:scale-110 hover:bg-gray-700 hover:border-gray-500"
        >
            <RotateCcw className="h-8 w-8 transition-transform duration-300 group-hover:rotate-[-90deg]" />
            Play Again
        </button>
      </div>
    </div>
  );
};

export default GameOverPage;
