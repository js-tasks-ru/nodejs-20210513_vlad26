const url = require('url');
const http = require('http');
const path = require('path');
const fs = require('fs');


const server = new http.Server();

server.on('request', (req, res) => {
  const pathname = url.parse(req.url).pathname.slice(1);
  const filepath = path.join(__dirname, 'files', pathname);

  switch (req.method) {
    case 'GET': fs.readFile(filepath, function(error, data) {
      if (error) {
        if ((/\//).test(pathname)) {
          res.statusCode = 400;
          res.end('Resourse not found!');
        } else {
          res.statusCode = 404;
          res.end('Resourse not found!');
        }
      } else {
        res.end(data);
      }
    });

      break;

    default:
      res.statusCode = 501;
      res.end('Not implemented');
  }
});

module.exports = server;
