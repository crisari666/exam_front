import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  CircularProgress
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { AppDispatch, RootState } from '../../../app/store';
import { validateParticipantCode, clearError } from '../participant-slice';

export const CodeValidationForm: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, error } = useSelector((state: RootState) => state.participant);
  
  const [code, setCode] = useState<string>('');
  const [localError, setLocalError] = useState<string>('');

  const handleCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toUpperCase();
    setCode(value);
    setLocalError('');
    if (error) {
      dispatch(clearError());
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!code.trim()) {
      setLocalError('Please enter a code');
      return;
    }

    if (code.length < 3) {
      setLocalError('Code must be at least 3 characters long');
      return;
    }

    try {
      await dispatch(validateParticipantCode({ code: code.trim() })).unwrap();
    } catch (error) {
      // Error is handled by the slice
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSubmit(event as any);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '60vh',
        padding: 3
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          maxWidth: 400,
          width: '100%',
          textAlign: 'center'
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 3 }}>
          {t('participant.codeValidation.title', 'Participant Access')}
        </Typography>
        
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          {t('participant.codeValidation.description', 'Please enter your access code to begin the exam')}
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
          <TextField
            fullWidth
            label={t('participant.codeValidation.codeLabel', 'Access Code')}
            value={code}
            onChange={handleCodeChange}
            onKeyPress={handleKeyPress}
            placeholder="Enter your code"
            variant="outlined"
            size="medium"
            sx={{ mb: 3 }}
            inputProps={{
              style: { textTransform: 'uppercase' }
            }}
            error={!!(localError || error)}
            helperText={localError || error || ''}
            disabled={isLoading}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            disabled={isLoading || !code.trim()}
            sx={{ py: 1.5 }}
          >
            {isLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              t('participant.codeValidation.submit', 'Validate Code')
            )}
          </Button>
        </Box>

        <Box sx={{ mt: 3 }}>
          <Typography variant="caption" color="text.secondary">
            {t('participant.codeValidation.help', 'Need help? Contact your exam administrator')}
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};
