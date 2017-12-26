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
  .map(([x, y]) => y)



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
    console.log(request.method);
    console.log(routeNode);
    if (!routeNode) {
      response.end(`No handler found in ${request.url}`);
    } else if (routeNode && !routeNode.handlerFunctionMap[request.method]) {
      
      response.end(`No handler Function in ${request.url}`)
    } else {
      
      const args = argsForHandler(routeNode.absolutePaths, listOfPaths(request.url));
      const handlerFunction = routeNode.handlerFunctionMap[request.method];

      if(this._middlewares.length >= 1) {
        promiseChainResolver(
          this._middlewares,
          handlerFunction,
          request,
          response,
          ...args
        ).then(([
          handlerFunction,
          request,
          response,
          ...args
        ]) => handlerFunction(request, response, ...args))
        .catch(errorHandler => 
          errorHandler(request, response, ...args))
        
      
    } else {
        handlerFunction(request, response, ...args);
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
  
  run(host, port, onSuccess=() => console.log('Server Running...')) {
    this._http.listen(port, host, onSuccess);
  }
})();

module.exports = {
  Yberri,
};