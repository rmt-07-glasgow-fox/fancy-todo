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
    title: {type:DataTypes.STRING,
      validate:{
        notEmpty: {
          msg: 'Title must be filled'
        }
      }
    },
    description: {type:DataTypes.STRING,
      validate:{
        notEmpty: {
          msg: 'Description must be filled'
        }
      }
    },
    status: {type:DataTypes.STRING,
      validate:{
        notEmpty: {
          msg: 'Status must be filled'
        }
      }
    },
    due_date: {type:DataTypes.DATE,
      validate:{
        notEmpty: {
          msg: 'Date must be filled'
        },
        isAfter: {
          args: String(new Date()),
          msg: 'Can not select a date less than current date'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};