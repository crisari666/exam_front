import React, { useState } from 'react';
import { Card, CardContent, Typography, Box, Select, MenuItem, FormControl, InputLabel, Grid } from '@mui/material';
import { Question } from '../examSlice';

interface MatchingQuestionProps {
  question: Question;
  answer: string[];
  onAnswerChange: (answer: string[]) => void;
}

const MatchingQuestion: React.FC<MatchingQuestionProps> = ({ question, answer, onAnswerChange }) => {
  const [localAnswers, setLocalAnswers] = useState<string[]>(answer || Array(question.matchingPairs?.length || 0).fill(''));

  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...localAnswers];
    newAnswers[index] = value;
    setLocalAnswers(newAnswers);
    onAnswerChange(newAnswers);
  };

  return (
    <Card variant="outlined" sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Match each word in Column A with its correct meaning or image in Column B ({question.points} points)
        </Typography>
        
        <Typography variant="body1" sx={{ mb: 2 }}>
          {question.question}
        </Typography>
        
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Column A (Words)
            </Typography>
            {question.matchingPairs?.map((pair, index) => (
              <Box key={index} sx={{ mb: 1 }}>
                <Typography variant="body2">
                  {index + 1}. {pair.word}
                </Typography>
              </Box>
            ))}
          </Grid>
          
          <Grid item xs={6}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Column B (Meanings)
            </Typography>
            {question.matchingPairs?.map((pair, index) => (
              <Box key={index} sx={{ mb: 1 }}>
                <FormControl fullWidth size="small">
                  <InputLabel>Match {pair.word}</InputLabel>
                  <Select
                    value={localAnswers[index] || ''}
                    label={`Match ${pair.word}`}
                    onChange={(e) => handleAnswerChange(index, e.target.value)}
                  >
                    {question.matchingPairs?.map((meaningPair, meaningIndex) => (
                      <MenuItem key={meaningIndex} value={meaningPair.word}>
                        {meaningPair.meaning}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            ))}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default MatchingQuestion;
