const { addProduct, getForm, getProducts, home, exit, goodbye } = require('../controllers/ProdCtrl');
const routes = require('express').Router();
const { login, countDown } = require('../middleware/auth')


routes.get('/productos', login, getProducts)

routes.get('/', login, getForm)

routes.post('/productos', login, addProduct) 

routes.post('/home', home)

routes.post('/exit', exit)


module.exports = routes