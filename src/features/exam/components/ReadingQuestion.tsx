import React from 'react';
import { Card, CardContent, Typography, RadioGroup, FormControlLabel, Radio, Box, Paper } from '@mui/material';
import { Question } from '../examSlice';

interface ReadingQuestionProps {
  question: Question;
  answer: string;
  onAnswerChange: (answer: string) => void;
}

const ReadingQuestion: React.FC<ReadingQuestionProps> = ({ question, answer, onAnswerChange }) => {
  return (
    <Card variant="outlined" sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Read the following passage carefully. Then, answer the questions below by selecting the correct option. ({question.points} points)
        </Typography>
        
        <Paper variant="outlined" sx={{ p: 2, mb: 2, backgroundColor: '#f5f5f5' }}>
          <Typography variant="body2" component="pre" sx={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit' }}>
            {question.readingPassage}
          </Typography>
        </Paper>
        
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

export default ReadingQuestion;
