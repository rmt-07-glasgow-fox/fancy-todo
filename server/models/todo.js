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
      Todo.belongsTo (models.User, { foreignKey: "UserId" })
    }
  };
  Todo.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Title Should Not Be Empty"
        },
        notNull: {
          args: true,
          msg: "Please Enter Title Correctly"
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Title Should Not Be Empty"
        }
      },
      notNull: {
        args: true,
        msg: "Please Enter Description Correctly"
      }
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Status Should Not Be Empty"
        }
      },
      notNull: {
        args: true,
        msg: "Please Enter Status Correctly"
      }
    },
    due_date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isAfter: {
          args: new Date ().toString(),
          msg: "Due Date Must After Today's Date"
        }
      },
      notNull: {
        args: true,
        msg: "Please Enter Due Date Correctly"
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
    }
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};