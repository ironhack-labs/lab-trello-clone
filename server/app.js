require("dotenv").config();
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

app.use(cors());

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

mongoose.Promise = Promise;
mongoose
  .connect(process.env.MONGODB_URI, { useMongoClient: true })
  .then(() => {
    console.log("Connected to Mongo!");
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

app.set('view engine', 'jade');

require('./routes')(app);


app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
