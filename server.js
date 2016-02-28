// We first require our express package
var express = require('express');
var bodyParser = require('body-parser');
var myData = require('./toDoEntries.js');

// This package exports the function to create an express instance:
var app = express();

// This is called 'adding middleware', or things that will help parse your request
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// This middleware will activate for every request we make to 
// any path starting with /assets;
// it will check the 'static' folder for matching files 
app.use('/assets', express.static('static'));

// Setup your routes here!

function respond_result(response, res) {
    try {
        response.json({status: "success", "result": res});
    } catch (e) {
        response.status(500).json({status: "error", "message": e});
    }
}

app.get("/", function (request, response) { 
    // We have to pass a second parameter to specify the root directory
    // __dirname is a global variable representing the file directory you are currently in
    response.sendFile("./pages/index.html", { root: __dirname });
});

app.get("/api/perMonthRetirementSavings", function (request, response) { 
    if (request.query.years && request.query.perMonth && request.query.interestRate) {
    	try {
	        var res = myData.retirementAmountIfSavingPerMonth(request.query.years, request.query.perMonth, request.query.interestRate);
	        respond_result(response, res);
	    } catch (e) {
	        response.status(500).json({status: "error", "message": e});
	    }
    } else {
    	response.status(500).json({status: "error", "message": "You need provide all three parameters!"});
    }
});

app.get("/api/investedAmount", function (request, response) { 
    if (request.query.years && request.query.initial && request.query.interestRate) {
        try {
	        var res = myData.investedAmountAfterSomeYears(request.query.years, request.query.initial, request.query.interestRate);
	        respond_result(response, res);
	    } catch (e) {
	        response.status(500).json({status: "error", "message": e});
	    }
    } else {
    	response.status(500).json({status: "error", "message": "You need provide all three parameters!"});
    }
});

app.get("/api/loanPayoff", function (request, response) { 
    if (request.query.monthlyAmount && request.query.loanAmount && request.query.interestRate) {
        try {
	        var res = myData.monthsToPayOffLoan(request.query.monthlyAmount, request.query.loanAmount, request.query.interestRate);
	        respond_result(response, res);
	    } catch (e) {
	        response.status(500).json({status: "error", "message": e});
	    }
    } else {
    	response.status(500).json({status: "error", "message": "You need provide all three parameters!"});
    }
});


// We can now navigate to localhost:3000
app.listen(3000, function () {
    console.log('Your server is now listening on port 3000! Navigate to http://localhost:3000 to access it');
});
