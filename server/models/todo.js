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
      Todo.belongsTo(models.User, {foreignKey : 'userId'})
    }
  };
  Todo.init({
    title: {
      type : DataTypes.STRING,
      validate : {
        notEmpty : {
          msg : "Title must be filled"
        }
      }
    },
    description: {
      type : DataTypes.STRING,
      validate : {
        notEmpty : {
          msg : "Description must be filled"
        }
      }
    },
    status: {
      type: DataTypes.BOOLEAN,
      validate : {
        isBoolean(value){
          if(typeof value !== 'boolean'){
            throw new Error('Only can accept boolean')
          }
        }
      }
    },
    due_date: {
      type: DataTypes.DATE,
      validate : {
        isAfter : {
          args : [new Date().toISOString().substring(0,10)],
          msg : 'Date have to be greater than today'
        }
      }
    },
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};