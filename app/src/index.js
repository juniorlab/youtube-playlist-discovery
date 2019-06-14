require('dotenv').config();
require('isomorphic-fetch');
const http = require('http');
const express = require('express');
const db = require('./models').db;
const bodyParser = require('body-parser');
const playlistRouter = require('./api/playlist');
const nunjucks = require('nunjucks');
const path = require('path');
const Playlist = require('./models').Playlist;

const app = express();
app.use(bodyParser.json());

app.use('/api/playlist', playlistRouter);
app.use(express.static(path.resolve(__dirname, 'dist')));

nunjucks.configure(path.resolve(__dirname, 'views'), {
    autoescape: true,
    express: app,
});

app.get('/', async (req, res) => {
    const playlists = await Playlist.findAll();
    res.render('home.nunj', {
        playlists: Array.from(playlists).reverse()
    })
});


db.authenticate()
    .then(() => {
        console.log('Connection to db established');
        const server = http.createServer(app);
        server.listen(3000, () => {
            console.log('Server is listening on port 3000')
        })
    })
    .catch((e) => {
        console.log('Unable to connect to db:', e)
    });
