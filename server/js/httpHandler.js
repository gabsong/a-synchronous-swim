const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');

// Path for the background image ///////////////////////
module.exports.backgroundImageFile = path.join('.', 'background.jpg');
////////////////////////////////////////////////////////

let messageQueue = null;
module.exports.initialize = (queue) => {
  messageQueue = queue;
};

module.exports.router = (req, res, next = ()=>{}) => {
  console.log('Serving request type ' + req.method + ' for url ' + req.url);
  // console.log('request:', req);
  if (req.method === 'OPTIONS' && req.url === '/') {
    res.writeHead(200, headers);
    // console.log('response:', res);
    res.end();
  }

  if (req.method === 'GET' && req.url === '/') {
    if (!messageQueue) {
      res.writeHead(200, headers);
      res.end();
    } else {
      res.writeHead(200, headers);
      // console.log('response:', res);
      res.end(messageQueue.dequeue());
    }
  }

  if (req.method === 'GET' && req.url === '/background.jpg') {
    if (fs.existsSync(module.exports.backgroundImageFile)) {
      res.writeHead(200, headers);
      const bg = fs.createReadStream(module.exports.backgroundImageFile);

      bg.on('open', () => {
        // find out what pipe does...
        bg.pipe(res);
      });

    } else {
      res.writeHead(404, headers);
      res.end();
    }
  }

  // handle POST requests

  next(); // invoke next() at the end of a request to help with testing!
};
