// /api/index.js
const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const cookieParser = require('cookie-parser');

// CORS configuration
const corsOptions = {
  origin: ['http://localhost:3000', 'https://project-alumni.vercel.app'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin']
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

const { connectDB } = require('../db');

(async () => {
  try {
    await connectDB();
    app.use('/user/auth', require('../Routes/Auth'));
    app.use('/user/data', require('../Routes/Data'));
  } catch (error) {
    console.error('Error connecting to database:', error);
  }
});

// Error-handling middleware
app.use((err, req, res, next) => {
  console.error('Internal Server Error:', err);
  res.status(500).send('Something went wrong!');
});

// Export the express app as a handler for serverless functions
module.exports = app;