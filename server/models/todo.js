'use strict';
const {
  Model
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
          msg: 'Title required!!!'
        }
      }
    },
    description: DataTypes.STRING,
    status: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Status required!!!'
        },
        validFormat (value) {
          if (value != 'unfinished' && value != 'finished') {
            throw new Error('Status must be finished or unfinished!!!');
          }
        }
      }
    },
    dueDate: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Due date required!!!'
        },
        isDate: {
          msg: 'Invalid date!!!'
        },
        idPassed (value) {
          if (Date.parse(value) < Date.now()) {
            throw new Error('Date already passed!');
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