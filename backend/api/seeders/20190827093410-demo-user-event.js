'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('userEvent', [{
      userId: 1,
      eventId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      userId: 1,
      eventId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('userEvent', null, {});
  }
};
