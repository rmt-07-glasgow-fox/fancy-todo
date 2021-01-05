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
    due_date: DataTypes.DATEONLY
    }, {
    sequelize,
    modelName: 'Todo',
  });

  Todo.beforeCreate((instance, option) => {

    const todayDate = new Date().toISOString().slice(0, 10);

    if (instance.due_date <= todayDate) {
      throw new Error('do not enter a date that is past today')
    }
  })

  return Todo;
};