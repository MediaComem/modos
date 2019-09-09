const createError = require('http-errors');
const models = require('../models')

// catch 404 and forward to error handler
exports.notFound = function (req, res, next) {
  next(createError(404));
};

exports.internalServerError = function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
};

exports.databaseError = function (err, req, res, next) {
  if (err instanceof models.Sequelize.DatabaseError) {
    next(createError(400));
  } else {
    next();
  }
};

exports.emptyResultError = function (err, req, res, next) {
  if (err instanceof models.Sequelize.EmptyResultError) {
    notFound();
  } else {
    next();
  }
};

exports.validationError = function (err, req, res, next) {
  if (err instanceof models.Sequelize.ValidationError) {
    next(createError(422));
  } else {
    next();
  }
};
