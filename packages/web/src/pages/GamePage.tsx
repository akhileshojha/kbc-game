import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '@/store/store';
import { nextQuestion, selectAnswer, useLifeline, resetGame } from '@/store/gameSlice';

import QuestionPanel from '@/components/game/QuestionPanel';
import MoneyPyramid from '@/components/game/MoneyPyramid';
import Lifelines from '@/components/game/Lifelines';
import Timer from '@/components/game/Timer';
import { MOCK_QUESTIONS } from '@/lib/questions';

const GamePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    questionNumber,
    isGameOver,
  } = useSelector((state: RootState) => state.game);

  useEffect(() => {
    dispatch(resetGame());
  }, [dispatch]);

  useEffect(() => {
    if (isGameOver) {
      setTimeout(() => navigate('/end'), 2000);
    }
  }, [isGameOver, navigate]);

  const currentQuestion = MOCK_QUESTIONS[questionNumber - 1];

  const handleSelectAnswer = (selectedOption: string) => {
    if (!currentQuestion) return;
    dispatch(selectAnswer({
      questionId: currentQuestion.id,
      selectedOption
    }));

    setTimeout(() => {
      dispatch(nextQuestion());
    }, 2000); // Wait for animations before moving to the next question
  };

  const handleUseLifeline = (lifeline: 'fiftyFifty' | 'audiencePoll') => {
    if (!currentQuestion) return;
    dispatch(useLifeline({
        lifeline,
        questionId: currentQuestion.id
    }));
  };

  if (!currentQuestion) {
    // This state could be a "You've Won!" screen
    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-[#02041d] to-[#0a0c3d]">
            <h1 className="text-4xl text-yellow-400 font-bold">Congratulations! You've answered all questions!</h1>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#02041d] to-[#0a0c3d] flex flex-col items-center justify-center p-4 lg:p-8 overflow-hidden">
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Game Area */}
        <div className="lg:col-span-3 flex flex-col gap-6 order-2 lg:order-1">
          <div className="flex justify-between items-center px-4">
            <Timer isPaused={false} onTimeUp={() => {}} />
            <Lifelines onUseLifeline={handleUseLifeline} />
          </div>
          <QuestionPanel
            question={currentQuestion}
            onSelectAnswer={handleSelectAnswer}
          />
        </div>

        {/* Money Pyramid */}
        <div className="order-1 lg:order-2">
          <MoneyPyramid />
        </div>
      </div>
    </div>
  );
};

export default GamePage;
