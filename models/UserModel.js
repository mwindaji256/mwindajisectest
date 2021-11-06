const mongoose = require('mongoose');
// const passportLocalMongoose = require('passport-local-mongoose');


const userSchema = new mongoose.Schema({
  email: String,
  role: String,
  password: String,
});

// userSchema.plugin(passportLocalMongoose);

const UserModel = mongoose.model('accounts', userSchema);
module.exports = UserModel;