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
      Todo.belongsTo(models.User);
    }
  };
  Todo.init({
    UserId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    status: DataTypes.BOOLEAN,
    due_date: {
      type: DataTypes.DATE,
      validate: {
        isAfter: {
          args: new Date().toISOString().split('T')[0], // e.g: "2021-01-05"
          msg: 'Validation Error, cannot input an older date than now'
        }
        // Custom Validation for input the same date
        // checkDueDate(value){
        //   const dateInput = new Date(value).setHours(0,0,0,0);
        //   const dateNow = new Date().setHours(0,0,0,0);
        //   if (dateInput < dateNow) {
        //     throw new Error('Bad Request. Validation Error, cannot input an older date than now');
        //   }
        // }
      }
    }
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};