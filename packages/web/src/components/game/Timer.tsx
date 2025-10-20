import { useState, useEffect } from 'react';
import { Timer as TimerIcon } from 'lucide-react';

interface Props {
  isPaused: boolean;
  onTimeUp: () => void;
  initialTime?: number;
}

const Timer = ({ isPaused, onTimeUp, initialTime = 30 }: Props) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    setTimeLeft(initialTime);
  }, [initialTime]);

  useEffect(() => {
    if (isPaused || timeLeft <= 0) {
      return;
    }

    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isPaused, timeLeft]);

  useEffect(() => {
    if (timeLeft === 0) {
      onTimeUp();
    }
  }, [timeLeft, onTimeUp]);
  
  const progress = (timeLeft / initialTime) * 100;

  return (
    <div className="flex items-center gap-3">
        <TimerIcon className="w-8 h-8 text-yellow-400" />
        <div className="w-24 h-8 bg-blue-900/50 border-2 border-blue-400 rounded-full overflow-hidden">
            <div 
                className={`h-full transition-all duration-500 ease-linear ${
                    progress > 50 ? 'bg-green-500' : progress > 25 ? 'bg-yellow-500' : 'bg-red-500'
                }`} 
                style={{ width: `${progress}%` }}
            ></div>
        </div>
        <span className="text-2xl font-mono font-bold w-10 text-center">{timeLeft}</span>
    </div>
  );
};

export default Timer;
