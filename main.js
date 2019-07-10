var express = require('express');
var fs = require('fs');

const app = express();
const port = 8080;

app.get('/', (req, res) => {
  console.log("request for /");
  res.send("You're at /");
  // fs.createReadStream("./index.html").pipe(res);
})

app.get('/media', (req, res) => {
  // TODO: do something (call some function or other file)
  console.log("request for /media");
  res.send("You're at /media");
})

// Runs only if all previously written functions fail
app.use((req, res, next) => {
  res.send("Error 404: Page not found!");
})

app.listen(port, () => {
  console.log(`Server started sucesfully. Listening on port ${port}`);
})