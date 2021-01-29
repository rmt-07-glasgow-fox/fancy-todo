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
      Todo.belongsTo(models.User, { foreignKey: 'UserId' });
    }
  };
  Todo.init({
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Title is required."
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Description is required."
        }
      }
    },
    status: {
      type: DataTypes.BOOLEAN,
      validate: {
        notEmpty: {
          args: true,
          msg: "Status is required."
        }
      }
    },
    due_date: {
      type: DataTypes.DATE,
      validate: {
        notEmpty: {
          args: true,
          msg: "Due Date is required."
        },
        isAfter: {
          args: new Date().toString(),
          msg: "Cannot set due date after today."
        }
      }
    },
    UserId: {
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};