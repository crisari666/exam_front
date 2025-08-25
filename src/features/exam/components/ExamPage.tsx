import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Box,
  Button,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  LinearProgress,
} from '@mui/material';
import { useGetExamQuestionsQuery, useSubmitExamResultsMutation, useStartExamMutation } from '../examApiSlice';
import {
  startExam,
  setQuestions,
  setAnswer,
  nextQuestion,
  previousQuestion,
  goToQuestion,
  completeExam,
  resetExam,
} from '../examSlice';
import { RootState } from '../../../app/store';
import { ParticipantGuard } from '../../participant/components';
import { selectCurrentParticipant } from '../../participant/participant-slice';
import FillGapQuestion from './FillGapQuestion';
import MultipleChoiceQuestion from './MultipleChoiceQuestion';
import ReadingQuestion from './ReadingQuestion';
import MatchingQuestion from './MatchingQuestion';
import VerbToBeQuestion from './VerbToBeQuestion';
import WritingQuestion from './WritingQuestion';
import ExamInstructions from './ExamInstructions';
import ExamLoadingState from './ExamLoadingState';
import ExamErrorState from './ExamErrorState';
import ExamStartMessage from './ExamStartMessage';
import ExamCompletedState from './ExamCompletedState';

const ExamPage: React.FC = () => {
  const dispatch = useDispatch();
  const { data: questions, isLoading, error } = useGetExamQuestionsQuery();
  const [submitExamResults] = useSubmitExamResultsMutation();
  const [startExamMutation] = useStartExamMutation();
  const examState = useSelector((state: RootState) => state.exam);
  const participant = useSelector(selectCurrentParticipant);
  const [showInstructions, setShowInstructions] = useState(true);
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);
  const [isStartingExam, setIsStartingExam] = useState(false);
  const [startExamMessage, setStartExamMessage] = useState<string | null>(null);
  const [startExamError, setStartExamError] = useState<string | null>(null);
  const stepperContainerRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {    
    if (questions && !examState.questions.length) {
      dispatch(setQuestions(questions));
      // Clear the start exam message once questions are loaded
      setStartExamMessage(null);
    }
  }, [questions, dispatch, examState.questions.length, isLoading, error]);

  useEffect(() => {
    if (stepperContainerRef.current && examState.isStarted) {
      const container = stepperContainerRef.current;
      const stepWidth = 60; // Approximate width of each step
      const containerWidth = container.clientWidth;
      const scrollPosition = (examState.currentQuestionIndex * stepWidth) - (containerWidth / 2) + (stepWidth / 2);
      
      container.scrollTo({
        left: Math.max(0, scrollPosition),
        behavior: 'smooth'
      });
    }
  }, [examState.currentQuestionIndex, examState.isStarted]);

  const handleStartExam = async () => {
    try {
      setStartExamError(null); // Clear any previous errors
      setStartExamMessage(null); // Clear any previous success messages
    
      
      if (!participant?.code) {
        throw new Error('No participant code available');
      }

      if (!participant.id || !participant.name) {
        throw new Error('Participant information is incomplete');
      }

      if (participant.code.trim().length === 0) {
        throw new Error('Participant code is empty');
      }

      // Check if participant has already started an exam (this should be handled by the backend, but we can add a local check)
      if (examState.isStarted) {
        throw new Error('Exam is already started');
      }

      // Check if participant has already completed an exam (this should be handled by the backend, but we can add a local check)
      if (examState.isCompleted) {
        throw new Error('Exam is already completed');
      }

      setIsStartingExam(true);      
      // Call the start exam API first
      const response = await startExamMutation(participant.code).unwrap();
      if (response.examStarted) {
        // Start exam locally only after successful API call
        dispatch(startExam());
        setShowInstructions(false);
        setStartExamMessage(`Exam started successfully for ${response.customer.name} ${response.customer.lastName}`);
      } else {
        throw new Error('Failed to start exam on server');
      }
    } catch (error) {
      console.error('Failed to start exam:', error);
      let errorMessage = 'Failed to start exam. Please try again.';
      
      if (error instanceof Error) {
        if (error.message.includes('fetch')) {
          errorMessage = 'Network error. Please check your internet connection and try again.';
        } else if (error.message.includes('timeout')) {
          errorMessage = 'Request timeout. Please try again.';
        } else {
          errorMessage = error.message;
        }
      } else if (typeof error === 'object' && error !== null && 'status' in error) {
        const status = (error as any).status;
        if (status === 401) {
          errorMessage = 'Unauthorized. Please validate your participant code again.';
        } else if (status === 403) {
          errorMessage = 'Access denied. You may not be eligible to take this exam.';
        } else if (status === 404) {
          errorMessage = 'Participant not found. Please check your code and try again.';
        } else if (status >= 500) {
          errorMessage = 'Server error. Please try again later.';
        } else {
          errorMessage = `Error ${status}: Please try again.`;
        }
      }
      
      setStartExamError(errorMessage);
    } finally {
      setIsStartingExam(false);
    }
  };

  const handleAnswerChange = (questionId: number, answer: string | string[]) => {
    try {
      dispatch(setAnswer({ questionId, answer }));
    } catch (error) {
      console.error('Failed to set answer:', error);
      alert('Session expired. Please validate your participant code again.');
    }
  };

  const handleNext = () => {
    try {
      dispatch(nextQuestion());
    } catch (error) {
      console.error('Failed to navigate to next question:', error);
      alert('Session expired. Please validate your participant code again.');
    }
  };

  const handlePrevious = () => {
    try {
      dispatch(previousQuestion());
    } catch (error) {
      console.error('Failed to navigate to previous question:', error);
      alert('Session expired. Please validate your participant code again.');
    }
  };

  const handleGoToQuestion = (questionIndex: number) => {
    try {
      dispatch(goToQuestion(questionIndex));
    } catch (error) {
      console.error('Failed to navigate to question:', error);
      alert('Session expired. Please validate your participant code again.');
    }
  };

  const handleSubmitExam = async () => {
    try {
      // Calculate exam results
      const totalPoints = examState.totalPoints;
      const totalScore = examState.score;
      const percentage = (totalScore / totalPoints) * 100;
      const passed = percentage >= 65;

      // Create question results map
      const questionResults: Record<number, boolean> = {};
      examState.questions.forEach((question) => {
        const answer = examState.answers[question.id];
        if (answer) {
          // For now, we'll mark as passed if answered (you may want to implement actual scoring logic)
          questionResults[question.id] = true;
        } else {
          questionResults[question.id] = false;
        }
      });

      // Get customer code from participant state (you may need to adjust this based on your participant structure)
      const customerCode = participant?.code || 'PARTICIPANT_CODE'; // This should come from your participant validation

      // Prepare payload for backend
      const examResultPayload = {
        customerCode,
        percentage,
        questionResults,
        totalScore,
        totalPoints,
        passed,
        timestamp: new Date().toISOString(),
      };

      // Send results to backend
      await submitExamResults(examResultPayload).unwrap();

      // Complete exam locally
      dispatch(completeExam());
      setShowSubmitDialog(false);
    } catch (error) {
      console.error('Failed to submit exam results:', error);
      alert('Failed to submit exam results. Please try again.');
    }
  };

  const handleResetExam = () => {
    dispatch(resetExam());
    setShowInstructions(true);
  };

  const renderQuestion = () => {
    if (!examState.questions.length || examState.currentQuestionIndex >= examState.questions.length) {
      return null;
    }

    const currentQuestion = examState.questions[examState.currentQuestionIndex];
    const currentAnswer = examState.answers[currentQuestion.id];

    switch (currentQuestion.type) {
      case 'fill-gap':
        return (
          <FillGapQuestion
            question={currentQuestion}
            answer={currentAnswer as string}
            onAnswerChange={(answer) => handleAnswerChange(currentQuestion.id, answer)}
          />
        );
      case 'multiple-choice':
        return (
          <MultipleChoiceQuestion
            question={currentQuestion}
            answer={currentAnswer as string}
            onAnswerChange={(answer) => handleAnswerChange(currentQuestion.id, answer)}
          />
        );
      case 'reading':
        return (
          <ReadingQuestion
            question={currentQuestion}
            answer={currentAnswer as string}
            onAnswerChange={(answer) => handleAnswerChange(currentQuestion.id, answer)}
          />
        );
      case 'matching':
        return (
          <MatchingQuestion
            question={currentQuestion}
            answer={currentAnswer as string[]}
            onAnswerChange={(answer) => handleAnswerChange(currentQuestion.id, answer)}
          />
        );
      case 'verb-to-be':
        return (
          <VerbToBeQuestion
            question={currentQuestion}
            answer={currentAnswer as string[]}
            onAnswerChange={(answer) => handleAnswerChange(currentQuestion.id, answer)}
          />
        );
      case 'writing':
        return (
          <WritingQuestion
            question={currentQuestion}
            answer={currentAnswer as string}
            onAnswerChange={(answer) => handleAnswerChange(currentQuestion.id, answer)}
          />
        );
      default:
        return <Typography>Question type not supported</Typography>;
    }
  };

  const renderMainExamContent = () => {
    const answeredQuestions = Object.keys(examState.answers).length;
    const progress = (answeredQuestions / examState.questions.length) * 100;

    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Paper sx={{ p: 3, mb: 3 }}>
          <Box sx={{ mb: 2 }}>
            <LinearProgress variant="determinate" value={progress} sx={{ height: 8, borderRadius: 4 }} />
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Progress: {answeredQuestions} / {examState.questions.length} questions answered
            </Typography>
          </Box>
          
          <Box 
            ref={stepperContainerRef}
            sx={{ 
              overflowX: 'auto', 
              '&::-webkit-scrollbar': {
                height: 8,
              },
              '&::-webkit-scrollbar-track': {
                backgroundColor: '#f1f1f1',
                borderRadius: 4,
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: '#c1c1c1',
                borderRadius: 4,
                '&:hover': {
                  backgroundColor: '#a8a8a8',
                },
              },
              mb: 3 
            }}
          >
            <Stepper 
              activeStep={examState.currentQuestionIndex} 
              sx={{ 
                minWidth: 'max-content',
                '& .MuiStep-root': {
                  minWidth: 'auto',
                }
              }}
            >
              {examState.questions.map((_, index) => (
                <Step key={index}>
                  <StepLabel>
                    <Button
                      size="small"
                      onClick={() => handleGoToQuestion(index)}
                      sx={{ 
                        minWidth: 'auto',
                        px: 1,
                        py: 0.5,
                        fontSize: '0.875rem',
                        fontWeight: examState.currentQuestionIndex === index ? 'bold' : 'normal',
                        backgroundColor: examState.currentQuestionIndex === index ? 'primary.main' : 'transparent',
                        color: examState.currentQuestionIndex === index ? 'white' : 'inherit',
                        '&:hover': {
                          backgroundColor: examState.currentQuestionIndex === index ? 'primary.dark' : 'action.hover',
                        }
                      }}
                    >
                      {index + 1}
                    </Button>
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>
        </Paper>

        {renderQuestion()}

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
          <Button
            variant="outlined"
            onClick={handlePrevious}
            disabled={examState.currentQuestionIndex === 0}
          >
            Previous
          </Button>
          
          <Box>
            {examState.currentQuestionIndex < examState.questions.length - 1 ? (
              <Button variant="contained" onClick={handleNext}>
                Next
              </Button>
            ) : (
              <Button
                variant="contained"
                color="success"
                onClick={() => setShowSubmitDialog(true)}
                disabled={answeredQuestions < examState.questions.length}
              >
                Submit Exam
              </Button>
            )}
          </Box>
        </Box>

        <Dialog open={showSubmitDialog} onClose={() => setShowSubmitDialog(false)}>
          <DialogTitle>Submit Exam</DialogTitle>
          <DialogContent>
            <Typography>
              Are you sure you want to submit your exam? You cannot change your answers after submission.
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              You have answered {answeredQuestions} out of {examState.questions.length} questions.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowSubmitDialog(false)}>Cancel</Button>
            <Button onClick={handleSubmitExam} color="success" variant="contained">
              Submit Exam
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    );
  };

  const renderExamContent = () => {
    if (isLoading) {
      return <ExamLoadingState />;
    }

    if (error) {
      return <ExamErrorState error={error} />;
    }

    if (showInstructions) {
      return <ExamInstructions onStart={handleStartExam} isLoading={isStartingExam} error={startExamError} />;
    }

    // Check if exam is started and questions are loaded
    if (examState.isStarted && examState.questions.length > 0) {
      if (examState.isCompleted) {
        return (
          <ExamCompletedState
            score={examState.score}
            totalPoints={examState.totalPoints}
            onResetExam={handleResetExam}
          />
        );
      }
      return renderMainExamContent();
    }

    // Show start message only if exam is started but questions are not yet loaded
    if (startExamMessage && examState.isStarted && examState.questions.length === 0) {
      return <ExamStartMessage message={startExamMessage} />;
    }

    // If we reach here, something is wrong with the state
    return null;
  };

  return (
    <ParticipantGuard>
      {renderExamContent()}
    </ParticipantGuard>
  );
};

export default ExamPage;
