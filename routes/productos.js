const passport = require('passport');
const { exit, getProducts, getForm, getLogin, regForm, addProduct, errorReg, errorLogin, getInfo } = require('../controllers/ProdCtrl');
const routes = require('express').Router();
const { checkAuthentication } = require('../middleware/auth')


//Login
routes.get('/login', getLogin)
routes.post('/login', passport.authenticate('login', { failureRedirect: '/errorLogin', successRedirect: '/'}))
routes.get('/errorLogin', errorLogin)

//Registration
routes.get('/reg', regForm)
routes.post('/reg', passport.authenticate('register', { failureRedirect: '/errorReg', }), getLogin)
routes.get('/errorReg', errorReg)

//Logout
routes.post('/exit', exit)

//Home
routes.get('/', checkAuthentication, getForm)
routes.get('/productos', checkAuthentication, getProducts)
routes.post('/productos', checkAuthentication, addProduct)

//Info
routes.get('/info', getInfo)

module.exports = routes