
const baseUrl = 'http://localhost:8084'
export class ApiService {

  static async get<T>(endpoint: string): Promise<T> {
    try {
      const response = await fetch(`${baseUrl}${endpoint}`);

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API Get Error:', error);
      throw error;
    }
  }

  static async post<T>(endpoint: string, data: any): Promise<T> {
    try {
      const response = await fetch(`${baseUrl}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API Post Error:', error);
      throw error;
    }
  }

  static async put<T>(endpoint: string, data: any): Promise<T> {
    try {
      const response = await fetch(`${baseUrl}${endpoint}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API Put Error:', error);
      throw error;
    }
  }

  static async delete<T>(endpoint: string): Promise<T> {
    try {
      const response = await fetch(`${baseUrl}${endpoint}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API Delete Error:', error);
      throw error;
    }
  }
}
