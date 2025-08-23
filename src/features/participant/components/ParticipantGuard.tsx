import React from 'react';
import { 
  Container, 
  Box, 
  Typography, 
  Alert, 
  CircularProgress,
  Paper 
} from '@mui/material';
import { useParticipantValidation } from '../hooks/useParticipantValidation';
import { CodeValidationForm } from './CodeValidationForm';
import { useLocalization } from '../../../shared/hooks/useLocalization';
import { AppHeader } from '../../../shared/components/AppHeader';

interface ParticipantGuardProps {
  children: React.ReactNode;
}

const ParticipantGuard: React.FC<ParticipantGuardProps> = ({ children }) => {
  const { t } = useLocalization();
  const {
    isParticipantValidated,
    currentParticipant,
    participantError,
    isLoading,
    handleLogout,
  } = useParticipantValidation();

  if (isLoading) {
    return (
      <>
        <AppHeader />
        <Container maxWidth="sm" sx={{ mt: 8 }}>
          <Box display="flex" flexDirection="column" alignItems="center" gap={3}>
            <CircularProgress size={60} />
            <Typography variant="h6">{t('features.participant.guard.validating')}</Typography>
          </Box>
        </Container>
      </>
    );
  }

  if (!isParticipantValidated || !currentParticipant) {
    return (
      <>
        <AppHeader />
        <Container maxWidth="sm" sx={{ mt: 4 }}>
          <Paper sx={{ p: 3 }}>
            <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
              <Typography variant="h4"  textAlign="center" gutterBottom>
                {t('features.participant.guard.validationRequired')}
              </Typography>
              <Typography variant="body1" textAlign="center" color="text.secondary">
                {t('features.participant.guard.validationDescription')}
              </Typography>
              {participantError && (
                <Alert severity="error" sx={{ width: '100%' }}>
                  {participantError}
                </Alert>
              )}
              <CodeValidationForm />
            </Box>
          </Paper>
        </Container>
      </>
    );
  }

  return (
    <>
      <AppHeader 
        participant={{
          name: currentParticipant.name,
          code: currentParticipant.code,
          onLogout: handleLogout
        }}
      />
      {children}
    </>
  );
};

export default ParticipantGuard;
