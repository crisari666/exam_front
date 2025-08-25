import React from 'react';
import { Container, Paper, Box, Typography, Button } from '@mui/material';

interface ExamCompletedStateProps {
  score: number;
  totalPoints: number;
  onResetExam: () => void;
}

const ExamCompletedState: React.FC<ExamCompletedStateProps> = ({ 
  score, 
  totalPoints, 
  onResetExam 
}) => {
  const percentage = (score / totalPoints) * 100;
  const isPassed = percentage >= 65;

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Paper sx={{ p: 4, textAlign: 'center' }}>
        <Box sx={{ mb: 2 }}>
          <Typography variant="h4" gutterBottom>
            {isPassed ? '🎉 Congratulations!' : '📝 Exam Results'}
          </Typography>
        </Box>
        
        <Typography variant="h6" color={isPassed ? 'success.main' : 'error.main'} gutterBottom>
          {isPassed ? 'You passed the exam!' : 'You did not pass the exam'}
        </Typography>
        
        <Box sx={{ my: 3 }}>
          <Typography variant="h5">
            Score: {score} / {totalPoints} points
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Percentage: {percentage.toFixed(1)}%
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Passing score: 65%
          </Typography>
        </Box>
        
        <Button variant="contained" onClick={onResetExam} sx={{ mr: 2 }}>
          Take Exam Again
        </Button>
      </Paper>
    </Container>
  );
};

export default ExamCompletedState;
