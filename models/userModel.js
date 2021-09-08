const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell use your name!']
  },
  email: {
      type: String,
      required: [true, 'Please provide your email'],
      unique: [true, 'Email adress already exist'],
      lowercase: [true, 'Email address must be in lowercase'],
      vaildate: [validator.isEmail, 'Please provide a valid email']
  },
  photo: String,
  password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: 8
  },
  passwordConfirm: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: 8
  }
});

const User = mongoose.model('User', userSchema)

module.exports = User