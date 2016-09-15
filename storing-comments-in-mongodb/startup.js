var MongoClient = require('mongodb').MongoClient,
    settings = require('./config.js'),
    Guid = require('Guid');

var fullMongoUrl = settings.mongoConfig.serverUrl + settings.mongoConfig.database;

function runSetup() {
    return MongoClient.connect(fullMongoUrl)
        .then(function(db) {
            return db.createCollection("comments");
        }).then(function(commentCollection) {

            return commentCollection.count().then(function(theCount) {
                // the result of find() is a cursor to MongoDB, and we can call toArray() on it
                if (theCount > 0) {
                    return commentCollection.find.toArray();
                }

                return commentCollection.insertOne({ _id: Guid.create().toString(), comment: "I like The Last Samurai."}).then(function(newDoc) {
                    return newDoc;
                }).then(function() {
                    return commentCollection.insertOne({ _id: Guid.create().toString(), comment: "X-Men is so-so."});
                }).then(function() {
                    return commentCollection.insertOne({ _id: Guid.create().toString(), comment: "The Godfather is perfect."});
                }).then(function() {
                    return commentCollection.insertOne({ _id: Guid.create().toString(), comment: "I don't like George Of The Jungle."});
                }).then(function() {
                    return commentCollection.insertOne({ _id: Guid.create().toString(), comment: "Batman: The Dark Knight Rises is my favorite."});
                }).then(function() {
                    return commentCollection.find().toArray();
                });
            });
        });
}

// By exporting a function, we can run 
var exports = module.exports = runSetup;