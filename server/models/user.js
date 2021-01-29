'use strict';
const {hashPassword} = require('../helper/hash')

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
      User.hasMany(models.Todo)
    }
  };
  User.init({
    name: {
      type: DataTypes.STRING,
      validate:{
        notEmpty:{
          msg: 'Name must be filled'
        }
      }
    },
    username: {
      type: DataTypes.STRING,
      validate: {
        len:{
          args: [6,12],
          msg: 'username must be 6 - 12 characters'
        }
      },
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail:{
          msg : 'enter your email'
        }
      },
      unique:true
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len:{
          args:[6,20],
          msg: 'password must be 6 - 20 characters'
        }
      }
    },
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'User',
  });

  User.addHook("beforeCreate",(instance, options) => {
    instance.status = true
    instance.password = hashPassword(instance.password)
  })

  return User;
};