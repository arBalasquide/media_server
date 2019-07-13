import express from 'express'
import fs from 'fs'
import path from 'path'
import stream from './stream'
import gather from './gathermedia'
import {PATHS, SUPPORTED_EXTENSIONS} from './constants'

const app = express();
const port = 8081;

app.set('view engine', 'pug');

app.get('/', (req, res, next) => {
  console.log("request for /");

  // Update available content 
  let media_titles = gather.titles(PATHS.MEDIA_PATH);
  let media_files = gather.files(media_titles);

  res.render('index', {titles: media_titles, files: media_files});
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

// Runs only if all previously written functions fail
app.use((req, res, next) => {
  res.send("Error 404: Page not found!");
  console.log(`Request for unavailable page @ ${req.url}`);
})

app.listen(port, () => {
  console.log(`Server started sucesfully. Listening on port ${port}`);
})
