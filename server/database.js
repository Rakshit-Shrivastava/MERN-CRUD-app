const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://Rakshit:WIbgdPe90SzDaKnx@cluster0.3qili68.mongodb.net/InterviewProject?retryWrites=true&w=majority';

function connectToMongo() {
    mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, () => {
        console.log("Connected to Mongo successfully")
    })
}

module.exports = connectToMongo;

// WIbgdPe90SzDaKnx