'use strict';
const {
    Model
} = require('sequelize');

const { hashPassword } = require('../helpers/bcrypt');

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
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: {
                    msg: 'field email is required'
                }
            }
        },
        password: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    msg: 'field password is required'
                },
                len: {
                    args: 6,
                    msg: 'password must at least 6 character'
                }
            }
        }
    }, {
        sequelize,
        modelName: 'User',
        hooks: {
            beforeCreate(instance) {
                instance.password = hashPassword(instance.password);
            }
        }
    });
    return User;
};