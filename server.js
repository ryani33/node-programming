// We first require our express package
var express = require('express');
var bodyParser = require('body-parser');
var myData = require('./data.js');

// This package exports the function to create an express instance:
var app = express();

app.set('view engine', 'ejs');

// This is called 'adding middleware', or things that will help parse your request
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// This middleware will activate for every request we make to 
// any path starting with /assets;
// it will check the 'static' folder for matching files 
app.use('/assets', express.static('static'));

// Setup your routes here!

app.get("/", function (request, response) { 
    response.render('pages/index');
});

app.get("/api/perMonthRetirementSavings", function (request, response) { 
    if (request.query.years && request.query.perMonth && request.query.interestRate) {
    	try {
	        var res = myData.retirementAmountIfSavingPerMonth(request.query.years, request.query.perMonth, request.query.interestRate);
	        response.render('pages/result', { operationTitle: "Monthly Retirement Savings", result: res,
                type: 1, param1: request.query.years, param2:request.query.perMonth, param3:request.query.interestRate});
        } catch (e) {
            response.status(500).render('pages/error', { error: e});
        }
    } else {
        response.status(500).render('pages/error', { error: "You need provide all three parameters!"});
    }
});

app.get("/api/investedAmount", function (request, response) { 
    if (request.query.years && request.query.initial && request.query.interestRate) {
        try {
	        var res = myData.investedAmountAfterSomeYears(request.query.years, request.query.initial, request.query.interestRate);
	        response.render('pages/result', { operationTitle: "Invested Amount", result: res,
                type: 2, param1: request.query.years, param2:request.query.initial, param3:request.query.interestRate});
        } catch (e) {
            response.status(500).render('pages/error', { error: e});
        }
    } else {
        response.status(500).render('pages/error', { error: "You need provide all three parameters!"});
    }
});

app.get("/api/loanPayoff", function (request, response) { 
    if (request.query.monthlyAmount && request.query.loanAmount && request.query.interestRate) {
        try {
	        var res = myData.monthsToPayOffLoan(request.query.monthlyAmount, request.query.loanAmount, request.query.interestRate);
	        response.render('pages/result', { operationTitle: "Loan Payoff", result: res,
                type: 3, param1: request.query.monthlyAmount, param2:request.query.loanAmount, param3:request.query.interestRate});
        } catch (e) {
            response.status(500).render('pages/error', { error: e});
        }
    } else {
        response.status(500).render('pages/error', { error: "You need provide all three parameters!"});
    }
});

app.post("/results/perMonthRetirementSavings", function (request, response) { 
    try {
        var res = myData.retirementAmountIfSavingPerMonth(request.body.param1, request.body.param2, request.body.param3);
        response.render('pages/result', { operationTitle: "Monthly Retirement Savings", result: res,
            type: 1, param1: request.body.param1, param2:request.body.param2, param3:request.body.param3});
    } catch (e) {
        response.status(500).render('pages/error', { error: e});
    }
});

app.post("/results/investedAmount", function (request, response) { 
    try {
        var res = myData.investedAmountAfterSomeYears(request.body.param1, request.body.param2, request.body.param3);
        response.render('pages/result', { operationTitle: "Invested Amount", result: res,
            type: 2, param1: request.body.param1, param2:request.body.param2, param3:request.body.param3});
    } catch (e) {
        response.status(500).render('pages/error', { error: e});
    }
});

app.post("/results/loanPayoff", function (request, response) { 
    try {
        var res = myData.monthsToPayOffLoan(request.body.param1, request.body.param2, request.body.param3);
        response.render('pages/result', { operationTitle: "Loan Payoff", result: res,
            type: 3, param1: request.body.param1, param2:request.body.param2, param3:request.body.param3});
    } catch (e) {
        response.status(500).render('pages/error', { error: e});
    }
});

// We can now navigate to localhost:3000
app.listen(3000, function () {
    console.log('Your server is now listening on port 3000! Navigate to http://localhost:3000 to access it');
});
