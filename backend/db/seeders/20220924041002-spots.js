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
    address: '4347 Marina Dr, Santa Barbara, CA 93110',
    city: 'Santa Barbara',
    state: 'California',
    country: 'United States',
    lat: 34.41,
    lng: -119.77,
    name: 'Countryside Treehouse',
    description: 'Explore the countryside at this popular 40-acre sanctuary that has become a favorite among Farms in Santa Barbara!',
    price: 170.00
   },
   {
    ownerId: 2,
    address: '112 Mallorca Way, San Fransisco, CA 94123',
    city: 'San Fransisco',
    state: 'California',
    country: 'United States',
    lat: 37.80,
    lng: -122.44,
    name: 'Ocean Front Condo',
    description: "Enjoy your morning coffee on your private ocean ",
    price: 300.00
   },
   {
    ownerId: 3,
    address: '1104 Via De La Paz, Pacific Palisades, CA 90272',
    city: 'Los Angeles',
    state: 'California',
    country: 'United States',
    lat: 34.05,
    lng: -118.53,
    name: 'Beachfront Mansion',
    description: 'Entertain or unwind in paradise at Samujana Twenty-One. This six-bedroom Los Angeles vacation rental, part of the exclusive Samujana estate, has outdoor living areas designed for parties and dinners.',
    price: 920.00
   },
   {
    ownerId: 4,
    address: '245 Holiday Valley Pl',
    city: 'Ellicottville',
    state: 'New York',
    country: 'United States',
    lat: 42.26,
    lng: -78.68,
    name: 'Holiday Valley Condo',
    description: 'Renovated condo with 1 private bedroom (queen), loft (full, twin over full bunk, twin sofa bed) & full bath.',
    price: 259.00
   },
   {
    ownerId: 4,
    address: '26 Debot Rd',
    city: 'Phillipsport',
    state: 'New York',
    country: 'United States',
    lat: 41.64,
    lng: -74.45,
    name: 'The Pond House',
    description: 'A modern, private cabin secluded within a private 19 acres, just 90 miles away from New York City !  This stunning home was designed by Sundial Studios Architecture & Design, and was featured within Dwell Magazine.',
    price: 520.00
   },
   {
    ownerId: 5,
    address: '8198 Uphill Rd, Joshua Tree, CA 92252',
    city: 'Joshua Tree',
    state: 'California',
    country: 'United States',
    lat: 34.10,
    lng: -116.29,
    name: 'The Invisible House',
    description: 'Quite simply, Invisible House is the most spectacular house in Joshua Tree. As seen in design and lifestyle publications worldwide, this mirrored 22 story horizontal skyscraper virtually disappears into the vast desert landscape.',
    price: 2850.00
   },
   {
    ownerId: 5,
    address: '23750 E Pacific Coast Hwy',
    city: 'Malibu',
    state: 'California',
    country: 'United States',
    lat: 34.03,
    lng: -118.69,
    name: 'Modern Luxury Home',
    description: "Relax in a luxurious 3-story Malibu getaway with spectacular ocean & mountain views.",
    price: 1495.00
   },
   {
    ownerId: 6,
    address: '30210 Pace Ln',
    city: 'Indio Hills',
    state: 'California',
    country: 'United States',
    lat: 33.83,
    lng: -116.22,
    name: 'Oasis Home',
    description: "Home features 7 bedrooms, completed with kings and queen beds and a 1 set of twin over a queen bed and a full bath.",
    price: 780.00
   },
   {
    ownerId: 6,
    address: '1276 Lago Vista Dr, Beverly Hills, CA 90210',
    city: 'Beverly Hills',
    state: 'California',
    country: 'United States',
    lat: 34.10,
    lng: -118.41,
    name: 'Beverly Hills Mansion',
    description: "Private, gated French country chateau-inspired home sits at the end of a cul de sac on nearly 2 acres of land and is surrounded by stately trees, mature landscaping, and verdant canyon views.",
    price: 2000.00
   },
   {
    ownerId: 6,
    address: '1212 W Cliff Dr, Santa Cruz, CA 95060',
    city: 'Santa Cruz',
    state: 'California',
    country: 'United States',
    lat: 36.95,
    lng: -122.04,
    name: 'Ocean View Santa Cruz Home',
    description: "Incredible beach home with sweeping views of the ocean. Watch the waves crash from your bed. Directly in front of Pleasure Point, a world class surf spot.",
    price: 600.00
   },
   {
    ownerId: 6,
    address: '1649 W 22nd St, Miami Beach, FL 33140',
    city: 'Miami',
    state: 'Florida',
    country: 'United States',
    lat: 25.80,
    lng: -80.15,
    name: 'Condo in Miami Beach',
    description: "Amazing ocean views from every room in this two story, 3 BR, 1400 square feet unit. Completed total renovation in 2019",
    price: 700.00
   },
   {
    ownerId: 6,
    address: '1620 W 21st St, Miami Beach, FL 33140',
    city: 'Miami',
    state: 'Florida',
    country: 'United States',
    lat: 25.80,
    lng: -80.14,
    name: '3-Room Suite w/ Sunset Bay View',
    description: "Wake up feeling on top of the world with an amazing view. Our stunning apartment in South Beach, Miami Beach has 2 bedrooms/2 bathrooms and has capacity for 6 people to sleep on 1 king and 3 queen beds comfortably.",
    price: 400.00
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
