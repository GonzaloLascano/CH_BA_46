const { response } = require("express")
const { logError, log } = require("../../config/log")
const { addingProduct, modifyingProduct, products, deletingProduct } = require('../services/productLogic')


//Products

const addProduct = (ctx) => {
    let result = addingProduct(ctx.request.body)
    ctx.response.status = 201
    ctx.body = {
        status: 'success',
        message: `the product ${result.title} was added successfully`
    }
}

const getProducts = (ctx) => {
    ctx.body = { 
        status: 'Success',
        message: products 
    }
}

const modifyProduct = (ctx) => {
    let result = modifyingProduct(ctx.request.body, ctx.params.id)
    ctx.body = { 
        status: 'Success',
        message: result 
    }
}

const deleteProduct = (ctx) => {
    let result = deletingProduct(ctx.params.id)
    ctx.body = { 
        status: 'Success',
        message: result 
    }
}



//Info
const wellcomeMessage = (ctx) => {
    let result = {
     args : process.argv,
     so : process.platform,
     nodeVer : process.version,
     memoryUsage : JSON.stringify(process.memoryUsage()), 
     projectFile : process.cwd(),
     pId : process.pid,
     execPath : process.execPath
    }

    log.info(result.memoryUsage)// podria estar en services.js

    ctx.body = { 
        status: 'wellcome to KOA server',
        message: result 
    }
}


module.exports = { addProduct, getProducts, modifyProduct, deleteProduct, wellcomeMessage}