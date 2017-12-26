# Yberri-minimalist 🚀

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
  function echoName(request, response, name) {
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
  function echoName(request, response, name, age) {
  	console.log('Do something with age')
  	response.jsonify({ "sane" : name });
  }
  
  //here is your yberri on the rock$roll
  const app = Yberri();
  app.route('/home/<name>/<age>', echoName, methods=['GET', 'POST']);
  app.run('localhost', 4000); // host and port
  
 //seriosuly thats it. 
  

```

## 🎓 License

[MIT](http://webpro.mit-license.org/)





