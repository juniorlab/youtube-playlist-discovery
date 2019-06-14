module.exports = (db, Sequelize) => {
    return db.define('Playlist', {
        id: {
            type: Sequelize.STRING,
            primaryKey: true,
        },
        name: Sequelize.STRING,
    }, {
        timestamps: false
    });
};
