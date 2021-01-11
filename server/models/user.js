const { Model } = require('sequelize');
const { hashPwd } = require('../helpers/bcryptjs');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.ToDo);
    }
  }
  User.init(
    {
      name: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: 'Name must be filled',
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: 'Email must be filled',
          },
          isEmail: {
            msg: 'Email is not valid',
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: 'Password must be filled',
          },
          len: {
            args: [6, 12],
            msg: 'Password length must be between 6 to 12 characters',
          },
        },
        unique: true,
      },
    },
    {
      sequelize,
      modelName: 'User',
      hooks: {
        beforeCreate: (instance, options) => {
          instance.password = hashPwd(instance.password);
        },
      },
    }
  );
  return User;
};
