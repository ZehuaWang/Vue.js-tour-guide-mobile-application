var myCar = {
    name : "Ford",
    drive : function() {
        console.log("I am driving");
    },
    stop: function() {
        console.log("Stop the car");
    }
}

var yourCar = Object.create(myCar);

yourCar.name = "Honda";

console.log(yourCar.name);