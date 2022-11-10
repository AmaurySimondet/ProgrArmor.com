const mongoose = require("mongoose");
const findOrCreate = require('mongoose-findorcreate');
const passportLocalMongoose = require("passport-local-mongoose");

//const seanceSchema = mongoose.Schema(
//  {
//    date: {type : String},
//    poids: {type : String},
//    exercices: {type : Array},
//  }
//);

//const seancesSchema = mongoose.Schema(
//  {
//    seance: seanceSchema,
//  }
//);

const userSchema = mongoose.Schema(
  {
    facebookId: { type: String },
    googleId: { type: String },
    email: {
      type: String,
      lowercase: true,
      trim: true,
      unique: true,
      required: true
    },
    fName: {
      type: String,
      trim: true,
      required: true,
      unique: false
    },
    lName: {
      type: String,
      trim: true,
      required: true,
      unique: false
    },
    profilePic: {
      type: String
    },
    modeSombre:{
      type: Boolean
    },
    seances: Array,
  },
  { timestamps: { createdAt: "created_at" } }
);

userSchema.plugin(passportLocalMongoose, {usernameField: "email"});
userSchema.plugin(findOrCreate);

module.exports = mongoose.model("User", userSchema);