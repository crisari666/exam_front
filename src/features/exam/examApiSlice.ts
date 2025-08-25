import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Question } from './examSlice';

// Environment configuration
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/';

// Types for customer validation
export interface CustomerValidationResponse {
  _id: string;
  name: string;
  lastName: string;
  phone: string;
  email: string;
  code: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  examFinishDate: string | null;
  examPassed: boolean | null;
  examPercentage: number | null;
  examQuestionResults: Record<number, boolean> | null;
  examTotalPoints: number | null;
  examTotalScore: number | null;
  isExamCompleted: boolean;
  examStartDate: string | null;
}

// Types for exam results
export interface ExamResultPayload {
  customerCode: string;
  percentage: number;
  questionResults: Record<number, boolean>; // questionId -> passed/failed
  totalScore: number;
  totalPoints: number;
  passed: boolean;
  timestamp: string;
}

// Types for start exam
export interface StartExamResponse {
  customer: CustomerValidationResponse;
  examStarted: boolean;
}

export interface ExamResultResponse {
  _id: string;
  name: string;
  lastName: string;
  phone: string;
  email: string;
  code: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  examFinishDate: string;
  examPassed: boolean;
  examPercentage: number;
  examQuestionResults: Record<number, boolean>;
  examTotalPoints: number;
  examTotalScore: number;
  isExamCompleted: boolean;
  examStartDate: string;
}

export const examApiSlice = createApi({
  reducerPath: 'examApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // Validate customer code and check if exam is already completed
    validateCustomerCode: builder.query<CustomerValidationResponse | null, string>({
      query: (code) => `customers/code/${code}`,
      // The response includes exam status information
    }),
    
    // Get exam questions from backend API
    getExamQuestions: builder.query<Question[], void>({
      query: () => 'customers/exam-questions',
      transformResponse: (response: Question[]) => {
        console.log('ExamAPI: Fetched questions from backend:', response.length, 'questions');
        return response;
      },
      transformErrorResponse: (response: any) => {
        console.error('ExamAPI: Error fetching questions:', response);
        return response;
      },
      // Add timeout and retry logic
      keepUnusedDataFor: 300, // Keep data for 5 minutes
    }),
    
    // Submit exam results
    submitExamResults: builder.mutation<ExamResultResponse, ExamResultPayload>({
      query: (examResult) => ({
        url: 'customers/finish-exam',
        method: 'POST',
        body: examResult,
      }),
    }),

    // Start exam
    startExam: builder.mutation<StartExamResponse, string>({
      query: (code) => ({
        url: 'customers/start-exam',
        method: 'POST',
        body: { customerCode: code },
      }),
    }),
  }),
});

export const { 
  useValidateCustomerCodeQuery, 
  useGetExamQuestionsQuery, 
  useSubmitExamResultsMutation,
  useStartExamMutation
} = examApiSlice;
