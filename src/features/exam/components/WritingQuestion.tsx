import React from 'react';
import { Card, CardContent, Typography, TextField, Box } from '@mui/material';
import { Question } from '../examSlice';

interface WritingQuestionProps {
  question: Question;
  answer: string;
  onAnswerChange: (answer: string) => void;
}

const WritingQuestion: React.FC<WritingQuestionProps> = ({ question, answer, onAnswerChange }) => {
  return (
    <Card variant="outlined" sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Writing Section ({question.points} point)
        </Typography>
        
        <Typography variant="body1" sx={{ mb: 2 }}>
          {question.question}
        </Typography>
        
        <TextField
          fullWidth
          multiline
          rows={8}
          variant="outlined"
          label="Your answer"
          value={answer}
          onChange={(e) => onAnswerChange(e.target.value)}
          placeholder="Write your paragraph here (5-8 sentences)..."
          sx={{ mt: 2 }}
        />
        
        <Box sx={{ mt: 1 }}>
          <Typography variant="caption" color="text.secondary">
            Minimum 5 sentences, maximum 8 sentences
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default WritingQuestion;
