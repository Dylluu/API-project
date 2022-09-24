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
   await queryInterface.bulkInsert('Reviews', [
    {
      spotId: 1,
      userId: 1,
      review: 'Great place',
      stars: 4
    },
    {
      spotId: 2,
      userId: 2,
      review: 'Host was very nice!',
      stars: 5
    },
    {
      spotId: 3,
      userId: 3,
      review: 'Neighbors were too loud',
      stars: 3
    },
    {
      spotId: 3,
      userId: 2,
      review: 'Spot was ok, should be cheaper',
      stars: 4
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
    await queryInterface.bulkDelete('Reviews', null, {});
  }
};
