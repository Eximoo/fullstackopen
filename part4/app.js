const config = require('./utils/config.js');
const express = require('express');
require('express-async-errors');
const app = express();
const mongoose = require('mongoose');
const blogsRouter = require('./controllers/blogs.js');
const middleware = require('./utils/middleware');
const logger = require('./utils/logger.js');

logger.info('connecting to', config.MONGODB_URI);
mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB');
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message);
  });

app.use(express.json());
app.use(middleware.requestLogger);
app.use('/api/blogs', blogsRouter);
app.use(middleware.unknownEndpoint);

app.use(middleware.errorHandler);
module.exports = app;
