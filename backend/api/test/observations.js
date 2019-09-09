const assert = require('assert');
const supertest = require('supertest')
const app = require('../app');
const models = require('../models');

exports.new_observation_should_be_returned_after_being_created = function(done) {
  const observationModel = models.sequelize.model('observation');
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
  .expect(200)
  .then(res => {
    assert(res.body.length !== 0);
    done()
  }).catch(function(err) {
    done(err);
  });
};

exports.observation_should_give_its_details = function(done) {
  const pk = 1;
  supertest(app)
  .get('/observations/' + pk)
  .set('Content-Type', 'application/json')
  .send()
  .expect(200)
  .then(res => {
    assert(res.body.id, pk); 
    done();
  });
};

exports.observation_should_be_updated_according_to_given_fields = function(done) {
  const observationModel = models.sequelize.model('observation');
  const observationUpdate = {
    eventId: 1
  };
  const pk = 1;
  
  supertest(app)
  .put('/observations/' + pk)
  .set('Content-Type', 'application/json')
  .send(observationUpdate)
  .expect(204)
  .then(res => {
    observationModel.findByPk(pk).then(function(observation) {
      assert(observation.eventId, observationUpdate.eventId);
      done();
    }).catch(function(err) {
      done(err);
    });
  })
};

exports.given_pk_should_delete_its_observation = function(done) {
  const observationModel = models.sequelize.model('observation');
  const pk = 1;
  supertest(app)
  .delete('/observations/' + pk)
  .set('Content-Tape', 'application/json')
  .send()
  .expect(204)
  .then(res => {
    observationModel.findByPk(pk, { rejectOnEmpty: true }).then(function() {
      throw new Error('this primary key should not exist anymore');
    }).catch(function(err) {
      if (err instanceof models.Sequelize.EmptyResultError) {
        done();
      } else {
        done(err);
      }
    });
  });
};