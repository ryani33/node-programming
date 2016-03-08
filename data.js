var data_module = {};

data_module.retirementAmountIfSavingPerMonth = function (yearsUntilRetirement, amountSavingPerMonth, yearlyInterestRateOfInvestment) {
    var runningTotal = 0;

    for (var i = 0; i < Number(yearsUntilRetirement) * 12; i ++) {
    	runningTotal = (runningTotal + Number(amountSavingPerMonth)) * (1 + (Number(yearlyInterestRateOfInvestment) / 12));
    }

    return runningTotal;
};

data_module.investedAmountAfterSomeYears = function (yearsInvesting, initialAmount, yearlyInterestRateOfInvestment) {
    
    if (yearsInvesting <= 0 || isNaN(yearsInvesting)) {
    	throw "Invalid parameter (yearsInvesting)!";
    }
    if (initialAmount <= 0 || isNaN(initialAmount)) {
    	throw "Invalid parameter (initialAmount)!";
    }
    if (yearlyInterestRateOfInvestment < 0 || isNaN(yearlyInterestRateOfInvestment)) {
    	throw "Invalid parameter (yearlyInterestRateOfInvestment)!";
    }

    var runningTotal = Number(initialAmount);

    for (var i = 1; i < Number(yearsInvesting); i ++) {
    	runningTotal = runningTotal * (1 + Number(yearlyInterestRateOfInvestment));
    }

    return runningTotal;
};

data_module.monthsToPayOffLoan = function (monthlyPaymentAmount, initialLoanAmount, yearlyInterestRateOfLoan) {
    
    if (monthlyPaymentAmount <= 0 || isNaN(monthlyPaymentAmount)) {
    	throw "Invalid parameter (monthlyPaymentAmount)!";
    }
    if (initialLoanAmount <= 0 || isNaN(initialLoanAmount)) {
    	throw "Invalid parameter (initialLoanAmount)!";
    }
    if (yearlyInterestRateOfLoan < 0 || isNaN(yearlyInterestRateOfLoan)) {
    	throw "Invalid parameter (yearlyInterestRateOfLoan)!";
    }

    var leftToPay = Number(initialLoanAmount);
    var months = 0;

    while (leftToPay > 0) {
    	months++;
    	leftToPay = (leftToPay * (1 + (Number(yearlyInterestRateOfLoan) / 12))) - Number(monthlyPaymentAmount);
    }

    return months;
};

module.exports = data_module;
