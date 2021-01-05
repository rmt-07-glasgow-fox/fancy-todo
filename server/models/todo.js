'use strict';
const {
  Model
} = require('sequelize');
const yesterday = require('../helpers/getYesterday')
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Todo.hasMany(models.User, { foreignKey: 'user_id' })
    }
  };
  Todo.init({
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Require title'
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Require description'
        }
      }
    },
    due_date: {
      type: DataTypes.DATEONLY,
      validate: {
        isAfter: {
          args: yesterday(),
          msg: 'Require date greater than today'
        }
      }
    },
    status: {
      type: DataTypes.BOOLEAN,
      validate: {
        isIn: {
          args: [[true, false]],
          msg: 'Require typedata boolean'
        }
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      validate: {
        notNull: {
          args: true,
          msg: 'Require user id'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};