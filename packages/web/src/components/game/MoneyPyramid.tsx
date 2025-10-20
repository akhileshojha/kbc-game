import { Diamond } from 'lucide-react';

const PRIZE_MONEY = [
  { level: 15, amount: "₹1 Crore", safe: true },
  { level: 14, amount: "₹50,00,000" },
  { level: 13, amount: "₹25,00,000" },
  { level: 12, amount: "₹12,50,000" },
  { level: 11, amount: "₹6,40,000" },
  { level: 10, amount: "₹3,20,000", safe: true },
  { level: 9, amount: "₹1,60,000" },
  { level: 8, amount: "₹80,000" },
  { level: 7, amount: "₹40,000" },
  { level: 6, amount: "₹20,000" },
  { level: 5, amount: "₹10,000", safe: true },
  { level: 4, amount: "₹5,000" },
  { level: 3, amount: "₹3,000" },
  { level: 2, amount: "₹2,000" },
  { level: 1, amount: "₹1,000" },
].reverse(); // Reverse to display from bottom to top

const MoneyPyramid = ({ currentLevel }: { currentLevel: number }) => {
  return (
    <div className="h-full bg-black/30 backdrop-blur-sm border-2 border-blue-500 rounded-xl p-4 md:p-6 flex flex-col justify-end">
      <ul className="space-y-1 md:space-y-2">
        {PRIZE_MONEY.map(({ level, amount, safe }) => {
          const isActive = level === currentLevel;
          const isPassed = level < currentLevel;

          let levelClasses = "flex items-center justify-between p-2 rounded-md transition-all duration-300 text-sm md:text-base";

          if (isActive) {
            levelClasses += " bg-gradient-to-r from-orange-500 to-yellow-500 text-black font-bold scale-105 shadow-lg animate-pulse";
          } else if (isPassed) {
            levelClasses += " text-green-400 opacity-60";
          } else {
            levelClasses += " text-gray-300";
          }
          if (safe) {
            levelClasses += " text-cyan-300";
          }

          return (
            <li key={level} className={levelClasses}>
              <div className="flex items-center gap-2">
                <Diamond className={`w-4 h-4 ${isActive ? 'text-white' : safe ? 'text-cyan-300' : 'text-gray-500'}`} />
                <span className={`font-mono ${isActive ? 'text-black' : 'text-gray-400'}`}>{String(level).padStart(2, '0')}</span>
              </div>
              <span className="font-bold tracking-wider">{amount}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MoneyPyramid;
