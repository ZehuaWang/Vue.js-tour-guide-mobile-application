var func = new Function("x","y","return x*y");
function product() {
	let result;
	result = func(10,20);
	console.log("The product : " + result);
}
product();