// https://www.dofactory.com/javascript/proxy-design-pattern
function GeoCoder() {
    this.getLatLng = function(address) {
        if (address === "Amsterdam") {
            return "52.3700° N, 4.8900° E";
        } else if (address === "London") {
            return "51.5171° N, 0.1062° W";
        } else if (address === "Paris") {
            return "48.8742° N, 2.3470° E";
        } else if (address === "Berlin") {
            return "52.5233° N, 13.4127° E";
        } else {
            return "";
        }
    };
}

function GeoProxy() {
    var geocoder = new GeoCoder();
    var geocache = {};

    return {
        getLatLng: function(address) {
            if(!geocache[address]) {
                geocache[address] = geocoder.getLatLng(address);
            }
            log.add(address + ": " + geocoder.getLatLng[address]);
            return geocache[address];
        },
        getCount: function() {
            var count = 0;
            for(var code in geocache) {count++;}
            return count;
        }
    }
}

// log helper
 
var log = (function() {
    var log = "";
 
    return {
        add: function(msg) { log += msg + "\n"; },
        show: function() { console.log(log); log = ""; }
    }
})();

function run() {
    var geo = new GeoProxy();

    geo.getLatLng("Paris");
    geo.getLatLng("London");
    geo.getLatLng("London");
    geo.getLatLng("London");
    geo.getLatLng("London");
    geo.getLatLng("Amsterdam");
    geo.getLatLng("Amsterdam");
    geo.getLatLng("Amsterdam");
    geo.getLatLng("Amsterdam");
    geo.getLatLng("London");
    geo.getLatLng("London");

    log.add("\nCache size: " + geo.getCount());
    
}

run();

