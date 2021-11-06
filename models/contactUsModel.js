const mongoose = require('mongoose');

const contactUsSchema = new mongoose.Schema({
    firstName: {
        type: String,
        trim: true,
    },
    lastName: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        trim: true,
    },
    message: {
        type: String,
    },
});

module.exports = mongoose.model('ContactUs', contactUsSchema);
