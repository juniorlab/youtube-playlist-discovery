const Sequelize = require('sequelize');
const createPlaylist = require('./Playlist');

const db = new Sequelize(
  `postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@localhost:5432/${process.env.POSTGRES_DATABASE}`
);

const Playlist = createPlaylist(db, Sequelize);

module.exports = {
    db,
    Playlist,
};
