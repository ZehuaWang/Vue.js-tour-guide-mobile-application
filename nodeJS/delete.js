var fs = require('fs');
fs.unlink('./config/test.txt', err => {
    if(err) {console.log('Error: ', err);}
    else {console.log('test.txt deleted successfully');}
})