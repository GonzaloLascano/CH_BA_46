const express = require('express') //se llama al modulo de express y se instancia
const handlebars = require('express-handlebars')
const app = express()
const router = require('./routes/productos')
const session = require('express-session')

//variable para que los productos almacenados permanezcan en memoria.


// Se crea el servidor, se elige el numero de puerto.
const PORT = 8080
const server = app.listen(PORT, () =>{
    console.log('servidor levantado en el puerto ' + server.address().port)
})
server.on('error', (error) => console.log({mensaje: `hubo un error :( ${error}`}))

//parseado automatico 
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//Llamando session
app.use(session({
    secret:"secret",
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 60000*10
    }
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
