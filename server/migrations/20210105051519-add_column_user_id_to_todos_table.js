'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.addColumn('Todos', 'userId', {
            type: Sequelize.INTEGER,
            references: {
                model: 'Users',
                key: 'id'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        })
    },

    down: async(queryInterface, Sequelize) => {
        await queryInterface.removeColumn('Todos', 'userId')
    }
};