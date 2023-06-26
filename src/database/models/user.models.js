const { DataTypes, Model, Sequelize } = require('sequelize');
const timestampConfig = require('../configs/timestamp.configs');
const { sequelize } = require('..');

class user extends Model {}

const dto = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
  },
  rememberToken: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  ...timestampConfig.fields,
};

/*
Sequelize.UUID
DataTypes.STRING
DataTypes.TEXT

DataTypes.BOOLEAN
DataTypes.INTEGER
DataTypes.BIGINT
DataTypes.DECIMAL(10, 2)

DataTypes.FLOAT
DataTypes.DOUBLE

Sequelize.DATE
'TIMESTAMP'
*/

// const applyAssociations = (models) => {
//   const { parent } = models;
//   user.belongsTo(parent);
// };

user.init(dto, {
  ...timestampConfig.tableOptions,
  sequelize,
  tableName: 'users',
});

module.exports = {
  model: user,
  dto,
  // applyAssociations,
};
