var fs = require('fs');

fs.writeFileSync('./config/test.txt', 'Hello fs!');
console.log(fs.readFileSync('./config/test.txt').toString());