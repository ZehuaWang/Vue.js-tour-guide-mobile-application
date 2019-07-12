//https://www.dofactory.com/javascript/adapter-design-pattern

function Shipping() {
    this.request = function(zipStart,zipEnd, weight) {
        //...
        return "$49.75";
    }
}

function AdvancedShipping() {
    this.login    = function(credentials) {};
    this.setStart = function(start) {};
    this.setDestination = function(destination) {};
    this.calculate = function(weight) {return "$39.50";};
}

function ShippingAdapter(credentials) {
    var shipping = new AdvancedShipping();

    shipping.login(credentials);

    return {
        request : function(zipStart, zipEnd, weight) {
            shipping.setStart(zipStart);
            shipping.setDestination(zipEnd);
            return shipping.calculate(weight);
        }
    }
}

var log = (function () {
    var log = "";
 
    return {
        add: function (msg) { log += msg + "\n"; },
        show: function () { console.log(log); log = ""; }
    }
})();

function run() {
    var shipping = new Shipping();
    var credentials = {token: "30a8-6ee1"};
    var adapter = new ShippingAdapter(credentials);

    var cost = shipping.request("78701","10010","2 lbs");
    log.add("Old Cost: " + cost);

    cost = adapter.request("78701", "10010", "2 lbs");
    log.add("New cost: " + cost);

    log.show();
}

run();