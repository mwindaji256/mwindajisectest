const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const BandSchema = new Schema({
    bandname: {
        type: String,
        required: [true, 'User name is required'],
    },
    owner: {
        type: String,
        required: [true, 'The owner is needed'],
    },
    home: {
        type: String,
        required: [true, 'The home is needed'],
    },

    startdate: {
        type: Date,
        required: true,
    },
    category: {
        type: String,
        required: [true, 'The category is needed'],
    },
    bandid: {
        type: String,
        required: true,
    },
    albums: {
        type: Number,
        required: true,
    },
    slogan: {
        type: String,
        required: true,
    },
    bandicon: {
        type: String,
        required: true,
    },
    bandimage: {
        type: String,
        required: true,
    },
    home: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: 'band',
    },
    email: {
        type: String,
        required: true,
    },
    members: {
        type: Number,
    },
    // img: {
    //     data: Buffer,
    //     contentType: String,
    // },
    sponsors: {
        type: String,
    },
    password: {
        type: String,
        default: 'password',
    },
    profile: {
        type: String,
    },
    crowns: {
        type: String,
    },
});

const BandModel = mongoose.model('bands', BandSchema);
module.exports = BandModel;
