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
    title: DataTypes.STRING,
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
        chechDate(value) {
          let result = new Date(value).getTime() - new Date().getTime()
          if (result < 0) {
            throw new Error('Due date not valid')
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