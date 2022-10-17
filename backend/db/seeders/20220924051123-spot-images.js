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
      url: 'https://a0.muscache.com/im/pictures/e7e72c42-3268-4e06-992b-bb75b6aa0a00.jpg?im_w=960',
      preview: true
    },
    {
      spotId: 1,
      url: 'Spot 1 Image 2',
      preview: false
    },
    {
      spotId: 2,
      url: 'https://a0.muscache.com/im/pictures/97c4c7ce-3ded-445e-b2f8-9ded10ae5be0.jpg?im_w=960',
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
      url: 'https://a0.muscache.com/im/pictures/monet/Luxury-570973165437649140/original/5b3872b7-fc85-4e67-bd3b-dc69e298dae3?im_w=960',
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
