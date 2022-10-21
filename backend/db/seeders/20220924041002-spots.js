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
    country: 'United States',
    lat: 3.14,
    lng: 3.14,
    name: 'Countryside Treehouse',
    description: 'Explore the countryside at this popular 40-acre sanctuary that has become a favorite among Farms in Santa Barbara!',
    price: 170.00
   },
   {
    ownerId: 2,
    address: '518 W. Figueroa St.',
    city: 'San Fransisco',
    state: 'California',
    country: 'United States',
    lat: 3.15,
    lng: 3.15,
    name: 'Ocean Front Condo',
    description: "Enjoy your morning coffee on your private ocean ",
    price: 300.00
   },
   {
    ownerId: 3,
    address: '517 W. Figueroa St. 2',
    city: 'Los Angeles',
    state: 'California',
    country: 'United States',
    lat: 3.16,
    lng: 3.16,
    name: 'Beachfront Mansion',
    description: 'Entertain or unwind in paradise at Samujana Twenty-One. This six-bedroom Los Angeles vacation rental, part of the exclusive Samujana estate, has outdoor living areas designed for parties and dinners, a large garden and panoramic ocean views.',
    price: 920.00
   },
   {
    ownerId: 4,
    address: '245 Holiday Valley Pl',
    city: 'Ellicottville',
    state: 'New York',
    country: 'United States',
    lat: 3.16,
    lng: 3.16,
    name: 'Holiday Valley Condo',
    description: 'Renovated condo with 1 private bedroom (queen), loft (full, twin over full bunk, twin sofa bed) & full bath. Beautiful galley kitchen w/ stainless appliances, hickory cabinets, quartz countertops.',
    price: 259.00
   },
   {
    ownerId: 4,
    address: '247 Cabin St.',
    city: 'Phillipsport',
    state: 'New York',
    country: 'United States',
    lat: 3.16,
    lng: 3.16,
    name: 'The Pond House',
    description: 'A modern, private cabin secluded within a private 19 acres, just 90 miles away from New York City !  This stunning home was designed by Sundial Studios Architecture & Design, and was featured both within Dwell Magazine (google: wabi sabi weekend cabin) and the NY Times (google: haiku of a home).',
    price: 520.00
   },
   {
    ownerId: 5,
    address: '248 Cabin St.',
    city: 'Joshua Tree',
    state: 'California',
    country: 'United States',
    lat: 3.16,
    lng: 3.16,
    name: 'The Invisible House',
    description: 'Quite simply, Invisible House is the most spectacular house in Joshua Tree. As seen in design and lifestyle publications worldwide, this mirrored 22 story horizontal skyscraper virtually disappears into the vast desert landscape.',
    price: 2850.00
   },
   {
    ownerId: 5,
    address: '248 Malibu St.',
    city: 'Malibu',
    state: 'California',
    country: 'United States',
    lat: 3.16,
    lng: 3.16,
    name: 'Modern Luxury Home',
    description: "Relax in a luxurious 3-story Malibu getaway with spectacular ocean & mountain views. Our newly-built mid-century modern 4 bedroom, 3.5 bath home is nestled in the peaceful Santa Monica mountains just minutes from Southern California's most famous beaches.",
    price: 1495.00
   },
   {
    ownerId: 6,
    address: '249 Malibu St.',
    city: 'Indio Hills',
    state: 'California',
    country: 'United States',
    lat: 3.16,
    lng: 3.16,
    name: 'Oasis Home',
    description: "Home features 7 bedrooms, completed with kings and queen beds and a 1 set of twin over a queen bed and a full bath.",
    price: 780.00
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
