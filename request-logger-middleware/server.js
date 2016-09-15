// We first require our express package
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logData = require('./data.js');

// This package exports the function to create an express instance:
var app = express();

app.use(cookieParser());
app.use(bodyParser.json()); // for parsing application/json

app.use("/api", function(request, response, next) {
    var requestPath = request.path;
    var requestMethod = request.method;
    var cookies = request.cookies;
    var timestamp = new Date();

    logData.createLog(requestPath, requestMethod, cookies, timestamp.toString()).then(function() {
        response.status(200).send("New log created");
    }, function(errorMessage) {
        response.status(500).json({ error: errorMessage });
    });
});

app.get("/cookies/addCookie", function(request, response) {
    if (!request.query.key || typeof request.query.key !== "string" ||
        !request.query.value || typeof request.query.value !== "string") {
        response.status(500).send("You need provide the key and the value");
    } else {
        if (request.cookies) {
            for (key in Object.keys(request.cookies)) {
                response.clearCookie(Object.keys(request.cookies)[key]);
            }
            response.cookie(request.query.key, request.query.value);
        } else {
            response.cookie(request.query.key, request.query.value);
        }
        response.status(200).send("This succeeded");
    }
});

app.get("/", function(request, response) {
    response.status(200).send("<html><a href=\"/cookies/addCookie\">add cookies</a><br /><a href=\"/api\">save log</a></html>");
});

// We can now navigate to localhost:3000
app.listen(3000, function() {
    console.log('Your server is now listening on port 3000! Navigate to http://localhost:3000 to access it');
});
