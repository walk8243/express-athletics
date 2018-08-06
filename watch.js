module.exports = (async () => {
  const js    = require('./module/js'),
        sass  = require('./module/sass'),
        watch = require('./module/watch');

  // sassを監視して、コンパイル
  var sassFiles = await sass.getSassFiles(),
      renderingSassFiles = await sass.getRenderingSassFiles();
  if(sassFiles.length) {
    sass.render(renderingSassFiles);
    watch.watchFile(sassFiles, (() => {sass.render(renderingSassFiles)}));
  }

  // jsを監視して、圧縮
  var jsFiles = await js.getJsFiles();
  if(jsFiles.length) {
    js.compress(jsFiles);
    watch.watchFile(jsFiles, (() => {js.compress(jsFiles)}));
  }
})();
