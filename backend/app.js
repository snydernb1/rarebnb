const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const routes = require('./routes')

const { enviroment } = require('./config');
const isProduction = enviroment === 'production';

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


  module.exports = app;
