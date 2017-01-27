const express = require('express');
const router = express.Router();

const Favorite = require('../models/favorite').Favorite;

router.get('/v1/', (req, res) => {
  res.send('api !!');
});

router.get('/v1/favorites', (req, res) => {
  Favorite.find({}, (err, favs) => {
    res.json(favs);
  });
});


module.exports = router;