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
      Todo.belongsTo(models.User, {foreignKey: 'userId', targetKey:'id'})
    }
  };
  Todo.init({
    title: {
      type: DataTypes.STRING,
      validate: {
        allowNull: false
      }
    },
    description: {
      type: DataTypes.STRING,
      validate: {
        allowNull: false
      }
    },
    status: DataTypes.STRING,
    due_date: {
      type:  DataTypes.DATE,
      //masih bingung
      // validate: {
      //   notToday (value) {
      //     let today = new Date ()
      //     if(value.getFullYear() >= today.getFullYear()){
      //       if(value.getMonth() >= today.getMonth()){
      //         if(value.getDate() == today.getDate()){
      //           throw new Error("Date must be the day after today")
      //         }
      //       } else {
      //         throw new Error("Date must be the day after today")
      //       }
      //     } else {
      //       throw new Error("Date must be the day after today")
      //     }
          
      //   }
      // }
    },
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};