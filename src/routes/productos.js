const Router = require('koa-router')
const { reqLog } = require('../middleware/reqLog.js');
const { logWarn } = require('../../config/log');
const { getProducts, addProduct, modifyProduct, deleteProduct, wellcomeMessage } = require('../controllers/ProdCtrl.js');

const router = new Router();

//Home
router.get('/', reqLog, wellcomeMessage)
router.get('/productos', reqLog, getProducts)
router.post('/productos', reqLog, addProduct)
router.put('/productos/:id', reqLog, modifyProduct)
router.delete('/productos/:id', reqLog, deleteProduct)

module.exports = router