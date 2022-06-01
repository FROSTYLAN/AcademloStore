const express = require('express');
const rateLimit = require('express-rate-limit');

const app = express();

// Enable incoming JSON data
app.use(express.json());

// Limit IP requests
const limiter = rateLimit({
  max: 10000,
  windowMs: 1 * 60 * 60 * 1000, // 1 hr
  message: 'Too many requests from this IP',
});

app.use(limiter);

// Global error handler
app.use('*', globalErrorHandler);

module.exports = { app };
