import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const ObjectId = Schema.Types.ObjectId;
import * as config from '../configs/config';


const Profile = new Schema({
    age: {
        type: Number,
        required: [true, 'age is required']
    },
    gender: {
        type: String,
        enum: ['m', 'f']
    },
    helper: {
        type: String,
        enum: ['white cane', 'walker', 'wheelchair'],
        validate: {
            validator: function (v: any) {
                if (!this.helperFrequency) return false;
            },
            message: "Helper frequency is required if helper is defined"
        }
    },
    helperFrequency: {
        type: String,
        enum: ['rarely', 'sometimes', 'always'],
        validate: {
            validator: function (v) {
                if (!this.helper) return false;
            },
            message: props => "Helper frequency shouldn't be defined if helper is undefined"
        }
    },
    mobility: {
        type: String,
        enum: ['perfect', 'good', 'reduced', 'minimal'],
        required: [true, 'mobility is required']
    }
});

const User = new Schema({
    _id: {
        type: ObjectId,
        auto: true
    },
    pseudonym: {
        type: String,
        required: [true, 'pseudonym is required'],
        unique: true,
        lowercase: true,
        trim: true
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        unique: true,
        lowercase: true,
        trim: true
    },
    passwordHash: {
        type: String,
        required: [true, 'password is required']
    },
    events: [ObjectId],
    profile: Profile
}, {
    timestamps: true
});


User.methods.encryptPassword = async function (plainTextPassword) {
    this.passwordHash = await bcrypt.hash(plainTextPassword, config.costFactor);
};

if (!User.options.toObject) User.options.toObject = {};
User.options.toObject.transform = function (user, userResponse, options) {
    delete userResponse._id;
    delete userResponse.createdAt;
    delete userResponse.updatedAt;
    delete userResponse.__v;
};

if (!Profile.options.toObject) Profile.options.toObject = {};
Profile.options.toObject.transform = function (profile, profileResponse, options) {
    delete profileResponse._id;
};

module.exports = mongoose.model('User', User);
