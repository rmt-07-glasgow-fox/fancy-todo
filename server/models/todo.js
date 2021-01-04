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

    static getDateToday() {
      return (new Date()).toJSON().slice(0, -14)
    }
  };
  Todo.init({
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Title is empty'
        }
      }
    },
    description: DataTypes.STRING,
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    due_date: {
      type: DataTypes.DATE,
      validate: {
        isAfter: {
          args: `${Todo.getDateToday()}`,
          msg: `Minimal tanggal harus hari ini ${Todo.getDateToday()}`
        },
        notEmpty: {
          args: true,
          msg: 'due_date is empty'
        },
        isDate: {
          args: true,
          msg: 'input due_date harus datatype date'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Todo',
    hooks: {
      beforeCreate: (instance, options) => {
        instance.status = false
      }
    }
  });
  return Todo;
};