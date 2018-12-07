var express = require('express');
var router = express.Router();
var expressSession = require('express-session');

var users = require('../controllers/users_controller');
console.log("before / Route");
router.get('/', function(req, res) {
    console.log("/ Route");
    //    console.log(req);
    console.log(req.session);
    if (req.session.user) { // if session already exists...
        console.log("/ Route if user");
        res.render('index', {
            username: req.session.username,
            msg: req.session.msg,
            color: req.session.color
        }); // send session info
    }
    else {
        console.log("/ Route else user");
        req.session.msg = 'Access denied!';
        res.redirect('/login');
    }
});
router.get('/user', function(req, res) {
    console.log("/user Route");
    if (req.session.user) { // if user logs in correctly
        res.render('user', { msg: req.session.msg });
    }
    else {
        req.session.msg = 'Access denied!';
        res.redirect('/login');
    }
});
router.get('/signup', function(req, res) { // sign up for new account
    console.log("/signup Route");
    if (req.session.user) {
        res.redirect('/');
    }
    res.render('signup', { msg: req.session.msg });
});
router.get('/login', function(req, res) { // log into account
    console.log("/login Route");
    if (req.session.user) {
        res.redirect('/');
    }
    res.render('login', { msg: req.session.msg });
});
router.get('/logout', function(req, res) {
    console.log("/logout Route");
    req.session.destroy(function() { // will have to log in next time
        res.redirect('/login');
    });
});
router.post('/signup', users.signup);
router.post('/user/update', users.updateUser);
router.post('/user/delete', users.deleteUser);
router.post('/login', users.login);
router.get('/user/profile', users.getUserProfile);


module.exports = router;
