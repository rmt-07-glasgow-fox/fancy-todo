'use strict';

const bcrypt = require('../helper/bcrypt')

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
      User.hasMany(models.TodoList, {foreignKey : 'user_id'})
    }
  };
  User.init({
    email: {
      type : DataTypes.STRING,
      validate : {
        args : true,
        message : 'Input must be Email Format'
      }
    },
    password: DataTypes.STRING
  }, {
    hooks : {
      beforeCreate : (user, err) => {
        user.password = bcrypt.hashPass(user.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};