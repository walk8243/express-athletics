var Express = require('express');
var configFile = require('config');


function config(key = NULL) {
  switch (key) {
    case 'app':
      return configFile[key];
    default:
      return configFile;
  }
}

function router() {
  return Express.Router();
}


function render(res, views, locals = {}) {
  locals.app = configFile.app;
  res.render(views, locals);
}


module.exports = express = {
  config,
  render,
  router
};
