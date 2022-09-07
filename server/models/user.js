const mongoose = require('mongoose');
const {Schema} = mongoose;

// creaitng structure for storing data onto database
const uesrSchema = new Schema({
    email: {
        type: String,
        requied: true,
        unique: true
    },
    password: {
        type: String,
        requied: true
    }
});

module.exports = mongoose.model('user', uesrSchema);