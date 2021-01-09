'use strict';

const tableName = 'Todos';
const constraintName = 'Todos_UserId_fkey';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`alter table "${tableName}" drop constraint "${constraintName}"`)
      .then(() => queryInterface.sequelize.query(
        `alter table "${tableName}"
          add constraint "${constraintName}" foreign key("UserId") references "Users" ("id")
          on delete cascade`
      ));
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`alter table "${tableName}" drop constraint "${constraintName}"`)
      .then(() => queryInterface.sequelize.query(
        `alter table "${tableName}"\
          add constraint "${constraintName}" foreign key("UserId") references "Users" ("id")
          on delete no action`
      ));
  },
}