// A pagina inicial da rota vai se chamar index

const express = require('express')
const route = express.Router()
const homecontroller = require('./src/controllers/homecontroller')
const loginController = require('./src/controllers/loginController')
const contatoController = require('./src/controllers/contatoController')
const {loginrequired} = require('./src/middleweres/middlewaresGlobal')


// rotas da home
route.get('/',  homecontroller.index)


// rotas de login

route.get('/login/index', loginController.index)
route.post('/login/register', loginController.register)
route.post('/login/login', loginController.login)
route.get('/login/logout', loginController.logout)

// rotas de contatos

route.get('/contato/index',loginrequired ,contatoController.index)
route.post('/contato/register', loginrequired , contatoController.register)
route.get('/contato/index/:id', loginrequired, contatoController.editIndex)
route.post('/contato/edit/:id', loginrequired, contatoController.edit)
route.get('/contato/delete/:id', loginrequired, contatoController.delete)

module.exports = route;