var ratePerYear = 2.85 / 100;

var ratePerMonth = ratePerYear / 12;

var principal = 247000;

var payYear = 25;

var payTime = payYear * 12;

function rate(p, r, n) {
    var m;
    m = p * r * Math.pow((1 + r), n) / (Math.pow(1 + r, n) - 1);
    return m;
}

// Design a function to get the related month payment for different mortage supplier
function totalPay(paytime, monthlyPay) {
    var total = paytime * monthlyPay;
    return total;
}


console.log(rate(principal, ratePerMonth, payTime));

console.log(totalPay(payTime, rate(principal, ratePerMonth, payTime)));