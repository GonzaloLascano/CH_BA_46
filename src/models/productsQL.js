const {log, logError} = require("../../config/log.js")

class Product {
    constructor(id, {title, price, thumbnail}) {
        this.id = id,
        this.title = title,
        this.price = price,
        this.thumbnail = thumbnail
    }
}

let products = []

const createProduct = ({ data }) => {
    let IDtoAdd = products.length === 0 ? 1 : (products[products.length - 1].id + 1)
    let productToAdd = new Product(IDtoAdd, data)
    log.info(JSON.stringify(productToAdd) + ' was added')
    products.push(productToAdd)
    return productToAdd
}

const updateProduct = ({ productId, newContent }) => {
    let response
    let indexOfProduct = products.findIndex(product => {
        return product.id == productId
    })
    if (indexOfProduct === -1) { 
        logError.error('Unable to find requested product. at modifyingProduct')
        throw new Error('Unable to find requested product.')
    } else {
        let productBefore = products[indexOfProduct]
        log.info(`modifying... ${JSON.stringify(products[indexOfProduct])}`)
        products[indexOfProduct] = {...products[indexOfProduct], ...newContent}
        //products[indexOfProduct] = new Product(productId, newContent)
        response = products[indexOfProduct] 
        log.info(`Modified product from: ${JSON.stringify(productBefore)} to: ${JSON.stringify(response)}`)
    }
    return response

}

const deleteProduct = ({ productId }) => {
    let response
    let indexOfProduct = products.findIndex(product => {
        return product.id == productId
    })
    if (indexOfProduct === -1) {
        //response = 'Unable to find requested product.'
        logError.error('Unable to find requested product. at deletingProduct')
        throw new Error('Unable to find requested product.')
    } else {
        log.info(`deleting... ${JSON.stringify(products[indexOfProduct])}`)
        response = products[indexOfProduct]
        products.splice(indexOfProduct,1)
        log.info(`Product succesfully deleted`)
    }
    return response    
}

const getProducts = () => {
    return products
}

module.exports = { createProduct, updateProduct, deleteProduct, getProducts }