'use strict';
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
      User.hasMany(models.Todo, {foreignKey: "UserId"})
    }
  };
  User.init({
    email: {
      type : DataTypes.STRING,
      allowNull: false,
      validate : {
        notEmpty : {
          args : true,
          msg : 'Email is Required'
        },
        isEmail : {
          args : true,
          msg : 'Email Must Be Email Format'
        }
      },
      unique: {
        args: 'email',
        msg: 'This Email already exist'
      },
    },
    password: {
      type: DataTypes.STRING,
      validate : {
        notEmpty : {
          args : true,
          msg : 'Password is Required'
        }, 
        len : {
          args : [6],
          msg : "Password at least 6 characters"
        }
      }
    }
  }, {
    hooks : {
      beforeCreate : (user, option) => {
        user.password = generatePass(user.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};