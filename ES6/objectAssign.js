//Object.assign() method is used to copy the values of all enumerable own properties from one or 
//more source objects to a target object. It will return the target object.
"use strict"

var det  = {name:"Tom", ID:"E1001"};
var copy = Object.assign({},det);
console.log(copy);
for(let val in copy) {console.log(copy[val]);}