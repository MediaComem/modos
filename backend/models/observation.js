let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;
const Event = require('./event');

var Description = new Schema({
    obstacle: {
        type: String,
        enum: ['sidewalk', 'crosswalk', 'pavement', 'slope', 'accessibility', 'other'],
        required: [true, 'obstacle is required']
    },
    freeText: {
        type: String,
        trim: true
    },
    impact: {
        type: Number,
        required: [true, 'impact is required']
    }
});

var BoundingBox = new Schema({
    x: {
        type: Number,
        required: [true, 'bounding box\'s x coordinate is required']
    },
    y: {
        type: Number,
        required: [true, 'bounding box\'s y coordinate is required']
    },
    width: {
        type: Number,
        required: [true, 'bounding box\'s width is required'],
        min: [1, 'bounding box\'s width cannot be null']
    },
    height: {
        type: Number,
        required: [true, 'bounding box\'s height is required'],
        min: [1, 'bounding box\'s height cannot be null']
    }
})

var Image = new Schema({
    imagePath: {
        type: String,
        required: [true, 'image path is required']
    },
    width: {
        type: Number,
        required: [true, 'width is required']
    },
    height: {
        type: Number,
        required: [true, 'height is required']
    },
    boundingBox: BoundingBox
});

// TODO
// var Location = new Schema({

// });

var Observation = new Schema({
    owner: {
        type: ObjectId,
        ref: 'User',
        required: [true, 'owner is required']
    },
    description: [Description],
    images: [Image]
}, {
    timestamps: true
});

module.exports = mongoose.model('Observation', Observation);
