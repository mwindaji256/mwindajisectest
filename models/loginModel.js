const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: [true, 'User name is required'],
    },
    password: {
        type: String,
        required: [true, 'The password is needed'],
    },
});

const UserModel = mongoose.model('artists', UserSchema);
module.exports = UserModel;
