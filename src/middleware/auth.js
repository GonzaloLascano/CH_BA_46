const passport = require('passport');
const { logError, logWarn, log } = require('../../config/log');
const LocalStrategy = require('passport-local').Strategy;
const { UsersMongoModel } = require('../models/mongoUsers')

passport.use('login', new LocalStrategy({
    passReqToCallback: true,
    usernameField: 'email',
    passwordField: 'password'
}, function(req, email, password, done) {
    UsersMongoModel.findOne({ email }, (err, user) => {
        if (err) return done(err)

        if (!user) {
            logError.error('could not find the user');
            return done(null, false);
        }

        if (password !== user.password) {
            logWarn.warn('invalid password');
            return done(null, false)
        }

        return done(null, user)
    })
}))

passport.use('register', new LocalStrategy({
    passReqToCallback:true,
    usernameField: 'email',
    passwordField: 'password'
},  function (req, email, password, done) {
        UsersMongoModel.findOne({ 'email': email }, function (err, user) {

            if (err) {
                logError.error('Error in SignUp: ' + err);
                return done(err);
            }
        
            if (user) {
                logError.error('User already exists');
                return done(null, false)
            }
        
            const newUser = {username: email, password: password}
            UsersMongoModel.create(newUser, (err) => {
                if (err) {
                    logError.error('Error in Saving user: ' + err);
                    return done(err);
                }
                console.log('User Registration succesful');
                return done(null, newUser);
            })
        });   
    })
)

passport.serializeUser(function(user, done) {
    log.info('USER LOGGED IN SUCCESSFULLY');
    log.info(user._id);
    done(null, user._id);
});
  
  passport.deserializeUser(function(id, done) {
    log.info(id);
    let usuario = id;
    done(null, usuario);
})

 const checkAuthentication = (req, res, done) => {
     if(req.isAuthenticated()) {
        done();
    }
    else {
        res.redirect('/login');
    } 
}



module.exports = { checkAuthentication }