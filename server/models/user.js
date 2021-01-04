"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../helpers/bcrypt");

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
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          args: true,
          msg:
            "This username is not available. It has been used by another user.",
        },
        validate: {
          notEmpty: {
            msg: "Please insert username",
          },
          len: {
            args: [3],
            msg: "Minimum username length is 3 characters",
          },
        },
      },
      fullName: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          args: true,
          msg: "This email is not available. It has been used by another user.",
        },
        validate: {
          isEmail: {
            msg: "Email must be a valid email address",
          },
          notEmpty: {
            msg: "Please insert email",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Please insert password",
          },
        },
      },
    },
    {
      hooks: {
        beforeCreate: (user, options) => {
          user.password = hashPassword(user.password);
        },
      },
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
