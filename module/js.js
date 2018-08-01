/*
 * 外部モジュール
 */
const fs = require('fs'),
      uglifyJS = require("uglify-js");

/*
 * ユーザ定義モジュール
 */
const func  = require('./func');

/*
 * 変数
 */
const jsCond  = new RegExp('^(?!.+\\.min\\.js$).+\\.js$');


async function getJsFiles(path = './public/js') {
  return await func.searchCriteriaFile(path, jsCond);
}

function compressJs(file) {
  if(!fs.statSync(file).isFile()) {
    // パスが存在しない場合 or ファイルでない場合
    throw new ReferenceError('Path doesn\'t exist or isn\'t file.');
  }

  var result = uglifyJS.minify(fs.readFileSync(file, 'utf8'), {
    compress: true,
    mangle: true
  });
  if(result.err) throw result.err;
  fs.writeFile(file.replace(/\.js$/, ".min.js"), result.code, err => {
    if(err) throw err;
  });
}

function compress(target = []) {
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

  for (let path of target) {
    if(fs.statSync(path).isFile()) {
      if(path.match(jsCond)) {
        compressJs(path);
        return;
      } else {
        // レンダリング対象でない場合
        // throw new Error();
        continue;
      }
    } else {
      // パスが存在しない場合 or ファイルでない場合
      throw new ReferenceError('Path doesn\'t exist or isn\'t file.');
    }
  }
}

module.exports = js = {
  getJsFiles,
  compressJs,
  compress,
}
