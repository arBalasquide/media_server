import ffmpeg from 'fluent-ffmpeg'
import fs from 'fs'

exports.start = function(req, stream){
  
  const path = '.' + req.url.replace(/%20/g, ' ') // Path to media, compatible with linux filesystem standard
  const mediaPath = path.split('media/')[1]
  const mediaTitle = mediaPath.split('/')[1]

  const file = fs.createReadStream(path)

  var proc = ffmpeg(file)
  .videoBitrate(1024)
  .videoCodec('libx264')
  .on('end', function() {
    console.log('file has been converted succesfully');
  })
  .on('error', function(err, stdout, stderr) {
    console.log('an error happened: ' + err.message);
    console.log(stdout)
    console.log(stderr)
  })
  .save(`media/${mediaPath}.mp4`);
}
