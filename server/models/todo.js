'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ToDo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  ToDo.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty: {
          msg: 'Title field is required'
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty: {
          msg: 'Description field is required'
        }
      }
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate:{
        notEmpty: {
          msg: 'Status field is required'
        }
      }
    },
    due_date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate:{
        notEmpty: {
          msg: 'Due Date field is required'
        },
        isDate:{
          msg: 'Data type must be date'
        },
        dateValidate(value){
          let now = new Date()
          let day = now.getDate()
          let month = now.getMonth() + 1
          let year = now.getFullYear()
          if(value.getFullYear() < year){
            throw new Error('Date must be greather than today')
          }else{
            if(value.getMonth() + 1 < month){
              throw new Error('Date must be greather than today')
            }else{
              if(value.getDate() < day){
                throw new Error('Date must be greather than today')
              }
            }
          }
        }
      }
    }
  }, {
    sequelize,
    modelName: 'ToDo',
  });
  return ToDo;
};