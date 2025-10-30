import axios from 'axios';

const BASE_URL =
    process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000/api'
        : 'https://your-production-api.com/api';

class ApiService {
    constructor() {
        this.api = axios.create({
            baseURL: BASE_URL,
            timeout: 30000,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        this.api.interceptors.request.use(
            (config) => {
                console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
                return config;
            },
            (error) => {
                console.error('API Request Error:', error);
                return Promise.reject(error);
            }
        );

        this.api.interceptors.response.use(
            (response) => {
                console.log(`API Response: ${response.status} ${response.config.url}`);
                return response;
            },
            (error) => {
                console.error('API Response Error:', error.response?.data || error.message);

                if (error.code === 'ECONNABORTED') {
                    throw new Error('Request timeout. Please check your internet connection.');
                }

                if (!error.response) {
                    throw new Error('Network error. Please check your internet connection.');
                }

                const { status, data } = error.response;

                switch (status) {
                    case 400:
                        throw new Error(data.message || 'Invalid request');
                    case 404:
                        throw new Error('Service not found');
                    case 429:
                        throw new Error('Too many requests. Please try again later.');
                    case 500:
                        throw new Error('Server error. Please try again later.');
                    default:
                        throw new Error(data.message || 'Something went wrong');
                }
            }
        );
    }

    async healthCheck() {
        try {
            const response = await this.api.get('/health');
            return response.data.success;
        } catch (error) {
            console.error('Health check failed:', error);
            return false;
        }
    }

    async getQuestions(language) {
        try {
            const response = await this.api.get('/questions', { params: { language } });

            if (!response.data.success) {
                throw new Error(response.data.message || 'Failed to fetch questions');
            }

            return response.data.data;
        } catch (error) {
            console.error('Error fetching questions:', error);
            throw error;
        }
    }

    async getQuestion(id, language) {
        try {
            const response = await this.api.get(`/questions/${id}`, { params: { language } });

            if (!response.data.success) {
                throw new Error(response.data.message || 'Failed to fetch question');
            }

            return response.data.data;
        } catch (error) {
            console.error('Error fetching question:', error);
            throw error;
        }
    }

    async sendMessage(request) {
        try {
            const response = await this.api.post('/chat', request);

            if (!response.data.success) {
                throw new Error(response.data.message || 'Failed to send message');
            }

            return response.data.data;
        } catch (error) {
            console.error('Error sending message:', error);
            throw error;
        }
    }

    async addQuestion(questionData) {
        try {
            const response = await this.api.post('/admin/questions', questionData);

            if (!response.data.success) {
                throw new Error(response.data.message || 'Failed to add question');
            }

            return response.data.data;
        } catch (error) {
            console.error('Error adding question:', error);
            throw error;
        }
    }

    async updateQuestion(id, questionData) {
        try {
            const response = await this.api.put(`/admin/questions/${id}`, questionData);

            if (!response.data.success) {
                throw new Error(response.data.message || 'Failed to update question');
            }

            return response.data.data;
        } catch (error) {
            console.error('Error updating question:', error);
            throw error;
        }
    }

    async deleteQuestion(id) {
        try {
            const response = await this.api.delete(`/admin/questions/${id}`);

            if (!response.data.success) {
                throw new Error(response.data.message || 'Failed to delete question');
            }
        } catch (error) {
            console.error('Error deleting question:', error);
            throw error;
        }
    }
}

export const apiService = new ApiService();
