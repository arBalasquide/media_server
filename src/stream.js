var fs = require('fs');

exports.start = function(req, res){

  const path = '.'+req.url.replace(/%20/g, ' '); // %20 = " "
  const stats = fs.statSync(path); // stores all the stats of the file
  const fileSize = stats.size;
  const range = req.headers.range; // HTTP allows to send a range of data

  if(range) {
    const parts = range.replace(/bytes=/, "").split("-")
    const start = parseInt(parts[0], 10)
    const end = parts[1]
      ? parseInt(parts[1], 10)
      : fileSize-1
    const chunksize = (end-start)+1
    const file = fs.createReadStream(path, {start, end})
    const head = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-type' : `video/mp4`,
    }
    res.writeHead(206, head);
    file.pipe(res);
  } else {
    const head = {
      'Content-Length': fileSize,
      'Content-Type': `video/mp4`,
    }
    res.writeHead(200, head)
    fs.createReadStream(path).pipe(res)
  }
};
