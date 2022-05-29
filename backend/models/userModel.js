const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  firstName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  photo: {
    type: String,
    default: "sary"
  },
  birthdate: {
    type: String,
  },
  phone: {
    type: Number,
    required: true,
  },
  adresse: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  }
}, {timestamps: true});

const User = mongoose.model('User', userSchema);

module.exports = User;