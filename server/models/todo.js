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
          msg: 'Email required!'
        }
      }
    },
    description: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.BOOLEAN,
      validate: {
        notEmpty: {
          msg: 'Status required!'
        }
      }
    },
    due_date: {
      type: DataTypes.DATE,
      validate: {
        notEmpty: {
          msg: 'Due Date required!'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};