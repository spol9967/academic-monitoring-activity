var createError = require('http-errors');
var express = require('express');
var exphbs = require('express-handlebars');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var expressValidator = require('express-validator')
var LocalStrategy = require('passport-local').Strategy;
var multer = require('multer');
var upload = multer({ dest: './uploads' })
var flash = require('connect-flash');
var mongo = require('mongodb');
var mongoose = require('mongoose');
var db = mongoose.Connection;
var nodemailer = require("nodemailer");
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin');

var app = express();


// view engine setup
app.engine('hbs', exphbs({
  extname: 'hbs',
  defaultView: 'layout',
  layoutsDir: __dirname + '/views/layouts/',
  partialsDir: __dirname + '/views/partials/'
}));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

//Handle session
app.use(cookieParser());
app.use(session({
  secret: 'secret',
  saveUninitialized: false,
  resave: true
}))

// passport
app.use(passport.initialize());
app.use(passport.session());


//validator
app.use(expressValidator({
  errorFormatter: function (param, msg, value) {
    var namespace = param.split('.')
      , root = namespace.shift()
      , formParam = root;

    while (namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param: formParam,
      msg: msg,
      value: value
    };
  }
}));

app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin', adminRouter);

// var options = { dotfiles: 'ignore', etag: false,
// extensions: ['htm', 'html'],
// index: false
// };

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



app.listen(app.get('port'), function () {
  console.log('started TEAM server at http://localhost:' + app.get('port'));
})


module.exports = app;
