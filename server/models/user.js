'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/bcrypt.js');

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
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: {
          args: true,
          msg: 'Invalid email format'
        },
        notNull: {
          msg: 'Email cannot empty'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [6],
          msg: 'Password at least 6 characters'
        },
        notNull: {
          msg: 'Password cannot empty'
        }
      }

    }
  }, {
    sequelize,
    modelName: 'User',
  });
  User.addHook('beforeCreate', 'hashPassword', (user, options) => {
    user.password = hashPassword(user.password);
  });
  return User;
};