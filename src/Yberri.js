const http = require('http');
const { Task, zip } = require('./utils');
const { RouteGraph, findNodeFromGraph, listOfPaths } = require('./RouteGraph');


const argsForHandler = (xs, ys) =>
  zip(xs, ys)
  .filter(([x, y]) => x.startsWith('<') && x.endsWith('>'))
  .map(([x, y]) => y)

class Yberri {
  
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
      //that means we havee the handler function
      response.end(`No handler Function in ${request.url}`)
    } else {
      //we have the routeNode with the hander
      //console.log(listOfPaths(request.url));
      //console.log(routeNode.absolutePaths);
      const args = argsForHandler(routeNode.absolutePaths, listOfPaths(request.url));
      const handlerFunction = routeNode.handlerFunction;
      response.end(handlerFunction(request, response, ...args));
    }
  }

  route(path, handler) {
    //put the path and the handler 
    this._routeGraph.add(path, handler);
  }
  
  run(host, port, onSuccess=() => console.log('Runngin')) {
    this._http.listen(port, host, onSuccess);
  }
}


// //test
// let y = new Yberri();
// y.run('localhost', 4000);
// y.route('/home', test);
// y.route('/home/love', test);
// y.route('/home/<id>', main);
// y.route('/home/<name>/<age>', anotherAwesome);

// function test(request, response) {
//   console.log(request.url);
//   return 'hi this is a test function';
// }

// function main(request, response, id) {
//   console.log(id);
//   return `Hi from the dynamic routing overhead ${id}`
  
// }

// function anotherAwesome(request, response, name, age) {
//   return `HI have thre dyn ${name} and ${age};`
// }
module.exports = {
  Yberri,
};