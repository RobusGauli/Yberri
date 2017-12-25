const { Task, enumerate } = require('./utils');

const RouteNode = (route, handlerFunction=null) => ({
  route,
  handlerFunction,
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



class RouteGraph {
  constructor() {
    this._rootNode = RouteNode('/')
  }

  add(paths, handlerFunction) {

    const pathList = listOfPaths(paths);
    let currentPaths = [];
    
    if (!pathList) {
      //if this is the root path
      //then place it in the root route path
      this._rootNode.handlerFunction = handlerFunction;
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
        
        if(isVariableRoute(path)) {
          currentNode.variableRouteNode = routeNode;
        } else {
          currentNode.routeChildren[path] = routeNode;
        }
        currentNode = routeNode;
        
        
      }

      if (index === pathList.length - 1) {
        currentNode.handlerFunction = handlerFunction;
      }
    }
  }
}

const r = new RouteGraph();
r.add('/home/person', 'homepeson')
r.add('/home/never', 'never');
r.add('/<home>/love','homelove');
r.add('/<home>/love/<person>/lover', 'koko');
console.log(r);
