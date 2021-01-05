'use strict';
const {
  Model
} = require('sequelize');
const { Sequelize } = require('.');
module.exports = (sequelize, DataTypes) => {
  class TodoList extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      TodoList.belongsTo(models.User, {foreignKey : 'user_id'})
    }
  };
  TodoList.init({
    title: {
      type : DataTypes.STRING,
      validate : {
        notEmpty : true
      }
    },
    description: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    due_date: {
      type : DataTypes.DATE,
      validate : {
        isAfter : {
          args : new Date().toISOString().slice(0, 10),
          message : 'minimum date today'
        }
      }
    },
    user_id : DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'TodoList',
  });
  return TodoList;
};