/*
 * 外部モジュール
 */
const nodeSass  = require('node-sass'),
      fs    = require('fs');

/*
 * ユーザ定義モジュール
 */
const func  = require('./func');

/*
 * 変数
 */
const sassCond  = new RegExp('.+\\.(sass|scss)'),
      renderingSassCond = new RegExp('^[^\\_].+\\.(sass|scss)');


async function getSassFiles(path = './sass') {
  return await func.searchCriteriaFile(path, sassCond);
}
async function getRenderingSassFiles(path = './sass') {
  return await func.searchCriteriaFile(path, renderingSassCond);
}

function renderSass(file) {
  if(!fs.statSync(file).isFile()) {
    // パスが存在しない場合 or ファイルでない場合
    throw new ReferenceError('Path doesn\'t exist or isn\'t file.');
  }

  var outputFilename = file.replace(/\.(sass|scss)/, '.css').replace("/sass", "/public/css");
  nodeSass.render({
    file: file,
    outputStyle: "compressed",
    outputFile: outputFilename
  }, (err, result) => {
    if(err) throw err;
    fs.writeFile(outputFilename, result.css, err => {
      if(err) throw err;
    });
  });
}

function render(target = []) {
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
      if(path.match(renderingSassCond)) {
        renderSass(path);
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

module.exports = sass = {
  getSassFiles,
  getRenderingSassFiles,
  renderSass,
  render,
}
