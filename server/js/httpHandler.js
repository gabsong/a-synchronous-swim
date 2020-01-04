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

const moves = ['up', 'down', 'left', 'right'];

module.exports.router = (req, res, next = ()=>{}) => {
  console.log('Serving request type ' + req.method + ' for url ' + req.url);

  // give me random el

  let move = moves[Math.floor(Math.random() * Math.floor(4))];





  res.writeHead(200, headers);
  res.end(move);
  next(); // invoke next() at the end of a request to help with testing!
};
