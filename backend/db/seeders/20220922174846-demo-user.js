'use strict';
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'demo@user.io',
        username: 'Demo-lition',
        firstName: 'Demo',
        lastName: 'User',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'user1@user.io',
        username: 'FakeUser1',
        firstName: 'Ryan',
        lastName: 'Webster',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        email: 'user2@user.io',
        username: 'FakeUser2',
        firstName: 'David',
        lastName: 'Liaw',
        hashedPassword: bcrypt.hashSync('password3')
      }, {
        email: 'user3@user.io',
        username: 'FakeUser3',
        firstName: 'Curtis',
        lastName: 'Chung',
        hashedPassword: bcrypt.hashSync('password4')
      },{
        email: 'user4@user.io',
        username: 'FakeUser4',
        firstName: 'Nhut',
        lastName: 'Ngo',
        hashedPassword: bcrypt.hashSync('password5')
      }, {
        email: 'user5@user.io',
        username: 'FakeUser5',
        firstName: 'Dylan',
        lastName: 'Luu',
        hashedPassword: bcrypt.hashSync('password6')
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};
