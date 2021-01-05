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
      Todo.belongsTo(models.User)
    }
  };

  Todo.init({
    title: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {
          msg : `The title can't be null`
        },
        notEmpty : {
          msg : `The title must be filled`
        }
      } 
    },
    description: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {
          msg : `The description can't be null`
        },
        notEmpty : {
          msg : `The description must be filled`
        }
      } 
    },
    status: {
      type : DataTypes.BOOLEAN,
      allowNull : false,
      validate : {
        notNull : {
          msg : `The status can't be null`
        },
        isIn : {
          args : [[true,false]],
          msg : `the status must be boolean`
        }
      } 
    },
    due_date: {
      type : DataTypes.DATE,
      allowNull : false,
      validate : {
        isTheDay(value){
          if(new Date(value) < new Date()){
            throw new Error(`Date must be greater than today`)
          }
        },
        notNull : {
          msg : `The date can't be null`
        },
        notEmpty : {
          msg : `The date must be filled`
        }
      }
    },
    UserId: DataTypes.INTEGER
  }, {
    hooks : {
      beforeCreate : (inst, opt) =>{
        inst.status = false
      },
      beforeUpdate : (inst, opt) => {
        if (inst.status === 'false') {
          inst.status = false
        } else {
          inst.status = true
        }
      }
    },
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};