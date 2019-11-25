import express from 'express'
import stream from './stream'
import gatherMedia from './gatherMedia'
import {SUPPORTED_EXTENSIONS} from './constants'
import logger from './console-logger.js'
import expressDefend from 'express-defend'
import blacklist from 'express-blacklist'

const app = express();
const port = 8080;

app.use(blacklist.blockRequests('blacklist.txt'));
app.use(expressDefend.protect({
  maxAttempts: 1,                // number of attempts until their connection is dropped, if dropSuspiciousRequest is ON 
  dropSuspiciousRequest: true,   // returns 403 for the IP after maxAttempts
  consoleLogging: true,
  logFile: 'suspicious.log',
  onMaxAttemptsReached: function(ip, url){
    console.log(`${ip} is suspicious. Reached maximum threshold with URL @ ${url.replace('::ffff:', '')}`);
    blacklist.addAddress(ip); // Log the suspicious IP into express-blacklist and prevent connections
  }
}))

app.set('view engine', 'pug');

app.get('/', (req, res, next) => {
  // Replace ::ffff: because req.connection prepends that before showing IP
  logger.log(`Request for / @ ${req.connection.remoteAddress.replace('::ffff:', '')}`);
 
  // Refreshes the available media
  const {
    mediaTitles: titles,
    mediaFiles: files
  } = gatherMedia();

  res.render('index', {titles, files});
})

// Routing for all supported video extensions
SUPPORTED_EXTENSIONS.VIDEO.forEach(path => {
  app.get(`/*${path}$`, (req, res) =>{
    logger.log(`User requesting media: ${req.url}`);
    stream.start(req, res);
  })
})

// Route user to 404 page
app.use((req, res, next) => {
  res.send("Error 404: Page not found!");
  logger.log(`Request for unavailable page ${req.url} from IP ${req.connection.remoteAddress.replace('::ffff:', '')}`);
})

app.listen(port, () => {
  logger.log(`Server started sucesfully. Listening on port ${port}`);
})
