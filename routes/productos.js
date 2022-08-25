const passport = require('passport');
const { exit, getProducts, getForm, getLogin, regForm, addProduct, errorReg, errorLogin, getInfo } = require('../controllers/ProdCtrl');
const routes = require('express').Router();
const { reqLog } = require('../middleware/reqLog.js')
const { checkAuthentication } = require('../middleware/auth');
const { logWarn } = require('../log');

//Login
routes.get('/login',reqLog, getLogin)
routes.post('/login', reqLog, passport.authenticate('login', { failureRedirect: '/errorLogin', successRedirect: '/'}))
routes.get('/errorLogin', reqLog, errorLogin)

//Registration
routes.get('/reg', reqLog, regForm)
routes.post('/reg', reqLog,passport.authenticate('register', { failureRedirect: '/errorReg', }), getLogin)
routes.get('/errorReg', reqLog,errorReg)

//Logout
routes.post('/exit', reqLog, exit)

//Home
routes.get('/', reqLog, checkAuthentication, getForm)
routes.get('/productos', reqLog, checkAuthentication, getProducts)
routes.post('/productos', reqLog, checkAuthentication, addProduct)

//Info
routes.get('/info', reqLog, getInfo)


routes.all("*", (req, res) => {
    res.status(404).send("The page wasn't found")
    logWarn.warn("The page wasn't found");
})

module.exports = routes