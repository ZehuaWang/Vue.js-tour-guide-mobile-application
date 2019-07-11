// https://www.dofactory.com/javascript/factory-method-design-pattern
function Factory() {
    this.createEmployee = function (type) {
        var employee;

        if(type === "fulltime") {
            employee = new FullTime();
        } else if(type === "parttime") {
            employee = new PartTime();
        }

        employee.type = type;

        employee.say = function () {
            log.add(this.type + " : rate " + this.hourly + "/hour");
        }

        return employee;
    }
};

var FullTime = function () {
    this.hourly = "$12";
};

var PartTime = function () {
    this.hourly = "$11";
};

var log = (function() {
    var log = "";
    return {
        add:  function(msg) {log += msg + "\n";},
        show: function() {console.log(log); log="";}
    }
})();

function run() {
    var employee = [];
    var factory = new Factory();

    employee.push(factory.createEmployee("fulltime"));
    employee.push(factory.createEmployee("parttime"));

    employee.forEach(e => {
        e.say();
    })

    log.show();
}

run();