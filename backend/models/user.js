let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;

var Profile = new Schema({
    age: {
        type: Number,
        required: [ true, 'age is required' ]
    },
    gender: {
        type: String,
        enum: [ 'm', 'f' ]
    },
    helper: {
        type: String,
        enum: [ 'white cane', 'walker', 'wheelchair' ]
    },
    helperFrequency: {
        type: Number
    },
    mobility: {
        type: Number
    }
});

var User = new Schema({
    pseudonym: {
        type: String,
        required: [ true, 'name is required' ],
        lowercase: true
    },
    email: {
        type: String,
        required: [ true, 'email is required' ],
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [ true, 'password is required' ]
    },
    events: [ObjectId],
    profile: Profile
}, {
    timestamps: true
});

module.exports = mongoose.model('User', User);