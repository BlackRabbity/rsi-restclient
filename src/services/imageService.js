import axios from 'axios';

const API_URL = 'https://localhost:7043';

export const getImageData = async ({ImageName}) => {
    try {
        const response = await axios.get(`${API_URL}/api/images/${ImageName}`, {
            responseType: 'blob'
        });
        const imageUrl = URL.createObjectURL(response.data);
        return imageUrl;
    } catch (error) {
        console.error('Error fetching data', error);
        throw error;
    }
};