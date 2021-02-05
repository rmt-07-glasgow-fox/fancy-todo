'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helper/bcrypt');
const { options } = require('../routes');
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
        foreignKey: "userId", 
        targetKey: "id" 
      })
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: "invalid email format"
        },
        notEmpty: {
          args: true,
          msg: "please fill the email"
        }
      },
      unique: {
        args: true,
        msg: "email already in use"
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "please fill the password"
        },
        valid(value) {
          if(!value || value <= 6){
            throw new Error('password must greater than 6 dan tidak boleh kosong')
          }
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: (user, options) => {
        user.password = hashPassword(user.password)
      }
    }
  });
  return User;
};