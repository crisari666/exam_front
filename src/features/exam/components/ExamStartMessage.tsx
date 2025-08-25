import React, { useEffect, useState } from 'react';
import { Container, Paper, Typography, LinearProgress, Alert } from '@mui/material';

interface ExamStartMessageProps {
  message: string;
}

const ExamStartMessage: React.FC<ExamStartMessageProps> = ({ message }) => {
  const [showTimeoutWarning, setShowTimeoutWarning] = useState(false);

  useEffect(() => {
    // Show timeout warning after 10 seconds
    const timeoutId = setTimeout(() => {
      setShowTimeoutWarning(true);
    }, 10000);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Paper sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h6" color="success.main" gutterBottom>
          {message}
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Loading your exam questions...
        </Typography>
        <LinearProgress sx={{ mb: 2 }} />
        
        {showTimeoutWarning && (
          <Alert severity="info" sx={{ mt: 2 }}>
            If questions are taking longer than expected, please refresh the page or contact support.
          </Alert>
        )}
      </Paper>
    </Container>
  );
};

export default ExamStartMessage;
