const { log, logError } = require('../../config/log')
let products = [];


const addingProduct = (productToAdd) => {
    productToAdd = {...productToAdd, id: (products.length === 0 ? 1 : (products[products.length - 1].id + 1))}
    productToAdd.price = parseInt(productToAdd.price)
    log.info(JSON.stringify(productToAdd) + 'was added')
    products.push(productToAdd)
    return productToAdd
}

const modifyingProduct = (newContent, productId) => {
    let message
    let indexOfProduct = products.findIndex(product => {
        return product.id == productId
    })
    if (indexOfProduct === -1) {
        message = 'Unable to find requested product.'
        logError.error('Unable to find requested product. at modifyingProduct')
    } else {
        let productBefore = products[indexOfProduct]
        log.info(`modifying... ${JSON.stringify(products[indexOfProduct])}`)
        products[indexOfProduct] = {...products[indexOfProduct], ...newContent}
        message = `Modified product from: ${JSON.stringify(productBefore)} to: ${JSON.stringify(products[indexOfProduct])}`
        log.info(message)
    }
    return message
}

const deletingProduct = (productId) => {
    let message
    let indexOfProduct = products.findIndex(product => {
        return product.id == productId
    })
    if (indexOfProduct === -1) {
        message = 'Unable to find requested product.'
        logError.error('Unable to find requested product. at deletingProduct')
    } else {
        log.info(`deleting... ${JSON.stringify(products[indexOfProduct])}`)
        products.splice(indexOfProduct,1)
        message = `Product succesfully deleted`
        log.info(message)
    }
    return message    
}

module.exports = { addingProduct, modifyingProduct, deletingProduct, products }