const { app } = require('../app');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const { clientPromise } = require('../database');


app.use(session({
  secret: 'uw0sXujULyqKL0tU1m9TghER4BQGMcnV',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: false,
    maxAge: 1000 * 60 * 60 * 24 * 14
  },
  store: MongoStore.create({ mongoUrl: 'mongodb+srv://camille:DS6QDGANnpKJOFwH@cluster0.gvcwc.mongodb.net/twitter?retryWrites=true&w=majority' })
}));

