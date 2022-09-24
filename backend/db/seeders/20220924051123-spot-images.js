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
   await queryInterface.bulkInsert('SpotImages', [
    {
      spotId: 1,
      url: 'Spot 1 Image 1 (preview)',
      preview: true
    },
    {
      spotId: 1,
      url: 'Spot 1 Image 2',
      preview: false
    },
    {
      spotId: 2,
      url: 'Spot 2 Image 1 (preview)',
      preview: true
    },
    {
      spotId: 2,
      url: 'Spot 2 Image 2',
      preview: false
    },
    {
      spotId: 2,
      url: 'Spot 2 Image 3',
      preview: false
    },
    {
      spotId: 3,
      url: 'Spot 3 Image 1 (preview)',
      preview: true
    },
    {
      spotId: 3,
      url: 'Spot 3 Image 2',
      preview: false
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
    await queryInterface.bulkDelete('SpotImages', null, {})
  }
};
