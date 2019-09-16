let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;
const User = require('./user');

var Event = new Schema({
    _id: {
        type: ObjectId,
        auto: true
    },
    owner: {
        type: ObjectId,
        ref: 'User',
        required: [true, 'owner is required']
    },
    password: {
        type: String
    },
    beginning: {
        type: Date,
        min: new Date()
    },
    ending: {
        type: Date,
        min: new Date()
    },
    objective: {
        type: String
    },
    numberOfImages: {
        type: Number
    },
    observations: {
        type: [ObjectId],
        ref: 'Observation'
    }
});

Event.post('save', function (event) {
    // automatically adds the owner of an event as participant
    User.findById(event.owner, (err, user) => {
        user.events.push(event._id);
        user.save();
    });
});

module.exports = mongoose.model('Event', Event);
