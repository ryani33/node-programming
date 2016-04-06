// We first require our express package
var express = require('express');
var bodyParser = require('body-parser');
var userData = require('./data.js');

// This package exports the function to create an express instance:
var app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use('/assets', express.static('static'));

app.get("/", function(request, response) {
    try {
        response.render("pages/home", { error: null });
    } catch (e) {
        response.status(500).render('pages/home', { error: e});
    }
});

app.get("/profile", function(request, response) {
    commentData.getAllComments().then(function(commentList) {
        response.json(commentList);
    });
});

app.post("/login", function(request, response) {
    
});

app.post("/signup", function(request, response) {
    
});

app.post("/logout", function(request, response) {
    var comment = request.body.comment;
    commentData.createComment(comment).then(function() {
        response.redirect("/");
    }, function(errorMessage) {
        response.status(500).json({ error: errorMessage });
    });
});

app.post("/updateinfo", function(request, response) {
    
});

// We can now navigate to localhost:3000
app.listen(3000, function() {
    console.log('Your server is now listening on port 3000! Navigate to http://localhost:3000 to access it');
});
