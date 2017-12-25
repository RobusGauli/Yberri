
class _Task {
  constructor(value) {
    this._value = value;
  }

  map(_function) {
    //apply the transformation and return the _isntance
    this._value = _function(this._value);
    return this;
  }

  fold(_function) {
    this._value = _function(this._value);
    return this._value;
  }

}

const Task = domain =>
  new _Task(domain);


const zip = (alist, blist) =>
  alist.reduce((acc, val, index) =>
    [...acc, [val, blist[index]]], []);


const zipWith = (alist, blist, func) =>
  alist.reduce((acc, val, index) => 
    [...acc, func(val, blist[index])], []);


function* enumerate(alist) {
  for(let i = 0; i < alist.length; i++) {
    yield [i, alist[i]];
  }
}

module.exports = {
  Task,
  zip,
  zipWith,
  enumerate,
};


