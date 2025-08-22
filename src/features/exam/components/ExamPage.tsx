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
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  LinearProgress,
} from '@mui/material';
import { useGetExamQuestionsQuery } from '../examApiSlice';
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
import FillGapQuestion from './FillGapQuestion';
import MultipleChoiceQuestion from './MultipleChoiceQuestion';
import ReadingQuestion from './ReadingQuestion';
import MatchingQuestion from './MatchingQuestion';
import VerbToBeQuestion from './VerbToBeQuestion';
import WritingQuestion from './WritingQuestion';
import ExamInstructions from './ExamInstructions';
import { AppHeader } from '../../../shared/components';

const ExamPage: React.FC = () => {
  const dispatch = useDispatch();
  const { data: questions, isLoading, error } = useGetExamQuestionsQuery();
  const examState = useSelector((state: RootState) => state.exam);
  const [showInstructions, setShowInstructions] = useState(true);
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);

  useEffect(() => {
    if (questions && !examState.questions.length) {
      dispatch(setQuestions(questions));
    }
  }, [questions, dispatch, examState.questions.length]);

  const handleStartExam = () => {
    dispatch(startExam());
    setShowInstructions(false);
  };

  const handleAnswerChange = (questionId: number, answer: string | string[]) => {
    dispatch(setAnswer({ questionId, answer }));
  };

  const handleNext = () => {
    dispatch(nextQuestion());
  };

  const handlePrevious = () => {
    dispatch(previousQuestion());
  };

  const handleGoToQuestion = (questionIndex: number) => {
    dispatch(goToQuestion(questionIndex));
  };

  const handleSubmitExam = () => {
    dispatch(completeExam());
    setShowSubmitDialog(false);
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

  if (isLoading) {
    console.log('ExamPage: Rendering loading state');
    return (
      <>
        <AppHeader />
        <Container maxWidth="lg" sx={{ mt: 4 }}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="h6" sx={{ mt: 2 }}>
              Loading exam...
            </Typography>
          </Box>
          <LinearProgress />
        </Container>
      </>
    );
  }

  if (error) {
    return (
      <>
        <AppHeader />
        <Container maxWidth="lg" sx={{ mt: 4 }}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="h6" sx={{ mt: 2 }}>
              Error loading exam
            </Typography>
          </Box>
          <Alert severity="error">
            Error loading exam. Please try again later.
          </Alert>
        </Container>
      </>
    );
  }

  if (showInstructions) {
    console.log('ExamPage: Rendering instructions state');
    return <ExamInstructions onStart={handleStartExam} />;
  }

  if (examState.isCompleted) {
    const percentage = (examState.score / examState.totalPoints) * 100;
    const isPassed = percentage >= 65;

    return (
      <>
        <AppHeader />
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
                Score: {examState.score} / {examState.totalPoints} points
              </Typography>
              <Typography variant="h6" color="text.secondary">
                Percentage: {percentage.toFixed(1)}%
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Passing score: 65%
              </Typography>
            </Box>
            
            <Button variant="contained" onClick={handleResetExam} sx={{ mr: 2 }}>
              Take Exam Again
            </Button>
          </Paper>
        </Container>
      </>
    );
  }

  if (!examState.isStarted || !examState.questions.length) {
    console.log('ExamPage: Exam not started or no questions');
    return null;
  }

  const answeredQuestions = Object.keys(examState.answers).length;
  const progress = (answeredQuestions / examState.questions.length) * 100;

  console.log('ExamPage: Rendering main exam state');

  return (
    <>
      <AppHeader />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Paper sx={{ p: 3, mb: 3 }}>
          <Box sx={{ mb: 2 }}>
            <LinearProgress variant="determinate" value={progress} sx={{ height: 8, borderRadius: 4 }} />
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Progress: {answeredQuestions} / {examState.questions.length} questions answered
            </Typography>
          </Box>
          
          <Stepper activeStep={examState.currentQuestionIndex} sx={{ mb: 3 }}>
            {examState.questions.map((_, index) => (
              <Step key={index}>
                <StepLabel>
                  <Button
                    size="small"
                    onClick={() => handleGoToQuestion(index)}
                    sx={{ minWidth: 'auto' }}
                  >
                    {index + 1}
                  </Button>
                </StepLabel>
              </Step>
            ))}
          </Stepper>
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
    </>
  );
};

export default ExamPage;
