'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ToDoList extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  ToDoList.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    status: DataTypes.STRING,
    due_date: DataTypes.DATEONLY
  }, {
    hooks: {
      beforeCreate: (instance, option) => {
        if (instance.status === "") {
          instance.status = "undone"
        }

        if (instance.due_date < new Date()) {
          throw new Error(`Date is invalid`)
        }
      }
    },
    sequelize,
    modelName: 'ToDoList',
  });
  return ToDoList;
};