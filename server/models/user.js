'use strict';
const { hashPassword } = require('../helpers/bcryptjs')
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
      User.hasMany(models.Task)
    }
  };
  User.init({
    fullName: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Full Name is required'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      unique: {
        msg: 'Email address is already registered'
      },
      validate: {
        notEmpty: {
          msg: 'Email is required'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Password is required'
        },
        len: {
          args: [6], 
          msg: 'Password at least 6 characters'
        }
      }
    }
  }, {
    hooks: {
      beforeCreate: (instance, options) => {
        let hashed = hashPassword(instance.password)
        instance.password = hashed
      }
    },
    sequelize,
    modelName: 'User'
  });
  return User;
};