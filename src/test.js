const { Yberri } = require('./Yberri');

const y =  Yberri();

y.route('/home', homeHandler);

function homeHandler(request, response) {
  response.end('hi there');
}

y.run('localhost', 5000);
