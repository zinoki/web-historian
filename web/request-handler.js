var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var http = require('http');

// require more modules/folders here!

exports.handleRequest = function (req, res) {
  fs.readFile('/Users/student/code/hrsf89-web-historian/web/public/index.html', function(err, html) {
    if (err) {
      throw err;
    }
    res.writeHeader(200, {"Content-Type": "text/html"});
    res.write(html);
    res.end();
  })
  //res.end(archive.paths.siteAssets);
};

  // fs.readFile(archive.paths.siteAssets, function(err, html) {
  //   if (err) {
  //     throw err;
  //   }
  //   res.writeHeader(200, {"Content-Type": "text/html"});
  //   res.write(html);
  //   res.end();
  // })