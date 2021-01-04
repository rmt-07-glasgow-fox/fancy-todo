'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Todo extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    Todo.init({
        title: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    msg: 'title is required'
                }
            }
        },
        description: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    msg: 'description is required'
                }
            }
        },
        status: {
            type: DataTypes.BOOLEAN,
            validate: {
                notEmpty: {
                    msg: 'status is required'
                }
            }
        },
        due_date: {
            type: DataTypes.DATE,
            validate: {
                notEmpty: {
                    msg: 'due date is required'
                },
                isNotYesterday(value) {
                    if (value < new Date()) {
                        throw new Error('Start date at least start today.');
                    }
                }
            }
        }
    }, {
        sequelize,
        modelName: 'Todo',
    });
    return Todo;
};