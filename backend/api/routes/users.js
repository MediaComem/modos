var createError = require('http-errors');
var express = require('express');
var router = express.Router();
const models = require('../models')


router.post('/', function(req, res, next) {
  const user = models.sequelize.model('user');

  user.create(req.body).then((user) => {
    res.status(201).location(`v1/users/${user.id}`).json(user)
  }).catch((error) => {
    if (error instanceof models.Sequelize.ValidationError) {
      next(createError(422));
      // res.status(422)
      // .render('error', { error: error });
    }
  });
});

module.exports = router;
