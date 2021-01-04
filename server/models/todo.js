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
          msg: 'Title cannot be empty'
        }
      }
    },
    description: DataTypes.STRING,
    status: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Status cannot be empty'
        }
      }
    },
    due_date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Todo',
    hooks: {
      beforeCreate: (todo, options) => {
        if (todo.due_date < new Date()) {
          return Promise.reject(new Error('Due date have to be in the future'))
        }
      }
    }
  });
  return Todo;
};
