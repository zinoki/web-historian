var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var http = require('http');
var headers = require('./http-helpers');
var qs = require('querystring');
var os = require('os');
// require more modules/folders here!

// exports.handleRequest = function (req, res) {
// var url = req.url;
// var method = req.method;
  

//   if (url === '/' && method === 'GET') {
   
//     fs.readFile(archive.paths.siteAssets, function(err, html) {
//       if (err) {
//         throw err;
//       }
//       res.writeHead(200, headers.headers);
//       res.write(html);
//       res.end(JSON.stringify());

//     });

//   } else if (method === 'POST') {

//     var body = "";
//     req.on('data', function(data) {
    
//       body += data;
//     });

//     req.on('end', function() {

//       var fixtureName = qs.parse(body).url;
//       var sliced = fixtureName.slice(4, fixtureName.length - 4);
//       var fixturePath = archive.paths.archivedSites + '/' + sliced;
     
//       // Create or clear the file.
//       var fd = fs.openSync(fixturePath, 'w');
//       fs.writeSync(fd, sliced);
//       fs.closeSync(fd);

//       // Write data to the file.
//       fs.writeFileSync(fixturePath, fixtureName);

//       // make our response
//       //sendResponse(res, body, 200);
//       res.writeHead(200, headers.headers);
    
//       //res.write(sliced);
//       res.end(sliced);
//     });
//     // res.writeHeader(200, {"Content-Type": "text/html"});
//     // res.end();
//   } else {
//     res.writeHeader(404, null);
//     res.end();
//   }
// };


var sendResponse = function(response, data, statusCode) {
  statusCode = statusCode || 200;
  response.writeHead(statusCode, headers.headers);
  response.end(JSON.stringify(data));
};

var actions = {
  'GET': function(req, res) {
    
    fs.readFile(archive.paths.siteAssets, function(err, html) {
      if (err) {
        throw err;
      }
      
      res.writeHeader(200, {"Content-Type": "text/html"});
      res.write(html);
      //sendResponse(res, html);
      res.end();
    });
  },

  'POST': function(req, res) {
    // collectData(req, function(query) {
    var body = "";
    req.on('data', function(data)  {
      body += data;
    });
    req.on('end', function() {
      var fixtureName = qs.parse(body).url;
      var sliced = fixtureName.slice(4, fixtureName.length - 4);
      var fixturePath = archive.paths.archivedSites + '/' + sliced;
      //var toSitesText = archive.paths.archivedSites + '/' + 'sites.txt';

      fs.appendFileSync(archive.paths.list, fixtureName + os.EOL);
     
      // Create or clear the file.
      var fd = fs.openSync(fixturePath, 'w');
      fs.writeSync(fd, sliced);
      fs.closeSync(fd);

      // Write data to the file.
      fs.writeFileSync(fixturePath, fixtureName);
      sendResponse(res, null);
    });
  }
};
exports.handleRequest = function (req, res) {
  // var url = req.url;
  // var method = req.method;

  var action = actions[req.method];
  if(action) {
    action(req, res);
  } else {
    sendResponse(res, "Not Found", 404);
  }
};