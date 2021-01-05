'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Todos','UserId',{type:Sequelize.INTEGER,reference:{tableName:'Users',key:'id'},onUpdate:'CASCADE',onDelete:'CASCADE'})
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Todos', 'UserId', {});
  }
};
