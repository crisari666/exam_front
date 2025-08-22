import React, { useState } from 'react';
import { Card, CardContent, Typography, Box, Select, MenuItem, FormControl, InputLabel, Grid } from '@mui/material';
import { Question } from '../examSlice';

interface VerbToBeQuestionProps {
  question: Question;
  answer: string[];
  onAnswerChange: (answer: string[]) => void;
}

const VerbToBeQuestion: React.FC<VerbToBeQuestionProps> = ({ question, answer, onAnswerChange }) => {
  const [localAnswers, setLocalAnswers] = useState<string[]>(answer || Array(10).fill(''));

  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...localAnswers];
    newAnswers[index] = value;
    setLocalAnswers(newAnswers);
    onAnswerChange(newAnswers);
  };

  const verbOptions = ['is', 'are', 'am'];

  return (
    <Card variant="outlined" sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Fill in the gaps with the correct form of the verb to be - IS - ARE - AM ({question.points} point)
        </Typography>
        
        <Typography variant="body1" sx={{ mb: 2 }}>
          {question.question}
        </Typography>
        
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" component="pre" sx={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit' }}>
            {question.question}
          </Typography>
        </Box>
        
        <Grid container spacing={1}>
          {localAnswers.map((answer, index) => (
            <Grid size={2}   key={index}>
              <FormControl fullWidth size="small">
                <InputLabel>Gap {index + 1}</InputLabel>
                <Select
                  value={answer}
                  label={`Gap ${index + 1}`}
                  onChange={(e) => handleAnswerChange(index, e.target.value)}
                >
                  {verbOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default VerbToBeQuestion;
