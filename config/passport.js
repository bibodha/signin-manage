var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/user');

module.exports = function(passport) {
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    passport.use('local-signup', new LocalStrategy({
            username: 'username',
            password: 'password',
            passReqToCallback: true
        },
        function(req, username, password, done) {
            process.nextTick(function() {
                User.findOne({
                    'username': username
                }, function(err, user) {
                    if (err) {
                        return done(err);
                    }

                    if (user) {
                        return done(null, false);
                    } else {
                        var newUser = new User();
                        newUser.username = username;
                        newUser.password = newUser.generateHash(password);

                        newUser.save(function(err) {
                            if (err)
                                throw err;
                            return done(null, newUser);
                        });
                    }
                });
            });
        }));

        passport.use('local-login', new LocalStrategy({
            username: 'username',
            password: 'password',
            passReqToCallback: true
        },
        function(req, username, password, done) {
            User.findOne({ 'username': username }, function(err, user){
                    if(err){
                        return done(err);
                    }
                    if(!user){
                        return done(null, false, req.flash('loginMessage', 'no user found'));
                    }
                    if(!user.validPassword(password)){
                        return done(null, false, req.flash('loginMessage', 'Wrong Password'));
                    }
                    return done(null, user);
                });
        }));
}