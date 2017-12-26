
const { Yberri } = require('./Yberri');
const { bodyParserMiddleware } = require('.');


function errorHandler(request, response, ...args) {
  response.end('error occured');
}
const authenticate = (handler, request, response, ...args) => {
  return Promise.reject(errorHandler);
}
const y =  Yberri()
  .applyMiddleware(bodyParserMiddleware)
  //.applyMiddleware(authenticate);



y.route('/home', homeHandler, methods=['GET', 'POST']);
y.route('/home', putHandler, methods=['PUT']);
y.route('/home/<person>', personHandler, methods=['PUT']);

function personHandler(request, response, person) {
  response.setHeader('love', 'islove');
  response.jsonify({name: 'robus'});
}

function putHandler(request, response) {
  response.jsonify({'putter' :'putty'})
}

function homeHandler(request, response) {
  //response.write(response.body);
  response.end('hey there');

}

y.run('localhost', 5000);


// //y.run('localhost', 5000);
// let p = () =>  Promise.resolve('this is a resolce promise')
// let another = () =>new Promise((resolve, reject) => setTimeout(resolve, 1000, 'another prmise'));
// let next = () => new Promise((resolve, reject) => setTimeout(resolve, 1000, 'another'));

// let next2 = () => new Promise((resolve, reject) => setTimeout(resolve, 1000, 'another'));

// let next4 = () => new Promise((resolve, reject) => setTimeout(resolve, 1000, 'another'));

// let next5 = () => new Promise((resolve, reject) => setTimeout(resolve, 1000, 'another'));

// let a = [p, another, next, next2, next4]

// console.log(a.map(func => func()));

// function returnPromise(alist) {
//   if (alist.length == 1) {
//     return alist[0]()
//   } else {
//     return alist[0]().then(val => { console.log(val); return returnPromise(alist.slice(1))})
//   }
// }

// returnPromise(a)
// .then(val => console.log(val));

