'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    static associate(models) {
      Todo.belongsTo(models.User, {foreignKey: 'UserId'})
    }
  };
  Todo.init({
    title: {
      type: DataTypes.STRING,
      validate: {
        // notNull: true,
        notEmpty: {
          msg: "Title should not be empty"
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      validate: {
        // notNull: true,
        notEmpty: {
          msg: "Description should not be empty"
        }
      }
    },
    status: DataTypes.BOOLEAN,
    due_date: DataTypes.DATE,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};