'use strict';
const {
  Model
} = require('sequelize');
const { hash } = require('../helper/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Event)
    }
  };
  User.init({
    email: {
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          args:true,
          msg:'Email harus diisi'
        },
        notNull:{
          args:true,
          msg:'Email harus diisi'
        },
        isEmail:{
          args:true,
          msg: 'Email harus sesuai format'
        }
      },
      allowNull: false,
      unique: true
    },
    password: {
      type:DataTypes.STRING,
      validate:{
        len:{
          args:[6],
          msg: "password minimal 6 karakter"
        }
      }
    }
  }, {
    hooks:{
      beforeCreate:(user,option)=>{
        user.password = hash(user.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};