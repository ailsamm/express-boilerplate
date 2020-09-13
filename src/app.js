require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const logger = require('./logger');
const { NODE_ENV } = require('./config');
const vegetarianMealsRouter = require('./vegetarianMeals/vegetarian-meals-router');
const poultryMealsRouter = require('./vegetarianMeals/poultry-meals-router');
const redMeatMealsRouter = require('./vegetarianMeals/red-meat-meals-router');
const fishMealsRouter = require('./vegetarianMeals/fish-meals-router');

const app = express();

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());

app.use(function errorHandler(error, req, res, next) {
  let response;
  if (NODE_ENV === 'production') {
    response = { error: { message: 'server error' } };
  } else {
    console.error(error);
    response = { message: error.message, error };
  }
  res.status(500).json(response);
})

app.use('/api/fish', fishMealsRouter);
app.use('/api/poultry', poultryMealsRouter);
app.use('/api/redmeat', redMeatMealsRouter);
app.use('/api/vegetarian', vegetarianMealsRouter);

app.get('/', (req, res) => {
   res.send('Hello, boilerplate!');
})

module.exports = app;
