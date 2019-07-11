var fs = require('fs');
var path = require('path');

exports.mediafilepath = function (dir, fileTypes) {
  var filesToReturn = [];
  function walkDir(currentPath) {
    var files = fs.readdirSync(currentPath);
    for (var i in files) {
      var curFile = path.join(currentPath, files[i]);
      if (fs.statSync(curFile).isFile() && fileTypes.indexOf(path.extname(curFile)) != -1) {
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
  var names = [];
  fs.readdir(dir, function(err, items) {
   for (var i=0; i<items.length; i++) {
       console.log(`Adding '${items[i]}' to the list of available media.`)
       names.push(items[i]);
   }
   console.log("Gathered list of available media.");
   names.sort();
 });
 return names;
}
