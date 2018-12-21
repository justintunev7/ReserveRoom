var express = require('express');
var router = express.Router();
var expressSession = require('express-session');

var users = require('../controllers/users_controller');
//var rooms = require('../controllers/rooms_controller');
var mongoose = require('mongoose');
var Room = mongoose.model('Room');

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

router.get('/room-submit', function(req, res) {
    if (req.session.user) { // if user logs in correctly
        console.log("User logged in");
        res.render('addRoom', {
            username: req.session.username,
            msg: req.session.msg,
            color: req.session.color,
        }); // send session info        console.log("completed render");
        //res.redirect('/reservation');
    }
    else {
        req.session.msg = 'Access denied!';
        res.redirect('/login');
    }

});

router.get('/reserveRoom', function(req, res) {
    if (req.session.user) { // if user logs in correctly
        console.log("User logged in for reservation");
        res.render('reserveRoom', {
            username: req.session.username,
            msg: req.session.msg,
            color: req.session.color
        }); // send session info        console.log("completed render");
        //res.redirect('/reservation');
        console.log("Rendered Page");
    }
    else {
        req.session.msg = 'Access denied!';
        res.redirect('/login');
    }

});


router.get('/admin-page', function(req, res) {
    if (req.session.user) { // if user logs in correctly
        console.log("User logged in for reservation");
        res.render('admin', {
            username: req.session.username,
            msg: req.session.msg
        }); // send session info        console.log("completed render");
        //res.redirect('/reservation');
        console.log("Rendered Page");
    }
    else {
        req.session.msg = 'Access denied!';
        res.redirect('/login');
    }

});

router.get('/rooms/:room', function(req, res) { // :comment calls param helper function
    res.json(req.room);
});

router.delete('/rooms/:room', function(req, res) {
    console.log("in Delete");
    console.log(req.room);
    req.room.remove();
    res.sendStatus(200);
});



router.param('room', function(req, res, next, id) {
    Room.findById(id, function(err, room) {
        if (err) { return next(err); }
        if (!room) { return next(new Error("can't find room")); }
        req.room = room;
        return next();
    });
});


router.get('/rooms', function(req, res, next) {
  console.log("in get route");
  Room.find(function(err, rooms) {
      if (err) { console.log("Error in get"); return next(err); }
      res.json(rooms);
  });
});

router.post('/rooms', function(req, res) {
    console.log("Begin addRoom function");
    console.log(req.body);
    var room = new Room(req.body); // create new user with username
    console.log("Room information: ");
    console.log(room);
    room.save(function(err, room) {
        if (err) { console.log("error in post"); res.redirect('/room-submit'); }
        console.log("After database" + room);
        res.json(room);
    });
});

router.post('/signup', users.signup);
router.post('/user/update', users.updateUser);
router.post('/user/delete', users.deleteUser);
router.post('/login', users.login);
router.get('/user/profile', users.getUserProfile);
//router.post('/add_room', rooms.addRoom);
//router.get('/reserve', rooms.getRooms);
//router.get('/reserveRoom', rooms.getReserveRoomPage);

module.exports = router;
