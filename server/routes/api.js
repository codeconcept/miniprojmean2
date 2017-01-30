const express = require('express');
const mongoose = require('mongoose');
const router = express.Router({
  mergeParams: true
});
const Favorite = require('../models/favorite').Favorite;


const favoritesURL = '/v1/favorites/';

router.get('/v1/', (req, res) => {
  res.send('api !!');
});

router.get(favoritesURL, (req, res) => {
  Favorite.find({}, (err, favs) => {
    res.json(favs);
  });
});

mongoose.Promise = Promise;

router.post(favoritesURL, (req, res) => {
  console.log(req.body); 
  const fav = new Favorite({
    title: req.body.snippet.title,
    description: req.body.snippet.description,
    userDescription: req.body.userDescription,
    category: 'TODO add a drop down in the template',
    channelTitle: req.body.snippet.channelTitle,
    chanelId: req.body.snippet.channelId,
    thumbnailDefaultUrl: req.body.snippet.thumbnails.default.url,
    videoId: req.body.id.videoId,
    channelUrl: `https://www.youtube.com/channel/${req.body.snippet.channelId}`,
    duration: 'TODO where is it?',
    durationUnit: 'minutes',
    publishedAt: req.body.snippet.publishedAt,
    addedToFavoriteDate: new Date()
  });

  Favorite.create(fav)
            .then(favorite => {
              console.log(favorite);
              res.status(200).send({ result: 'ajoute avec succes' });
              // res.redirect(favoritesURL);
            })
            .catch(err => {
              console.error(err.stack);
              res.status(500).send('oups : la persistance en base a echoue');
            });  

});  


router.delete('/v1/favorites/:favoriteId', (req, res) =>{
  
  Favorite.findOneAndRemove({_id: req.params.favoriteId})
    .then(response => {
        console.log(response);
        res.status(200).json({ result: 'deleted :)'});
      })
      .catch(err => {
        console.error(err.stack);
        res.status(500).send('oups : la suppression a echoue');
      }); 
});
              


module.exports = router;