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
      Todo.belongsTo(models.User, { foreignKey: "UserId", targetKey: "id" })
    }
  };
  Todo.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    status: DataTypes.STRING,
    due_date: {
      type: DataTypes.DATE,
      validate: {
        lesserDate: function(value) {
          if(value < new Date) {
            throw new Error('Due date must past today')
          }
        },
        isNull: function(value) {
          if(value == null || value == undefined) {
            throw new Error('Due date must be filled')
          }
        } 
      }
    }
  }, {
    hooks : {
      beforeCreate(instance, options) {
        instance.status = 'belum'
      }
    },
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};