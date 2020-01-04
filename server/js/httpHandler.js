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

  if (req.method === 'OPTIONS' && req.url === '/') {
    res.writeHead(200, headers);
    res.end();
  }

  if (req.method === 'GET' && req.url === '/') {
    if (!messageQueue) {
      res.writeHead(200, headers);
      res.end();
    } else {
      res.writeHead(200, headers);
      // res.write(messageQueue.dequeue());
      res.end(messageQueue.dequeue());
    }
  }

  if (req.method === 'GET' && req.url === '/bg') {
    // if missing background image
    // console.log(module.exports.backgroundImageFile);
    // console.log(backgroundImageFile);
    // console.log(this.backgroundImageFile);

    if (!fs.stat(module.exports.backgroundImageFile)) {
      res.writeHead(404, headers);
      res.end();
    } else {
      res.writeHead(200, headers);
      res.end()
    }
  }

  // handle POST requests

  next(); // invoke next() at the end of a request to help with testing!
};
