# Exam Results API Endpoint

## Endpoint Details

**URL:** `POST /api/exam/results`

**Purpose:** Submit exam results to the backend system

## Request Payload

```typescript
interface ExamResultPayload {
  customerCode: string;           // Participant's unique code
  percentage: number;             // Exam score percentage (0-100)
  questionResults: Record<number, boolean>; // Map of questionId -> passed/failed
  totalScore: number;             // Total points earned
  totalPoints: number;            // Total possible points
  passed: boolean;                // Whether exam was passed (≥65%)
  timestamp: string;              // ISO timestamp of submission
}
```

### Example Payload

```json
{
  "customerCode": "ABC123",
  "percentage": 75.0,
  "questionResults": {
    "1": true,
    "2": true,
    "3": false,
    "4": true,
    "5": true
  },
  "totalScore": 15,
  "totalPoints": 20,
  "passed": true,
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

## Response Format

```typescript
interface ExamResultResponse {
  success: boolean;               // Whether submission was successful
  message: string;                // Human-readable message
  examId?: string;               // Unique identifier for the exam submission
  timestamp: string;              // Server timestamp of response
}
```

### Example Response

```json
{
  "success": true,
  "message": "Exam results submitted successfully",
  "examId": "EXAM_1705312200000",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

## Implementation Notes

1. **Question Results Mapping**: The `questionResults` object maps each question ID to a boolean indicating whether the participant answered correctly.

2. **Scoring Logic**: Currently, questions are marked as "passed" if they have an answer. You may want to implement actual answer validation logic on the backend.

3. **Customer Code**: This should match the participant code used during validation.

4. **Timestamp**: Both request and response include ISO 8601 timestamps for tracking.

5. **Error Handling**: The endpoint should return appropriate HTTP status codes and error messages for various failure scenarios.

## Backend Implementation Considerations

- Validate the customer code against existing participants
- Store exam results in a database with proper indexing
- Implement proper error handling for invalid data
- Consider adding rate limiting to prevent spam submissions
- Log all submissions for audit purposes
- Implement proper authentication/authorization if needed
