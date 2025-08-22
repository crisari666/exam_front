import React from 'react';
import { 
  Container, 
  Box, 
  Typography, 
  Alert, 
  Button,
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
      <AppHeader />
      <Box sx={{ 
        position: 'fixed', 
        top: 16, 
        right: 16, 
        zIndex: 1000,
        backgroundColor: 'background.paper',
        borderRadius: 2,
        p: 2,
        boxShadow: 2,
        border: '1px solid',
        borderColor: 'divider'
      }}>
        <Box display="flex" alignItems="center" gap={2}>
          <Box>
            <Typography variant="body2" fontWeight="bold">
              {t('features.participant.guard.participant')}: {currentParticipant.name}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {t('features.participant.guard.code')}: {currentParticipant.code}
            </Typography>
          </Box>
          <Button 
            size="small" 
            variant="outlined" 
            onClick={handleLogout}
            color="error"
          >
            {t('common.logout')}
          </Button>
        </Box>
      </Box>
      {children}
    </>
  );
};

export default ParticipantGuard;
