(function ($) {

    var firstInput = $("#param1");
    var secondInput = $("#param2");
    var thirdInput = $("#param3");
    var errorAlert = $("#calculator-error");
    var calculateForm = $("#calculate-form");

    function extractInputs() {
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
            thirdNumber = parseFloat(thirdValue) * 0.01;
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

    calculateForm.submit(function (event) {
        errorAlert.addClass('hidden');
        errorAlert.text('');
        try {
            var numbers = extractInputs();
            firstInput.val(numbers.firstNumber);
            secondInput.val(numbers.secondNumber);
            thirdInput.val(numbers.thirdNumber);
        } catch (error) {
            event.preventDefault();
            errorAlert.text(error);
            errorAlert.removeClass('hidden');
        }
    });

})(jQuery);