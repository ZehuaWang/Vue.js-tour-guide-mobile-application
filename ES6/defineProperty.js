function Product(name, price) {
	this.name = name;
	this.price = price;

	var _discount; // private member
	Object.defineProperty(this, "discount", {
		get: function() {return _discount; },
		set: function(value) {_discount = value; if(_discount > 80) _discount = 80;}
	})
}

var sneakers = new Product("Sneakers",20);
sneakers.discount = 50;
sneakers.discount +=20;
sneakers.discount +=20;

console.log(sneakers.discount);