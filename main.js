var express = require('express');
var fs = require('fs');
var stream = require('./stream');

const app = express();
const port = 8080;

var mediaList = [];

function getMedia(){
  fs.readdir('./media', function(err, items) {
    for (var i=0; i<items.length; i++) {
        console.log(`Adding '${items[i]}' to the list of available media.`)
        mediaList.push({
          key:    items[i],
          value:  fs.statSync('./media/'+items[i])
        });
    }
    console.log("Gathered list of available media.");
    mediaList.sort();
  });
}

app.get('/', (req, res) => {
  console.log("request for /");
  res.send("Main Page been Built");
})

app.get('/*.mp4$', (req, res) => {
  console.log(`User requesting media: ${req.url}`);
  stream.start(`.${req.url}`, "mp4", req, res);
})

// Runs only if all previously written functions fail
app.use((req, res, next) => {
  res.send("Error 404: Page not found!");
})

app.listen(port, () => {
  console.log(`Server started sucesfully. Listening on port ${port}`);
})

getMedia();
