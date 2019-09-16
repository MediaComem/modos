let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;

var Observation = new Schema({
    owner: {
        type: ObjectId,
        ref: 'User',
        required: [ true, 'owner is required' ]
    },
    description: {
        type: [Description],
        required: [ true, 'description is required' ]
    },
    image: {
        type: [Image],
        required: [ true, 'image is required' ]
    }
});

var Description = new Schema({
    obstacle: {
        type: String,
        enum: [ 'sidewalk', 'crosswalk', 'pavement', 'slope', 'accessibility', 'other' ],
        required: [ true, 'obstacle is required' ]
    },
    freeText: {
        type: String
    },
    impact: {
        type: Number,
        required: [ true, 'impact is required' ]
    }
});

var Image = new Schema({
    imagePath: {
        type: String,
        required: [ true, 'image path is required' ]
    },
    width: {
        type: Number,
        required: [ true, 'width is required' ]
    },
    height: {
        type: Number,
        required: [ true, 'height is required' ]
    },
    boundingBox: {
        type: [Number],
        required: [ true, 'bounding box is required' ]
    }
});

// TODO
// var Location = new Schema({

// });

module.exports = mongoose.model('Observation', Observation);
