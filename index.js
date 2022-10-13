require('dotenv').config();
const Koa = require('koa');
const koaBody = require('koa-body');
const app = new Koa();
const routes = require('./src/routes/productos.js')
const {SERVER} = require('./config/config.js')
const { log, logError } = require('./config/log.js')

//parseado automatico 
app.use(koaBody());

//Llamado a router
app.use(routes.routes());

// Se crea el servidor, se elige el numero de puerto.
const server = app.listen(SERVER.PORT, async () =>{
    log.info('servidor levantado en el puerto ' + SERVER.PORT)
})
server.on('error', (error) => logError.error({mensaje: `Unable to run server ${error}`}))

