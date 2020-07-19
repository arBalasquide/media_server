import fs from 'fs'
import ffmpeg from 'fluent-ffmpeg'

exports.start = function(req, res){

  const video_path = '.'+req.url.replace(/%20/g, ' ');
  const readStream = fs.createReadStream(video_path);

  readStream.on('open', function() {
    // ffmpeg stream
    var proc = new ffmpeg(video_path)
      .outputOptions(['-movflags isml+frag_keyframe'])
      .toFormat('mp4')
      .withAudioCodec('copy')
      .on('end', function() {
      console.log('Processing finished!');
      })
      .on('error', function(err,stdout,stderr) {
        console.log('an error happened: ' + err.message);
        console.log('ffmpeg stdout: ' + stdout);
        console.log('ffmpeg stderr: ' + stderr);
      })
      .on('progress', function(progress) {
      console.log('Processing: ' + progress.percent + '% done');
      })
      .pipe(res, {end: true});
  });
}
