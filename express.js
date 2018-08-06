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


module.exports = express = {
  config,
  router
};
