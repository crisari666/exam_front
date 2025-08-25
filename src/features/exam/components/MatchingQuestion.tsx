import React, { useState } from 'react';
import { Card, CardContent, Typography, Box, Select, MenuItem, FormControl, InputLabel, Avatar } from '@mui/material';
import { Question } from '../examSlice';

// Import images
import drillImg from '../../../assets/img/drill.png';
import hammerImg from '../../../assets/img/hammer.png';
import sawImg from '../../../assets/img/saw.png';
import scissorsImg from '../../../assets/img/scissors.png';

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

  // Image mapping for tools
  const getToolImage = (word: string): string => {
    const toolImages: Record<string, string> = {
      'Drill': drillImg,
      'Hammer': hammerImg,
      'Saw': sawImg,
      'Scissors': scissorsImg,
      'Sierra': sawImg, // Spanish word for Saw
      'Martillo': hammerImg, // Spanish word for Hammer
      'Taladro': drillImg, // Spanish word for Drill
      'Tijeras': scissorsImg, // Spanish word for Scissors
    };
    return toolImages[word] || '';
  };

  return (
    <Card variant="outlined" sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Match each tool image with its correct Spanish name ({question.points} points)
        </Typography>
        
        <Typography variant="body1" sx={{ mb: 3 }}>
          {question.question}
        </Typography>
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2 }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom sx={{ textAlign: 'center', mb: 2 }}>
              Tool Images
            </Typography>
            {question.matchingPairs?.map((pair, index) => {
              const imageSrc = getToolImage(pair.word);
              return (
                <Box 
                  key={index} 
                  sx={{ 
                    height: 140,
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center',
                    justifyContent: 'center',
                    p: 2,
                    border: '1px solid #e0e0e0',
                    borderRadius: 2,
                    backgroundColor: '#fafafa',
                    mb: 2
                  }}
                >
                  {imageSrc && (
                    <Avatar
                      src={imageSrc}
                      alt={pair.word}
                      sx={{ 
                        width: 80, 
                        height: 80, 
                        mb: 1,
                        border: '2px solid #1976d2'
                      }}
                      variant="rounded"
                    />
                  )}
                  <Typography variant="body2" sx={{ fontWeight: 'medium', textAlign: 'center' }}>
                    {index + 1}. {pair.word}
                  </Typography>
                </Box>
              );
            })}
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom sx={{ textAlign: 'center', mb: 2 }}>
              Spanish Names
            </Typography>
            {question.matchingPairs?.map((pair, index) => (
              <Box 
                key={index} 
                sx={{ 
                  height: 140,
                  display: 'flex',
                  alignItems: 'center',
                  p: 2,
                  border: '1px solid #e0e0e0',
                  borderRadius: 2,
                  backgroundColor: '#fafafa',
                  mb: 2
                }}
              >
                <FormControl fullWidth size="medium">
                  <InputLabel>Match {pair.word}</InputLabel>
                  <Select
                    value={localAnswers[index] || ''}
                    label={`Match ${pair.word}`}
                    onChange={(e) => handleAnswerChange(index, e.target.value)}
                    sx={{ backgroundColor: 'white' }}
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
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default MatchingQuestion;
