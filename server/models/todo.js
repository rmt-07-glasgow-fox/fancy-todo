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
      allowNull: false,
      validate: {
        notNull: {
          msg: "Title should not null"
        },
        notEmpty: {
          msg: "Title should not be empty"
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Description should not null"
        },
        notEmpty: {
          msg: "Description should not be empty"
        }
      }
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Status should not null"
        },
        notEmpty: {
          msg: "Status should not be empty"
        }
      }
    },
    due_date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Due date should not null"
        },
        notEmpty: {
          msg: "Due date should not be empty"
        },
        isDateGreaterThan () {
          const currentDate = new Date()
          if (currentDate >= this.due_date) {
            throw new Error('Date must be greater than Today')
          }
        }
      }
    },
    UserId:DataTypes.INTEGER,
  },{
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};