const express = require('express');

const app = express();

// Enable incoming JSON data
app.use(express.json());

module.exports = { app };
