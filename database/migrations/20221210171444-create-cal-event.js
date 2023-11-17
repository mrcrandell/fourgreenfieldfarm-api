'use strict';
const timestampConfig = require('../timestamp.configs');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('calEvents', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      slug: {
        type: Sequelize.STRING,
      },
      startsAt: {
        type: Sequelize.DATE,
      },
      endsAt: {
        type: Sequelize.DATE,
      },
      description: {
        type: Sequelize.TEXT,
      },
      description: {
        type: Sequelize.TEXT,
      },
      isFeatured: {
        type: Sequelize.BOOLEAN,
      },
      isHasEndsAt: {
        type: Sequelize.BOOLEAN,
      },
      isAllDay: {
        type: Sequelize.BOOLEAN,
      },
      isHasEndsAt: {
        type: Sequelize.BOOLEAN,
      },
      isActive: {
        type: Sequelize.BOOLEAN,
      },
      hauntedBy: {
        type: Sequelize.STRING
      },
      ...timestampConfig.fields,
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('calEvents');
  }
};