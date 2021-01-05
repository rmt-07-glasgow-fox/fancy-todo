'use strict';
const { Model } = require('sequelize');
const { hashPassword } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Todo);
    }
  }
  User.init(
    {
      firstName: {
        type: DataTypes.STRING,
        validate: { notEmpty: { args: true, msg: 'First name is required' } },
      },
      lastName: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: { args: true, msg: 'Last name name is required' },
        },
      },
      email: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: { args: true, msg: 'Email is required' },
          isEmail: { args: true, msg: 'Email is not valid' },
        },
        unique: {
          args: 'email',
          msg: 'The email is already taken!',
        },
      },
      password: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: { args: true, msg: 'Password is required' },
          min: { args: 6, msg: 'Password at least 6 characters' },
        },
      },
    },
    {
      sequelize,
      modelName: 'User',
      hooks: {
        beforeCreate: (user, options) => {
          user.password = hashPassword(user.password);
        },
      },
    }
  );
  return User;
};
