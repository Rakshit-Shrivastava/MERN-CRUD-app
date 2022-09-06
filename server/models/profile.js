const mongoose = require('mongoose');
const { Schema } = mongoose;

const profileSchema = new Schema({
   user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
   },
   name: {
      type: String,
      required: true
   },
   age: {
      type: Number,
      required: true
   },
   contact: {
      type: String,
      require: true
   },
   address: {
      type: String,
      required: true
   },
   photo: {
      contentType: String,
      data: Buffer,
   }
})

module.exports = mongoose.model('profile', profileSchema);