'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.addColumn('TodoLists', 'user_id', {
      type : Sequelize.INTEGER,
      references : {
        model : {
          tableName : 'Users'
        },
        key : 'id'
      },
      onUpdate : "CASCADE",
      onDelete : "CASCADE"
    })
  },

  down: async (queryInterface, Sequelize) => {
    
    await queryInterface.removeColumn('TodoLists', 'user_id', {})
  }
};
