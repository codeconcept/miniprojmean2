const express = require('express');
const mongoose = require('mongoose');
const router = express.Router({
  mergeParams: true
});
// const bodyParser = require('body-parser');

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

  const fav = new Favorite({
    title: req.body.favtitle,
    description: req.body.favdescription,
    addedToFavoriteDate: new Date()
  });

  Favorite.create(fav)
            .then(favorite => {
              console.log(favorite);
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