const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');  // Uvođenje cors-a
const authRoutes = require('./routes/authRoutes');
const calendarRoutes = require('./routes/calendarRoutes');

dotenv.config();

const app = express();
app.use(cors()); 
app.use(express.json());

// Rute
app.use('/api/auth', authRoutes);
app.use('/api/calendar', calendarRoutes);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(5000, () => {
            console.log('Server is running on port 5000');
        });
    })
    .catch((err) => console.error('Database connection error', err));
