'use strict';
const {
  Model
} = require('sequelize');
const Password = require('../helpers/hash-password')
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
      type:DataTypes.STRING,
      allowNull:false,
      validate: {
        notEmpty: {
          msg: `Email Must Be Filled`
        },
        notNull: {
          msg: `Email Must Be Filled`
        },
        isEmail: {
          msg: `Input Must Be Email Address`
        }
      }
    },
    password: {
      type:DataTypes.STRING,
      allowNull:false,
      validate: {
        notEmpty: {
          msg: `Password Must Be Filled`
        },
        notNull: {
          msg: `Password Must Be Filled`
        },
        len: {
          args: [6,255],
          msg: `Password Have Minimum 6 Character`
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate((instance, opt) => {
    const hashed = Password.hashPassword(instance.password)
    instance.password = hashed
  })
  return User;

};