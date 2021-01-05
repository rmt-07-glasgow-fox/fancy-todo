'use strict';
const { hashPassword } = require('../helper/bcrypt')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Todo, {foreignKey: 'UserId'})
    }
  };
  User.init({
    email: {
      type : DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: "Invalid email format"
        }
      },
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [6],
          msg: "password at least 6 characters"
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