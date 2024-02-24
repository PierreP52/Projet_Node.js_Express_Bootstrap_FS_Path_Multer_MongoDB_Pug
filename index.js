const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const port = 3000;
const bodyParser = require('body-parser');

const dbURL = 'mongodb+srv://UserPierre:bDVh9Rr9OwoZQ7nt@cluster0.jjrw2nf.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(dbURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const videoRoutes = require('./routes/videoRoutes');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));

app.use(videoRoutes);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/videos', videoRoutes);

app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur le port ${port}`);
});

