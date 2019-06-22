var util = require('util');
util.log('sample message');

var name = 'nate';
var money= 33;

console.log(util.format('%s has %d dollars', name, money));