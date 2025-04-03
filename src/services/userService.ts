import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

export interface User {
  registrationNumber: string,
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  gender: string;
  birthdate: string | null;
}

export interface UserData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    gender: string;
    birthdate: string | null;
}

export interface RegisterResponse {
    success: boolean;
    message: string;
    user?: User;
}

class UserService {
    async register(userData: UserData): Promise<RegisterResponse> {
        try {
            const response = await axios.post(`${API_URL}/user/register`, userData);
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.message || 'Registration failed');
            }
            throw new Error('An unexpected error occurred');
        }
    }

    getRegistrationLink = (registrationNumber: string) => {
        return `${API_URL}/registration/${registrationNumber}`
    }
}

export const userService = new UserService(); 