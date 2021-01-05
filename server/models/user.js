'use strict';
const {
  Model
} = require('sequelize');
const HelperBcrypt = require('../helpers/bcrypt')
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user.hasMany(models.todo, {foreignKey:"UserId", targetKey:"id"})
    }
  };
  user.init({
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: {
          args: true,
          msg: "Email isn't an email / wrong"
        },
        notEmpty: {
          args: true,
          msg: "Email is required"
        }
      }
    },
    phoneNumber: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        notEmpty: {
          args: true,
          msg: "Phone Number is required"
        },
        len: {
          args: [12, 12],
          msg: "Phone Number at least 12 Numbers"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [6],
          msg: "Password at least 6 characters"
        },
        notEmpty: {
          args: true,
          msg: "Password is required"
        }
      }
    }
  }, {
    hooks: {
      beforeCreate(instance, option){
        instance.password = HelperBcrypt.hashpassword(instance.password)
      }
    },
    sequelize,
    modelName: 'user',
  });
  return user;
};