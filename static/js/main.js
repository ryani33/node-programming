(function ($) {
    
    $( "#popular-trigger" ).click(function() {
        $("#all").addClass('hidden');
        $("#popular").removeClass('hidden');
    });
    
    $( "#all-trigger" ).click(function() {
        $("#popular").addClass('hidden');
        $("#all").removeClass('hidden');
    });


    /* Create a movie */
    var newEntryForm = $("#new-entry-form"),
        title = $("#movie-name"),
        rating = $("#init-rating");

    newEntryForm.submit(function(event) {
        event.preventDefault();

        var newName = title.val();
        var newRating = Number(rating.val());
        var createSuccess = $("#create-success");
        var createError = $("#create-error");
        var createErrorSpan = '<span class="glyphicon glyphicon-ban-circle" aria-hidden="true"></span>';
        var createSuccessSpan = '<span class="glyphicon glyphicon-ok-circle" aria-hidden="true"></span>';

        if (newName && newRating) {
            var requestConfig = {
                method: "POST",
                url: "/api/movies",
                contentType: 'application/json',
                data: JSON.stringify({
                    title: newName,
                    rating: newRating
                })
            };
            $.ajax(requestConfig).then(function(responseMessage) {
                createSuccess.html(createSuccessSpan + " " + responseMessage.title + " is created successfully.");
                createSuccess.removeClass('hidden');
                createError.addClass('hidden');
                all_add_new(newName, newRating);
                if (newRating >= 3) {
                    all_add_popular(newName, newRating);
                }
            });
        } else if (newName === "") {
            createError.html(createErrorSpan + " Please input the movie title.");
            createError.removeClass('hidden');
            createSuccess.addClass('hidden');
        } else if (newRating === "") {
            createError.html(createErrorSpan + " Please input the movie initial rating.");
            createError.removeClass('hidden');
            createSuccess.addClass('hidden');
        }
    });
    
    /* display the new single entry of all */
    function all_add_new(title, rating) {
        var row_1 = '<div class="entry-single-all"><div class="col-md-9"><span class="badge movie-badge">',
            row_2 = '</span>',
            row_3 = ' ' + title + '</p></div><div class="col-md-3"><div class="input-group"><span class="input-group-addon rating-bar" id="sizing-addon2"><span class="glyphicon glyphicon-star yellow-star" aria-hidden="true"></span>',
            row_4 = '</span><div class="input-group-btn"><button type="button" class="btn btn-info btn-sm"><span class="glyphicon glyphicon-thumbs-up" aria-hidden="true"></span> + 1</button><button type="button" class="btn btn-danger btn-sm"><span class="glyphicon glyphicon-thumbs-down" aria-hidden="true"></span> - 1</button></div></div></div></div>';
        
        row_2 = ($(".entry-single-all").length + 1).toString() + row_2;
        if (Number(rating)%1 === 0) {
            rating = rating + ".0";
        }
        row_4 = ' ' + rating + row_4;
        if ($(".entry-single-all").length !== 0) {
            $(row_1 + row_2 + row_3 + row_4).insertAfter($(".entry-single-all").last());
        } else {
            $("#all-content").html(row_1 + row_2 + row_3 + row_4);
        }
        
    }
    
    /* display the new single entry of popular */
    function all_add_popular(title, rating) {
        var row_1 = '<div class="entry-single-popular"><div class="col-md-9"><span class="badge movie-badge">',
            row_2 = '</span>',
            row_3 = ' ' + title + '</p></div><div class="col-md-3"><div class="input-group"><span class="input-group-addon rating-bar" id="sizing-addon2"><span class="glyphicon glyphicon-star yellow-star" aria-hidden="true"></span>',
            row_4 = '</span><div class="input-group-btn"><button type="button" class="btn btn-info btn-sm"><span class="glyphicon glyphicon-thumbs-up" aria-hidden="true"></span> + 1</button><button type="button" class="btn btn-danger btn-sm"><span class="glyphicon glyphicon-thumbs-down" aria-hidden="true"></span> - 1</button></div></div></div></div>';
        
        row_2 = ($(".entry-single-popular").length + 1).toString() + row_2;
        if (Number(rating)%1 === 0) {
            rating = rating + ".0";
        }
        row_4 = ' ' + rating + row_4;
        if ($(".entry-single-popular").length !== 0) {
            $(row_1 + row_2 + row_3 + row_4).insertAfter($(".entry-single-popular").last());
        } else {
            $("#popular-content").html(row_1 + row_2 + row_3 + row_4);
        }
        
    }
    

})(jQuery);