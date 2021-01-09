'use strict';
const {
  Model, INTEGER
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TodoList extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      TodoList.belongsTo(models.User)
      // define association here
    }
  };
  TodoList.init({
    title:{
      type: DataTypes.STRING,
      validate:{
        notEmpty:{
          msg: "title cannot empty"
        }
      }
    }, 
    description: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    due_date: {
      type: DataTypes.DATE,
      validate:{
        dateValidasion(value){
          let dateNow = new Date ()
          let inputDate = new Date (value)
          if(dateNow > inputDate){
            throw new Error ('Date must be greater than today')
          }
        }
      }
    },
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'TodoList',
  });
  return TodoList;
};