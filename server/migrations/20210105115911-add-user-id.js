'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Todos', 'user_id', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      },
      onDelete: 'cascade',
      onUpdated: 'cascade'
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Todos', 'user_id', {})
  }
};
