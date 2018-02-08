var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var http = require('http');
var headers = require('./http-helpers');
var qs = require('querystring');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  var url = req.url;
  var method = req.method;
  console.log(req.url, 'this is the url entered in the search bar');

  if (url === '/' && method === 'GET') {
    fs.readFile(archive.paths.siteAssets, function(err, html) {
      if (err) {
        throw err;
      }
      res.writeHeader(200, {"Content-Type": "text/html"});
      res.write(html);
      res.end();
    });
  } else if(method === 'POST'){
    var body = "";
    req.on('data', function(data) {
      
      //res.writeHeader(200, {"Content-Type": "text/html"});
      //res.write(html);
      body += data;
    
    });
    req.on('end', function() {
      console.log(qs.parse(body));
    });
    res.writeHeader(200, {"Content-Type": "text/html"});
    res.end();
  } else {
    res.writeHeader(404, null);
    res.end();
  }
};
