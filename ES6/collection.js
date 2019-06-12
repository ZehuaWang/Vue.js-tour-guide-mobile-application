// ES6 introduces two new data structures: Maps and Sets.
var map = new Map();
map.set('name','Eric');
map.get('name');

map.set(1,true);
console.log(map.has("1"));

map.set("1",true);
console.log(map.has("1"));

// The set method is chainable
var roles = new Map();
roles.set('r1', 'User') 
.set('r2', 'Guest') 
.set('r3', 'Admin'); 
console.log(roles.has('r1'))


