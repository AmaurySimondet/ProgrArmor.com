const account = require('./account/lib.js');

module.exports = function (app) {
    //LOGIN SIGNUP
    app.post('/login',account.login);
    app.post('/signup',account.signup);
    app.get('/logout', account.logout);

    app.get('/auth/facebook', account.facebook);
    app.get('/facebookToken', account.facebookToken);
    app.get('/auth/facebook/authenticate', account.facebookAuthenticate);

    app.get('/auth/google', account.google);
    app.get('/googleToken', account.googleToken);
    app.get('/auth/google/authenticate', account.googleAuthenticate);

    //SESSION
    app.post('/debutantform',account.debutantform);

    //DASHBOARD
    app.get('/workouts',account.workouts);

}