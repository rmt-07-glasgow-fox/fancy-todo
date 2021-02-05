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
    Todo.belongsTo(models.User, { 
      foreignKey: "userId" 
    })
    }
  };
  Todo.init({
    title: {
      type : DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "The Title cannot be empty"
        }
      }
    },
    description: {
      type : DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Please fill the description"
        }
      }
    },
    due_date: {
      type : DataTypes.DATE,
      validate: {
        notEmpty: {
          args: true,
          msg: "Please pick the date"
        },
        isAfter: {
          args: String(new Date()),
          msg: "The date must be greater than the From date"
        }
      }
    },
    status: {
      type : DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "status is not confirmed"
        },
        isClear(value) {
          if (value !== 'clear' && value !== 'not_clear' && value !== "important") {
            throw new Error('status must be clear or not_clear')
          }
        }
      }
    },
    userId: {
      type : DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};