var MongoClient = require('mongodb').MongoClient,
    settings = require('./config.js'),
    Guid = require('Guid');

var fullMongoUrl = settings.mongoConfig.serverUrl + settings.mongoConfig.database;
var exports = module.exports = {};

MongoClient.connect(fullMongoUrl)
    .then(function(db) {
        db.createCollection("logs");
        var myCollection = db.collection("logs");

        // setup your body
        exports.createLog = function(requestPath, requestMethod, cookies, timestamp) {
            if (!requestPath) return Promise.reject("Request path error");
            if (!requestMethod) return Promise.reject("Request method error");
            if (!cookies) return Promise.reject("Cookies error");
            if (!timestamp) return Promise.reject("Timestamp error");

            // return a promise that resolves the new log
            return myCollection.insertOne({ _id: Guid.create().toString(), requestPath: requestPath, 
                requestMethod: requestMethod, cookies: cookies, timestamp: timestamp}).then(function(newDoc) {
                return newDoc.insertedId;
            });
        };

        exports.getAllLogs = function() {
            // return a promise that resolves to all the logs in your collection.
            return myCollection.find().toArray();
        }
    });
