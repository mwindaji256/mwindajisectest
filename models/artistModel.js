const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const ArtistSchema = new Schema({
    username: {
        type: String,
        required: [true, 'User name is required'],
    },
    stagename: {
        type: String,
        required: [true, 'The stagename is needed'],
    },
    profile: {
        type: String,
        required: [true, 'The profile is needed'],
    },
    dob: {
        type: Date,
        required: true,
    },
    startdate: {
        type: Date,
        required: true,
    },
    gender: {
        type: String,
        required: [true, 'The profile is needed'],
    },
    nin: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    contact: {
        type: Number,
        required: true,
    },
    artistid: {
        type: String,
        required: true,
    },
    albums: {
        type: Number,
        required: true,
    },
    area: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: 'viewer',
    },
    email: {
        type: String,
        required: true,
    },
    // img: {
    //     data: Buffer,
    //     contentType: String,
    // },
    img: {
        type: String,
    },
    password: {
        type: String,
        default: 'password',
    },
});

ArtistSchema.plugin(passportLocalMongoose, {
    username: 'username',
});

const ArtistModel = mongoose.model('musicians', ArtistSchema);
module.exports = ArtistModel;
