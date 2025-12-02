# Weather Voice Assistant 🌤️

A voice-controlled weather assistant built with React and Node.js. The user can ask for weather in any city, and the assistant will respond verbally.

## Approach Followed
This project was built with a focus on simplicity, performance, and user experience:
1.  **Frontend-Backend Separation**:
    -   **React (Vite)** handles the UI and voice interactions for a responsive and fast experience.
    -   **Node.js/Express** serves as a secure backend proxy to handle API keys and data formatting, keeping sensitive credentials off the client side.
2.  **Voice Integration**:
    -   Utilized the **Web Speech API** (native browser standard) for Speech-to-Text (STT) and Text-to-Speech (TTS).
    -   This approach eliminates the need for heavy external libraries or complex server-side voice processing, ensuring low latency.
3.  **API Integration**:
    -   Integrated **WeatherAPI.com** for reliable real-time weather data.
    -   The backend processes the raw API response into a natural language string for the voice assistant to speak.
4.  **Modern Styling**:
    -   Used vanilla CSS with CSS variables and flexbox/grid for a clean, maintainable, and responsive design without the overhead of large CSS frameworks.

## Features
- **Voice Input**: Uses Web Speech API to listen to user queries.
- **Voice Output**: Speaks the weather information back to the user.
- **Real-time Weather**: Fetches data from WeatherAPI.com.
- **Responsive UI**: Clean and modern interface.

## Tech Stack
- **Frontend**: React, Vite, CSS
- **Backend**: Node.js, Express
- **API**: WeatherAPI.com

## Setup Instructions

### Prerequisites
- Node.js installed
- WeatherAPI.com API Key (Free)

### 1. Backend Setup
1. Navigate to the `server` directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure API Key:
   - Open `.env` file.
   - Replace `YOUR_WEATHERAPI_KEY` with your actual API key.
4. Start the server:
   ```bash
   npm start
   ```
   The server will run on `http://localhost:5000`.

### 2. Frontend Setup
1. Open a new terminal and navigate to the `client` directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open the link shown in the terminal (usually `http://localhost:5173`) in your browser.

## Usage
1. Click the **Microphone** button.
2. Say "What's the weather in Mumbai?" or just "Mumbai".
3. The assistant will display the weather and speak the details.

## Troubleshooting
- **Microphone not working**: Ensure your browser supports Web Speech API (Chrome/Edge recommended) and you have granted microphone permissions.
- **API Error**: Check if your OpenWeatherMap API key is valid and added to `server/.env`.
