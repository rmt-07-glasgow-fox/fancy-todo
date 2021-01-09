'use strict';
const {
  Model
} = require('sequelize');
const {
  hashPasword
} = require('../helpers/bcrypt');
const {
  options,
  use
} = require('../routers');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
      User.hasMany(models.Todo);
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: {
          args: true,
          msg: "Invalid email format"
        },
        notEmpty: {
          msg: 'Please insert email'
        }
      },
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [6],
          msg: "password at least 6 character"
        }
      }
    }
  }, {
    hooks: {
      beforeCreate: (user, options) => {
        user.password = hashPasword(user.password);
      },
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};