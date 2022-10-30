const User = require("../../schema/schemaUser.js");
const passwordHash = require("password-hash");
const session = require('cookie-session');
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const express = require("express");
const findOrCreate = require('mongoose-findorcreate');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const url = "http://localhost:8800" // http://localhost:8800 https://prograrmorprealpha1.herokuapp.com
const url2 = "http://localhost:3000" // http://localhost:8800 https://prograrmorprealpha1.herokuapp.com

const app = express();

app.use(session({
    secret: process.env.secret,
    resave: false,
    saveUninitialized: false
}));

// CHANGE: USE "createStrategy" INSTEAD OF "authenticate"
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//FACEBOOK
const FacebookStrategy = require('passport-facebook').Strategy;

passport.use(new FacebookStrategy({
    proxy: true,
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: url+"/user/auth/facebook/authenticate",
    profileFields: ['id', 'name', 'email', 'picture.type(large)']
  },
  async (accessToken, refreshToken, profile, done) => {

    const user = {
        facebookId : profile._json.id,
        email : profile._json.email,
        fName: profile._json.first_name,
        lName: profile._json.last_name,
        profilePic: profile._json.picture.data.url
    }

    const oldUser = await User.findOne({ googleId: user.googleId });

    if (oldUser){
        return done(null, oldUser)
    }
    else{
        const newUser = await new User(user).save();
        return done(null, newUser)
    }
}
))

async function facebook(req, res) {
    passport.authenticate("facebook", {scope:['email']})(req,res,function(){});
};

async function facebookAuthenticate(req, res) {
    try {
        passport.authenticate("facebook")(req,res,function(err){
             if (req.user){
                const token = jwt.sign({id: req.user._id}, process.env.secret, { expiresIn: "24h" });
                res.redirect(url2+'/token?token='+token);
             }
             else {
                console.log(err)
             }
        });
        }
    catch (error) {
      res.send(error);
    }
};

//Google
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    proxy: true,
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: url+"/user/auth/google/authenticate",
    profileFields: ['id', 'name', 'email', 'photos']
  },
  async (accessToken, refreshToken, profile, done) => {

    const user = {
        googleId : profile._json.sub,
        email : profile._json.email,
        fName: profile._json.given_name,
        lName: profile._json.family_name,
        profilePic: profile._json.picture
    }

    const oldUser = await User.findOne({ googleId: user.googleId });

    if (oldUser){
        return done(null, oldUser)
    }
    else{
        const newUser = await new User(user).save();
        return done(null, newUser)
    }
}
))

function google(req,res) {
    passport.authenticate("google", {scope:['email', 'profile']})(req,res,function(){});
};

async function googleAuthenticate(req, res) {
    try {
        passport.authenticate("google")(req,res,function(err){
             if (req.user){
                 const token = jwt.sign({id: req.user._id}, process.env.secret, { expiresIn: "24h" });
                res.redirect(url2+'/token?token='+token);
             }
             else {
                console.log(err)
             }
        });
        }
    catch (error) {
      res.send(error);
    }
};

function verifyToken(req, res){
    const token = req.body.token
    jwt.verify(token, process.env.secret, function(err, decoded){
        if (err) {
            res.json({ success: false, message: "Token verification failed "+err.name });
        }
        else{
            res.json({ success: true, message: "Token verification successfull", id: decoded.id });
        }
    })

}


//SIGNUP
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
                    const token = jwt.sign({id: user._id}, process.env.secret, { expiresIn: "24h" });
                    res.json({ success: true, message: "Register successful", token: token});
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
                        const token = jwt.sign({id: user._id}, process.env.secret, { expiresIn: "24h" });
                        res.json({ success: true, message: "Register successful", token: token});
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
    res.json({ success: true, message: "Logout successful"})
}

//SESSION
//DEBUTANT FORM
async function debutantform(req, res) {
    const seance = req.body.seance;

    try {
       User.findOneAndUpdate(
          {"_id": req.body.id},
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
    console.log(req.query)

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
                    return (Object.keys(exercice.Series).map(index => {
//                        console.log(seance)
//                        console.log(exercice.Series)
//                        console.log(Object.keys(exercice.Series))
                        if (multiple){
                            seances[indexSeance].exercices[indexExercice].Series[index].repsTime = seances[indexSeance].exercices[indexExercice].Series[index].repsTime*multiple
                        }
                        let obj = {}
                        if(seances[indexSeance].exercices[indexExercice].Categories){
                            obj = {
                                date: seance.date,
                                poids: seance.poids,
                                exercices: [{exercice: {name: exercice.exercice.name,
                                                           ownExercice: exercice.exercice.ownExercice },
                                               Series: {0: seances[indexSeance].exercices[indexExercice].Series[index]},
                                               Categories: seances[indexSeance].exercices[indexExercice].Categories
                                           }]
                                }
                        }
                        else {
                            obj = {
                                date: seance.date,
                                poids: seance.poids,
                                exercices: [{exercice: {name: exercice.exercice.name,
                                                           ownExercice: exercice.exercice.ownExercice },
                                               Series: {0: seances[indexSeance].exercices[indexExercice].Series[index]}
                                           }]
                                }
                        }
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

    function seancesToPie(seances , string){
        let arr = []
        let arr2 = []

        seances.map((seance,indexSeance) => {
            return (seance.exercices.map((exercice, indexExercice) => {
                    return (Object.keys(exercice.Series).map(index => {
                        if(seances[indexSeance].exercices[indexExercice].Series[index].typeSerie===string || string==="sets"){
                            if(seances[indexSeance].exercices[indexExercice].exercice.muscle){
                                arr.push(seances[indexSeance].exercices[indexExercice].exercice.name+" - "+seances[indexSeance].exercices[indexExercice].exercice.muscle)
                                if (string !== "sets"){
                                    arr2.push(parseFloat(seances[indexSeance].exercices[indexExercice].Series[index].repsTime))
                                }
                                else{
                                    arr2.push(0)
                                }
                            }
                            else{
                                arr.push(seances[indexSeance].exercices[indexExercice].exercice.name)
                                if (string !== "sets"){
                                    arr2.push(parseFloat(seances[indexSeance].exercices[indexExercice].Series[index].repsTime))
                                }
                                else{
                                    arr2.push(0)
                                }
                            }
                        }
                    }))
            }))
        })

        if (string !== "sets"){

            let index = []
            arr2 = arr2.filter(function( el, i ) {
               if (isNaN(el)){
                    index.push(i)
                    return false
               }
               else{
                    return true
               }
            });
            index.forEach((id) => arr.splice(id,1))

            for(let k=0; k<arr.length; k++){
                for(let i=0; i<arr.length; i++){
                    if(k!=i && arr[k]===arr[i]){
                        arr2[k] = parseFloat(arr2[k]) + parseFloat(arr2[i])
                        arr[i] = 0
                        arr2[i] = 0
                    }
                }
            }

            arr = arr.filter(el => el!==0)
            arr2 = arr2.filter(e => e!=0)

            let arr3 = []
            for(let k=0; k<arr.length; k++){
                arr3.push({name: arr[k], repsTime: parseFloat(arr2[k])})
            }

            return arr3;
        }
        else{
            arr2 = []
            let arr3 =[]

            for(let k=0; k<arr.length; k++){
                if(!arr3.includes(arr[k])){
                    arr3.push(arr[k])
                    arr2.push(arr.filter(el => {return el===arr[k]}).length)
                }


            }

            let arr4 = []
            for(let k=0; k<arr.length; k++){
                arr4.push({name: arr3[k], repsTime: parseFloat(arr2[k])})
            }

            return arr4;

        }
    }

    function sortExerciceFav(b,a) {
        return a.repsTime - b.repsTime;

    }

    function removeEmptyPoids(seance) {
      return (
          Object.fromEntries(Object.entries(seance).filter(([_, element]) => {
            return (element != null && element != [])
          }))
      )
    }

    try {
       User.find(
          {"_id": req.query.id}, function (err, data) {
                if (err){
                    res.json({ success: false, message: err})
                }
                else{
                    let seances = data[0].seances;
//                    console.log(req.query)

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
                        let arr = []
                        seances.forEach(seance => {
                            arr.push(removeEmpty(seance))
                        });

                        seances = seancesToPerformances(seances, 10);

                        arr = []
                        seances.forEach(seance => {
                            arr.push(removeEmpty(seance))
                        });

                        seances = arr.filter(seance => {
                            return (Object.entries(seance).length !== 0 && seance.exercices)
                        });

                        seances.forEach(seance => {
                            seance.exercices[0].Series[0].percent = parseFloat(seance.exercices[0].Series[0].percent);
                        });

                        seances.forEach(seance => {
                            for(let k=0; k<5; k++){
                                if(seance.exercices[0].Categories && seance.exercices[0].Categories[k] && seance.exercices[0].Categories[k].estimation){
                                    seance.exercices[0].Categories[k].estimation = parseFloat(seance.exercices[0].Categories[k].estimation);
                                }
                            }
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

                    //STATS REFORME poids
                    if(req.query.reforme==="poids"){
                        let arr = []
                        seances.forEach(seance => {
                            arr.push(removeEmptyPoids(seance))
                        });

                        seances = arr.filter(element => {
                            return Object.entries(element).length !== 0
                        });

                    }

                    //STATS REFORME poids
                    if(req.query.reforme==="pie"){
                        seances = seancesToPie(seances, req.query.class)
                        seances = seances.sort((a,b) => {return b.repsTime - a.repsTime})
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
    id = req.body.id

    try{
        User.find(
          {"_id": id}, function (err, data) {
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
exports.google = google;
exports.googleAuthenticate = googleAuthenticate;
exports.logout = logout;
exports.debutantform = debutantform;
exports.workouts = workouts;
exports.getUser = getUser;
exports.verifyToken = verifyToken;