const express = require('express');
const morgan = require('morgan');
const path = require('path');
const index = require('./routes');
const errorHandler = require('errorHandler');
require('./database');

const app = express();
const port = process.env.PORT || 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug')

app.use(morgan('short'));
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(index);

console.log('NODE_ENV='+process.env.NODE_ENV)

if (process.env.NODE_ENV === 'development') {
  app.use(errorHandler);
} else {
  app.use((err, req, res, next) => {
    const code = err.code;
    res.status(code || 500).json({
      code: code || 500,
      message: code === 500 ? null : err.message
    })
  })
}

app.listen(port);