'use strict';
const {
  Model
} = require('sequelize');
const { hashPass } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Todo, { foreignKey: 'userId' });
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Email required!!!'
        },
        isEmail: {
          msg: 'Invalid email!!!'
        },
        isUnique: function (value, next) {
          User.findAll({
            where: {
              email: value
            }
          })
            .then((data) => {
              if (data.length > 0) {
                next(Error('Email already in use!!!'));
              } else {
                next();
              }
            })
            .catch((err) => {
              throw err;
            });
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [6],
          msg: 'Minimal 6 characters!!!'
        } 
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate((user, options) => {
    user.password = hashPass(user.password);
  });

  return User;
};