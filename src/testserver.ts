import http = require('http');
import fs = require('fs');


// This is a very simple http server for testing purposes only

http.createServer(function (req, res) {
    console.log(req.url);
  
  let fileResMap = {
      "/": "../test/test.html",
      "/dist/test.js": "../dist/test.js",
      "/bower_components/knockout/dist/knockout.debug.js":
        "../bower_components/knockout/dist/knockout.debug.js",
        "/dist/test/testViewModel.js": "../dist/test/testViewModel.js"
  }
  if(fileResMap[req.url]) {
      res.setHeader("Content-Security-Policy", "default-src 'self'");
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(fs.readFileSync(fileResMap[req.url]), "utf-8");
      res.end();
  }
  else {
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.write("Not found", "utf-8");
      res.end();
  }
}).listen(9615);