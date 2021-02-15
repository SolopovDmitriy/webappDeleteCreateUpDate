var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var eventRouter = require('./routes/event');                                                        /////

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'client/build')));

app.use('/', indexRouter);
app.use('/event', eventRouter);                                                                  /////

app.get('/navigationmaps', function (req, res, next) {
    const Sections = [
      {title:"Приемы", href:'/appointments', src:'/saldkjfnskdjfnsd.jpg'},
      {title:"События", href:'/events'},
      {title:"Оповещения", href:'/notifications'},
      {title:"Клиенты", href:'/clients'},
      {title:"Сотрудники", href:'/employees'},
      {title:"Личный кабинет", href:'/users'}
    ];
    res.json(Sections);
});




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);

});

module.exports = app;
