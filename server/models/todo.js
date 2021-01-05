'use strict';
const {
  Model
} = require('sequelize');
const yesterday = require('../helpers/yesterday');

module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Todo.belongsTo(models.User)
    }
  };
  Todo.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please input title'
        },
        len: {
          args: [3, 30],
          msg: 'Please input title more than 3 characters or less than 30 characters'
        }
      }
    },
    description: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    due_date: { 
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please input date'
        },
        isYesterday(val) {
          if (val <= new Date(yesterday())) {
            throw {message: 'Please input date greater than yesterday'}
          }
        } 
      }
    }
  }, {
    sequelize,
    modelName: 'Todo',
    hooks: {
      beforeCreate: (instance, options) => {
        if (!instance.status) {
          instance.status = false;
        }
      }
    }
  });
  return Todo;
};