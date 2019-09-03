const assert = require('assert');
const supertest = require('supertest')
const app = require('../app');
const models = require('../models');


exports.new_event_should_add_its_owner_as_a_participant = function(done) {
  const userEventModel = models.sequelize.model('userEvent');
  const newEvent = {
    userId: 1,
    beginning: new Date(),
    ending: new Date(),
    objective: 'testing the creation of a new event'
  };

  supertest(app)
  .post('/events')
  .set('Content-Type', 'application/json')
  .send(newEvent)
  .expect(201)
  .then(res => {
    userEventModel.findByPk(res.body.id).then(function(userEvent) {
      assert(userEvent.eventId, res.body.id);
      done();
    }).catch(function(err) {
      done(err);
    });
  });
};

exports.all_events_should_be_searchable = function(done) {
  supertest(app)
  .get('/events')
  .set('Content-Type', 'application/json')
  .send()
  .expect(200, done);
};

exports.event_should_give_its_details = function(done)  {
  const pk = 1;
  supertest(app)
  .get('/events/' + pk)
  .set('Content-Type', 'application/json')
  .send()
  .expect(200, done);
}

exports.event_should_be_updated_according_to_the_given_fields = function(done) {
  const eventUpdate = { 
    password: '12345',
    objective: 'updating an event'
  };
  const eventModel = models.sequelize.model('event');
  const pk = 1;

  supertest(app)
  .put('/events/' + pk)
  .set('Content-Type', 'application/json')
  .send(eventUpdate)
  .expect(204)
  .then(res => {
    eventModel.findByPk(pk).then(function(event) {
      assert(event.password, eventUpdate.password);
      done();
    }).catch(function(err) {
      done(err);
    });
  });
};

exports.given_pk_should_delete_its_event = function(done) {
  const eventModel = models.sequelize.model('event');
  const pk = 2;

  supertest(app)
  .delete('/events/' + pk)
  .set('Content-Type', 'application/json')
  .send()
  .expect(204)
  .then(res => {
    eventModel.findByPk(pk, { rejectOnEmpty: true }).then(function(event) {
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

exports.given_event_should_return_all_its_participants = function(done) {
  const pk = 1;
  supertest(app)
  .get('/events/' + pk + '/users')
  .set('Content-Type', 'application/json')
  .send()
  .expect(200, done)
};

exports.given_event_should_return_all_its_observations = function(done) {
  const pk = 1;
  supertest(app)
  .get('/events/' + pk + '/observations')
  .set('Content-Type', 'application/json')
  .send()
  .expect(200, done);
};