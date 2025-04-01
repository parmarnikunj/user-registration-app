import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://onetouchpro.de';

export interface UserData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    gender: string;
}

export interface UserRegistrationResponse {
        registrationNumber: string;
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        address: string;
        city: string;
}

class UserService {
    async register(userData: UserData): Promise<UserRegistrationResponse> {
        try {
            const response = await axios.post(`${API_URL}/user`, userData);
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