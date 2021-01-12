'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      todo.belongsTo(models.user,{foreignKey:"UserId"})
      
    }
  };
  todo.init({
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Title is required"
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Description is required"
        }
      }
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    due_date: {
      type: DataTypes.DATEONLY,
      validate: {
        isAfter: {
          args: new Date().toString(),
          msg: "must be greater or equal than today" 
        },
      }
    },
    UserId: {
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'todo',
  });
  return todo;
};