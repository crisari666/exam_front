// Environment configuration
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

console.log('BASE_URL', BASE_URL);

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

// Backend customer validation response type
interface BackendCustomerResponse {
  _id: string;
  code: string;
  email: string;
  name: string;
  lastName: string;
  phone: string;
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
export class ParticipantService {
  static async validateCode(request: CodeValidationRequest): Promise<CodeValidationResponse> {
    try {      
      const response = await fetch(`${BASE_URL}customers/code/${request.code}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 404) {
        // Customer not found or exam already completed
        return {
          success: false,
          error: 'Invalid code or exam already completed. Please check and try again.'
        };
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: BackendCustomerResponse = await response.json();

      
      if (!data || !data.code) {
        return {
          success: false,
          error: 'Invalid response from server. Please try again.'
        };
      }

      // Check if exam is already completed
      if (data.isExamCompleted) {
        return {
          success: false,
          error: 'You have already completed this exam. You cannot take it again.'
        };
      }

      // Check if exam is already started
      // if (data.examStartDate && !data.examFinishDate) {
      //   return {
      //     success: false,
      //     error: 'You have already started this exam. Please continue from where you left off.'
      //   };
      // }

      // Create participant object from backend response
      const participant: Participant = {
        id: data._id, // Using the actual _id from backend
        name: `${data.name} ${data.lastName}`, // Combine name and lastName
        email: data.email,
        contact: data.phone,
        code: data.code,
      };

      return {
        success: true,
        participant
      };
    } catch (error) {
      console.error('Error validating participant code:', error);
      return {
        success: false,
        error: 'Network error. Please check your connection and try again.'
      };
    }
  }
  
  static async getParticipantById(id: string): Promise<Participant | null> {
    try {
      const response = await fetch(`${BASE_URL}customers/code/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        return null;
      }

      const data: BackendCustomerResponse = await response.json();
      
      if (!data || !data.code) {
        return null;
      }

      // Check if exam is already completed
      if (data.isExamCompleted) {
        return null;
      }

      // Check if exam is already started
      if (data.examStartDate && !data.examFinishDate) {
        return null;
      }

      // Create participant object from backend response
      const participant: Participant = {
        id: data._id,
        name: `${data.name} ${data.lastName}`,
        email: data.email,
        contact: data.phone,
        code: data.code,
      };

      return participant;
    } catch (error) {
      console.error('Error getting participant by ID:', error);
      return null;
    }
  }
}
