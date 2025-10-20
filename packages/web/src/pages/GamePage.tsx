import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '@/store/store';
import { nextQuestion, selectAnswer } from '@/store/gameSlice';

import QuestionPanel from '@/components/game/QuestionPanel';
import MoneyPyramid from '@/components/game/MoneyPyramid';
import Lifelines from '@/components/game/Lifelines';
import Timer from '@/components/game/Timer';

import { MOCK_QUESTIONS } from '@/lib/questions';

const GamePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isAnswered, setIsAnswered] = useState(false);

  const { questionNumber, isGameOver } = useSelector((state: RootState) => state.game);

  const currentQuestion = MOCK_QUESTIONS.find(q => q.id === questionNumber);

  useEffect(() => {
    if (isGameOver) {
      setTimeout(() => navigate('/game-over'), 3000);
    }
  }, [isGameOver, navigate]);

  useEffect(() => {
    setIsAnswered(false);
  }, [questionNumber]);

  const handleSelectAnswer = (selectedOption: string) => {
    if (!currentQuestion || isAnswered) return;

    setIsAnswered(true);
    dispatch(selectAnswer({ questionId: currentQuestion.id, selectedOption }));

    setTimeout(() => {
        dispatch(nextQuestion());
    }, 3000);
  };

  if (!currentQuestion) {
    return <div className="text-white text-2xl">Loading...</div>;
  }

  return (
      <div className="w-full max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Game Area */}
        <div className="lg:col-start-4 lg:col-span-6 flex flex-col items-center gap-6 order-2 lg:order-1">
          <div className="w-full flex justify-center items-center px-4">
             <Lifelines questionId={currentQuestion.id} />
          </div>
          <QuestionPanel
            key={currentQuestion.id}
            question={currentQuestion}
            onSelectAnswer={handleSelectAnswer}
            isAnswered={isAnswered}
          />
        </div>

        {/* Right Panel Area */}
        <div className="lg:col-span-3 lg:col-start-10 flex flex-col justify-between items-center order-1 lg:order-2 h-full">
           <Timer key={questionNumber} initialTime={60} isPaused={isAnswered} onTimeUp={() => navigate('/game-over')} />
           <MoneyPyramid currentLevel={questionNumber} />
        </div>
      </div>
  );
};

export default GamePage;
