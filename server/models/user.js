'use strict';
const { hashPassword } = require('../helper/hashPassword')

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
      // define association here
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      uniqe:true,
      allowNull: false,
      validate: {
        isEmail: {
          args: true,
          msg: "invalid email"
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
          msg: "password must be at least 6 characters"
        }
      }
    }
  }, {
    hooks: {
      beforeCreate: (user, options) => {
        user.password = hashPassword(user.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};