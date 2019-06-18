function someClass() {
	this.someProperty = 'some initial value';
}

someClass.prototype.someMemberFunction = function() {
	this.someProperty = 'modified value';
}

var instance = new someClass();

console.log(instance.someProperty);
instance.someMemberFunction();
console.log(instance.someProperty);