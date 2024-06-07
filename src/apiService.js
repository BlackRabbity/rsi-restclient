import axios from 'axios';

const API_URL = 'https://localhost:7043';

export const getCinemaData = async () => {
    try {
        const response = await axios.get(`${API_URL}/api/Cinema`);
        return response.data;
    } catch (error) {
        console.error('Error fetching data', error);
        throw error;
    }
};