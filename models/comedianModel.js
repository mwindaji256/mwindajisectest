const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ComedianSchema = new Schema({
    username: {
        type: String,
        required: [true, 'The username is needed'],
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
        required: [true, 'The gender is needed'],
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
    comedianid: {
        type: String,
        required: true,
    },
    area: {
        type: String,
        required: true,
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

});



const ComedianModel = mongoose.model('comedians', ComedianSchema);
module.exports = ComedianModel;
