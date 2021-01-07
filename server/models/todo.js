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
      Todo.belongsTo(models.User, {
        foreignKey: 'UserId'
      })
    }
  };
  Todo.init({
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Title Todo cannot be empty'
        }
      }
    },
    description: DataTypes.STRING,
    status: {
      type: DataTypes.STRING,
      validate: {
        isIn: {
          args: [['done', 'onlist']],
          msg: 'Unknown status value'
        }
      }
    },
    due_date: {
      type: DataTypes.DATE,
      validate: {
        isAfter: {
          args: new Date().toString(),
          msg: 'Cannot set Obselete Todo'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};