const express = require('express');
const fs = require('fs');
const path = require('path');
const stream = require('./stream');
const gathermedia = require('./gathermedia');

const app = express();
const port = 8080;

mediapath = './media';
extensions = ['.mp4', '.m4v'];

// Will find all media with supported extensions in ./media
const filename = gathermedia.mediafilepath(mediapath, extensions);

app.set('view engine', 'pug');
 
app.get('/', (req, res, next) => {
  console.log("request for /");
  res.render('index', {path: filename});
})

// URL use %20 as space so replace it here with " " so media can be found locally
app.get('/*.mp4$', (req, res) => {
  console.log(`User requesting media: ${req.url}`);
  stream.start(`.${req.url.replace(/%20/g, " ")}`, req, res);
})
app.get('/*.m4v$', (req, res) => {
  console.log(`User requesting media: ${req.url}`);
  stream.start(`.${req.url.replace(/%20/g, " ")}`, req, res);
})

app.get('/*.mkv$', (req, res) => {
  console.log(`User requesting media: ${req.url}`);
  stream.start(`.${req.url.replace(/%20/g, " ")}`, req, res);
})

// Runs only if all previously written functions fail
app.use((req, res, next) => {
  res.send("Error 404: Page not found!");
  console.log(`Request for unavailable page @ ${req.url}`);
})

app.listen(port, () => {
  console.log(`Server started sucesfully. Listening on port ${port}`);
})
