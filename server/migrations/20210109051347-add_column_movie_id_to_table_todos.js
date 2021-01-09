'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.addColumn('Todos', 'movieId', {
            type: Sequelize.INTEGER,
        })
    },

    down: async(queryInterface, Sequelize) => {
        await queryInterface.removeColumn('Todos', 'movieId')
    }
};