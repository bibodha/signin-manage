var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET home page. */
router.get('/', isLoggedIn, (req, res, next) => {
    res.render('index', {
        title: 'Express'
    });
});

router.get('/login', (req, res) => {
    res.render('login', {
        title: 'Login'
    });
});

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

router.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/',
    failureRedirect: '/loginFailure',
    failureFlash: false
}));

router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/',
    failureRedirect: '/loginFailure',
    failureFlash: false
}));

router.get('/loginFailure', (req, res) => {
    res.redirect('/login');
});

function isLoggedIn(req, res, next) {
    return next();
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
};
module.exports = router;
