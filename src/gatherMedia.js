import fs from 'fs'
import path from 'path'
import {PATHS, SUPPORTED_EXTENSIONS} from './constants'


const mediafilepath = (dir, fileTypes, title) => {
  var filesToReturn = [];
  const walkDir = currentPath => {
    let files = fs.readdirSync(currentPath);
    for (var i in files) {
      let curFile = path.join(currentPath, files[i]);
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

const titles = dir => {
  try {
    fs.mkdirSync(dir, { recursive: true })
  } catch (err) {
    if (err.code !== 'EEXIST') throw err
    console.log("Media folder does not exist! Creating it for you.");
  }
  var titles = fs.readdirSync(dir);
  return titles;
};

const files = availablemedia => {
  let media = new Map();
  if(availablemedia === undefined || availablemedia.length == 0){
    console.log("No media found...");
  }
  else{
    availablemedia.forEach(title => {
      let files = mediafilepath(PATHS.MEDIA_PATH, SUPPORTED_EXTENSIONS.VIDEO, title);
      media.set(title, files);
    });
    return media;
  }
};

export default () => {
  const mediaTitles = titles(PATHS.MEDIA_PATH);
  const mediaFiles = files(mediaTitles);
  return {
    mediaTitles,
    mediaFiles
  };
}
