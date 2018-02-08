var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var qs = require('querystring');
var os = require('os');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public/index.html'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!
console.log(exports.paths.list, "What am i???");

exports.readListOfUrls = function(callback) {
  var urls;
  fs.readFile(exports.paths.list, 'utf-8', function (err, data) {
    if (err) {
      throw err;
    }
    urls = data;
    processUrls(callback);
  });
  function processUrls(callback) {
    urls = urls.split(os.EOL);
    callback(urls);
  }

};

exports.isUrlInList = function(url, callback) {
};

exports.addUrlToList = function(url, callback) {
  
};

exports.isUrlArchived = function(url, callback) {
};

exports.downloadUrls = function(urls) {
};
