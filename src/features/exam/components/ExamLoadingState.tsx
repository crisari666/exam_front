import React from 'react';
import { Container, Box, Typography, LinearProgress } from '@mui/material';

interface ExamLoadingStateProps {
  message?: string;
}

const ExamLoadingState: React.FC<ExamLoadingStateProps> = ({ message = 'Loading exam...' }) => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h6" sx={{ mt: 2 }}>
          {message}
        </Typography>
      </Box>
      <LinearProgress />
    </Container>
  );
};

export default ExamLoadingState;
