'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Event.belongsTo(models.User)
    }
  };
  Event.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    due_date: DataTypes.DATE,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Event',
  });
  return Event;
};