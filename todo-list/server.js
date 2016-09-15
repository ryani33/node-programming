// We first require our express package
var express = require('express');
var bodyParser = require('body-parser');
var toDoEntries = require('./toDoEntries.js');

// This package exports the function to create an express instance:
var app = express();

app.set('view engine', 'ejs');

// This is called 'adding middleware', or things that will help parse your request
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// This middleware will activate for every request we make to 
// any path starting with /assets;
// it will check the 'static' folder for matching files 
app.use('/assets', express.static('static'));

app.use(function (req, res, next) {
    if (req.body && req.body._method) {
        console.log(req.body);
        req.method = req.body._method;
        delete req.body._method;
    }

    // let the next middleware run:
    next();
});

// Setup your routes here!
app.get("/", function (request, response) { 
    response.render('pages/about');
});

app.get("/api/todo/completed", function (request, response) { 
    response.redirect("/api/todo/?type=completed");
});

app.get("/api/todo/open", function (request, response) { 
    response.redirect("/api/todo/?type=open");
});

app.get("/api/todo/:id", function (request, response) {
    try {
        var todo = toDoEntries.getEntry(request.params.id);
        // we caught an exception! Let's show an error page!
        response.render('pages/todo', { todo: todo, pageTitle: todo.taskTitle });
    } catch (message) {
        // we caught an exception! Let's show an error page!
        response.status(404).render('pages/error', { error: "An entry with the ID of " + request.params.id + " could not be found!"});
    }
});

app.post("/api/todo", function (request, response) {
    console.log("POSTING REQUEST WITH BODY OF:");
    console.log(request.body);
    try {
        var todo = toDoEntries.addEntry(request.body.author, request.body.title, request.body.description, [], "open");
        response.render('pages/todo', { todo: todo, pageTitle: todo.title });
    } catch (message) {
        if (message === 2) {
            response.status(500).render('pages/error', { error: "You must provide valid information in the request body to create an entry."});
        }
    }
});

app.post("/api/todo/:id/notes", function (request, response) {
    try {
        var todo = toDoEntries.addEntryNotes(request.params.id, request.body.text);
        response.render('pages/todo', { todo: todo, pageTitle: todo.title });
    } catch (message) {
        if (message === 1) {
            response.status(404).render('pages/error', { error: "An entry with the ID of " + request.params.id + " could not be found!"});
        } else if (message === 2) {
            response.status(500).render('pages/error', { error: "You must provide valid information in the request body to create an entry."});
        }
    }
});

app.delete("/api/todo/:id", function (request, response) {
    try {
        toDoEntries.deleteEntry(request.params.id);
        response.render('pages/success', { success: true, successMessage: "Delete Successfully!"});
    } catch (message) {
        if (message === 1) {
            response.status(404).render('pages/error', { error: "An entry with the ID of " + request.params.id + " could not be found!"});
        } 
    }
});

app.post("/api/todo/:id/completed", function (request, response) {
    var fm = request.query.from;
    try {
        var todo = toDoEntries.setCompletedEntry(request.params.id);
        if (fm === "index") {
            response.redirect("/api/todo/?type=open");
        } else {
            response.render('pages/todo', { todo: todo, pageTitle: todo.title });
        }
    } catch (message) {
        if (message === 1) {
            response.status(404).render('pages/error', { error: "An entry with the ID of " + request.params.id + " could not be found!"});
        }
    }
});

app.post("/api/todo/:id/open", function (request, response) {
    var fm = request.query.from;
    try {
        var todo = toDoEntries.setOpenEntry(request.params.id);
        if (fm === "index") {
            response.redirect("/api/todo/?type=open");
        } else {
            response.render('pages/todo', { todo: todo, pageTitle: todo.title });
        }
    } catch (message) {
        if (message === 1) {
            response.status(404).render('pages/error', { error: "An entry with the ID of " + request.params.id + " could not be found!"});
        }
    }
});

app.put("/api/todo/:id", function (request, response) {
    console.log("PUTTING REQUEST WITH BODY OF:");
    console.log(request.body);

    try {
        var todo = toDoEntries.updateEntry(request.params.id, request.body.title, request.body.description, request.body.radio);
        // we caught an exception! Let's show an error page!
        response.render('pages/todo', { todo: todo, pageTitle: todo.title });
    } catch (message) {
        if (message === 1) {
            response.status(404).render('pages/error', { error: "An entry with the ID of " + request.params.id + " could not be found!"});
        } else if (message === 2) {
            response.status(500).render('pages/error', { error: "You must provide valid information in the request body to create an entry."});
        }
    }
});

app.get("/api/todo", function (request, response) {
    // We have to pass a second parameter to specify the root directory
    // __dirname is a global variable representing the file directory you are currently in
    var todoType = request.query.type,
        displayType = "",
        todoToShow = [];

    // First, we retrieve our data
    if (todoType === "completed") {
        displayType = "Completed Todos";
        todoToShow = toDoEntries.getCompletedEntry();
    } else if (todoType === "all") {
        displayType = "All Todos";
        todoToShow = toDoEntries.getAll();
    } else {
        displayType = "Open Todos";
        todoToShow = toDoEntries.getOpenEntry();
    }

    // render will search your 'views' directory and follow the path you give it to get a template
    // it will compile the template with the model you provide in the second parameter and
    // send it to the user
    response.render('pages/index', { todos: todoToShow, type: displayType, pageTitle: "Home", trueType: todoType});
});


// We can now navigate to localhost:3000
app.listen(3000, function () {
    console.log('Your server is now listening on port 3000! Navigate to http://localhost:3000 to access it');
});
