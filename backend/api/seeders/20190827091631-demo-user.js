'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [{
      pseudonym: 'John',
      email: 'john.doe@demo.com',
      password: 'pa$$w0rd',
      age: 42,
      gender: 'm',
      mobility: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      pseudonym: 'Jane',
      email: 'jane.doe@demo.com',
      password: 'pa$$w0rd',
      age: 42,
      gender: 'm',
      mobility: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
