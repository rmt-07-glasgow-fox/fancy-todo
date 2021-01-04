'use strict';
const moment = require('moment');
const {
  Model, ValidationError
} = require('sequelize');
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
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Validation errors"
        }
      }
    },
    description: DataTypes.STRING,
    status: {
      type: DataTypes.BOOLEAN,
      validate: {
        notEmpty: {
          msg: 'Validation errors'
        }
      }
    },
    due_date: {
      type: DataTypes.DATEONLY,
      validate: {
        isDate(value) {
          let choosenDate = new Date(moment(`${value} 23:59:59`).format());
          let currentDate = new Date();

          if (choosenDate < currentDate) {
            throw new Error('Validation errors')
          }
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};