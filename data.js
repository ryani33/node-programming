var MongoClient = require('mongodb').MongoClient,
    settings = require('./config.js'),
    Guid = require('Guid'),
    bcrypt = require('bcrypt-nodejs');

var fullMongoUrl = settings.mongoConfig.serverUrl + settings.mongoConfig.database;
var exports = module.exports = {};

MongoClient.connect(fullMongoUrl)
    .then(function(db) {
        db.createCollection("users");
        var userCollection = db.collection("users");

        exports.createUser = function(uname, pwd, cpwd, sid) {
            if (!uname) return Promise.reject("You must provide a username");
            if (!pwd) return Promise.reject("You must provide a password");
            if (!cpwd) return Promise.reject("You must provide a confirm password");
            if (!sid) return Promise.reject("You must provide a sessionId");

            if (pwd != cpwd) {
                return Promise.reject("The confirmed password does not match. Please try again.");
            }

            var hashpwd = bcrypt.hashSync(pwd);
            
            return userCollection.find({ username: uname }).limit(1).toArray().then(function(listOfUsers) {
                if (listOfUsers.length != 0) {
                    throw "Looks like this username is already in use.";
                }
                return userCollection.insertOne({ _id: Guid.create().toString(),
                                       username: uname,
                              encryptedPassword: hashpwd,
                               currentSessionId: sid,
                                        profile: {  firstName: "",
                                                     lastName: "",
                                                        hobby: "",
                                                      petName: ""
                                                 }
                }).then(function(newDoc) {
                    return exports.getUserById(newDoc.insertedId);
                });
            });
        };

        exports.loginUser = function(uname, pwd, sid) {
            if (!uname) return Promise.reject("You must provide a username");
            if (!pwd) return Promise.reject("You must provide a password");
            if (!sid) return Promise.reject("You must provide a sessionId");

            return userCollection.find({ username: uname }).limit(1).toArray().then(function(listOfUsers) {
                if (listOfUsers.length === 0) {
                    throw "Could not find user with name of " + uname;
                }
                if (!bcrypt.compareSync(pwd, listOfUsers[0].encryptedPassword)) {
                    throw "We are unable to match your username and password. Please reenter your existing information and if that does not work please try your previous account information.";
                }
                exports.updateSid(uname, sid);
                return listOfUsers[0];
            });
        };

        exports.updateProfile = function(sid, fname, lname, hobby, pname) {
            return userCollection.update({ currentSessionId: sid }, { $set: { profile: {  firstName: fname,
                                                                                         lastName: lname,
                                                                                            hobby: hobby,
                                                                                          petName: pname
                                                                                       }
                                                                            } }).then(function() {
                return exports.getUserBySessionId(sid);
            });
        };

        exports.updateSid = function(uname, sid) {
            if (!uname) return Promise.reject("You must provide a username");
            if (!sid) return Promise.reject("You must provide a sid");
            
            return userCollection.update({ username: uname }, { $set: { currentSessionId: sid } }).then(function() {
                return exports.getUserBySessionId(sid);
            });
        };

        exports.getUserByName = function(uname) {
            if (!uname) return Promise.reject("You must provide a name");

            return userCollection.find({ username: uname }).limit(1).toArray().then(function(listOfUsers) {
                if (listOfUsers.length === 0) {
                    throw "Could not find user with name of " + uname;
                }
                return listOfUsers[0];
            });
        };

        exports.getUserById = function(id) {
            if (!id) return Promise.reject("You must provide an ID");

            return userCollection.find({ _id: id }).limit(1).toArray().then(function(listOfUsers) {
                if (listOfUsers.length === 0) {
                    throw "Could not find user with id of " + id;
                }
                return listOfUsers[0];
            });    
        };

        exports.getUserBySessionId = function(sid) {
            if (!sid) return Promise.reject("You must provide an SID");

            return userCollection.find({ currentSessionId: sid }).limit(1).toArray().then(function(listOfUsers) {
                if (listOfUsers.length === 0) {
                    throw "Could not find user with sid of " + sid;;
                }
                return listOfUsers[0];
            });    
        };

        exports.getAllUsers = function() {
            return userCollection.find().toArray();
        }
    });
