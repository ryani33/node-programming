(function ($) {
    var firstInputOne = $("#param11");
    var secondInputOne = $("#param12");
    var thirdInputOne = $("#param13");
    var errorAlertOne = $("#calculator-error-1");
    var calculateFormOne = $("#calculate-form-1");
    var firstInputTwo = $("#param21");
    var secondInputTwo = $("#param22");
    var thirdInputTwo = $("#param23");
    var errorAlertTwo = $("#calculator-error-2");
    var calculateFormTwo = $("#calculate-form-2");
    var firstInputThree = $("#param31");
    var secondInputThree = $("#param32");
    var thirdInputThree = $("#param33");
    var errorAlertThree = $("#calculator-error-3");
    var calculateFormThree = $("#calculate-form-3");
    
    var dismissible = '<button class="close"><span aria-hidden="true">&times;</span></button>';

    function extractInputs(firstInput, secondInput, thirdInput) {
        var firstValue = firstInput.val();
        if (firstValue === undefined || firstValue === "" || firstValue === null) {
            throw "No first value provided";
        }

        var secondValue = secondInput.val();
        if (secondValue === undefined || secondValue === "" || secondValue === null) {
            throw "No second value provided";
        }

        var thirdValue = thirdInput.val();
        if (thirdValue === undefined || thirdValue === "" || thirdValue === null) {
            throw "No thrid value provided";
        }

        var firstNumber = parseFloat(firstValue);
        var secondNumber = parseFloat(secondValue);
        var thirdNumber = 0;
        if (thirdValue[thirdValue.length - 1] === '%') {
            thirdValue = thirdValue.substring(0, thirdValue.length - 1);
            thirdNumber = parseFloat(thirdValue);
            if (isNaN(thirdNumber)) {
                throw "Third value is not a number nor a percentage";
            }
            thirdNumber = thirdNumber * 0.01;
        } else {
            thirdNumber = parseFloat(thirdValue);
        }

        if (isNaN(firstNumber)) {
            throw "First value is not a number";
        }

        if (firstNumber < 0) {
            throw "First value must be greater than 0";
        }

        if (isNaN(secondNumber)) {
            throw "Second value is not a number";
        }

        if (secondNumber < 0) {
            throw "Second value must be greater than 0";
        }

        if (isNaN(thirdNumber)) {
            throw "Third value is not a number nor a percentage";
        }

        if (thirdNumber < 0) {
            throw "Third value must be greater than 0";
        }

        return {firstNumber: firstNumber, secondNumber: secondNumber, thirdNumber: thirdNumber};
    }

    calculateFormOne.submit(function (event) {
        errorAlertOne.addClass('hidden');
        errorAlertOne.text('');
        try {
            event.preventDefault();
            var numbers = extractInputs(firstInputOne, secondInputOne, thirdInputOne);
            var link = "/api/perMonthRetirementSavings?years=" + numbers.firstNumber + "&perMonth=" + numbers.secondNumber + "&interestRate=" + numbers.thirdNumber;
            $.get(link, function( data ) {
                 var obj = JSON.parse(data);
                 $(".successTitle").text(obj.operationTitle);
                 $(".totalOneTwo").text(obj.result + " dollars");
                 var str = Math.round(obj.result * 100) / 100;
                 $(".totalOneTwoRound").text(str + " (Rounded) dollars");
                 $(".resultOneTwo").show();
                 $(".resultThree").hide();
            });
            $('#resultModal').modal('show');
        } catch (error) {
            event.preventDefault();
            errorAlertOne.text(error);
            errorAlertOne.append(dismissible);
            errorAlertOne.removeClass('hidden');
            $( ".close" ).click(function() {
                errorAlertOne.addClass('hidden');
            });
        }
    });

    calculateFormTwo.submit(function (event) {
        errorAlertTwo.addClass('hidden');
        errorAlertTwo.text('');
        try {
            event.preventDefault();
            var numbers = extractInputs(firstInputTwo, secondInputTwo, thirdInputTwo);
            var link = "api/investedAmount?years=" + numbers.firstNumber + "&initial=" + numbers.secondNumber + "&interestRate=" + numbers.thirdNumber;
            $.get(link, function( data ) {
                 var obj = JSON.parse(data);
                 $(".successTitle").text(obj.operationTitle);
                 $(".totalOneTwo").text(obj.result + " dollars");
                 var str = Math.round(obj.result * 100) / 100;
                 $(".totalOneTwoRound").text(str + " (Rounded) dollars");
                 $(".resultOneTwo").show();
                 $(".resultThree").hide();
            });
            $('#resultModal').modal('show');
        } catch (error) {
            event.preventDefault();
            errorAlertTwo.text(error);
            errorAlertTwo.append(dismissible);
            errorAlertTwo.removeClass('hidden');
            $( ".close" ).click(function() {
                errorAlertTwo.addClass('hidden');
            });
        }
    });

    calculateFormThree.submit(function (event) {
        errorAlertThree.addClass('hidden');
        errorAlertThree.text('');
        try {
            event.preventDefault();
            var numbers = extractInputs(firstInputThree, secondInputThree, thirdInputThree);
            var link = "api/loanPayoff?monthlyAmount=" + numbers.firstNumber + "&loanAmount=" + numbers.secondNumber + "&interestRate=" + numbers.thirdNumber;
            $.get(link, function( data ) {
                 var obj = JSON.parse(data);
                 $(".successTitle").text(obj.operationTitle);
                 $(".totalThree").text(obj.result + " month(s)");
                 var str = Math.round(obj.result * 100) / 100;
                 $(".totalThreeRound").text(str + " (Rounded) month(s)");
                 $(".resultThree").show();
                 $(".resultOneTwo").hide();
            });
            $('#resultModal').modal('show');
        } catch (error) {
            event.preventDefault();
            errorAlertThree.text(error);
            errorAlertThree.append(dismissible);
            errorAlertThree.removeClass('hidden');
            $( ".close" ).click(function() {
                errorAlertThree.addClass('hidden');
            });
        }
    });
    
    $('#param11').tooltip({'trigger':'focus', 'title': 'This field you can input the time duration, which is determined by how long will you work before retirement', 'placement': 'right'});
    $('#param12').tooltip({'trigger':'focus', 'title': 'This field you can input the money amount you will save per month', 'placement': 'right'});
    $('#param13').tooltip({'trigger':'focus', 'title': 'This field you can input the yearly interest rate of investment', 'placement': 'right'});
    $('#param21').tooltip({'trigger':'focus', 'title': 'This field you can input the time duration, which is determined by how many years you are investing', 'placement': 'right'});
    $('#param22').tooltip({'trigger':'focus', 'title': 'This field you can input the initial investment amount', 'placement': 'right'});
    $('#param23').tooltip({'trigger':'focus', 'title': 'This field you can input the yearly interest rate of investment', 'placement': 'right'});
    $('#param31').tooltip({'trigger':'focus', 'title': 'This field you can input the monthly payment amount', 'placement': 'right'});
    $('#param32').tooltip({'trigger':'focus', 'title': 'This field you can input the initial loan amount', 'placement': 'right'});
    $('#param33').tooltip({'trigger':'focus', 'title': 'This field you can input the yearly interest rate of loan', 'placement': 'right'});

})(jQuery);