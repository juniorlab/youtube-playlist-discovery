const router = require('express').Router();
const Playlist = require('../models').Playlist;

router.get('/', async (req, res) => {
  res.json(await Playlist.findAll())
});

router.post('/', async (req, res) => {
  if (!(await Playlist.findByPk(req.body.id))) {
    const playlist = await Playlist.create({...req.body});
    res.status(201).json(playlist);
  } else {
    // https://developer.mozilla.org/ru/docs/Web/HTTP/Status/409
    res.status(409).json({error: 'Playlist with such id already exists'})
  }
});

router.get('/:id', async (req, res) => {
  let playlistData;
  try {
    const response = await fetch(`https://www.googleapis.com/youtube/v3/playlists?` +
      `key=${process.env.API_KEY}&` +
      `part=snippet&` +
      `id=${req.params.id}`,
    );
    // TODO make new API key
    playlistData = await response.json();
  } catch (e) {
    console.error(e);
  }
  res.json(playlistData);
});

module.exports = router;
