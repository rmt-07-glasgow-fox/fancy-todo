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
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    status: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'status is required'
        }
      }
    },
    due_date: {
      type: DataTypes.DATEONLY,
      validate: {
        dateValidate(value) {
          const todayDate = new Date().toISOString().slice(0, 10);

          if (value <= todayDate) {
            throw new Error('gak boleh masukin tanngal yg udah lewat hari ini')
          }
        }
      }
    }
    }, {
    sequelize,
    modelName: 'Todo',
  });

  Todo.beforeCreate((instance, option) => {

    const todayDate = new Date().toISOString().slice(0, 10);

    if (instance.due_date <= todayDate) {
      throw new Error('gak boleh masukin tanggal yg udah lewat hari ini')
    }
  })

  return Todo;
};