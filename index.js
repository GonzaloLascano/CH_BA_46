require('dotenv').config();
const express = require('express') //se llama al modulo de express y se instancia
const app = express()
const router = require('./src/routes/productos.js')
const { graphqlHTTP } = require('express-graphql')
const { buildSchema } = require('graphql')
const { createProduct, updateProduct, deleteProduct, getProducts } = require('./src/models/productsQL')
const session = require('express-session')
const passport = require('passport')
const connectMong = require('./config/dbConfig.js')
const mongoStore = require('connect-mongo')
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true }
const handlebars = require('express-handlebars')
const {SERVER, SESSION, MONGO} = require('./config/config.js')
const { log, logError, logWarn } = require('./config/log.js')

//variable para que los productos almacenados permanezcan en memoria.


// Se crea el servidor, se elige el numero de puerto.
const server = app.listen(SERVER.PORT, async () =>{
    await connectMong();
    log.info('servidor levantado en el puerto ' + SERVER.PORT)
})
server.on('error', (error) => logError.error({mensaje: `Unable to run server ${error}`}))

const schema = buildSchema(`
    type Product {
        id: ID!
        title: String,
        price: Int,
        thumbnail: String,
    }
    input ProductInput {
        title: String,
        price: Int,
        thumbnail: String,
    }
    type Query {
        getProducts: [Product]
    }
    type Mutation {
        createProduct(data: ProductInput): Product,
        updateProduct(productId: ID!, newContent: ProductInput): Product,
        deleteProduct(productId: ID!): Product 
    }`)

//parseado automatico 
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//Llamando session
app.use(session({
    secret: SESSION.SECRET,
    resave: true,
    saveUninitialized: true,
    store: mongoStore.create({
        mongoUrl: MONGO.MONGOURL,
        mongoOptions: advancedOptions,
        collectionName: 'sessions'
    }),
    cookie: {
        maxAge: 60000*10
    }
}))

// Llamando passport

app.use(passport.initialize());
app.use(passport.session());

//Graph QL
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: {
        getProducts,
        createProduct,
        updateProduct,
        deleteProduct
    },
    graphiql: true
}))
//Llamado a router
app.use(router)

/* se configura motor de render handlebars---------*/

app.engine(
    'hbs',
    handlebars({
        extname:'.hbs',
        defaultLayout:'index.hbs'
    })
)
app.set("view engine", 'hbs')
app.set("views", "./views")

/* ------------------------------------------------- */

/* se definen endpoints con metodos de renderizado */

// Se le define una ruta de dominio publico para ingresar al formulario
app.use(express.static('public'))