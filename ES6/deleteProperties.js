var myobj = new Object;
myobj.a = 5;
myobj.b = 12;

delete myobj.a;
console.log("a" in myobj);