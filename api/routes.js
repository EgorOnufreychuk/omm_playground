const routes = require('express').Router()

const Monuments = require('./routes/Monuments')
const Users = require('./routes/Users')

const UserService = require('./helpers/UserService')
const MonumentService = require('./helpers/MonumentService')

const AuthorizationController = require('./Controllers/AuthorizationController')
const AccessController = require('./Controllers/AccessController')
const UserController = require('./Controllers/UserController')

const cloudinary = require('./utils/cloudinary')

if (process.env.NODE_ENV !== 'development') {

  //==============================Monuments==============================//

  routes.get('/monuments', Monuments.getMonuments)
  routes.get('/monuments/:id', Monuments.getMonument)

  routes.post('/monuments', AccessController.verifyUser, AuthorizationController.UserDB, MonumentService.isMonumentExist, MonumentService.validateData, cloudinary.uploadImage, Monuments.createMonument)

  routes.put('/monuments/:id', AccessController.verifyUser, AuthorizationController.MonumentsDB, Monuments.updateMonument)

  routes.delete('/monuments/:id', AccessController.verifyUser, AuthorizationController.MonumentsDB, Monuments.deleteMonument)
  routes.delete('/monuments/db/all', AccessController.verifyUser, AuthorizationController.MonumentsDB, Monuments.clearMonumentsDB)

  //================================Users================================//

  routes.get('/users', AccessController.verifyUser, AuthorizationController.UserDB, Users.getUsers)
  routes.get('/users/:email', AccessController.verifyUser, AuthorizationController.UserDB, Users.getUser)

  routes.post('/login', UserService.isUserDataExist, UserController.SignIn)
  routes.post('/signup', UserService.isUserExist, UserService.isEmailCompliance, UserService.isPasswordCompliance, UserController.SignUp)

  routes.put('/users/:email', AccessController.verifyUser, AuthorizationController.UserDB, Users.updateUser)

  routes.delete('/users/:email', AccessController.verifyUser, AuthorizationController.UserDB, Users.deleteUser)

  routes.delete('/users/db/all', AccessController.verifyUser, AuthorizationController.UserDB, Users.clearUserDB)

} else {

  //==============================Monuments==============================//

  routes.get('/monuments', Monuments.getMonuments)
  routes.get('/monuments/:id', Monuments.getMonument)

  routes.post('/monuments', MonumentService.isMonumentExist, MonumentService.validateData, cloudinary.uploadImage, Monuments.createMonument)

  routes.put('/monuments/:id', Monuments.updateMonument)

  routes.delete('/monuments/:id', Monuments.deleteMonument)
  routes.delete('/monuments/db/all', Monuments.clearMonumentsDB)

  //================================Users================================//

  routes.get('/users', Users.getUsers)
  routes.get('/users/:email', Users.getUser)

  routes.post('/login', UserService.isUserDataExist, UserController.SignIn)
  routes.post('/signup', UserService.isUserExist, UserService.isEmailCompliance, UserService.isPasswordCompliance, UserController.SignUp)

  routes.put('/users/:email', Users.updateUser)

  routes.delete('/users/:email', Users.deleteUser)
  routes.delete('/users/db/all', Users.clearUserDB)

}

module.exports = routes
