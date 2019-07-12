var fs = require('fs');
var path = require('path');

exports.mediafilepath = function (dir, fileTypes, title) {
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

exports.gettitles = function (dir){
  try{
    var names = fs.readdirSync(dir);
  }catch(err){
    console.log("Failed to load media folder.");
  }
  return names;
};
