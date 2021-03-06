var express = require("express");
var path = require("path");
// var favicon = require("serve-favicon");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var dotenv = require("dotenv");
var routes = require("./routes/index");
var mongoose = require('mongoose');
var session = require('cookie-session');
var app = express();


// configure environment variables
if (app.get("env") == "development") {
  dotenv.config();
 }

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, "public", "favicon.ico")));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());


var keys = ['keyboard', 'cat'];
if (process.env.COOKIE_KEY1 && process.env.COOKIE_KEY2) {
    keys = [process.env.COOKIE_KEY1, process.env.COOKIE_KEY2];
}
// 1 hour
var expiryDate = new Date(Number(Date.now()) + 3600000);
app.use(session({
    secret: process.env.COOKIE_SECRET || 'secret',
    keys,
    cookie: {
        secure: true,
        expires: expiryDate
    }
}));


// set up message flashing
app.use(require('connect-flash')());
app.use(function (req, res, next) {
    res.locals.messages = require('express-messages')(req, res);
    next();
});

mongoose.connect(process.env.MONGO_URI);
app.use("/", routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get("env") === "development") {
  app.use(function(err, req, res) {
    res.status(err.status || 500);
    res.render("error", {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res) {
  res.status(err.status || 500);
  res.render("error", {
    message: err.message,
    error: {}
  });
});


module.exports = app;
