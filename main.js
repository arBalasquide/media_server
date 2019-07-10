var http = require('http');
var fs = require('fs');
var upload = require('upload');
var download = require('download');
var stream = require('stream');

function send404Response(response){
  response.writeHead(404, {"Content-Type": "text/plain"});
  response.write("Error 404: Page not found!");
  response.end();
}

function onRequest(request, response){
  console.log(request.method + " request for " + request.url);
  if(request.method == 'GET' && request.url == '/'){
    response.writeHead(200, {"Content-Type": "text/plain"});
    fs.createReadStream("./index.html").pipe(response);
  }
  else if(request.method == 'GET' && request.url == '/media'){
    // show page
    // webscrape imbd for media info / picture inb4 'plex already does it'
    // check if they click to download/stream/upload
    //
    // if(request == stream)stream(media);
    // else if(request == download)download(media);
    //etc
  }
  else{
    send404Response(response);
  }
}

http.createServer(onRequest).listen(8080);
console.log("Server started sucesfully.");
