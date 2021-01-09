'use strict';
const {
  Model
} = require('sequelize')
const { getHashPassword } = require ("../helpers/bcrypt");
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
      User.hasMany (models.Todo, { foreignKey: "UserId" })
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: {
          msg: "Email is Invalid"
        }
      },
      unique: true,
      notNull: {
        args: true,
        msg: "Please Enter Email Correctly"
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [6, 10],
          msg: "Password Length Should Between 6 and 10"
        }
      },
      notNull: {
        args: true,
        msg: "Please Enter Password Correctly"
      }
    }
  }, {
    hooks: {
      beforeCreate: (user, options) => {
        user.password = getHashPassword(user.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};