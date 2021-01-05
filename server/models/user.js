'use strict';
const {
  Model
} = require('sequelize');
const {
  hashPass
} = require("../helpers/bcrypt")

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
        foreignKey: "userId"
      })
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: "Invalid email format"
        }
      },
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [6],
          msg: "Password must contain at least 6 characters"
        }
      },
    }
  }, {
    hooks: {
      beforeCreate(instance, options) {
        instance.password = hashPass(instance.password)
      },
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};