const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    photoUrl: {
        type: String,
    },
    
});

const UserModel = mongoose.model('user', UserSchema);

module.exports = UserModel;