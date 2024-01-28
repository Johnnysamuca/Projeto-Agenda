require('dotenv').config()

const express = require('express')

const app = express()

const mongoose = require('mongoose')



mongoose.connect(process.env.connectionString)

.then(()=> {
   app.emit('Pronto')
})

.catch(e => console.log(e))

const session = require('express-session')

const MongoStore = require('connect-mongo')

const flash = require('connect-flash')

const routes = require('./routes')

const path = require('path')


const helmet = require('helmet')

const csrf = require('csurf')

const {middlewaresGlobal, checkErrorCsrf, csrfMiddlewares} = require('./src/middleweres/middlewaresGlobal')

app.use(helmet())


/*
 configura o express para analisar os dados do formulario
 permitindo a utilização do req.body para manipulação facil
 */
app.use(express.urlencoded({extended:true}))

app.use(express.json())

// configura o express para receber arquivos estaticos quando forem requisitados
app.use(express.static(path.resolve(__dirname, 'public')))

const sessionOptions = session({
    secret: 'lskdsmmnwowodnsaofpofidfnweofifwifwefbwfbc dhdj',
 //   store: new MongoStore({mongooseConnection: mongoose.connection}),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true
    },
    store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING})

})

app.use(sessionOptions)

app.use(flash())

app.set('views', path.resolve(__dirname, 'src', 'views'))

app.set('view engine', 'ejs')

app.use(csrf())

// Nossos propio middlewares
app.use(middlewaresGlobal)

app.use(checkErrorCsrf)

app.use(csrfMiddlewares)

app.use(routes)

app.on('Pronto', () =>{
    app.listen(4000, () =>{
        console.log('Acessar http://localhost:4000')
        console.log('Servidor executado na porta 4000')
    })
})

