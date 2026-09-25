'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('workers', [
      {
        employee_code: 'AAA676769',
        first_name: 'Juan Carlos',
        last_names: 'Barba Fernández',
        email: 'jbarbafernandez@cifpfbmoll.eu',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        employee_code: 'BBB424242',
        first_name: 'Tamara',
        last_names: 'Fernandez Viturro',
        email: 'tfernandezviturro@cifpfbmoll.eu',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        employee_code: 'CCC111112',
        first_name: 'Xavier',
        last_names: 'Sastre Flexas',
        email: 'xsastref@cifpfbmoll.eu',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', { email: 'john@example.com' }, {});
  }
};
