var MongoClient = require('mongodb').MongoClient,
    runStartup = require("./startup.js"),
    settings = require('./config.js'),
    Guid = require('Guid');

var fullMongoUrl = settings.mongoConfig.serverUrl + settings.mongoConfig.database;
var exports = module.exports = {};

runStartup().then(function(allComments) {
    console.log("After the setup has been complete, we have the following comments:");
    console.log(allComments);
});

MongoClient.connect(fullMongoUrl)
    .then(function(db) {
        var myCollection = db.collection("comments");

        // setup your body
        exports.createComment = function(comment) {
            if (!comment)  Promise.reject("You must provide a comment");

            // return a promise that resolves the new comment
            return myCollection.insertOne({ _id: Guid.create().toString(), comment: comment }).then(function(newDoc) {
                return newDoc.insertedId;
            });
        };

        exports.getAllComments = function() {
            // write the body here
            // return a promise that resolves to all the comments in your collection.
            return myCollection.find().toArray();
        }
    });
