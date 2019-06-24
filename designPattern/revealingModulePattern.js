var Exposer = (function() {
    var privateVariable = 10;

    var privateMethod = function() {
        console.log('Inside a private method');
        privateVariable++;
        console.log(privateVariable);
    }

    var methodToExpose = function() {
        console.log('This is a method I want to expose');
    }

    var otherMethodIwantToExpose = function() {
        privateMethod();
    }

    return {
        first : methodToExpose,
        second: otherMethodIwantToExpose 
    };

})();

Exposer.first();
Exposer.second();
Exposer.methodToExpose;