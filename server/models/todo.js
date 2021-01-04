'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  todo.init({
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Title is required"
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Description is required"
        }
      }
    },
    status: DataTypes.STRING,
    due_date: {
      type: DataTypes.DATE,
      validate: {
      //   min: {
      //     args: new Date().setHours(0,0,0,0),
      //     msg: "must be greater or equal than today" 
      //   },
        validator: function(value) {
          let today = new Date().setHours(0,0,0,0)
          // today = today.setHours(0,0,0,0)
          let date = value >= today ? true : false
          return date
        },
          msg: "must be greater or equal than today" 
      }
    }
  }, {
    sequelize,
    modelName: 'todo',
  });
  return todo;
};