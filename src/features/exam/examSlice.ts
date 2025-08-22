import type { PayloadAction } from '@reduxjs/toolkit';
import { createAppSlice } from '../../app/createAppSlice';

export interface Question {
  id: number;
  type: 'fill-gap' | 'multiple-choice' | 'reading' | 'matching' | 'verb-to-be' | 'writing';
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  points: number;
  readingPassage?: string;
  matchingPairs?: { word: string; meaning: string }[];
}

export interface ExamState {
  questions: Question[];
  currentQuestionIndex: number;
  answers: Record<number, string | string[]>;
  isStarted: boolean;
  isCompleted: boolean;
  score: number;
  totalPoints: number;
  timeStarted?: Date;
  timeCompleted?: Date;
  isParticipantValidated: boolean;
}

const initialState: ExamState = {
  questions: [],
  currentQuestionIndex: 0,
  answers: {},
  isStarted: false,
  isCompleted: false,
  score: 0,
  totalPoints: 0,
  timeStarted: undefined,
  timeCompleted: undefined,
  isParticipantValidated: false,
};

export const examSlice = createAppSlice({
  name: 'exam',
  initialState,
  reducers: create => ({
    validateParticipantAccess: create.reducer((state, action: PayloadAction<boolean>) => {
      state.isParticipantValidated = action.payload;
    }),
    startExam: create.reducer((state) => {
      if (!state.isParticipantValidated) {
        throw new Error('Participant must be validated before starting exam');
      }
      state.isStarted = true;
      state.timeStarted = new Date();
      state.currentQuestionIndex = 0;
      state.answers = {};
      state.score = 0;
      state.isCompleted = false;
    }),
    setQuestions: create.reducer((state, action: PayloadAction<Question[]>) => {
      state.questions = action.payload;
      state.totalPoints = action.payload.reduce((total, question) => total + question.points, 0);
    }),
    setAnswer: create.reducer((state, action: PayloadAction<{ questionId: number; answer: string | string[] }>) => {
      if (!state.isParticipantValidated) {
        throw new Error('Participant must be validated before answering questions');
      }
      const { questionId, answer } = action.payload;
      state.answers[questionId] = answer;
    }),
    nextQuestion: create.reducer((state) => {
      if (!state.isParticipantValidated) {
        throw new Error('Participant must be validated before navigating questions');
      }
      if (state.currentQuestionIndex < state.questions.length - 1) {
        state.currentQuestionIndex += 1;
      }
    }),
    previousQuestion: create.reducer((state) => {
      if (!state.isParticipantValidated) {
        throw new Error('Participant must be validated before navigating questions');
      }
      if (state.currentQuestionIndex > 0) {
        state.currentQuestionIndex -= 1;
      }
    }),
    goToQuestion: create.reducer((state, action: PayloadAction<number>) => {
      if (!state.isParticipantValidated) {
        throw new Error('Participant must be validated before navigating questions');
      }
      const questionIndex = action.payload;
      if (questionIndex >= 0 && questionIndex < state.questions.length) {
        state.currentQuestionIndex = questionIndex;
      }
    }),
    completeExam: create.reducer((state) => {
      if (!state.isParticipantValidated) {
        throw new Error('Participant must be validated before completing exam');
      }
      state.isCompleted = true;
      state.timeCompleted = new Date();
      // Calculate score based on correct answers
      let totalScore = 0;
      state.questions.forEach((question) => {
        const userAnswer = state.answers[question.id];
        if (userAnswer) {
          if (Array.isArray(question.correctAnswer)) {
            // For matching questions
            if (Array.isArray(userAnswer) && userAnswer.length === question.correctAnswer.length) {
              const isCorrect = userAnswer.every((answer, index) => 
                answer === question.correctAnswer[index]
              );
              if (isCorrect) totalScore += question.points;
            }
          } else {
            // For single answer questions
            if (userAnswer === question.correctAnswer) {
              totalScore += question.points;
            }
          }
        }
      });
      state.score = totalScore;
    }),
    resetExam: create.reducer((state) => {
      return { ...initialState };
    }),
  }),
});

export const {
  validateParticipantAccess,
  startExam,
  setQuestions,
  setAnswer,
  nextQuestion,
  previousQuestion,
  goToQuestion,
  completeExam,
  resetExam,
} = examSlice.actions;

export default examSlice.reducer;
