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
            var numbers = extractInputs(firstInputOne, secondInputOne, thirdInputOne);
            firstInputOne.val(numbers.firstNumber);
            secondInputOne.val(numbers.secondNumber);
            thirdInputOne.val(numbers.thirdNumber);
        } catch (error) {
            event.preventDefault();
            errorAlertOne.text(error);
            errorAlertOne.removeClass('hidden');
        }
    });

    calculateFormTwo.submit(function (event) {
        errorAlertTwo.addClass('hidden');
        errorAlertTwo.text('');
        try {
            var numbers = extractInputs(firstInputTwo, secondInputTwo, thirdInputTwo);
            firstInputTwo.val(numbers.firstNumber);
            secondInputTwo.val(numbers.secondNumber);
            thirdInputTwo.val(numbers.thirdNumber);
        } catch (error) {
            event.preventDefault();
            errorAlertTwo.text(error);
            errorAlertTwo.removeClass('hidden');
        }
    });

    calculateFormThree.submit(function (event) {
        errorAlertThree.addClass('hidden');
        errorAlertThree.text('');
        try {
            var numbers = extractInputs(firstInputThree, secondInputThree, thirdInputThree);
            firstInputThree.val(numbers.firstNumber);
            secondInputThree.val(numbers.secondNumber);
            thirdInputThree.val(numbers.thirdNumber);
        } catch (error) {
            event.preventDefault();
            errorAlertThree.text(error);
            errorAlertThree.removeClass('hidden');
        }
    });

})(jQuery);