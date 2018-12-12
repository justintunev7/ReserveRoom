var mongoose = require('mongoose');
var Room = mongoose.model('Room');

/*
exports.getRooms = function(req, res) {
    Room.find({}, function(err, rooms) {
        var roomMap = {};
        rooms.forEach(function(room) {
            roomMap[room._id] = room;
        });
        console.log(roomMap);
        res.send(roomMap);
    });
};*/

exports.getRooms = function(req, res) {
    console.log("GET ROOMS ROUTE");
    if (req.session.user) { // if user logs in correctly
        var rooms = [];
        Room.find({}, '-_id', function(err, result) {
            if (err) { console.log('Find did not work', err) }
            rooms = result;
            //rooms = JSON.stringify(rooms, null, "\t");
            res.json(rooms);
            /*res.render('reserve', {
                username: req.session.username,
                msg: req.session.msg,
                color: req.session.color,
                roomname:
            });*/ // send session info        console.log("completed render");
            //res.redirect('/reservation');
        });
    }
    else {
        req.session.msg = 'Access denied!';
        res.redirect('/login');
    }
};


exports.addRoom = function(req, res) {
    console.log("Begin addRoom function");
    var room = new Room({ roomName: req.body.roomname }); // create new user with username

    /*
    var days = new Days({ monday: req.body.monday }); // create new user with username
    days.set('tuesday', req.body.tuesday);
    days.set('wednesday', req.body.wednesday);
    days.set('thursday', req.body.thursday);
    days.set('friday', req.body.friday);
    days.set('saturday', req.body.saturday);
    days.set('sunday', req.body.sunday);
    console.log("Days data: ");
    console.log(days);*/
    var operatingDays = [];

    function addOperatingDay(day) {
        if (day != '') {
            operatingDays.push(day);
        }
    }

    addOperatingDay(req.body.monday);
    addOperatingDay(req.body.tuesday);
    addOperatingDay(req.body.wednesday);
    addOperatingDay(req.body.thursday);
    addOperatingDay(req.body.friday);
    addOperatingDay(req.body.saturday);
    addOperatingDay(req.body.sunday);

    /* operatingDays.push(req.body.monday);
     operatingDays.push(req.body.tuesday);
     operatingDays.push(req.body.wednesday);
     operatingDays.push(req.body.thursday);
     operatingDays.push(req.body.friday);
     operatingDays.push(req.body.saturday);
     operatingDays.push(req.body.sunday);*/

    room.set('institutionName', req.body.institutionname); // set password (hashed)
    room.set('openTime', req.body.opentime); // set email
    room.set('closeTime', req.body.closetime); // set email
    room.set('operatingDays', operatingDays);
    console.log("Room information: ");
    console.log(room);
    room.save(function(err) { // save into database
        console.log("In exports.signup");
        console.log(err);
        if (err) {
            res.session.error = err;
            res.redirect('/room-submit');
        }
        else {
            res.redirect('/room-submit');
        }
    });

    /*    room.save(function(err) { // save into database
            console.log("In exports.signup");
            console.log(err);
            if (err) {
                res.session.error = err;
                res.redirect('/signup');
            }
            else {
                req.session.user = user.id; // cookie store in database
                req.session.username = user.username;
                req.session.msg = 'Authenticated as ' + user.username;
                res.redirect('/');
            }
        });*/
};

/*exports.updateRoom = function(req, res){
  User.findOne({ _id: req.session.user })
  .exec(function(err, user) {
    user.set('email', req.body.email);
    user.set('color', req.body.color);
    user.save(function(err) {
      if (err){
        res.sessor.error = err;
      } else {
        req.session.msg = 'User Updated.';
        req.session.color = req.body.color;
      }
      res.redirect('/user');
    });
  });
};*/

/*exports.login = function(req, res) {
    User.findOne({ username: req.body.username }) // find user name
        .exec(function(err, user) {
            if (!user) {
                err = 'User Not Found.';
            }
            else if (user.hashed_password ===
                hashPW(req.body.password.toString())) { // hash their input, compare to saved hashed_password
                req.session.regenerate(function() {
                    console.log("login");
                    console.log(user);
                    req.session.user = user.id;
                    req.session.username = user.username;
                    req.session.msg = 'Authenticated as ' + user.username;
                    res.redirect('/');
                });
            }
            else {
                err = 'Authentication failed.';
            }
            if (err) {
                req.session.regenerate(function() {
                    req.session.msg = err;
                    res.redirect('/login');
                });
            }
        });
};
exports.getUserProfile = function(req, res) {
    User.findOne({ _id: req.session.user })
        .exec(function(err, user) {
            if (!user) {
                res.json(404, { err: 'User Not Found.' });
            }
            else {
                res.json(user);
            }
        });
};
exports.updateUser = function(req, res) {
    User.findOne({ _id: req.session.user })
        .exec(function(err, user) {
            user.set('email', req.body.email);
            user.save(function(err) {
                if (err) {
                    res.sessor.error = err;
                }
                else {
                    req.session.msg = 'User Updated.';
                }
                res.redirect('/user');
            });
        });
};
exports.deleteUser = function(req, res) {
    User.findOne({ _id: req.session.user })
        .exec(function(err, user) {
            if (user) {
                user.remove(function(err) {
                    if (err) {
                        req.session.msg = err;
                    }
                    req.session.destroy(function() {
                        res.redirect('/login');
                    });
                });
            }
            else {
                req.session.msg = "User Not Found!";
                req.session.destroy(function() {
                    res.redirect('/login');
                });
            }
        });
};
*/
