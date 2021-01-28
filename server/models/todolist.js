'use strict';
const {
  Model
} = require('sequelize');
const newDate = require("../helpers/formatDate")

module.exports = (sequelize, DataTypes) => {
  class ToDoList extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ToDoList.belongsTo(models.User)
    }
  };
  ToDoList.init({
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: `Must be filled`
        }

      }
    },
    description: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: `Must be filled`
        }

      }
    },
    status: DataTypes.STRING,
    due_date: {
      type: DataTypes.DATEONLY,
      validate: {
        isAfter: {
          args: newDate(),
          msg: `The Date must be greater than today or today`
        }
      }
    },
    UserId: DataTypes.INTEGER
  }, {
    hooks: {
      beforeCreate: (instance, option) => {
        if (instance.status === "") {
          instance.status = "undone"
        }
      }
    },
    sequelize,
    modelName: 'ToDoList',
  });
  return ToDoList;
};