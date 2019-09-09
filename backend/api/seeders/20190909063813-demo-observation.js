'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('observations', [{
      userId: 1,
      eventId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      userId: 2,
      eventId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('observations', null, {});
  }
};
