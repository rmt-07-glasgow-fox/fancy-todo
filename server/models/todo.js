'use strict';
const {
  Model
} = require('sequelize');
const yesterday = require('../helpers/getYesterday')
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Todo.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    due_date: {
      type: DataTypes.DATEONLY,
      validate: {
        isAfter: yesterday()
      }
    },
    status: {
      type: DataTypes.BOOLEAN,
      validate: {
        isIn: [[true, false]]
      }
    }
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};