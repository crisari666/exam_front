import React from 'react';
import { Container, Box, Typography, Alert } from '@mui/material';

interface ExamErrorStateProps {
  error: any;
  message?: string;
}

const ExamErrorState: React.FC<ExamErrorStateProps> = ({ 
  error, 
  message = 'Error loading exam. Please try again later.' 
}) => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h6" sx={{ mt: 2 }}>
          Error loading exam
        </Typography>
      </Box>
      <Alert severity="error">
        {message}
        {error && typeof error === 'object' && 'status' in error && (
          <Typography variant="body2" sx={{ mt: 1 }}>
            Status: {error.status}
          </Typography>
        )}
      </Alert>
    </Container>
  );
};

export default ExamErrorState;
