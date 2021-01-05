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
    title: {
      type: DataTypes.STRING,
      validate: {
        // notNull: true,
        notEmpty: {
          msg: "Title should not be empty"
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      validate: {
        // notNull: true,
        notEmpty: {
          msg: "Description should not be empty"
        }
      }
    },
    status: DataTypes.BOOLEAN,
    due_date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};