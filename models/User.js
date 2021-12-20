const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("config");

const userSchema = new mongoose.Schema(
    {
        userName: {type: String, required: true, unique: true},
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        isAdmin: {type: Boolean, default: false,},
    },
    { timestamps: true }
)

userSchema.methods.generateAuthToken = function () {
    return jwt.sign({ 
      _id: this._id,
      userName: this.userName,
      email: this.email,
      password: this.password,
      isAdmin: this.isAdmin,
       }, config.get('jwtSecret'));
};


const User = mongoose.model('User', userSchema)

const validateUser = (user) => {
  const schema = Joi.object({
    userName: Joi.string().min(5).max(255).required().userName(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(1024).required(),
  });
  return schema.validate(user);
}

const validateLogin = (req) => {
  const schema = Joi.object({
    userName: Joi.string().min(5).max(255).required(),
    password: Joi.string().min(5).max(1024).required(),
  });
  return schema.validate(req);
};

exports.User = User
exports.validateUser = validateUser
exports.validateLogin = validateLogin;