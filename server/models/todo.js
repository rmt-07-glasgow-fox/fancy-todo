'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    get due_date() {
      let dd = this.due_date.getDate();
      let mm = this.due_date.getMonth()+1;
      const yyyy = this.due_date.getFullYear();
      if(dd<10) {
          dd=`0${dd}`;
      } 

      if(mm<10) {
          mm=`0${mm}`;
      } 
      return `${dd}/${mm}/${yyyy}`
    }
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
          msg: "title must be fill"
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "description must be fill"
        }
      }},
    status: {
      type: DataTypes.BOOLEAN,
      notEmpty: {
        args: true,
        msg: "status must be fill"
      }
    },
    due_date: {
      type: DataTypes.DATE,
      validate: {
        notEmpty: {
          args: true,
          msg: "due date must be fill"
        },
        isAfter() {
          if (this.due_date) {
            let now = new Date()
            let due_date = this.due_date
            if (due_date < now) {
              throw new Error('due date must be greater or equal today')
            }
          }
        }
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
      references: {
        model: { tableName: 'User'},
        key: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    }
  }, {
    hooks: {
      beforeCreate: (instance, options) => {
        let dd = instance.due_date.getDate();
        let mm = instance.due_date.getMonth()+1;
        const yyyy = instance.due_date.getFullYear();
        if(dd<10) {
            dd=`0${dd}`;
        } 
  
        if(mm<10) {
            mm=`0${mm}`;
        } 
        instance.due_date = `${mm}/${dd}/${yyyy}`
      }
    },
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};