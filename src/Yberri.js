//yberri main app
const http = require('http');

const { ServerResponse } = http; 

const { 
  Task, 
  zip,
  promiseChainResolver,
} = require('./utils');

const { 
  RouteGraph,
  findNodeFromGraph,
  listOfPaths
} = require('./RouteGraph');

const { augmentResponse } = require('./YberriResponse');
augmentResponse(ServerResponse);


const argsForHandler = (xs, ys) =>
  zip(xs, ys)
  .filter(([x, y]) => x.startsWith('<') && x.endsWith('>'))
  .reduce((acc, [x, y]) => ({...acc, [x.slice(1, x.length - 1)]: y}), {})



const Yberri = () => 
  new (class {
  
  constructor() {
    this._handler = this._handler.bind(this);
    this._http = http.createServer(this._handler);
    //create and instance of thr route graph
    this._routeGraph = RouteGraph();
    this._findNode = findNodeFromGraph(this._routeGraph);
    this._middlewares = [];
  }
  
  _handler(request, response) {
  
    const routeNode = this._findNode(request.url);
    if (!routeNode) {
      response.end(`No handler found in ${request.url}`);
    } else if (routeNode && !routeNode.handlerFunctionMap[request.method]) {
      
      response.end(`No handler Function in ${request.url}`)
    } else {
      
      const variablePath = argsForHandler(routeNode.absolutePaths, listOfPaths(request.url));
      const handlerFunction = routeNode.handlerFunctionMap[request.method];
      request.variablePath = variablePath;
      

      if(this._middlewares.length >= 1) {
        promiseChainResolver(
          this._middlewares,
          handlerFunction,
          request,
          response,
        ).then(([
          handlerFunction,
          request,
          response,
        ]) => handlerFunction(request, response))
        .catch(errorHandler => {
          if(typeof errorHandler === 'function') {
            errorHandler(request, response)
          } else {
            throw new Error('errorHandler')
          }
        })
        
      
    } else {
        handlerFunction(request, response);
      }
    }
  }

  route(path, handler, methods=['GET']) {
    //put the path and the handler 
    this._routeGraph.add(path, handler, methods);
    return this;
  }

  applyMiddleware(func) {
    this._middlewares.push(func);
    return this;
  }
  
  run(host, port, onSuccess=() => console.log(`Server Running on host ${host} and port ${port} ...`)) {
    this._http.listen(port, host, onSuccess);
  }
})();

module.exports = {
  Yberri,
};