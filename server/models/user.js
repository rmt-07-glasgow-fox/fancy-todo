'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/password')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Todo, {
        foreignKey: 'UserId'
      })
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Email is empty'
        },
        isEmail: {
          args: true,
          msg: 'Invalid email format'
        }
      },
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Password is empty'
        },
        len: {
          args: [6],
          msg: 'Password at least 6 characters'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: (instance, options) => {
        instance.password = hashPassword(instance.password)
        console.log(instance)
      }
    }
  });
  return User;
};