'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ToDo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ToDo.belongsTo(models.User)
    }
  };
  ToDo.init({
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    description: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    due_date: {
      type: DataTypes.DATE,
      validate: {
        isAfter: {
          args: `${new Date()}`,
          msg: 'Can not choose past date'
        }
      }
    },
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ToDo',
  });
  return ToDo;
};