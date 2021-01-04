'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Todo, {foreignKey: 'userId', sourceKey: 'id'})
    }
  };
  User.init({
    email: {
      type:  DataTypes.STRING,
      validate: {
        allowNull: false,
        isEmail: {
          args: true,
          msg: "Must be an email"
        }
      }
    },
    password: {
      type:  DataTypes.STRING,
      validate: {
        allowNull: false,
        len: {
          args: [6],
          msg: "Minimum 6 characters"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};