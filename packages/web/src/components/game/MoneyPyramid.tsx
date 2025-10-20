import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { PRIZE_AMOUNTS } from '@/lib/questions';
import { Diamond } from 'lucide-react';

const MoneyPyramid = () => {
  const { questionNumber } = useSelector((state: RootState) => state.game);
  const reversedAmounts = [...PRIZE_AMOUNTS].reverse();

  return (
    <div className="bg-black/30 backdrop-blur-sm border-2 border-blue-500/50 rounded-xl p-4 h-full">
      <ul className="flex flex-col-reverse h-full justify-around">
        {reversedAmounts.map((amount, index) => {
          const questionIndex = reversedAmounts.length - index;
          const isCurrent = questionNumber === questionIndex;
          const isPassed = questionNumber > questionIndex;
          
          let levelClass = 'text-gray-400';
          if (isCurrent) {
            levelClass = 'bg-orange-600 text-white font-bold animate-pulse';
          } else if (isPassed) {
            levelClass = 'text-yellow-400 opacity-70';
          }

          return (
            <li
              key={amount}
              className={`flex items-center justify-between p-2 rounded-md transition-all duration-300 ${levelClass}`}
            >
              <div className="flex items-center gap-2">
                <Diamond className={`w-4 h-4 ${isPassed || isCurrent ? 'text-yellow-400' : 'text-gray-600'}`} />
                <span className="font-mono">{questionIndex}</span>
              </div>
              <span className="font-semibold font-mono">
                ₹ {amount.toLocaleString('en-IN')}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MoneyPyramid;
