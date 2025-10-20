import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

// Define the types for the question and component props
interface Question {
  id: number;
  text: string;
  options: { [key: string]: string };
  correctOption: string;
}

interface Props {
  question: Question;
  onSelectAnswer: (selectedOption: string) => void;
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
    'w-full text-left p-3 md:p-4 rounded-lg border-2 transition-all duration-300 ease-in-out text-lg font-semibold flex items-center gap-4';
  const statusClasses = {
    default: 'bg-blue-900/50 border-blue-400 hover:bg-blue-800/70 hover:border-yellow-400',
    selected: 'bg-orange-600 border-orange-400 animate-pulse',
    correct: 'bg-green-600 border-green-400',
    incorrect: 'bg-red-600 border-red-400',
  };

  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={`${baseClasses} ${statusClasses[status]} ${isDisabled && status === 'default' ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      <span className="text-yellow-400 font-bold">{optionKey}:</span>
      <span>{text}</span>
    </button>
  );
};


const QuestionPanel = ({ question, onSelectAnswer }: Props) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  
  const { hiddenOptions } = useSelector((state: RootState) => state.game);
  
  // Reset state when a new question is loaded
  useEffect(() => {
    setSelectedOption(null);
    setIsAnswered(false);
  }, [question]);

  const handleClick = (optionKey: string) => {
    if (isAnswered) return;
    setSelectedOption(optionKey);
    setIsAnswered(true);
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
    <div className="bg-black/30 backdrop-blur-sm border-2 border-blue-500 rounded-xl p-6 md:p-8 shadow-2xl w-full">
      {/* Question Text */}
      <div className="mb-8 p-4 bg-blue-900/50 rounded-lg text-center">
        <p className="text-xl md:text-2xl font-medium leading-relaxed">{question.text}</p>
      </div>

      {/* Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {Object.entries(question.options).map(([key, value]) => {
          if (hiddenOptions.includes(key)) {
            return null; // Don't render hidden options by lifelines
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

