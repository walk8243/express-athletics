const fs = require('fs');


var searchCriteriaFile = (path, filter) => new Promise((resolve, reject) => {
  fs.readdir(path, async (err, files) => {
    if(err) reject(err);
    var fileList = files.filter(file => {
      return fs.statSync(`${path}/${file}`).isFile() && file.match(filter);
    }).map(file => `${path}/${file}`);

    var dirList = files
                    .filter(file => fs.statSync(`${path}/${file}`).isDirectory())
                    .map(dir => `${path}/${dir}`);
    for(let dirPath of dirList) {
      Array.prototype.push.apply(fileList, await searchCriteriaFile(dirPath, filter));
    }

    resolve(fileList);
  });
});


module.exports = func = {
  searchCriteriaFile,
};
