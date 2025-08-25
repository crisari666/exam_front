import React from 'react';
import { Card, CardContent, Typography, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { Question } from '../examSlice';

interface FillGapQuestionProps {
  question: Question;
  answer: string;
  onAnswerChange: (answer: string) => void;
}

const FillGapQuestion: React.FC<FillGapQuestionProps> = ({ question, answer, onAnswerChange }) => {
  return (
    <Card variant="outlined" sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Fill in the gaps the correct answer ({question.points} points)
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          {question.question}
        </Typography>
        <RadioGroup
          value={answer}
          onChange={(e) => onAnswerChange(e.target.value)}
        >
          {question.options?.map((option, index) => (
            <FormControlLabel
              key={index}
              value={option}
              control={<Radio />}
              label={option}
              sx={{ mb: 1 }}
            />
          ))}
        </RadioGroup>
      </CardContent>
    </Card>
  );
};

export default FillGapQuestion;
