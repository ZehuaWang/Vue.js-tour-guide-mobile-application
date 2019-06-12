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
console.log(roles.has('r1'));

for(let r of roles.entries())
	console.log(`${r[0]} : ${r[1]}`);

console.log(map.get('name'));


// Weak Maps
// Its keys must be objects.
// Keys in a weak map can be Garbage collected
// A weak map cannot be iterated or cleared.
let weakMap = new WeakMap();
let obj = {};
console.log(weakMap.set(obj,"hello"));
console.log(weakMap.has(obj));
console.log(weakMap.get(obj));
