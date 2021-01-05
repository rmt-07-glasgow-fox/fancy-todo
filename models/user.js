'use strict';
const {Bcrypt} = require('../helper/bcrypt')

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
      User.hasMany(models.Todo)
    }
  };
  User.init({
    email: {type:DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Email must be filled'
        },
        isEmail: {
          args: true,
          msg: 'Invalid email format'
        }
      },
      unique: {
        args: true,
        msg: 'Email address already in use!'
      }
    },
    password: {type:DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Password must be filled'
        },
        len: {
          args: [6],
          msg: 'Password at least six characters'
        }
      }
    }
  }, {
    hooks:{
      beforeCreate: (user) => {
        user.password = Bcrypt.hash(user.password)
      },
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};