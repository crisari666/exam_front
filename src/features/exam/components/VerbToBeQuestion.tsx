import React, { useState } from 'react';
import { Card, CardContent, Typography, Box, TextField } from '@mui/material';
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

  // Function to render the question text with underlined input fields
  const renderQuestionWithInputs = () => {
    const questionText = question.question;
    const parts = questionText.split('___');
    
    return (
      <Box sx={{ mb: 3 }}>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Fill in the gaps with the correct form of the verb to be - IS - ARE - AM ({question.points} point)
        </Typography>
        
        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 1 }}>
          {parts.map((part, index) => (
            <React.Fragment key={index}>
              <Typography variant="body1" component="span">
                {part}
              </Typography>
              {index < parts.length - 1 && (
                <TextField
                  size="small"
                  value={localAnswers[index] || ''}
                  onChange={(e) => handleAnswerChange(index, e.target.value)}
                  placeholder="Type here"
                  sx={{
                    width: '120px',
                    '& .MuiOutlinedInput-root': {
                      height: '28px',
                      '& fieldset': {
                        border: 'none',
                        borderBottom: '2px solid #1976d2',
                        borderRadius: 0,
                      },
                      '&:hover fieldset': {
                        borderBottom: '2px solid #1565c0',
                      },
                      '&.Mui-focused fieldset': {
                        borderBottom: '2px solid #1976d2',
                      },
                    },
                    '& .MuiInputBase-input': {
                      textAlign: 'center',
                      fontWeight: 'bold',
                      color: '#1976d2',
                      padding: '4px 8px',
                      height: '28px',
                      fontSize: '14px',
                    },
                  }}
                  inputProps={{
                    maxLength: 10,
                  }}
                />
              )}
            </React.Fragment>
          ))}
        </Box>
      </Box>
    );
  };

  return (
    <Card variant="outlined" sx={{ mb: 2 }}>
      <CardContent>
        {renderQuestionWithInputs()}
        
        <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            <strong>Available options:</strong> {verbOptions.join(' • ')}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Type your answers in the underlined fields above. Use: is, are, or am.
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default VerbToBeQuestion;
