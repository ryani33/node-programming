(function ($) {
    
    $( "#popular-trigger" ).click(function() {
        $("#all").addClass('hidden');
        $("#popular").removeClass('hidden');
    });
    
    $( "#all-trigger" ).click(function() {
        $("#popular").addClass('hidden');
        $("#all").removeClass('hidden');
    });
})(jQuery);