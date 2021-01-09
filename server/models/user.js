'use strict';
const { hash } = require('../helpers/bcrypt')
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
      // define association here
      User.hasMany(models.Todo, { foreignKey: "UserId", sourceKey:"id" })
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmpty: function(value) {
          if(value == '' || value == undefined) {
            throw new Error('Email must be filled')
          }
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate : {
        isEmpty: function(value) {
          if(value == '' || value == undefined) {
            throw new Error('Password must be filled')
          }
        }
      }
    } 
  }, {
    hooks: {
      beforeCreate: (instances, options) => {
        instances.password = hash(instances.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};