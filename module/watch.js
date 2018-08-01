/*
 * 外部モジュール
 */
const fs = require('fs');


function watchFile(target = [], func) {
  if(!Array.isArray(target)) {
    if(typeof target === 'string') {
      target = new Array(target);
    } else {
      // 配列でもファイル単体でもない場合
      throw new TypeError('`target` is neither an array nor a single file.');
    }
  } else if(target.length == 0) {
    // ファイルが指定されなかった場合
    throw new TypeError('`target` is not specified.');
  }

  for(let file of target) {
    if(fs.statSync(file).isFile()) {
      fs.watchFile(file, (current, previous) => {
        func();
      });
    } else {
      // パスが存在しない場合 or ファイルでない場合
      throw new ReferenceError('Path doesn\'t exist or isn\'t file.');
    }
  }
}

module.exports = watch = {
  watchFile,
}
