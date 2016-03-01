var entry_module = {};

var entryList = [];

var makeAEntry = function (author, taskTitle, taskDescription, taskNotes, status) {
    if (!author || typeof author !== "string") {
        throw 2;
    }
    if (!taskTitle || typeof taskTitle !== "string") {
        throw 2;
    }
    if (!taskDescription || typeof taskDescription !== "string") {
        throw 2;
    }
    return { id: entryList.length, author: author, taskTitle: taskTitle,
    	taskDescription: taskDescription, taskNotes: taskNotes, status: status};
}

entry_module.addEntry = function (author, taskTitle, taskDescription, taskNotes, status) {
	var todo = makeAEntry(author, taskTitle, taskDescription, taskNotes, status);
    entryList.push(todo);
    return todo;
};

entry_module.deleteEntry = function (id) {
    var todo = entry_module.getEntry(id);
    var indexOfTodo = entryList.indexOf(todo);
    delete entryList[indexOfTodo];
};

entry_module.setOpenEntry = function (id) {
    var todo = entry_module.getEntry(id);
    todo.status = "open";
    return todo;
};

entry_module.getOpenEntry = function () {
    return entryList.filter(function (todo) {
        return todo.status === "open";
    });
};

entry_module.setCompletedEntry = function (id) {
    var todo = entry_module.getEntry(id);
    todo.status = "completed";
    return todo;
};

entry_module.getCompletedEntry = function () {
    return entryList.filter(function (todo) {
        return todo.status === "completed";
    });
};

entry_module.getEntry = function (id) {
    if (typeof id === "string") id = parseInt(id);

    if (id !== 0 && !id) throw 1;

    var todo = entryList.filter(function (todo) {
        return todo.id === id;
    }).shift();

    if (!todo) throw 1;

    return todo;
};

entry_module.getAll = function () {
    return entryList.slice(0);
};

entry_module.updateEntry = function (id, taskTitle, taskDescription, status) {
    if (!taskTitle || typeof taskTitle !== "string") {
        throw 2;
    }
    if (!taskDescription || typeof taskDescription !== "string") {
        throw 2;
    }
    
    var todo = entry_module.getEntry(id);
    todo.taskTitle = taskTitle;
    todo.taskDescription = taskDescription;
    todo.status = status;

    return todo;
};

entry_module.addEntryNotes = function (id, notes) {
    if (!notes) {
        throw 2;
    }
	var todo = entry_module.getEntry(id);
	todo.taskNotes.push(notes);
    return todo;
};

// Let's pre-seed with some data
var firstTodo = entry_module.addEntry("Xiaoyu", "Boil water", "Help my mom to make dinner.", 
    ["I promised my mom I would make dinner, and I don't know how to boil the water!"], "open");
var firstTodo = entry_module.addEntry("Xiaoyu", "Fix laptop", "My laptop is out of service.",
    ["Fix it on my own or send to retail store."], "open");

module.exports = entry_module;