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
      Todo.belongsTo(models.User)
      // define association here
    }
  };
  Todo.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    due_date: {
      type: DataTypes.DATE,
      validate: {
        isToday(value){
          const currentDate = new Date()
          if(value <= currentDate ){
            throw new Error("cannot do it today")
          }
        }
      }
    },
    UserId: DataTypes.INTEGER
  }, {hooks: {
    beforeCreate: (todo) => {
      todo.status = false
    }
  },
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};