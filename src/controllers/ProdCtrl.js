const { logError, log } = require("../../config/log")
const { addingProduct, products } = require('../services/productLogic')

let user = []

//Products

const addProduct = (req, res) => {
    let result = addingProduct(req.body)
    res.render('formulario', {user})
}

const getProducts = (req, res) => {
    res.render('lista', {products, user})
}

//Session and Registration

const getForm = (req, res) => {
    user = req.session.passport.user
    res.render('formulario', {user}) //product entry form
}

const regForm = (req, res) => {
    res.render('indexRegistration')
}

const getLogin = (req, res) => {
    res.render('indexLogin')
}

const exit = (req, res) => {
    try {
        log.info('User logging out')
        req.session.destroy();
        res.render('logout', {user});
    } catch (error) {
        logError.error('Unable to log out' + error);
        res.status(500).send("error: ", error);
    } 
}// esto tambien podria estar en "services"

//Error Handling

const errorReg = (req, res) => {
    logError.error('Registration error');
    let err = 'registration error'
    res.render('userError', {err});
}

const errorLogin = (req, res) => {
    logError.error('wrong user credentials');
    let err = 'wrong credentials'
    res.render('userError', {err});
}

//Info
const getInfo = (req, res) => {
    let args = process.argv
    let so = process.platform
    let nodeVer = process.version
    let memoryUsage = JSON.stringify(process.memoryUsage()) 
    let projectFile = process.cwd()
    let pId = process.pid
    let execPath = process.execPath

    log.info(memoryUsage)// podria estar en services.js

    res.render('info', {
        args,
        so,
        nodeVer,
        memoryUsage,
        projectFile,
        pId,
        execPath
    })
}


module.exports = { addProduct, getProducts, getForm, exit, errorReg, errorLogin, regForm, getLogin, getInfo}