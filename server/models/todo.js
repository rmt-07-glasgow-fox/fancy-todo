'use strict';
const {
  Model
} = require('sequelize');

const checkDate = require('../helpers/date-validation')

module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Todo.hasMany(models.User, { foreignKey: 'user_id' })
    }
  };
  Todo.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    status: DataTypes.STRING,
    due_date: {
      type: DataTypes.DATE,
      validate: {
        checkDate(value) {
          if (checkDate(value) === 'invalid') {
            const code = 400
            throw new Error(['Date should be greater than or equal to today date!', code])
          } else {
            this.due_date = checkDate(value)
          }
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};