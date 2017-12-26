//extends the ServerResponse(instance of writable Stream) functionality 

const augmentResponse = (ServerResponse) => {
  ServerResponse.prototype.jsonify = function(plainObject) {
    this.writeHead(200, {
      'Content-Type': 'application/json',
    });

    this.end(JSON.stringify(plainObject));
  }
  return ServerResponse;
}

module.exports = {
  augmentResponse,
};