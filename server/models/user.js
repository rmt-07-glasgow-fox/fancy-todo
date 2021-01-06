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
      allowNull: false,
      validate: {
        isEmail: {
          args: true,
          msg: "Invalid email format"
        },
        notEmpty: {
          msg: "Email should not empty"
        },
        notNull: {
          msg: "Email should not null"
        }
      },
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [6],
          msg: "password at least 6 characters"
        },
        notEmpty: {
          msg : "Password should not empty"
        },
        notNull: {
          msg: "Password should not null"
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