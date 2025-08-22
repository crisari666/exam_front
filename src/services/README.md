# Services

This directory contains all the service layer implementations for the application.

## Participant Service

The `participant-service.ts` file contains the service for managing participant authentication and validation.

### Features

- **Code Validation**: Validates participant access codes
- **Mock Data**: Currently uses mock data for development (backend not yet implemented)
- **Type Safety**: Full TypeScript support with proper interfaces

### Usage

```typescript
import { ParticipantService } from '../services/participant-service';

// Validate a participant code
const response = await ParticipantService.validateCode({ code: 'ABC123' });

if (response.success) {
  const participant = response.participant;
  console.log(`Welcome ${participant.name}!`);
} else {
  console.error(response.error);
}
```

### Mock Data

For development purposes, the service includes mock participants:

- **ABC123**: John Doe (john.doe@example.com)
- **DEF456**: Jane Smith (jane.smith@example.com)  
- **GHI789**: Bob Johnson (bob.johnson@example.com)

### Backend Integration

When the backend is ready, simply replace the mock implementation in the service methods with actual API calls. The interface contracts will remain the same, ensuring seamless integration.

### Interfaces

- `Participant`: Participant information structure
- `CodeValidationRequest`: Request payload for code validation
- `CodeValidationResponse`: Response from code validation
