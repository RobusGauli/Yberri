const http = require('http');
const { Task, zip } = require('./utils');
const { RouteGraph, findNodeFromGraph, listOfPaths } = require('./RouteGraph');


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
  }
  
  _handler(request, response) {
  
    const routeNode = this._findNode(request.url);
    
    if (!routeNode) {
      response.end(`No handler found in ${request.url}`);
    } else if (routeNode && !routeNode.handlerFunction) {
      
      response.end(`No handler Function in ${request.url}`)
    } else {
      
      const args = argsForHandler(routeNode.absolutePaths, listOfPaths(request.url));
      const handlerFunction = routeNode.handlerFunction;
      handlerFunction(request, response, ...args);
    }
  }

  route(path, handler) {
    //put the path and the handler 
    this._routeGraph.add(path, handler);
  }
  
  run(host, port, onSuccess=() => console.log('Server Running...')) {
    this._http.listen(port, host, onSuccess);
  }
})();

module.exports = {
  Yberri,
};