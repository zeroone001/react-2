var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var data = require('./routes/data');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use("/data/swiper", data.swiper);
app.use("/data/otherapp", data.otherapp);
app.use("/data/spike", data.spike);
app.use("/data/more", data.more);
app.use("/data/like", data.like);
app.use("/data/feed", data.feed);
app.get("/data/test", data.test);
app.get("/data/test/download.png", (req, res)=>{
	// if(pathUrl !== '/') {
		res.download(path.join(__dirname, './public/images/like/like6.jpg'), 'like6.jpg', (err)=>{
			if (err) {
				console.log('123', err);
			} else {
				console.log('OKOK');
			}
		});
		// } else {
		// 	next();
		// }
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
