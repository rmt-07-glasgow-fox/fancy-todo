'use strict';
const {
  Model
} = require('sequelize');
const hashPassword = require('../helpers/bcrypt')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      validate : {
        isEmail : {
          args : true,
          msg : 'Invalid email format'
        }
      },
      unique: true
    },
    password: {
      type : DataTypes.STRING,
      validate : {
        len : {
          args : [8],
          msg : 'Minimal password length is 8 character'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks : {
      beforeCreate(user, options){
        user.password = hashPassword(user.password)
      }
    }
  });
  return User;
};