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
      Todo.belongsTo(models.User)
    }
  };
  Todo.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: DataTypes.STRING,
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    due_date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isAfter: {
          args: new Date().toISOString().slice(0, 10),
          msg: 'Only insert due date today and after!'
        }
      }
    },
    UserId: DataTypes.INTEGER
  }, {
    hooks: {
      beforeCreate(todo, options) {
        todo.status === '' && (todo.status = false)
      }
    },
    validate: {
      isEmpty() {
        if (this.title === '' || this.status === '' && !this.createdAt || this.due_date === '') {
          throw new Error('Data cannot be empty!');
        }
      }
    },
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};