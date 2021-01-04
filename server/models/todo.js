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
        notEmpty:{
          msg: 'title must be filled'
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      validate: {
        notEmpty:{
          msg: 'description must be filled'
        }
      }
    },
    status: {
      type: DataTypes.BOOLEAN,
      validate: {
        isBoolean: val => {
          if(typeof val != "boolean"){
            throw new Error('status must be true or false')
          }
        }
      }
    },
    due_date: {
      type: DataTypes.DATE,
      validate: {
        notEmpty:{
          msg: 'due date must be filled'
        },
        isDate: {
          args: true,
          msg: 'due date not valid date'
        },
        isAfter: {
          args: new Date().toDateString(),
          msg: 'due date must be after today'
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};