# Yberri-minimalist 🚀 🚀 🚀


Yberri is a microframework for Node-js based on tries based robust routing, easy middleware binding, and plus made with sane intention.

### Installation

```shell
npm install yberri --save
```

### Yberri is FUN. (Flask friendly for python genius) ▶️ 
Basic useful feature list:

```javascript

  const { Yberri } = require('yberri');
  
  //handler
  function home(request, response) {
  	response.jsonify({"sane" : "fun"});
  }
  
  //here is your yberri on the rock$roll
  const app = Yberri();
  app.route('/home', home);
  app.run('localhost', 4000); // host and port
  
 //seriosuly thats it. 
  

```


### Robust Routing
Routing is based on the tries algorithm, so handler dispatch for routes is blazingly fast.
```javascript

  const { Yberri } = require('yberri');
  
  //handler
  function echoName(request, response) {
    // value of dynamic path
    const { name } = request.variablePath;
  	response.jsonify({ "sane" : name });
  }
  
  //here is your yberri on the rock$roll
  const app = Yberri();
  app.route('/home/<name>', echoName);
  app.run('localhost', 4000); // host and port
  
 //seriosuly thats it. 
  

```

### Slim Method Mapping 
Routing is based on the tries algorithm, so handler dispatch for routes is blazingly fast.
```javascript

  const { Yberri } = require('yberri');
  
  //handler is called for GET and POST
  function echoName(request, response) {
  	response.jsonify({ 'getpost': 'method for both get and post' });
  }
  
  //here is your yberri on the rock$roll
  const app = Yberri();
  app.route('/home', echoName, methods=['GET', 'POST']);
  app.run('localhost', 4000); // host and port
  
 //seriosuly thats it. 
  

```

### Apply Body Parser middleware and get the content of the request with ease. 

```javascript

  const { Yberri, bodyParserMiddleware } = require('yberri');
  
  //middleware to your root of the app
  const app = Yberri()
    .applyMiddleware(bodyParserMiddleware);
    
  
  //handler for POST
  function echoPostRequest(request, response, name, age) {
    const body = response.body;
    console.log('Do something with  body of the request')
 	  response.jsonify({ "sane" : body });
  }
  
  
  
  
  app.route('/home/<name>/<age>', echoName, methods=['POST']);
  app.run('localhost', 4000); // host and port
  
 //Boom no extra layer of library to just parse a body. 
  

```

## Want more features?? Write your own cool middleware and send a pull request. Plug and Play is the key! Have fun!!
## 🎓 License

[MIT](http://webpro.mit-license.org/)





