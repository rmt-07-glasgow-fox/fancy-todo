'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ToDo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ToDo.belongsTo(models.User)
      // define association here
    }
  };
  ToDo.init({
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {msg: 'Title is required'}
      }
    },
    description: DataTypes.STRING,
    status: {
      type: DataTypes.BOOLEAN,
      validate: {
        notEmpty: { msg: `status can't be empty`}
      }
    },
    due_date: {
      type: DataTypes.DATE,
      validate: {
        notEmpty: { msg: 'Date is required' },
        checkDate(inputDate) {
          let newDate = new Date()
          if (inputDate < newDate){
            throw new Error('Date not valid')
          }
        }
      }
    },
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ToDo',
  });
  return ToDo;
};