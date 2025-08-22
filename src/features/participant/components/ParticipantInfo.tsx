import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  Paper,
  Typography,
  Avatar,
  Button,
  Divider
} from '@mui/material';
import { Person, Email, Phone, ExitToApp } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../../app/store';
import { clearParticipant } from '../participant-slice';

export const ParticipantInfo: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentParticipant } = useSelector((state: RootState) => state.participant);

  if (!currentParticipant) {
    return null;
  }

  const handleStartExam = () => {
    navigate('/exam');
  };

  const handleLogout = () => {
    dispatch(clearParticipant());
    navigate('/');
  };

  const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '50vh',
        padding: 2
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 3,
          maxWidth: 500,
          width: '100%'
        }}
      >
        <Box sx={{ textAlign: 'center', mb: 2 }}>
          <Avatar
            sx={{
              width: 80,
              height: 80,
              fontSize: '2rem',
              margin: '0 auto 12px',
              bgcolor: 'primary.main'
            }}
          >
            {getInitials(currentParticipant.name)}
          </Avatar>
          
          <Typography variant="h4" component="h1" gutterBottom>
            {t('features.participant.info.welcome')}
          </Typography>
          
          <Typography variant="h6" color="primary" gutterBottom>
            {currentParticipant.name}
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Box sx={{ mb: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
            <Email sx={{ mr: 2, color: 'text.secondary' }} />
            <Typography variant="body1">
              {currentParticipant.email}
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
            <Phone sx={{ mr: 2, color: 'text.secondary' }} />
            <Typography variant="body1">
              {currentParticipant.contact}
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Person sx={{ mr: 2, color: 'text.secondary' }} />
            <Typography variant="body1">
              {t('features.participant.info.participantId')}: {currentParticipant.id}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
          <Button
            variant="contained"
            size="large"
            startIcon={<ExitToApp />}
            onClick={handleStartExam}
            sx={{ minWidth: 150 }}
          >
            {t('features.participant.info.startExam')}
          </Button>
          
          <Button
            variant="outlined"
            size="large"
            onClick={handleLogout}
            sx={{ minWidth: 150 }}
          >
            {t('features.participant.info.logout')}
          </Button>
        </Box>

        <Box sx={{ mt: 2, textAlign: 'center' }}>
          <Typography variant="caption" color="text.secondary">
            {t('features.participant.info.ready')}
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};
