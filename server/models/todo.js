'use strict';
const {
  Model
} = require('sequelize');

const formatDate = require('../helpers/date')
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Todo.belongsTo(models.User, {foreignKey: 'userId'})
    }
  };
  Todo.init({
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty:{
          msg: `Title can't empty`
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      validate: {
        notEmpty:{
          msg: `description can't empty`
        }
      }
    },
    status: {
      type: DataTypes.BOOLEAN,
      validate: {
        notEmpty:{
          msg: `status can't empty`
        }
      }
    },
    due_date: {
      type: DataTypes.DATEONLY,
      validate:{
        isAfter: `${new Date()}`
      }
    },
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};