'use strict';
const { hashPass } = require('../helpers/bcrypt.js');
const {
  Model
} = require('sequelize');
const TodoController = require('../controllers/todoController.js');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Todo, { foreignKey: 'UserId' });
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: "Invalid email format"
        },
        notEmpty: {
          args: true,
          msg: "Email is required"
        }
      },
      unique: true
    },
    username: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [5, 16],
          msg: "Username length must be between 5 and 16 characters"
        },
        is: {
          args: ["^[a-zA-Z0-9]+$", 'i'],
          msg: "Unique symbol or Whitespace is not allowed"
        },
      },
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [5, 16],
          msg: "Password length must be between 5 and 16 characters"
        },
        is: {
          args: ["^[a-zA-Z0-9\s]+$", 'i'],
          msg: "Whitespace is not allowed"
        }
      }
    }
  }, {
    hooks: {
      beforeCreate: (instance, options) => {
        instance.password = hashPass(instance.password);
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};