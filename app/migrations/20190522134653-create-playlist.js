'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Playlists', {
            id: {
                type: Sequelize.STRING,
                primaryKey: true,
            },
            name: Sequelize.STRING,
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Playlists');
    }
};
