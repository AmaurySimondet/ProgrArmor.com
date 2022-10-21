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

//DASHBOARD
async function workouts(req, res) {
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

    function sortDateCroissant(a, b) {
        return new Date(a.date).getTime() - new Date(b.date).getTime();

    }

    function sortDateDecroissant(a, b) {
        return new Date(b.date).getTime() - new Date(a.date).getTime();

    }

    function seanceChargeSort(b,a) {
        const A = parseFloat(a.exercices.map((exercice, indexExercice) => {
            return (Object.values(exercice.Series).map((serie, index) => {
                return serie.charge;
            }))
        }));
        const B = parseFloat(b.exercices.map((exercice, indexExercice) => {
            return (Object.values(exercice.Series).map((serie, index) => {
                return serie.charge;
            }))
        }))
        return A-B;

    }

    function seancePercentSort(b,a) {
        const A = parseFloat(a.exercices.map((exercice, indexExercice) => {
            return (Object.values(exercice.Series).map((serie, index) => {
                return serie.percent.slice(0,serie.percent.length-1);
            }))
        }));
        const B = parseFloat(b.exercices.map((exercice, indexExercice) => {
            return (Object.values(exercice.Series).map((serie, index) => {
                return serie.percent.slice(0,serie.percent.length-1);
            }))
        }))
        return A-B;

    }

    function seancesToPerformances(seances, multiple){
        seances.map((seance,indexSeance) => {
            return (seance.exercices.map((exercice, indexExercice) => {
                    return (Object.values(exercice.Series).map((serie, index) => {
                        if (multiple){
                            seances[indexSeance].exercices[indexExercice].Series[index].repsTime = seances[indexSeance].exercices[indexExercice].Series[index].repsTime*multiple
                        }
                        const obj = {
                            date: seance.date,
                            poids: seance.poids,
                            exercices: [{exercice: {name: exercice.exercice.name,
                                                       ownExercice: exercice.exercice.ownExercice },
                                           Series: {0: seances[indexSeance].exercices[indexExercice].Series[index]}
                                       }]
                            }
//                            console.log(obj);
                        seances.push(obj);
                        delete seances[indexSeance].exercices[indexExercice].Series[index];
                    }))
            }))
        })
        seances.map((seance,indexSeance) => {
            return (seance.exercices.map((exercice, indexExercice) => {
                if (indexExercice>0){
                    delete seances[indexSeance].exercices[indexExercice]
                }
            }))
        })
        return seances;
    }

    function removeEmpty(seance) {
      return (
          Object.fromEntries(Object.entries(seance).filter(([_, element]) => {
            if (element[0]) {
                if(typeof element !== "string"){
                    if (element[0].Series) {
                        return (element[0].Series != null && Object.entries(element[0].Series).length !== 0)
                    }
                }
                else { return typeof element === "string"}
            }
          }))
      )
    }

    function removeEmptyPoids(seance) {
      return (
          Object.fromEntries(Object.entries(seance).filter(([_, element]) => {
            return (element != null && element != [])
          }))
      )
    }

//    function removeEmpty2(arr) {
//      return Object.fromEntries(Object.entries(seance).filter(([_, element]) => { Object.entries(element).length !== 0 }))
//    }

    try {
       User.find(
          {"email": profile.email}, function (err, data) {
                if (err){
                    res.json({ success: false, message: err})
                }
                else{
                    let seances = data[0].seances;
                    console.log(req.query)

                    //TRI EXERCICE
                    seances.map((seance,indexSeance) => {
                        return (seance.exercices.map((exercice, indexExercice) => {
                            if (req.query.exerciceName !== "title" && req.query.exerciceName !== ""){
                                if (req.query.exerciceName !== "own-exercice"){
                                    if(req.query.exerciceMuscle !== "" && req.query.exerciceMuscle !== "title"){
                                        if (req.query.exerciceName !== exercice.exercice.name || req.query.exerciceMuscle !== exercice.exercice.muscle){
                                            delete seances[indexSeance].exercices[indexExercice]
                                        }
                                    }
                                    else{
                                        if (req.query.exerciceName !== exercice.exercice.name){
                                            delete seances[indexSeance].exercices[indexExercice]
                                        }
                                    }
                                }
                                else {
                                    if (req.query.exerciceOwnExercice !== exercice.exercice.ownExercice){
                                        delete seances[indexSeance].exercices[indexExercice]
                                    }
                                }
                            }
                        }))
                    })

                    //TRI CATEGORIE
                    let del = true;
                    for(let i=0; i<5; i++){
                        let catName = "categorie"+i+"name";
                        let catInput = "categorie"+i+"input";
                        if (req.query[catName] && req.query[catName] !== "title" && req.query[catName] !== "" && req.query[catName] !== "undefined"){
                            if (req.query[catName] !== "Elastique"){
                                seances.map((seance,indexSeance) => {
                                    return (seance.exercices.map((exercice, indexExercice) => {
                                        if(exercice.Categories && Object.entries(exercice.Categories ).length !== 0){
                                            del = true
                                            Object.values(exercice.Categories).map((categorie, indexCategorie) => {
                                                if (categorie.name === req.query[catName] && categorie.input === req.query[catInput]){
                                                   del = false
                                                }
                                            })
                                            if (del){
                                                delete seances[indexSeance].exercices[indexExercice]
                                            }
                                        }
                                        else{ delete seances[indexSeance].exercices[indexExercice] }
                                    }))
                                })
                            }
                            else{
                                let catUtilisation = "categorie"+i+"utilisation";
                                seances.map((seance,indexSeance) => {
                                    return (seance.exercices.map((exercice, indexExercice) => {
                                        if(exercice.Categories && Object.entries(exercice.Categories ).length !== 0){
                                                del = true
                                                Object.values(exercice.Categories).map((categorie, indexCategorie) => {
                                                    if (categorie.name === req.query[catName] && categorie.utilisation === req.query[catUtilisation]){
                                                       del = false
                                                    }
                                                })
                                                if (del){
                                                    delete seances[indexSeance].exercices[indexExercice]
                                                }
                                        }
                                        else{ delete seances[indexSeance].exercices[indexExercice] }
                                    }))
                                })
                            }
                        }
                    }

                    //TRI DETAIL
                    for(let i=0; i<5; i++){
                        let catName = "detail"+i+"name";
                        let catInput = "detail"+i+"input";
                        if (req.query[catName] && req.query[catName] !== "title" && req.query[catName] !== "" && req.query[catName] !== "undefined"){
                            seances.map((seance,indexSeance) => {
                                if(seance.details && Object.entries(seance.details).length !== 0){
                                    del = true
                                    seance.details.map((detail, indexDetail) => {
                                        if (detail.name === req.query[catName] && detail.input === req.query[catInput]){
                                               del = false
                                        }
                                    })
                                    if (del){
                                            delete seances[indexSeance]
                                    }
                                }
                                else{ delete seances[indexSeance] }
                            })
                        }
                    }

                    //TRI REP RANGE
                    if (req.query.repsFrom !== ""){
                        seances.map((seance,indexSeance) => {
                        return (seance.exercices.map((exercice, indexExercice) => {
                                return (Object.values(exercice.Series).map((serie, index) => {
                                    if (parseFloat(serie.repsTime)<req.query.repsFrom){
                                        delete seances[indexSeance].exercices[indexExercice].Series[index]
                                    }
                                }))
                            }))
                        })
                    }
                    if (req.query.repsTo !== ""){
                        seances.map((seance,indexSeance) => {
                        return (seance.exercices.map((exercice, indexExercice) => {
                                return (Object.values(exercice.Series).map((serie, index) => {
                                    if (parseFloat(serie.repsTime)>req.query.repsTo){
                                        delete seances[indexSeance].exercices[indexExercice].Series[index]
                                    }
                                }))
                            }))
                        })
                    }

                    //TRI PERIODE
                    let currDate = new Date();
                    if (req.query.periode === '7d'){
                        seances.map((seance,indexSeance) => {
                            let d2 = new Date(seance.date);
                            if (Math.floor((currDate - d2)/1000/60/60/24) > 7){
                                delete seances[indexSeance]
                            }
                        })
                    }
                    if (req.query.periode === '30d'){
                        seances.map((seance,indexSeance) => {
                            let d2 = new Date(seance.date);
                            if (Math.floor((currDate - d2)/1000/60/60/24) > 30){
                                delete seances[indexSeance]
                            }
                        })
                    }
                    if (req.query.periode === '90d'){
                        seances.map((seance,indexSeance) => {
                            let d2 = new Date(seance.date);
                            if (Math.floor((currDate - d2)/1000/60/60/24) > 90){
                                delete seances[indexSeance]
                            }
                        })
                    }
                    if (req.query.periode === '180d'){
                        seances.map((seance,indexSeance) => {
                            let d2 = new Date(seance.date);
                            if (Math.floor((currDate - d2)/1000/60/60/24) > 180){
                                delete seances[indexSeance]
                            }
                        })
                    }
                    if (req.query.periode === '1y'){
                        seances.map((seance,indexSeance) => {
                            let d2 = new Date(seance.date);
                            if (Math.floor((currDate - d2)/1000/60/60/24) > 365){
                                delete seances[indexSeance]
                            }
                        })
                    }

                    //TRI TYPE TRI
                    if (req.query.tri === 'Ordre chronologique décroissant'){
                        seances = seances.sort(sortDateDecroissant);

                    }
                    if (req.query.tri === 'Ordre chronologique croissant'){
                        seances = seances.sort(sortDateCroissant);

                    }
                    if (req.query.tri === 'Charge (ordre décroissant)'){
                        seances = seancesToPerformances(seances);
                        seances = seances.sort(seanceChargeSort);

                    }
                    if (req.query.tri === 'PDC (ordre décroissant)'){
                        seances = seancesToPerformances(seances);
                        seances = seances.sort(seancePercentSort);

                    }

                    //STATS REFORME
                    if(req.query.reforme==="true"){
                        seances = seancesToPerformances(seances, 10);

                        let arr = []
                        seances.forEach(seance => {
                            arr.push(removeEmpty(seance))
                        });

                        seances = arr.filter(seance => {
                            return (Object.entries(seance).length !== 0 && seance.exercices)
                        });

                        seances.forEach(seance => {
                            seance.exercices[0].Series[0].percent = parseFloat(seance.exercices[0].Series[0].percent);
                        });

                    }

                    //format date
                    if(req.query.date==="md"){
                        seances.forEach(seance => {
                            seance.date = seance.date.slice(5, seance.date.length)
                        });
                    }
                    if(req.query.date==="d"){
                        seances.forEach(seance => {
                            seance.date = seance.date.slice(seance.date.length-2, seance.date.length)
                        });
                    }

                    //STATS REFORME
                    if(req.query.reforme==="poids"){
                        let arr = []
                        seances.forEach(seance => {
                            arr.push(removeEmptyPoids(seance))
                        });

                        seances = arr.filter(element => {
                            return Object.entries(element).length !== 0
                        });

                    }

                    res.json({ success: true, message: "Utilisateur trouvé !", seances: seances})
                }
          });

    }
    catch(e){
       console.log(e);
    }
};

//COMPTE
async function getUser(req, res) {
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

    try{
        User.find(
          {"email": profile.email}, function (err, data) {
                if (err){
                    res.json({ success: false, message: err})
                }
                else{
                    const obj = {
                        email: data[0].email,
                        fName: data[0].fName,
                        lName: data[0].lName,
                        profilePic: data[0].profilePic,
                    }

                    res.json({ success: true, message: "Utilisateur trouvé !", profile: obj})
                }
          });

    }
    catch(e){
       console.log(e);
    }
}

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
exports.workouts = workouts;
exports.getUser = getUser;
