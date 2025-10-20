import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MOCK_QUESTIONS } from '@/lib/questions';

export interface GameState {
  questionNumber: number;
  isGameOver: boolean;
  usedLifelines: {
    fiftyFifty: boolean;
    audiencePoll: boolean;
  };
  hiddenOptions: string[];
}

const initialState: GameState = {
  questionNumber: 1,
  isGameOver: false,
  usedLifelines: {
    fiftyFifty: false,
    audiencePoll: false,
  },
  hiddenOptions: [],
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    selectAnswer: (state, action: PayloadAction<{ questionId: number; selectedOption: string }>) => {
      const { questionId, selectedOption } = action.payload;
      const question = MOCK_QUESTIONS.find(q => q.id === questionId);
      if (question && question.correctOption !== selectedOption) {
        state.isGameOver = true;
      }
    },
    nextQuestion: (state) => {
      if (!state.isGameOver) {
        if (state.questionNumber < MOCK_QUESTIONS.length) {
          state.questionNumber += 1;
          state.hiddenOptions = []; // Clear hidden options for the next question
        } else {
          // Player has won the game
          state.isGameOver = true; 
        }
      }
    },
    useLifeline: (state, action: PayloadAction<{ lifeline: 'fiftyFifty' | 'audiencePoll', questionId: number }>) => {
        const { lifeline, questionId } = action.payload;
        if (lifeline === 'fiftyFifty' && !state.usedLifelines.fiftyFifty) {
            const question = MOCK_QUESTIONS.find(q => q.id === questionId);
            if(question) {
                const incorrectOptions = Object.keys(question.options).filter(opt => opt !== question.correctOption);
                // Randomly select two incorrect options to hide
                while(state.hiddenOptions.length < 2) {
                    const randomIdx = Math.floor(Math.random() * incorrectOptions.length);
                    const optionToHide = incorrectOptions.splice(randomIdx, 1)[0];
                    if(optionToHide) {
                        state.hiddenOptions.push(optionToHide);
                    }
                }
            }
            state.usedLifelines.fiftyFifty = true;
        }
        if (lifeline === 'audiencePoll' && !state.usedLifelines.audiencePoll) {
            // Logic for audience poll can be simulated here
            state.usedLifelines.audiencePoll = true;
            alert('Audience Poll lifeline used! The audience strongly favors one of the remaining options.');
        }
    },
    resetGame: () => initialState,
  },
});

export const { selectAnswer, nextQuestion, useLifeline, resetGame } = gameSlice.actions;
export default gameSlice.reducer;

