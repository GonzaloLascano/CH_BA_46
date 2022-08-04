let products = []
let user = []

//Products

const addProduct = (req, res) => {
    let newProduct = req.body
    newProduct = {...newProduct, id: (products.length === 0 ? 1 : (products[products.length - 1].id + 1))}
    newProduct.price = parseInt(newProduct.price)
    console.log(newProduct)
    products.push(newProduct)
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
        req.session.destroy();
        res.render('logout', {user});
    } catch (error) {
        res.status(500).send("error: ", error);
    } 
}

//Error Handling

const errorReg = (req, res) => {
    let err = 'registration error'
    res.render('userError', {err});
}

const errorLogin = (req, res) => {
    let err = 'wrong credentials'
    res.render('userError', {err});
}


module.exports = { addProduct, getProducts, getForm, exit, errorReg, errorLogin, regForm, getLogin}