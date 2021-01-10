'use strict';

const bcrypt = require('../helper/bcrypt')

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
      User.hasMany(models.TodoList)
    }
  };
  User.init({
    email: {
      type : DataTypes.STRING,
      validate : {
        isEmail : {
          args : true,
          msg : 'input must be EMail format'
        },
        notEmpty : {
          args : true,
          msg : 'Email must be fIlled'
        }
      }
    },
    password: {
      type : DataTypes.STRING,
      validate : {
        notEmpty : {
          args : true,
          msg : 'Passowrd must be filled'
        }
      }
    }
  }, {
    hooks : {
      beforeCreate : (user, option) => {
        user.password = bcrypt.hashPass(user.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};