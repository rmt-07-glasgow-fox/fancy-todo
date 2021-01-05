'use strict';
const {
  Model
} = require('sequelize');
const newDate = require('../helper/date');
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Todo.belongsTo(models.User)
    }
  };
  Todo.init({
    name: {
      type: DataTypes.STRING,
      validate:{
        notEmpty:{
          msg: 'Name must be filled'
        }
      }
    },
    type: {
      type: DataTypes.STRING,
      validate:{
        notEmpty:{
          msg: 'Type must be filled'
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      validate:{
        notEmpty:{
          msg: 'Description must be filled'
        }
      }
    },
    date: {
      type: DataTypes.DATEONLY,
      validate:{
        isAfter:{
          args: newDate(),
          msg: 'date must today or tomorow'
        }
      }
    },
    time: {
      type: DataTypes.STRING,
      validate:{
        notEmpty:{
          msg: 'Must filled with date'
        }
      }
    },
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Todo',
  });
  
  Todo.addHook("beforeCreate",(instance, options) => {
    instance.status = true
  })

  return Todo;
};