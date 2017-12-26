const { Task, enumerate } = require('./utils');

const RouteNode = (route, handlerFunction=null) => ({
  route,
  handlerFunctionMap: {},
  routeChildren: {},
  variableRouteNode: null,
  absolutePaths: null,
  inspect: () => console.log(`RouteNode(${route})`),
});


const listOfPaths = path =>
  Task(path)
  .map(x => x.trim())
  .map(x => x.endsWith('/') ? x.slice(1, x.length - 1) : x.slice(1))
  .map(x => x.split('/'))
  .fold(paths => paths.filter(path => 
    path))

//console.log(pathList('/home/'));

const isVariableRoute = path =>
  Task(path)
  .map(x => x.trim())
  .fold(x => x.startsWith('<') && x.endsWith('>'))



const RouteGraph = () => 
  new (class  {
    constructor() {
      this._rootNode = RouteNode('/')
    }

    add(paths, handlerFunction, methods) {

      const pathList = listOfPaths(paths);
      let currentPaths = [];
      
      if (!pathList) {
        //if this is the root path
        //then place it in the root route path
        for(let method of methods) {
          this._rootNode.handlerFunctionMap[method] = handlerFunction;  
        }
        
        return;
      }
      
      let currentNode = this._rootNode;
      
      for(let [index, path] of enumerate(pathList)) {
        currentPaths.push(path);
        
        if(currentNode.routeChildren.hasOwnProperty(path)) {
          currentNode = currentNode.routeChildren[path];
        } else if (currentNode.variableRouteNode) {
          currentNode = currentNode.variableRouteNode;
        } else {
          //create a new node
          const routeNode = RouteNode(path);
          
          routeNode.absolutePaths = [...currentPaths];
          
          if (isVariableRoute(path)) {
            currentNode.variableRouteNode = routeNode;
          } else {
            currentNode.routeChildren[path] = routeNode;
          }
          currentNode = routeNode;
        }

        if (index === pathList.length - 1) {
          for(let method of methods) {
            currentNode.handlerFunctionMap[method] = handlerFunction;
          }
        }
      }
    }
  })();

const _findNode = (node, paths, currentIndex = 0) => {
  
  if (!paths || currentIndex === paths.length) {
    return node;
  }
  let nextNode = node.routeChildren[paths[currentIndex]];
  if (!nextNode) {
    if (node.variableRouteNode === null) {
      return null;
    }
    nextNode = node.variableRouteNode;
  }
  
  return _findNode(nextNode, paths, currentIndex+1);
}

const findNodeFromGraph = routeGraph => 
  paths =>
    _findNode(routeGraph._rootNode, listOfPaths(paths));


module.exports = {
  RouteGraph,
  findNodeFromGraph,
  listOfPaths,
};






