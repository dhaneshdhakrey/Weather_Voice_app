const axios = require('axios');

const getWeather = async (city) => {
    try {
        const apiKey = process.env.WEATHERAPI_KEY;
        const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;
        
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.error.message || 'Error fetching weather data');
        }
        throw new Error('Network error or invalid API key');
    }
};

module.exports = { getWeather };
