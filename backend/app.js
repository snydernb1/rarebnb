const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const routes = require('./routes')

const { environment } = require('./config');
const { HostNotFoundError } = require('sequelize');
const isProduction = environment === 'production';
const { ValidationError } = require('sequelize');

const app = express();

app.use(morgan('dev')); // logs information about requests and responses

app.use(cookieParser());
app.use(express.json());

// Security Middleware -------------------------------------
if (!isProduction) {
    app.use(cors()); // only use cors in development since in production React and Express resources will come from the same origin
}

// helmet helps set a variety of headers to better secure your app
app.use(
    helmet.crossOriginResourcePolicy({
      policy: "cross-origin"
    })
  );

  // Set the _csrf token and create req.csrfToken method
  app.use(
    csurf({
      cookie: {
        secure: isProduction,
        sameSite: isProduction && "Lax",
        httpOnly: true
      }
    })
  );

  app.use(routes); // all routes go here



  // Error Handlers ----------------------------------------------
  app.use((req, res, next) => {
    const err = new Error(`The requested resource couldn't be found.`);
    err.title = "Resource Not Found";
    err.errors = { message: `The requested resource couldn't be found.`};
    err.status = 404;
    next(err);
  });

  // for catching sequelize errors
  app.use((err, req, res, next) => {
    if (err instanceof ValidationError) {
      let errors = {};
      for (let error of err.errors) {
        errors[error.path] = error.message;
      }
      err.title = 'Validation error';
      err.errors = errors;
    }
    console.log('=======================> Are we hitting the formatter?', err)
    next(err);
  });


  // for formatting all errors
  app.use((err, req, res, next) => {

    res.status(err.status || 500);
    console.error(err);
    console.log('==================> are we getting into the final error return ?', err)
    return res.json({
      title: err.title || 'Server Error',
      message: err.message,
      errors: err.errors,
      stack: isProduction ? null : err.stack
    });
  });


  module.exports = app;
