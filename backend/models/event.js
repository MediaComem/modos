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
    title: {
        type: String,
        required: [true, 'title is required']
    },
    password: {
        type: String
    },
    beginning: {
        type: Date,
        min: new Date(),
        required: [true, 'beginning date is required']
    },
    ending: {
        type: Date,
        min: new Date(),
        required: [true, 'ending date is required']
    },
    objective: {
        type: String,
        required: [true, 'objective is required'],
        trim: true
    },
    numberOfImages: {
        type: Number,
        min: [1, 'at least one image is required'],
        required: [true, 'number of images is required']
    },
    observations: {
        type: [ObjectId],
        ref: 'Observation'
    }
}, {
    timestamps: true
});

Event.post('save', function (event) {
    // Automatically adds the owner of an event as participant.
    User.findById(event.owner, (err, user) => {
        if (user) {
            user.events.push(event._id);
            user.save();
        }
    });
});

Event.post('findOneAndRemove', function (event) {
    if (event) {
        User.updateMany(
            { events: event._id }, { $pullAll: { events: [event._id] } }
        ).exec();
    }
});

module.exports = mongoose.model('Event', Event);
