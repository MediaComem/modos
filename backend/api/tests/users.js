const assert = require('assert');
const supertest = require('supertest')
const app = require('../app');
const models = require('../models');

exports.new_user_should_be_returned_after_being_created = function (done) {
  const userModel = models.sequelize.model('user');
  const newUser = {
    pseudonym: 'testUser',
    email: 'test@user.com',
    password: 'test-password'
  };
  supertest(app)
    .post('/users')
    .set('Content-Type', 'application/json')
    .send(newUser)
    .expect(201)
    .then(res => {
      userModel.findByPk(res.body.id)
        .then(function (user) {
          assert(user.id, res.body.id);
          done();
        })
        .catch(function (err) {
          done(err);
        });
    });
};

exports.user_should_be_returned_according_to_given_id = function (done) {
  const pk = 1;
  supertest(app)
    .get('/users/' + pk)
    .set('Content-Type', 'application/json')
    .send()
    .expect(200)
    .then(res => {
      assert(res.body.id, pk);
      done();
    });
};

exports.user_should_be_updated_according_to_the_given_fields = function (done) {
  const userUpdate = {
    pseudonym: 'myTestPseudo',
    password: '12345'
  };
  const userModel = models.sequelize.model('user');
  const pk = 1;
  supertest(app)
    .put('/users/' + pk)
    .set('Content-Type', 'application/json')
    .send(userUpdate)
    .expect(204)
    .then(res => {
      userModel.findByPk(pk)
        .then(function (user) {
          assert(user.pseudonym, userUpdate.pseudonym);
          assert(user.password, userUpdate.password);
          done();
        })
        .catch(function (err) {
          done(err);
        });
    });
};

exports.given_pk_should_delete_its_user = function (done) {
  const userModel = models.sequelize.model('user');
  const pk = 2;
  supertest(app)
    .delete('/users/' + pk)
    .set('Content-Type', 'application/json')
    .send()
    .expect(204)
    .then(res => {
      userModel.findByPk(pk, { rejectOnEmpty: true })
        .then(function () {
          throw new Error('this primary key should not exist anymore');
        })
        .catch(function (err) {
          if (err instanceof models.Sequelize.EmptyResultError) {
            done();
          } else {
            done(err);
          }
        });
    });
};

exports.user_should_have_access_to_the_events_he_takes_part = function (done) {
  const pk = 1;
  supertest(app)
    .get('/users/' + pk + '/events')
    .set('Content-Type', 'application/json')
    .send()
    .expect(200)
    .then(res => {
      assert(res.body.length !== 0);
      done();
    })
    .catch(function (err) {
      done(err);
    });
};

exports.user_should_have_access_to_its_observations = function (done) {
  const pk = 1;
  supertest(app)
    .get('/users/' + pk + '/observations')
    .set('Content-Type', 'application/json')
    .send()
    .expect(200)
    .then(res => {
      assert(res.body.length !== 0);
      done();
    })
    .catch(function (err) {
      done(err);
    });
};

exports.given_user_should_join_given_event = function (done) {
  const userEventModel = models.sequelize.model('userEvent');
  const pk = 1;
  const eventId = 3;

  supertest(app)
    .post('/users/' + pk + '/join/' + eventId)
    .set('Content-Type', 'application/json')
    .send({})
    .expect(201)
    .then(res => {
      userEventModel.findOne({ where: { userId: pk, eventId: eventId }, rejectOnEmpty: true })
        .then(function (userEvent) {
          assert(userEvent.eventId, eventId);
          done();
        });
    })
    .catch(function (err) {
      done(err);
    })
};
