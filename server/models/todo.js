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
      Todo.belongsTo(models.User, { foreignKey: "user_id"})
    }
  };
  Todo.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    due_date: {
      type: DataTypes.DATEONLY,
      validate: {
        checkDate(date) {
          let due_date = date
          let nowDate = new Date()

          if (due_date < nowDate) {
            throw new Error('Please Pick A Valid Date') 
          }
        }
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Users",
        key: "id"
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    }
  }, {
    hooks: {
      beforeCreate(todo, options) {
        todo.status = false
      }
    },
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};