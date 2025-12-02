const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const weatherRoutes = require('./routes/weather');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/weather', weatherRoutes);

app.get('/', (req, res) => {
    res.send('Weather Voice Assistant API is running');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
