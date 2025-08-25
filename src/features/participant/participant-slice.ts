import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Participant, CodeValidationRequest, CodeValidationResponse } from '../../services/participant-service';
import { ExamState } from '../exam/examSlice';

export interface ParticipantState {
  currentParticipant: Participant | null;
  isLoading: boolean;
  error: string | null;
  isCodeValidated: boolean;
}

const initialState: ParticipantState = {
  currentParticipant: null,
  isLoading: false,
  error: null,
  isCodeValidated: false
};

export const validateParticipantCode = createAsyncThunk(
  'participant/validateCode',
  async (request: CodeValidationRequest) => {
    const { ParticipantService } = await import('../../services/participant-service');
    return await ParticipantService.validateCode(request);
  }
);

export const participantSlice = createSlice({
  name: 'participant',
  initialState,
  reducers: {
    clearParticipant: (state) => {
      state.currentParticipant = null;
      state.isCodeValidated = false;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    resetValidation: (state) => {
      state.isCodeValidated = false;
      state.currentParticipant = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(validateParticipantCode.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(validateParticipantCode.fulfilled, (state, action: PayloadAction<CodeValidationResponse>) => {
        state.isLoading = false;
        if (action.payload.success && action.payload.participant) {
          state.currentParticipant = action.payload.participant;
          state.isCodeValidated = true;
          state.error = null;
        } else {
          state.error = action.payload.error || 'Validation failed';
          state.isCodeValidated = false;
        }
      })
      .addCase(validateParticipantCode.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'An error occurred during validation';
        state.isCodeValidated = false;
      });
  }
});

export const { clearParticipant, clearError, resetValidation } = participantSlice.actions;

// Selectors
export const selectIsParticipantValidated = (state: { participant: ParticipantState }) => 
  state.participant.isCodeValidated && state.participant.currentParticipant !== null;

export const selectCurrentParticipant = (state: { participant: ParticipantState }) => 
  state.participant.currentParticipant;

export const selectParticipantError = (state: { participant: ParticipantState }) => 
  state.participant.error;

export const selectIsParticipantLoading = (state: { participant: ParticipantState }) => 
  state.participant.isLoading;

export const selectCanParticipantIngress = (state: { participant: ParticipantState; exam: ExamState }) => {
  // If exam is already started, allow continuation
  if (state.exam.isStarted) {
    return true;
  }
  
  // Otherwise, check if participant is properly validated
  return state.participant.isCodeValidated && state.participant.currentParticipant !== null;
};

export default participantSlice.reducer;
