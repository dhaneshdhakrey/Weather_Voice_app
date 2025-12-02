import axios from 'axios';

const API_URL = 'http://localhost:5000/api/weather';

export const getWeather = async (city) => {
    try {
        const response = await axios.get(`${API_URL}/${city}`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Network Error');
    }
};
