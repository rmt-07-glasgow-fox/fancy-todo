'use strict';
const {
  Model
} = require('sequelize');

const {hashPassword} = require('../helpers/bcrypt')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Todo, {foreignKey: 'userId'})
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      validate:{
        notEmpty:{
          msg: `email is required`
        },
        isEmail: {
          args: true,
          msg: `invalid email format`
        }
      },
      unique: true
    },
    fullName: {
      type: DataTypes.STRING,
      validate:{
        notEmpty:{
          msg: `full name is required`
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate:{
        len:{
          args: [6,15],
          msg: `password minimum characters is 6`
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate((user, options)=>{
    user.password = hashPassword(user.password)
  })
  return User;
};