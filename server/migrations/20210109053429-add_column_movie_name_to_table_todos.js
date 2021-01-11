'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.addColumn('Todos', 'movieName', {
            type: Sequelize.STRING,
        })
    },

    down: async(queryInterface, Sequelize) => {
        await queryInterface.removeColumn('Todos', 'movieName')
    }
};