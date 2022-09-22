const { log } = require('../../config/log')
let products = [];

const addingProduct = (productToAdd) => {
    productToAdd = {...productToAdd, id: (products.length === 0 ? 1 : (products[products.length - 1].id + 1))}
    productToAdd.price = parseInt(productToAdd.price)
    log.info(productToAdd + 'was added')
    products.push(productToAdd)
    return products
}

module.exports = { addingProduct, products }