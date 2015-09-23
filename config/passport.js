var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/user');

module.exports = function(passport) {
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });

    passport.use('local-signup', new LocalStrategy({
            username: 'username',
            password: 'password',
            passReqToCallback: true
        },
        (req, username, password, done) => {
            process.nextTick(() => {
                User.findOne({
                    'username': username
                }, (err, user) => {
                    if (err) {
                        return done(err);
                    }

                    if (user) {
                        return done(null, false);
                    } else {
                        var newUser = new User();
                        newUser.username = username;
                        newUser.password = newUser.generateHash(password);

                        newUser.save(err =>  {
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
            User.findOne({ 'username': username }, (err, user) => {
                    if(err){
                        return done(err);
                    }
                    if(!user){
                        return done(null, false);
                    }
                    if(!user.validPassword(password)){
                        return done(null, false);
                    }
                    return done(null, user);
                });
        }));
}
