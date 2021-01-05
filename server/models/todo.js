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
          msg: "Title must be filled"
        }
      }
    },
    description: DataTypes.TEXT,
    status: {
      type: DataTypes.BOOLEAN,
      validate: {
        isBoolean (value){
          if(typeof value !== "boolean"){
            throw new Error('Status must filled by true/false')
          }
        }
      }
    },
    due_date: {
      type: DataTypes.DATE,
      validate: {
        isAfter: {
          args: String(new Date()),
          msg: "Due date not valid"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};