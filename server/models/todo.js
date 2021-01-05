'use strict';
const {
  Model, ValidationError
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
      Todo.belongsTo(models.User)
    }
  };
  Todo.init({
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Title can't be blank!"
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Description can't be blank!"
        }
      }
    },
    status: {
      type: DataTypes.BOOLEAN,
      validate: {
        notEmpty: {
          args: true,
          msg: "Status can't be blank!"
        },
        isBoolean: true
        // isBoolean(val) {
        //   let isBoolean = ((val == 'true' && val == 'false') || (val == 'TRUE' && val == 'FALSE'))
        //   if (!isBoolean) {
        //     console.log(this, "Dang");
        //     throw new Error('Data must boolean')
        //   }
        // }
      }
    },
    due_date: {
      type: DataTypes.DATE,
      validate: {
        isAfter: {
          args: `${new Date()}`,
          msg: 'Date is not uptodate!'
        },
        notEmpty: {
          args: true,
          msg: "Date can't be blank!"
        }
      }
    },
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};