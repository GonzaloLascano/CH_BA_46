const passport = require('passport');
const { exit, getProducts, getForm, getLogin, regForm, addProduct, errorReg, errorLogin, getInfo, deleteProduct, modifyProduct } = require('../controllers/ProdCtrl');
const routes = require('express').Router();
const { reqLog } = require('../middleware/reqLog.js')
const { checkAuthentication } = require('../middleware/auth');
const { logWarn } = require('../../config/log');
const { modifyingProduct } = require('../services/productLogic');

//Login
routes.get('/login',reqLog, getLogin)
routes.post('/login', reqLog, passport.authenticate('login', { failureRedirect: '/errorLogin', successRedirect: '/'}))
routes.get('/errorLogin', reqLog, errorLogin)

//Registration
routes.get('/reg', reqLog, regForm)
routes.post('/reg', reqLog, passport.authenticate('register', { failureRedirect: '/errorReg', }), getLogin)
routes.get('/errorReg', reqLog,errorReg)

//Logout
routes.post('/exit', reqLog, exit)

//Home
routes.get('/', reqLog, getForm)
routes.get('/productos', reqLog, getProducts)
routes.post('/productos', reqLog, addProduct)
routes.put('/productos/:id', reqLog, modifyProduct)
routes.delete('/productos/:id', reqLog, deleteProduct)

//Info
routes.get('/info', reqLog, getInfo)


routes.all("*", (req, res) => {
    res.status(404).send("The page wasn't found")
    logWarn.warn("The page wasn't found");
})

module.exports = routes