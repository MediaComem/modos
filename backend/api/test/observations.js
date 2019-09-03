const assert = require('assert');
const supertest = require('supertest')
const app = require('../app');
const models = require('../models');

const observationModel = models.sequelize.model('observation');

exports.new_observation_should_be_returned_after_being_created = function(done) {
  const newObservation = {
    userId: 1
  }
  
  supertest(app)
  .post('/observations')
  .set('Content-Type', 'application/json')
  .send(newObservation)
  .expect(201)
  .then(res => {
    observationModel.findByPk(res.body.id, { rejectOnEmpty: true }).then(function(observation) {
      assert(observation.id, res.body.id);
      done();
    }).catch(function(err) {
      done(err);
    });
  });
};

exports.all_observations_should_be_searchable = function(done) {
  supertest(app)
  .get('/observations')
  .set('Content-Type', 'application/json')
  .send()
  .expect(200, done);
};

exports.observation_should_give_its_details = function(done) {
  const pk = 1;
  supertest(app)
  .get('/observations/' + pk)
  .set('Content-Type', 'application/json')
  .send()
  .expect(200, done)
};