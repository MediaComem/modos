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
        required: [true, 'objective is required']
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
});

Event.post('save', function (event) {
    // automatically adds the owner of an event as participant
    User.findById(event.owner, (err, user) => {
        user.events.push(event._id);
        user.save();
    });
});

Event.post('findOneAndRemove', function (event) {
    User.updateMany(
        { events: event._id }, { $pullAll: { events: [ event._id ] }}
    ).exec();
});

module.exports = mongoose.model('Event', Event);
