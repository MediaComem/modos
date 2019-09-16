let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;

var Event = new Schema({
    owner: {
        type: ObjectId,
        ref: 'User',
        required: [ true, 'owner is required' ]
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

module.exports = mongoose.model('Event', Event);
