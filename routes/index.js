var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET home page. */
router.get('/', isLoggedIn, function(req, res, next) {
    res.render('index', {
        title: 'Express'
    });
});

router.get('/login', function(req, res) {
    res.render('login', {
        title: 'Login'
    });
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

router.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/',
    failureRedirect: '/loginFailure',
    failureFlash: true
}));

router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/',
    failureRedirect: '/loginFailure',
    failureFlash: true
}));

router.get('/loginFailure', function(req, res) {
    res.redirect('/login');
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
};
module.exports = router;
