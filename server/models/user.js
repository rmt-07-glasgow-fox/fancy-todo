'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helper/bcrypt')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.todoList)
    }
  };
  User.init({
    userName: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: 'Please input your email correctly'
        },
        unique: true,
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [6],
          msg: 'password minimum 6 characters'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: (user, options) => {
        user.password = hashPassword(user.password)
      }
    }
  });
  return User;
};