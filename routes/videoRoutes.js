const express = require('express');
const router = express.Router();
const multer = require('multer');
const Video = require('../models/video');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const videoController = require('../controllers/videoController');






const storage = multer.memoryStorage(); 
const upload = multer({ storage: storage });

router.get('/', async (req, res) => {
  res.render('home');
});

router.post('/upload', upload.single('video'), videoController.uploadVideo);



router.get('/stream/:videoId', videoController.displayVideoStream);
 

// Route pour afficher toutes les vidéos
router.get('/videos/video-list', async (req, res) => {
  try {
    const videos = await Video.find();
    res.render('videos/video-list', { videos });
  } catch (error) {
    console.error(error);
    res.status(500).send('Une erreur est survenue lors de l\'affichage des vidéos.');
  }
});



router.get('/videos/upload', (req, res) => {
  res.render('videos/upload'); 
});


module.exports = router;