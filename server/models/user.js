'use strict';
const {
  Model
} = require('sequelize');
const {hashPassword} = require("../helpers/bcrypt")
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Todo)
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: "email invalid"
        },
        notEmpty: {
          msg: "email required"
        }
      },
      unique: {
        msg: "Validation error: email must be unique"
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [6],
          msg: "password length must be at least 6 characters"
        },
        notEmpty: {
          msg: "password required"
        }
      }
    }
  }, {
    hooks: {
      beforeCreate (instance, option) {
        instance.password = hashPassword(instance.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};