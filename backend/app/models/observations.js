let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;
const Event = require('./events');
const fs = require('fs');
const path = require('path');

const Description = new Schema({
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

const BoundingBox = new Schema({
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

const Image = new Schema({
    imageURL: {
        type: String,
        required: [true, 'image path is required']
    },
    width: {
        type: Number,
        //required: [true, 'width is required']
    },
    height: {
        type: Number,
        //required: [true, 'height is required']
    },
    boundingBox: BoundingBox
});

const Location = new Schema({
    latitude: {
        type: Number,
    },
    longitude: {
        type: Number,
    }
});

const Observation = new Schema({
    owner: {
        type: ObjectId,
        ref: 'User',
        required: [true, 'owner is required']
    },
    description: Description,
    image: Image,
    location: Location
}, {
    timestamps: true
});


Observation.methods.saveImage = async function(imageData) {
    try {
        const imagePath = path.join(config.storageDirectory, String(Date.now()) + config.imageFormat);
        this.image = {};
        this.image.imageURL = path.join(config.baseUrl, imagePath);

        const imageWithoudMetadata = imageData.split(',')[1];
        const decodedData = Buffer.from(imageWithoudMetadata, 'base64');
        await fs.promises.writeFile(imagePath, decodedData);
    } catch (error) {
        console.log(error);
        throw error;
    }
};

Observation.methods.loadImage = async function(imageURL) {
    // TODO: load the imageURL, and return it encoded to base64
    decodedData = await fs.promises.readFile(imageURL);
    const imageData = new Buffer(decodedData).toString('base64');
    return imageData;
};

if (!Observation.options.toObject) Observation.options.toObject = {};
Observation.options.toObject.transform = function(observation, observationRespnse, options) {
    delete observationRespnse.createdAt;
    delete observationRespnse.updatedAt;
    delete observationRespnse.__v;
};

if (!Description.options.toObject) Description.options.toObject = {};
Description.options.toObject.transform = function(description, descriptionResponse, options) {
    delete descriptionResponse._id;
};

if (!Image.options.toObject) Image.options.toObject = {};
Image.options.toObject.transform = function(image, imageResponse, options) {
    delete imageResponse._id;
};

if (!BoundingBox.options.toObject) BoundingBox.options.toObject = {};
BoundingBox.options.toObject.transform = function(boundingBox, boundingBoxResponse, options) {
    delete boundingBoxResponse._id;
}

if (!Location.options.toObject) Location.options.toObject = {};
Location.options.toObject.transform = function(location, locationResponse, options) {
    delete locationResponse._id;
};

module.exports = mongoose.model('Observation', Observation);
