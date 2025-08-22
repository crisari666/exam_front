export interface Participant {
  id: string;
  name: string;
  email: string;
  contact: string;
  code: string;
}

export interface CodeValidationRequest {
  code: string;
}

export interface CodeValidationResponse {
  success: boolean;
  participant?: Participant;
  error?: string;
}

// Mock data for development
const mockParticipants: Participant[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    contact: '+1-555-0123',
    code: 'ABC123'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    contact: '+1-555-0456',
    code: 'DEF456'
  },
  {
    id: '3',
    name: 'Bob Johnson',
    email: 'bob.johnson@example.com',
    contact: '+1-555-0789',
    code: 'GHI789'
  }
];

export class ParticipantService {
  static async validateCode(request: CodeValidationRequest): Promise<CodeValidationResponse> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const participant = mockParticipants.find(p => p.code === request.code);
    
    if (!participant) {
      return {
        success: false,
        error: 'Invalid code. Please check and try again.'
      };
    }
    
    return {
      success: true,
      participant
    };
  }
  
  static async getParticipantById(id: string): Promise<Participant | null> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const participant = mockParticipants.find(p => p.id === id);
    return participant || null;
  }
}
