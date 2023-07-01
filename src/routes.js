const { Router } = require("express")

const User = require("./app/models/Useres")
const UserController = require("./app/controllers/UserController")
const routes = new Router() // router é uma classe esta sendo instanciada e armazenada em uma variavel 

routes.post('/users', UserController.store)
routes.get('/', UserController.index)
routes.put('/users/:id', UserController.update)
routes.delete('/users/:id', UserController.delete)

module.exports = routes