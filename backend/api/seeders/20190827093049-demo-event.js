'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('events', [{
      userId: 1,
      beginning: new Date(),
      ending: new Date(),
      objective: 'demonstrate an event',
      numberOfImages: 42,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      userId: 2,
      beginning: new Date(),
      ending: new Date(),
      objective: 'demonstrate an event 2',
      numberOfImages: 42,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      userId: 2,
      beginning: new Date(),
      ending: new Date(),
      objective: 'demonstrate an event 3',
      numberOfImages: 42,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('events', null, {});
  }
};
