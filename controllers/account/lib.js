const User = require("../../schema/schemaUser.js");
const passwordHash = require("password-hash");
const session = require('cookie-session');
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const express = require("express");
const findOrCreate = require('mongoose-findorcreate');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();

app.use(session({
    secret: "Our little secret.",
    resave: false,
    saveUninitialized: false
}));

// CHANGE: USE "createStrategy" INSTEAD OF "authenticate"
passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//FACEBOOK
const FacebookStrategy = require('passport-facebook').Strategy;

let facebookProfile = null;

passport.use(new FacebookStrategy({
    proxy: true,
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: "http://localhost:8800/user/auth/facebook/authenticate",
    profileFields: ['id', 'name', 'email', 'picture.type(large)']
  },
  async (accessToken, refreshToken, profile, done) => {

    facebookProfile = profile._json
    console.log(facebookProfile)
    const user = {
        facebookId : profile._json.id,
        email : profile._json.email,
        fName: profile._json.first_name,
        lName: profile._json.last_name,
        profilePic: profile._json.picture.data.url
    }

    try {
      const oldUser = await User.findOne({ facebookId: user.facebookId });

      if (oldUser) {
        return done(oldUser);
      }
    } catch (err) {
      console.log(err);
      return done(false);
    }

    // register user
    try {
      const newUser = await new User(user).save();

      done(null, newUser);
    } catch (err) {
      console.log(err);
      return done(false);
    }
}
))

async function facebook(req, res) {
    passport.authenticate("facebook", {failureRedirect: '/', scope:['email'], successRedirect: 'http://localhost:3000/dashboard'})(req,res,function(){
                    const token = jwt.sign({ username: 'facebook' }, process.env.secret, { expiresIn: "24h" });
                    res.json({ success: true, message: "Register Facebook successful", token: token });
    });
};

async function facebookAuthenticate(req, res) {
    try {
        passport.authenticate("facebook", {failureRedirect: '/', successRedirect: 'http://localhost:3000/dashboard'})(req,res,function(){
            res.redirect('http://localhost:3000/dashboard');
        });
        }
    catch (error) {
      res.send(error);
    }
};

async function facebookToken(req, res) {
    if (!facebookProfile) {
        res.json({ success: false, message: "Login Facebook failed" });
    }
    else {
        const token = jwt.sign({ username: facebookProfile.email }, process.env.secret, { expiresIn: "5s" });
        res.json({ success: true, message: "Login Facebook successful", token: token });
    }
}

//Google
const GoogleStrategy = require('passport-google-oauth20').Strategy;

let googleProfile = null;

passport.use(new GoogleStrategy({
    proxy: true,
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8800/user/auth/google/authenticate",
    profileFields: ['id', 'name', 'email', 'photos']
  },
  async (accessToken, refreshToken, profile, done) => {

    googleProfile = profile._json
    console.log(googleProfile)
    const user = {
        googleId : profile._json.sub,
        email : profile._json.email,
        fName: profile._json.given_name,
        lName: profile._json.family_name,
        profilePic: profile._json.picture
    }

    try {
      const oldUser = await User.findOne({ googleId: user.googleId });

      if (oldUser) {
        return done(oldUser);
      }
    } catch (err) {
      console.log(err);
      return done(false);
    }

    // register user
    try {
      const newUser = await new User(user).save();

      done(null, newUser);
    } catch (err) {
      console.log(err);
      return done(false);
    }
}
))

async function google(req, res) {
    passport.authenticate("google", {failureRedirect: '/', scope:['email', 'profile'], successRedirect: 'http://localhost:3000/dashboard'})(req,res,function(){
                    const token = jwt.sign({ username: 'google' }, process.env.secret, { expiresIn: "24h" });
                    res.json({ success: true, message: "Register Google successful", token: token });
    });
};

async function googleAuthenticate(req, res) {
    try {
        passport.authenticate("google", {failureRedirect: '/', successRedirect: 'http://localhost:3000/dashboard'})(req,res,function(){
            res.redirect('http://localhost:3000/dashboard');
        });
        }
    catch (error) {
      res.send(error);
    }
};

async function googleToken(req, res) {
    if (!googleProfile) {
        res.json({ success: false, message: "Login Google failed" });
    }
    else {
        const token = jwt.sign({ username: googleProfile.email }, process.env.secret, { expiresIn: "5s" });
        res.json({ success: true, message: "Login Google successful", token: token });
    }
}


//SIGNUP
let userProfile = null;

async function signup(req, res) {
    User.register(
        {fName: req.body.fName, email: req.body.email, lName: req.body.lName},
        req.body.password,
        function(err,user){
            if(err){
                console.log(err)
                res.json({ success: false, message: "Your account could not be saved. Error: " + err });
            }else{
                passport.authenticate("local")(req,res,function(){
                    userProfile = user;
                    console.log(userProfile);
                    const token = jwt.sign({ email: user.email }, process.env.secret, { expiresIn: "24h" });
                    res.json({ success: true, message: "Register successful", token: token });
                });
            };
    });
};


//LOGIN
async function login(req, res) {
    const user = new User({
        email: req.body.email,
        password: req.body.password
    });

    if (!req.body.email) {
        res.json({ success: false, message: "Email was not given" })
    }
    else if (!req.body.password) {
        res.json({ success: false, message: "Password was not given" })
    }

    else {req.login(user, function(err){
        if(err){
            console.log(err);
        }else{
            passport.authenticate("local", function (err, user, info) {
                if (err) {
                    res.json({ success: false, message: err });
                }
                else {
                    if (!user) {
                        res.json({ success: false, message: "email or password incorrect" });
                    }
                    else {
                        userProfile = user;
                        console.log(userProfile);
                        const token = jwt.sign({ email: user.email }, process.env.secret, { expiresIn: "24h" });
                        res.json({ success: true, message: "Login successful", token: token });
                    }
                }
            })(req, res);
        };
    });
    }
};

//LOGOUT
async function logout(req, res) {
    req.logout(function (err){
        if (err) {alert (err)}
    });
    facebookProfile = null;
    googleProfile = null;
    userProfile = null;
    res.json({ success: true, message: "Logout successful"})
}

//SESSION
//DEBUTANT FORM
async function debutantform(req, res) {
    const seance = req.body.seance;
    let profile = null;

    if (facebookProfile === null){
        if (googleProfile === null){
            if (userProfile === null){
                res.json({ success: false, message: "Merci de vous connecter" });
            } else {
                profile = userProfile;
            }
        }
        else{
            profile = googleProfile;
        }
    }else {
        profile = facebookProfile;

    }

    console.log(seance);
    console.log(profile);

    try {
       User.findOneAndUpdate(
          {"email": profile.email},
          { $addToSet:  {"seances": seance}},
          (err) => {
              if (err) {return res.json({ success: false, message: err})}
              else {res.json({ success: true, message: "Serie enregistrée !"})}
          }
       )

    }
    catch(e){
       console.log(e);
    }
};

//On exporte nos fonctions
exports.login = login;
exports.signup = signup;
exports.facebook = facebook;
exports.facebookAuthenticate = facebookAuthenticate;
exports.facebookToken = facebookToken;
exports.google = google;
exports.googleAuthenticate = googleAuthenticate;
exports.googleToken = googleToken;
exports.logout = logout;
exports.debutantform = debutantform;
