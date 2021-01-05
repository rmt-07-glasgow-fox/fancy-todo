'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TodoList extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  TodoList.init({
    title:{
      type: DataTypes.STRING,
      validate:{
        notEmpty:{
          msg: "title cannot empty"
        }
      }
    }, 
    description: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    due_date: {
      type: DataTypes.DATE,
      validate:{
        isAfter:{
          args: new Date().toDateString(),
          msg: "Date must be greater than today"
        }
      }
    },
  }, {
    sequelize,
    modelName: 'TodoList',
  });
  return TodoList;
};