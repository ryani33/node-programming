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
                all_add_new(newName, newRating, responseMessage._id, 1, null);
                if (newRating >= 3) {
                    popular_add_new(newName, newRating, responseMessage._id, 1, null);
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
    function all_add_new(title, rating, id, type, parent) {
        var row_0 = '<div class="entry-single-all">',
            row_1 = '<div class="col-md-8"> ' + title + '</p></div><div class="col-md-3"><div class="input-group"><span class="input-group-addon rating-bar yellow-font-btn" id="sizing-addon2"><span class="glyphicon glyphicon-star" aria-hidden="true"></span>',
            row_2 = '</span><div class="input-group-btn"><button type="button" class="btn btn-default btn-sm red-font-btn btn-action" data-cmd="up" data-id="' + id + '"><span class="glyphicon glyphicon-thumbs-up" aria-hidden="true"></span> + 1</button><button type="button" class="btn btn-default btn-sm blue-font-btn btn-action" data-cmd="down" data-id="' + id + '"><span class="glyphicon glyphicon-thumbs-down" aria-hidden="true"></span> - 1</button></div></div></div><div class="col-md-1"><button type="button" class="btn btn-default btn-sm gray-font-btn btn-action" data-cmd="delete" data-id="' + id + '"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></button></div>',
            row_3 = '</div>';
        
        if (Number(rating)%1 === 0) {
            rating = rating + ".0";
        }
        row_2 = ' ' + rating + row_2;
        if (type === 1) {
            if ($(".entry-single-all").length !== 0) {
                $(row_0 + row_1 + row_2 + row_3).insertAfter($(".entry-single-all").last());
            } else {
                $("#all-content").html(row_0 + row_1 + row_2 + row_3);
            }
        } else if (type === 2) {
            parent.html(row_1 + row_2);
        }
    }
    
    /* display the new single entry of popular */
    function popular_add_new(title, rating, id, type, parent) {
        var row_0 = '<div class="entry-single-popular">',
            row_1 = '<div class="col-md-8"> ' + title + '</p></div><div class="col-md-3"><div class="input-group"><span class="input-group-addon rating-bar yellow-font-btn" id="sizing-addon2"><span class="glyphicon glyphicon-star" aria-hidden="true"></span>',
            row_2 = '</span><div class="input-group-btn"><button type="button" class="btn btn-default btn-sm red-font-btn btn-action" data-cmd="up" data-id="' + id + '"><span class="glyphicon glyphicon-thumbs-up" aria-hidden="true"></span> + 1</button><button type="button" class="btn btn-default btn-sm blue-font-btn btn-action" data-cmd="down" data-id="' + id + '"><span class="glyphicon glyphicon-thumbs-down" aria-hidden="true"></span> - 1</button></div></div></div><div class="col-md-1"><button type="button" class="btn btn-default btn-sm gray-font-btn btn-action" data-cmd="delete" data-id="' + id + '"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></button></div>',
            row_3 = '</div>';
        
        if (Number(rating)%1 === 0) {
            rating = rating + ".0";
        }
        row_2 = ' ' + rating + row_2;
        if (type === 1) {
            if ($(".entry-single-popular").length !== 0) {
                $(row_0 + row_1 + row_2 + row_3).insertAfter($(".entry-single-popular").last());
            } else {
                $("#popular-content").html(row_0 + row_1 + row_2 + row_3);
            }
        } else if (type === 2) {
            //parent.css({"color": "red", "border": "2px solid red"});;
        }
    }
    
    /* btn-action */
    $( "button.btn-action" ).click(function() {
        var cmd = $(this).data('cmd');
        var id = $(this).data('id');
        var obj, 
            parentOfUpAndDown = $(this).parent().parent().parent().parent(),
            parentOfDelete = $(this).parent().parent();
        if (cmd === "up") {
            var getRequestConfig = {
                method: "GET",
                url: "/api/movies/" + id,
                contentType: 'application/json',
                data: JSON.stringify({
                    id: id
                })
            };
            $.ajax(getRequestConfig).then(function(responseMessage) {
                obj = responseMessage;
                var putRequestConfig = {
                    method: "PUT",
                    url: "/api/movies/" + id,
                    contentType: 'application/json',
                    data: JSON.stringify({
                        id: id,
                        title: obj.title,
                        rating: obj.rating + 1
                    })
                };
                $.ajax(putRequestConfig).then(function(responseMessage) {
                    all_add_new(obj.title, obj.rating + 1, id, 2, parentOfUpAndDown);
                    if (obj.rating + 1 >= 3) {
                        popular_add_new(obj.title, obj.rating + 1, id, 2, parentOfUpAndDown);
                    }
                });
            });
            
        } else if (cmd === "down") {
            var getRequestConfig = {
                method: "GET",
                url: "/api/movies/" + id,
                contentType: 'application/json',
                data: JSON.stringify({
                    id: id
                })
            };
            $.ajax(getRequestConfig).then(function(responseMessage) {
                obj = responseMessage;
                var putRequestConfig = {
                    method: "PUT",
                    url: "/api/movies/" + id,
                    contentType: 'application/json',
                    data: JSON.stringify({
                        id: id,
                        title: obj.title,
                        rating: obj.rating - 1
                    })
                };
                $.ajax(putRequestConfig).then(function(responseMessage) {
                    all_add_new(obj.title, obj.rating - 1, id, 2, parentOfUpAndDown);
                    if (obj.rating - 1 >= 3) {
                        popular_add_new(obj.title, obj.rating - 1, id, 2, parentOfUpAndDown);
                    }
                });
            });
        } else if (cmd === "delete") {
            parentOfDelete.remove();;
        }
    });

})(jQuery);