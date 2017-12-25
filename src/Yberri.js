const { Task } = require('./utils');


class Yberri {
  
  constructor() {
    
    //this._http = http.createServer(this._handler);
    this._path_handler = {}
    this._handler = this._handler.bind(this);
    this._http = http.createServer(this._handler);
  }

  

  _handler(request, response) {
    //we have the mapper herer
    //get the handler
    //const _handlerFunction = this._path_handler[request.url]
    if (!this._path_handler.hasOwnProperty(request.url)) {
      response.end(`No handler found in ${request.url}`)
    } else {
      let _func = this._path_handler[request.url];
      response.end(_func());
    } 
  }

  route(path, handler) {
    //put the path and the handler 
    this._path_handler[path] = handler;
  }
  
  run(host, port, onSuccess=() => console.log('Runngin')) {
    this._http.listen(port, host, onSuccess);
  }
}


