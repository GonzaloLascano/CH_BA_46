const passport = require('passport');
const { logError, logWarn, log } = require('../log');
const LocalStrategy = require('passport-local').Strategy;
const { UsersMongoModel } = require('../models/mongoUsers')

passport.use('login', new LocalStrategy({
    passReqToCallback: true,
}, function(req, username, password, done) {
    UsersMongoModel.findOne({ username }, (err, user) => {
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
},  function (req, username, password, done) {
        UsersMongoModel.findOne({ 'username': username }, function (err, user) {

            if (err) {
                logError.error('Error in SignUp: ' + err);
                return done(err);
            }
        
            if (user) {
                logError.error('User already exists');
                return done(null, false)
            }
        
            const newUser = {username: username, password: password}
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
    log.info(user);
    done(null, user.username);
});
  
  passport.deserializeUser(function(username, done) {
    log.info(username);
    let usuario = username;
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