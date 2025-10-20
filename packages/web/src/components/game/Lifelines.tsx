import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { Phone, Users, Divide } from 'lucide-react';

type Lifeline = 'fiftyFifty' | 'audiencePoll';

interface Props {
  onUseLifeline: (lifeline: Lifeline) => void;
}

const LifelineButton = ({
  icon: Icon,
  onClick,
  isDisabled,
  label,
}: {
  icon: React.ElementType;
  onClick: () => void;
  isDisabled: boolean;
  label: string;
}) => {
  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={`relative flex flex-col items-center justify-center w-20 h-20 md:w-24 md:h-24 bg-blue-900/50 border-2 border-blue-400 rounded-full transition-all duration-300 hover:border-yellow-400 hover:bg-blue-800/70 disabled:opacity-30 disabled:cursor-not-allowed`}
      aria-label={`Use ${label} lifeline`}
    >
      <Icon className="w-8 h-8 md:w-10 md:h-10" />
      {isDisabled && (
        <div className="absolute inset-0 flex items-center justify-center">
            <svg className="w-full h-full text-red-500" viewBox="0 0 100 100">
                <line x1="10" y1="10" x2="90" y2="90" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
                <line x1="90" y1="10" x2="10" y2="90" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
            </svg>
        </div>
      )}
    </button>
  );
};


const Lifelines = ({ onUseLifeline }: Props) => {
  const { usedLifelines } = useSelector((state: RootState) => state.game);

  return (
    <div className="flex gap-3 md:gap-4">
      <LifelineButton
        icon={Divide}
        onClick={() => onUseLifeline('fiftyFifty')}
        isDisabled={usedLifelines.fiftyFifty}
        label="50:50"
      />
      <LifelineButton
        icon={Users}
        onClick={() => onUseLifeline('audiencePoll')}
        isDisabled={usedLifelines.audiencePoll}
        label="Audience Poll"
      />
      <LifelineButton
        icon={Phone}
        onClick={() => alert('Phone-a-friend not implemented yet!')}
        isDisabled={true} // Placeholder
        label="Phone a Friend"
      />
    </div>
  );
};

export default Lifelines;
