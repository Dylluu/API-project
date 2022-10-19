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
    name: 'Countryside Treehouse',
    description: 'Explore the countryside at this popular 40-acre sanctuary that has become a favorite among Farms in Santa Barbara!',
    price: 1000.00
   },
   {
    ownerId: 2,
    address: '518 W. Figueroa St.',
    city: 'San Fransisco',
    state: 'California',
    country: 'USA',
    lat: 3.15,
    lng: 3.15,
    name: 'Ocean Front Condo',
    description: "Enjoy your morning coffee on your private ocean front balcony or from the comfort of living room couch. Our ocean front retreat is an end unit (next to stairway- skip elevator lines) with ocean views including large heated pool and tennis court. Conveniently located 88th Street within walking distance of many SF's favorites.",
    price: 1000.00
   },
   {
    ownerId: 3,
    address: '517 W. Figueroa St. 2',
    city: 'Los Angeles',
    state: 'California',
    country: 'USA',
    lat: 3.16,
    lng: 3.16,
    name: 'Beachfront Mansion',
    description: 'Entertain or unwind in paradise at Samujana Twenty-One. This six-bedroom Los Angeles vacation rental, part of the exclusive Samujana estate, has outdoor living areas designed for parties and dinners, a large garden and panoramic ocean views.',
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
