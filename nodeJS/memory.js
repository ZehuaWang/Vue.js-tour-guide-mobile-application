var os = require('os');
var gigaByte = 1 / (Math.pow(1024,3));
console.log('Total Memory', os.totalmem() * gigaByte, 'GBs');
console.log('Available Memory', os.freemem() * gigaByte, 'GBs');
console.log('Percent consumed', 100 * (1 - os.freemem() / os.totalmem()));
console.log('This machine has', os.cpus().length, 'CPUs');