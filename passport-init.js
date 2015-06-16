var LocalStrategy = require('passport-local').Strategy;
var bCrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Post = mongoose.model('Post');
module.exports = function(passport) {

  passport.serializeUser(function(user, done) {
    console.log('serializing user:', user._id);
    return done(null, user._id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user){
      if(err){
        return done(err, user);
      }
      if(!user){
        return done('user not found', false);
      }
      return done(err, user);
    });
  });

  passport.use('login', new LocalStrategy({
      passReqToCallback : true
    },
    function(req, username, password, done) {
      User.findOne({username: username}, function(err, user){
        if(err) {
          return done(err, false);
        }

        if(!user){
          console.log('User Not Found with username '+username);
          return done(null, false);
        }

        if(!isValidPassword(user, password)) {
          return done('incorrect password', false);
        }

        console.log('logged in');
        return done(null, user);
      });
    }
  ));

  passport.use('signup', new LocalStrategy({
      passReqToCallback : true
    },
    function(req, username, password, done) {

      User.findOne({ 'username' :  username }, function(err, user) {
        if (err){
          console.log('Error in SignUp: '+err);
          return done(err);
        }
        if (user) {
          console.log('User already exists with username: '+username);
          return done(null, false);
        } else {
          var newUser = new User();

          newUser.username = username;
          newUser.password = createHash(password);

          // save the user
          newUser.save(function(err) {
            if (err){
              console.log('Error in Saving user: '+err);
              throw err;
            }
            console.log(newUser.username + ' Registration succesful');
            return done(null, newUser);
          });
        }
      });
    })
  );


  var isValidPassword = function(user, password) {
    return bCrypt.compareSync(password, user.password);
  };
  // Generates hash using bCrypt
  var createHash = function(password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
  };

};
