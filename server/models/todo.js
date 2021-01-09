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
      Todo.belongsTo(models.User, { foreignKey: 'user_id' })
    }
  };
  Todo.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Title must be filled in'
        },
        notEmpty: {
          args: true,
          msg: 'Title must be filled in'
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Description must be filled in'
        },
        notEmpty: {
          args: true,
          msg: 'Description must be filled in'
        }
      }
    },
    status: {
      type: DataTypes.BOOLEAN,
      validate: {
        isBoolean(value) {
          if (typeof value !== 'boolean') {
            throw new Error('Fill in with true or false!');
          }
        }
      }
    },
    user_id: DataTypes.INTEGER,
    due_date: {
      type: DataTypes.DATE,
      validate: {
        dateValidation(value){
          const nowDate = new Date()
          // console.log(nowDate)
          nowDate.setHours( 0,0,0,0 )
          if(value < nowDate){
            throw new Error('Date must be greather than today')
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