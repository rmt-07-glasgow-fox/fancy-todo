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
    description: DataTypes.STRING,
    status: DataTypes.STRING,
    due_date: {
      type: DataTypes.DATEONLY,
      // validate: {
      //   hasPassed(value, option) {
      //     if (new Date(value).getTime() < new Date().getTime()) {
      //       throw new Error("Invalid date")
      //     }
      //   }
      // }
    }
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};