var a = 1, b=2, c=3;
var x = {x:4,y:5,z:6};

var obj = {a,b,c, ...x};

console.log(obj);