const { Sequelize } = require('sequelize');
const sequelizeConfig = require('../../sequelize.config');

const { ENABLE_SEQUELIZE_LOGGING } = process.env;

const { database, host, dialect, replication } = sequelizeConfig;

const sequelize = new Sequelize(database, null, null, {
  logging: ENABLE_SEQUELIZE_LOGGING,
  host,
  dialect,
  replication,
  define: {
    hooks: {
      beforeCreate: (model) => {
        if ('createdAt' in model && !model.createdAt) {
          model.createdAt = new Date();
        }

        if ('updatedAt' in model && !model.updatedAt) {
          model.updatedAt = new Date();
        }
      },
      beforeUpdate: (model) => {
        if ('updatedAt' in model && !model.updatedAt) {
          model.updatedAt = new Date();
        }
      },
      beforeUpsert: (model) => {
        if ('updatedAt' in model && !model.updatedAt) {
          model.updatedAt = new Date();
        }
      },
      afterUpsert: (upsertResponse) => {
        // Model was updated, remove generated id
        if (!upsertResponse[1] && 'id' in upsertResponse[0]) {
          delete upsertResponse[0].dataValues.id;
        }
      },
    },
  },
});
module.exports.sequelize = sequelize;
module.exports.thens = {
  All: (l) => l?.map((r) => r?.get({ plain: true }) || r) || l,
  One: (r) => r?.get({ plain: true }) || r,
  Update: (d) => Boolean(parseInt(d, 10)),
  Destroy: Boolean,
};
module.exports.models = require('./models');
module.exports.repositories = require('./repositories');
