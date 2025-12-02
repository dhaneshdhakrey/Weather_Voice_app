import React from 'react';
import VoiceInterface from './components/VoiceInterface';
import './index.css';

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Weather Voice Assistant 🌤️</h1>
        <p>Ask me about the weather in any city!</p>
      </header>
      <main>
        <VoiceInterface />
      </main>
    </div>
  );
}

export default App;
