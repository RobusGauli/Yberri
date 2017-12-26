
//a sample middleware to apply to the request
//this simply parses the body from the readable streams
//and resolve on the 'end' event from the stream
const http = require('http');
const { Task } = require('./utils');

function bodyParserMiddleware(handler, request, response, ...args) {
  //request.setEncoding('utf8');
  let data = '';
  request.setEncoding('utf8');
  return new Promise((resolve, reject) => {
    request.on('data', chunk => {
      data += chunk;
    })
  
    request.on('end', () => {
      response.body = data;
      resolve([handler, request, response, ...args]);
    })
    
    request.on('close', () => {
      reject(bodyParserErrorHandler);
    })
  })
}

function bodyParserErrorHandler(request, response, ...args) {
  response.writeHead(203, {
    'Content-Type': 'application/json',
  });
  let message = {
    status: 'fail',
    message: http.STATUS_CODES[203],
  }
  response.end(JSON.stringify(message));
}

module.exports = {
  bodyParserMiddleware,
}