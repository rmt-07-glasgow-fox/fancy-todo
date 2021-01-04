'use strict';
const {
  Model
} = require('sequelize');
const encryptPassword = require('../helpers/encryptAndDecrypt').encryptPassword

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.ToDo)
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty: {
          msg: 'Email field is required'
        },
        isEmail: {
          msg: 'Please enter a valid email'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate:{
        notEmpty: {
          msg: 'Password field is required'
        }
      }
    }
  }, {
    sequelize,
    hooks:{
      beforeCreate: (instance, options) => {
        instance.password = encryptPassword(instance.password)
      }
    },
    modelName: 'User',
  });
  return User;
};