require('dotenv').config();
const errorMiddleware = require('./src/middlewares/error.middleware');

const express = require('express')
const app = express()

app.use(express.json());

require('./src/routes/api')(app);

// Error Handler Middleware
app.use(errorMiddleware);

module.exports = app
