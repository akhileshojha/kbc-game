import { useSelector, useDispatch } from 'react-redux';
import { Users, Phone, ShieldHalf } from 'lucide-react';
import { RootState } from '@/store/store';
import { useLifeline } from '@/store/gameSlice';

const LifelineButton = ({ icon: Icon, onClick, used, label }: { icon: React.ElementType, onClick: () => void, used: boolean, label: string }) => {
  const baseClasses = "relative flex flex-col items-center justify-center w-20 h-20 md:w-24 md:h-24 bg-blue-900/50 border-2 border-blue-400 rounded-full transition-all duration-300";
  const activeClasses = "hover:bg-blue-800 hover:border-yellow-400 cursor-pointer";
  const usedClasses = "opacity-40 cursor-not-allowed";

  return (
    <button onClick={onClick} disabled={used} className={`${baseClasses} ${used ? usedClasses : activeClasses}`}>
      <Icon className="w-8 h-8 md:w-10 md:h-10 text-yellow-400 mb-1" />
      <span className="text-xs font-semibold uppercase tracking-wider">{label}</span>
      {used && <div className="absolute inset-0 flex items-center justify-center"><span className="text-red-500 text-5xl font-bold transform rotate-12">X</span></div>}
    </button>
  );
}

const Lifelines = ({ questionId }: { questionId: number }) => {
  const dispatch = useDispatch();
  const usedLifelines = useSelector((state: RootState) => state.game.usedLifelines);

  const handleUseLifeline = (lifeline: 'fiftyFifty' | 'audiencePoll') => {
    if (!usedLifelines[lifeline]) {
      dispatch(useLifeline({ lifeline, questionId }));
    }
  };

  return (
    <div className="flex items-center gap-4 md:gap-6">
      <LifelineButton
        icon={ShieldHalf}
        onClick={() => handleUseLifeline('fiftyFifty')}
        used={usedLifelines.fiftyFifty}
        label="50:50"
      />
      <LifelineButton
        icon={Users}
        onClick={() => handleUseLifeline('audiencePoll')}
        used={usedLifelines.audiencePoll}
        label="Poll"
      />
       {/* Placeholder for a third lifeline */}
      <LifelineButton
        icon={Phone}
        onClick={() => alert('Friend lifeline not implemented yet!')}
        used={false} 
        label="Friend"
      />
    </div>
  );
};

export default Lifelines;
