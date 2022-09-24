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
   await queryInterface.bulkInsert('Spots', [
    {
    ownerId: 1,
    address: '517 W. Figueroa St.',
    city: 'Santa Barbara',
    state: 'California',
    country: 'USA',
    lat: 3.14,
    lng: 3.14,
    name: 'West Fig',
    description: '5 bedroom loft',
    price: 1000.00
   },
   {
    ownerId: 2,
    address: '518 W. Figueroa St.',
    city: 'Santa Barbara',
    state: 'California',
    country: 'USA',
    lat: 3.15,
    lng: 3.15,
    name: 'West Fig 2',
    description: '5 bedroom loft',
    price: 1000.00
   },
   {
    ownerId: 3,
    address: '517 W. Figueroa St.',
    city: 'Santa Barbara',
    state: 'California',
    country: 'USA',
    lat: 3.16,
    lng: 3.16,
    name: 'West Fig 3',
    description: '5 bedroom loft',
    price: 1000.00
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
    await queryInterface.bulkDelete('Spots', null, {})
  }
};
