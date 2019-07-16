import express from 'express'
import fs from 'fs'
import path from 'path'
import stream from './stream'
import gatherMedia from './gatherMedia'
import {PATHS, SUPPORTED_EXTENSIONS} from './constants'

const app = express();
const port = 8080;

app.set('view engine', 'pug');

app.get('/', (req, res, next) => {
  console.log("request for /");

  // Update available content
  let media_titles = gatherMedia.titles(PATHS.MEDIA_PATH);
  let media_files = gatherMedia.files(media_titles);

  res.render('index', {titles: media_titles, files: media_files});
})

// Routing for all supported video extensions
SUPPORTED_EXTENSIONS.VIDEO.forEach(path => {
  app.get(`/*${path}$`, (req, res) =>{
    console.log(`User requesting media: ${req.url}`);
    stream.start(req, res);
  })
})

// Route user to 404 page
app.use((req, res, next) => {
  res.send("Error 404: Page not found!");
  console.log(`Request for unavailable page @ ${req.url}`);
})

app.listen(port, () => {
  console.log(`Server started sucesfully. Listening on port ${port}`);
})
