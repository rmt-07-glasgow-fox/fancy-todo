'use strict';
const { Model } = require('sequelize');
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
  }
  Todo.init(
    {
      title: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: { args: true, msg: 'Title is required' },
        },
      },
      description: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: { args: true, msg: 'Description is required' },
        },
      },
      status: {
        type: DataTypes.BOOLEAN,
        validate: {
          notEmpty: { args: true, msg: 'status is required' },
        },
      },
      due_date: {
        type: DataTypes.DATE,
        validate: {
          notEmpty: { args: true, msg: 'Date is required' },
          isAfter: {
            args: new Date().toString(),
            msg: 'Due date is grater than today',
          },
        },
      },
    },
    {
      sequelize,
      modelName: 'Todo',
    }
  );
  return Todo;
};
