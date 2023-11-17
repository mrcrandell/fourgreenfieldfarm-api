const { DataTypes, Model, Sequelize } = require('sequelize');
const timestampConfig = require('../configs/timestamp.configs');
const { sequelize } = require('..');
const format = require('date-fns/format');

class calEvent extends Model {}

const dto = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    type: DataTypes.STRING
  },
  slug: {
    type: DataTypes.STRING,
  },
  startsAt: {
    type: DataTypes.DATE,
    /* get() {
      return format(this.getDataValue('startsAt'),('yyyy-MM-dd\'T\'h:mm:ss\'.007Z\''));
    } */
  },
  endsAt: {
    type: DataTypes.DATE,
    /* get() {
      return format(this.getDataValue('endsAt'),('yyyy-MM-dd\'T\'h:mm:ss\'.007Z\''));
    } */
  },
  description: {
    type: DataTypes.TEXT,
  },
  isFeatured: {
    type: DataTypes.BOOLEAN,
  },
  isHasEndsAt: {
    type: DataTypes.BOOLEAN,
  },
  isAllDay: {
    type: DataTypes.BOOLEAN,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
  },
  hauntedBy: {
    type: DataTypes.STRING
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

calEvent.init(dto, {
  ...timestampConfig.tableOptions,
  sequelize,
  tableName: 'calEvents',
});

module.exports = {
  model: calEvent,
  dto,
  // applyAssociations,
};
