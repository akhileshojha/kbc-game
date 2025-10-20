import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

interface Question {
  id: number;
  text: string;
  options: { [key: string]: string };
  correctOption: string;
}

interface Props {
  question: Question;
  onSelectAnswer: (selectedOption: string) => void;
  isAnswered: boolean;
}

const OptionButton = ({
  optionKey,
  text,
  onClick,
  status,
  isDisabled,
}: {
  optionKey: string;
  text: string;
  onClick: () => void;
  status: 'default' | 'selected' | 'correct' | 'incorrect';
  isDisabled: boolean;
}) => {
  const baseClasses =
    'w-full text-left p-4 rounded-full border-2 transition-all duration-300 ease-in-out text-lg font-semibold flex items-center justify-center relative';
  
  const statusClasses = {
    default: 'bg-black/40 border-blue-400/50 hover:bg-blue-900/70 hover:border-yellow-400',
    selected: 'bg-gradient-to-r from-orange-500 to-yellow-500 border-orange-300 text-black animate-pulse',
    correct: 'bg-gradient-to-r from-green-500 to-emerald-500 border-green-300 text-black',
    incorrect: 'bg-gradient-to-r from-red-500 to-rose-500 border-red-300 text-white',
  };

  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={`${baseClasses} ${statusClasses[status]} ${isDisabled && status === 'default' ? 'opacity-30 cursor-not-allowed' : ''}`}
    >
      <span className="absolute left-6 text-yellow-400 font-bold">{optionKey}:</span>
      <span>{text}</span>
    </button>
  );
};


const QuestionPanel = ({ question, onSelectAnswer, isAnswered }: Props) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const { hiddenOptions } = useSelector((state: RootState) => state.game);
  
  useEffect(() => {
    setSelectedOption(null);
  }, [question]);

  const handleClick = (optionKey: string) => {
    if (isAnswered) return;
    setSelectedOption(optionKey);
    onSelectAnswer(optionKey);
  };

  const getOptionStatus = (optionKey: string) => {
    if (!isAnswered) {
      return selectedOption === optionKey ? 'selected' : 'default';
    }
    if (optionKey === question.correctOption) {
      return 'correct';
    }
    if (optionKey === selectedOption) {
      return 'incorrect';
    }
    return 'default';
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center gap-8">
      {/* Central Question Stage */}
      <div className="relative w-full aspect-video flex items-center justify-center p-8 text-center bg-black/40 backdrop-blur-md rounded-3xl border-2 border-blue-500/50 shadow-2xl shadow-blue-500/20">
         <p className="text-2xl md:text-3xl font-semibold leading-relaxed">{question.text}</p>
      </div>

      {/* Options */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5">
        {Object.entries(question.options).map(([key, value]) => {
          if (hiddenOptions.includes(key)) {
            return <div key={key} className="w-full h-16 rounded-full bg-black/40 opacity-30"></div>; // Placeholder for hidden options
          }
          return (
            <OptionButton
              key={key}
              optionKey={key}
              text={value}
              onClick={() => handleClick(key)}
              status={getOptionStatus(key)}
              isDisabled={isAnswered}
            />
          );
        })}
      </div>
    </div>
  );
};

export default QuestionPanel;

