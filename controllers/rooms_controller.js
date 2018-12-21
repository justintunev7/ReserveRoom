var mongoose = require('mongoose');
var Room = mongoose.model('Room');
//var Days = mongoose.model('operatingDays');

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
exports.getReserveRoomPage = function(req, res) {
    if (req.session.user) { // if user logs in correctly
        console.log("User logged in");
        res.render('reserveRoom', {
            username: req.session.username,
            msg: req.session.msg,
            color: req.session.color
        }); // send session info        console.log("completed render");
        //res.redirect('/reservation');
    }
    else {
        req.session.msg = 'Access denied!';
        res.redirect('/login');
    }

}


exports.getRooms = function(req, res) {
    console.log("GET ROOMS ROUTE");
    if (req.session.user) { // if user logs in correctly
        var rooms = [];
        Room.find({}, function(err, result) {
            if (err) { console.log('Find did not work', err) }
            //rooms = result;
            //rooms = JSON.stringify(rooms, null, "\t");
            res.json(result);
            /*console.log('in find function');
            console.log(result);
            res.render('reserve', {
                username: req.session.username,
                msg: req.session.msg,
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
