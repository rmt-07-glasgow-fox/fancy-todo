'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Todos', 'UserId', {
      type: Sequelize.INTEGER,
      references: {
        model: {
          tableName: 'Users'
        },
        key: 'id'
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Todos','UserId')
  }
};
