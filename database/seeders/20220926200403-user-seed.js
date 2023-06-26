const bcrypt = require('bcrypt');

const makePassword = (pw) => {
  return new Promise(async (rs) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(pw, salt);
    return rs(hash);
  });
};

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    return queryInterface.bulkInsert('users', [
      {
        id: '1',
        name: 'Matt Crandell',
        email: 'mrcrandell@gmail.com',
        password: await makePassword('4gff2022'),
      },
      {
        id: '2',
        name: 'Kevin Courtney',
        email: 'fourgreenfieldsman@yahoo.com',
        password: await makePassword('4gff2022'),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('user', null, {});
  },
};
