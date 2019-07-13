var fs = require('fs');
var path = require('path');
import {PATHS, SUPPORTED_EXTENSIONS} from './constants'


function mediafilepath(dir, fileTypes, title) {
  var filesToReturn = [];
  function walkDir(currentPath) {
    var files = fs.readdirSync(currentPath);
    for (var i in files) {
      var curFile = path.join(currentPath, files[i]);
      if (fs.statSync(curFile).isFile() && fileTypes.indexOf(path.extname(curFile)) != -1 && curFile.includes(title)) {
        filesToReturn.push(curFile.replace(dir, ''));
      } else if (fs.statSync(curFile).isDirectory()) {
       walkDir(curFile);
      }
    }
  };
  walkDir(dir);
  return filesToReturn;
};

exports.titles = function (dir){
  try{
    var titles = fs.readdirSync(dir);
  }catch(err){
    console.log("Failed to load media folder.");
  }
  return titles;
};

exports.files = function (availablemedia){
  let media = new Map();
  availablemedia.forEach(title => {
    let files = mediafilepath(PATHS.MEDIA_PATH, SUPPORTED_EXTENSIONS.VIDEO, title);
    media.set(title, files);
  });
  return media;
};
