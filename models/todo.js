'use strict';
const {
  Model
} = require('sequelize');
const getYesterdayDate = require('../helpers/getYesterdayDate.js');

module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Todo.belongsTo(models.User);
    }
  };
  Todo.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    status: DataTypes.STRING,
    due_date: {
      type: DataTypes.DATE,
      validate: {
        isAfter: getYesterdayDate()
      }
    }
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};