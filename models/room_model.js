var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/*
var daySchema = new Schema({
    monday: { type: Boolean, default: false },
    tuesday: { type: Boolean, default: false },
    wednesday: { type: Boolean, default: false },
    thursday: { type: Boolean, default: false },
    friday: { type: Boolean, default: false },
    saturday: { type: Boolean, default: false },
    sunday: { type: Boolean, default: false },
}); // array of strings listing the days the room is open, default M-

mongoose.model('operatingDays', daySchema);
*/
/*
var reservationSchema = new Schema({
    Title: String, // class name, staff meeting, etc.
    roomName: String,
    days: daySchema,
    startDate: Date,
    endDate: Date,
    startTime: Number,
    endTime: Number
});
mongoose.model('reservation', reservationSchema);

*/
var RoomSchema = new Schema({
    institutionName: String, // name of organization/school
    roomName: String, // ex: Room 211, Production Studio, etc.
    openTime: String,
    closeTime: String,
    roomCapacity: Number,

    monday: { type: Boolean, default: false },
    tuesday: { type: Boolean, default: false },
    wednesday: { type: Boolean, default: false },
    thursday: { type: Boolean, default: false },
    friday: { type: Boolean, default: false },
    saturday: { type: Boolean, default: false },
    sunday: { type: Boolean, default: false },

    // closedDays: [Date],

});

mongoose.model('Room', RoomSchema);
