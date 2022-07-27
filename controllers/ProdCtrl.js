let products = []
let user = []

const addProduct = (req, res) => {
    let newProduct = req.body
    newProduct = {...newProduct, id: (products.length === 0 ? 1 : (products[products.length - 1].id + 1))}
    newProduct.price = parseInt(newProduct.price)
    console.log(newProduct)
    products.push(newProduct)
    res.render('formulario')
}

const getProducts = (req, res) => {
    res.render('lista', {products, user})
}

const getForm = (req, res) => {
    res.render('formulario', {user})
}

const home = (req, res) => {
    const { login } = req.body
    user = login
    req.session.user = login
    res.redirect('/')
}

const exit = (req, res) => {
    try {
        req.session.destroy();
        res.render('logout', {user});
    } catch (error) {
        res.status(500).send("error: ", error);
    } 
}

/* cargar el setTimeout en la plantilla no me parece la mejor practica pero no se como crear un delay en la respuesta con express. ya que cuando hago setTimeout(()=>{res.redirect}) --},200)
no me carga la plantilla actual */


module.exports = { addProduct, getProducts, getForm, home, exit,}