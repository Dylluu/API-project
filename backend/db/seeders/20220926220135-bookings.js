'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert('Bookings', [
    {
      spotId: 1,
      userId: 4,
      startDate: '2022-09-28',
      endDate: '2022-09-29'
    },
    {
      spotId: 2,
      userId: 5,
      startDate: '2022-10-01',
      endDate: '2022-10-04'
    },
    {
      spotId: 3,
      userId: 6,
      startDate: '2022-10-04',
      endDate: '2022-10-10'
    },
    {
      spotId: 1,
      userId: 5,
      startDate: '2022-10-11',
      endDate: '2022-10-14'
    },
    {
      spotId: 3,
      userId: 6,
      startDate: '2021-12-12',
      endDate: '2022-01-01'
    }
   ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Bookings', null, {})
  }
};
