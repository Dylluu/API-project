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
   await queryInterface.bulkInsert('ReviewImages', [
    {
      reviewId: 1,
      url: 'Review 1 url'
    },
    {
      reviewId: 2,
      url: 'Review 2 url'
    },
    {
      reviewId: 2,
      url: 'Review 2 url 2'
    },
    {
      reviewId: 3,
      url: 'Review 3 url'
    },
    {
      reviewId: 4,
      url: 'Review 4 url'
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
    await queryInterface.bulkDelete('ReviewImages', null, {});
  }
};
