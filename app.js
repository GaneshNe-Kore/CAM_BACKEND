const express = require('express');
const router = require('./router');
const app = express();
// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/', router); // Use '/' instead of './'
module.exports = app;
