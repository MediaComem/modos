'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [{
      pseudonym: 'John',
      email: 'john.doe@demo.com',
      password: 'pa$$w0rd',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      pseudonym: 'Jane',
      email: 'jane.doe@demo.com',
      password: 'pa$$w0rd',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
