var db = require('../app/config');
var Users = require('../app/collections/users');
var User = require('../app/models/user');
var Links = require('../app/collections/links');
var Link = require('../app/models/link');
var Click = require('../app/models/click');


exports.userExists = function(username, callback) {
  Users.resetQuery();
  Users.query('where', 'username', '=', username)
    .fetch()
    .then(function(user){
      // username is a unique field provided by client.
      callback(user.length === 1);
    });
};

exports.authUser = function(user, callback){
  Users.resetQuery();
  Users.query()
    .where({
      username: user.username,
      password: user.password
    }).select()
    .then(function(user) {
      callback(user);
    });
};

exports.saveUser = function(user, callback){
  new User({
    username: user.username,
    password: user.password
  }).save().then(function(newUser) {
    Users.add(newUser);
    // newUser.attributes to strip user object from query results.
    callback(newUser.attributes);
  });
};
