const express = require('express');
const router = express.Router();
const { getWeather } = require('../services/weatherService');

router.get('/:city', async (req, res) => {
    try {
        const city = req.params.city;
        if (!city) {
            return res.status(400).json({ error: 'City name is required' });
        }

        const weatherData = await getWeather(city);
        
        // Format the response for the voice agent (WeatherAPI.com structure)
        const description = weatherData.current.condition.text;
        const temp = Math.round(weatherData.current.temp_c);
        const feelsLike = Math.round(weatherData.current.feelslike_c);
        const humidity = weatherData.current.humidity;
        const cityParams = weatherData.location.name;
        const region = weatherData.location.region;
        
        const responseText = `The weather in ${cityParams} is currently ${description} with a temperature of ${temp} degrees Celsius. It feels like ${feelsLike} degrees. Humidity is at ${humidity} percent.`;

        res.json({
            city: cityParams,
            region,
            temp,
            description,
            responseText,
            raw: weatherData
        });
    } catch (error) {
        console.error('Weather API Error:', error.message);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
