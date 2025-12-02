import React, { useState, useEffect, useRef } from 'react';
import { getWeather } from '../services/api';

const VoiceInterface = () => {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [response, setResponse] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState('');
    const [isSpeaking, setIsSpeaking] = useState(false);

    const recognitionRef = useRef(null);
    const synthRef = useRef(window.speechSynthesis);

    useEffect(() => {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.continuous = false;
            recognitionRef.current.interimResults = false;
            recognitionRef.current.lang = 'en-US';

            recognitionRef.current.onstart = () => {
                setIsListening(true);
                setError('');
            };

            recognitionRef.current.onend = () => {
                setIsListening(false);
            };

            recognitionRef.current.onresult = async (event) => {
                const text = event.results[0][0].transcript;
                setTranscript(text);
                processQuery(text);
            };

            recognitionRef.current.onerror = (event) => {
                setError('Error occurred in recognition: ' + event.error);
                setIsListening(false);
            };
        } else {
            setError('Browser does not support speech recognition.');
        }
    }, []);

    const processQuery = async (text) => {
        let city = text;
        const match = text.match(/weather in ([a-zA-Z\s]+)/i);
        if (match && match[1]) {
            city = match[1].trim();
        } else {
            city = city.replace(/what's|what is|the|weather|in|like|today|tomorrow/gi, '').trim();
        }

        if (!city) {
            speak("I didn't catch the city name. Please try again.");
            return;
        }

        try {
            setResponse(`Checking weather for ${city}...`);
            const data = await getWeather(city);
            setWeatherData(data);
            setResponse(data.responseText);
            speak(data.responseText);
        } catch (err) {
            const msg = err.message || 'Could not fetch weather.';
            setError(msg);
            setResponse(msg);
            speak(msg);
        }
    };

    const speak = (text) => {
        if (synthRef.current.speaking) {
            synthRef.current.cancel();
        }
        
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        synthRef.current.speak(utterance);
    };

    const toggleListening = () => {
        if (isListening) {
            recognitionRef.current.stop();
        } else {
            recognitionRef.current.start();
        }
    };

    return (
        <div className="voice-interface">
            <div className="status-indicator">
                {isListening ? (
                    <div className="listening-pulse">Listening...</div>
                ) : (
                    <div className="idle-status">Tap microphone to speak</div>
                )}
            </div>

            <button 
                className={`mic-button ${isListening ? 'active' : ''}`}
                onClick={toggleListening}
                disabled={!!error && error.includes('Browser does not support')}
            >
                {isListening ? '🛑' : '🎤'}
            </button>

            {transcript && (
                <div className="transcript-box">
                    <p>You said: "{transcript}"</p>
                </div>
            )}

            {response && (
                <div className="response-box">
                    <p>{response}</p>
                </div>
            )}

            {weatherData && (
                <div className="weather-card">
                    <h2>{weatherData.city}, {weatherData.region}</h2>
                    <div className="temp">{weatherData.temp}°C</div>
                    <div className="desc">{weatherData.description}</div>
                    <div className="details">
                        <span>Humidity: {weatherData.raw.current.humidity}%</span>
                        <span>Wind: {weatherData.raw.current.wind_kph} km/h</span>
                    </div>
                </div>
            )}

            {error && <div className="error-message">{error}</div>}
        </div>
    );
};

export default VoiceInterface;
