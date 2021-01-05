'use strict';
const {
  Model, STRING
} = require('sequelize');
const {hashPassword} = require('../helpers/bcrypt')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: 'invalid email format'
        },
        notEmpty: {
          args:true,
          msg: 'email is required'
        }
      },
      unique:true
    },
    password:{
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args:true,
          msg: 'password is required'
        },
        len: {
          args:[6],
          msg:'password at least have 6 charaters'
        }
      }
    },
    username: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args:true,
          msg: 'username is required'
        }
      }
    }
  }, {
    hooks:{
      beforeCreate(instance,options) {
        instance.password = hashPassword(instance.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};