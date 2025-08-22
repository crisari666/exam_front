import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Participant, CodeValidationRequest, CodeValidationResponse } from '../../services/participant-service';

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
export default participantSlice.reducer;
