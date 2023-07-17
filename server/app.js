const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const http = require('http')
const indexRouter = require('./routes/index');

const app = express();
const port = process.env.PORT || 3003

const { connectDB } = require( './db' )

app.use(express.static(path.join(__dirname, '../client/build')));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter); 

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

const server = http.createServer(app)

connectDB( cb => {
  server.listen(port, () => console.log(`TTP-stock server listening on port ${port}!`))
})

module.exports = app;
