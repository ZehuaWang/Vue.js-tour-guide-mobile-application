var path = require('path');

var completePath = '/foo/bar/bas.html';

console.log(path.dirname(completePath) );
console.log(path.basename(completePath));
console.log(path.extname(completePath) );