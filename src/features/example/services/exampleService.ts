type ApiResponse<T> = {
  data: T;
  success: boolean;
  message: string;
};

type User = {
  id: number;
  name: string;
  email: string;
};

export class ExampleService {
  private static readonly baseUrl = 'https://api.example.com';

  static async fetchUsers(): Promise<ApiResponse<User[]>> {
    try {
      const response = await fetch(`${this.baseUrl}/users`);
      const data = await response.json();
      
      return {
        data,
        success: true,
        message: 'Users fetched successfully',
      };
    } catch (error) {
      return {
        data: [],
        success: false,
        message: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  static async createUser(user: Omit<User, 'id'>): Promise<ApiResponse<User>> {
    try {
      const response = await fetch(`${this.baseUrl}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
      
      const data = await response.json();
      
      return {
        data,
        success: true,
        message: 'User created successfully',
      };
    } catch (error) {
      return {
        data: {} as User,
        success: false,
        message: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }
}
