const account = require('./account/lib.js');
const programme = require('./account/libprogramme.js');

module.exports = function (app) {
    //LOGIN SIGNUP
    app.post('/login', account.login);
    app.post('/signup', account.signup);
    app.get('/logout', account.logout);

    app.get('/auth/facebook', account.facebook);
    app.get('/auth/facebook/authenticate', account.facebookAuthenticate);

    app.get('/auth/google', account.google);
    app.get('/auth/google/authenticate', account.googleAuthenticate);

    //SESSION
    app.post('/debutantform', account.debutantform);
    app.get('/loadSeance', account.loadSeance);

    //DASHBOARD
    app.get('/workouts', account.workouts);
    app.post('/reguScore', account.reguScore);

    //COMPTE
    app.post('/getUser', account.getUser);
    app.post('/modifyUser', account.modifyUser);

    //TOKEN
    app.post('/verifyToken', account.verifyToken)

    //SUPPR SEANCE
    app.post('/supprSeance', account.supprSeance)

    // //EDIT DB
    // app.get('/editDB', account.editDB)

    //PROGRAMME
    app.post('/createProgramme', programme.create);
    app.post('/getProgrammes', programme.getProgrammes);

}