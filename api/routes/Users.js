const User = require('../models/User');
const bcrypt = require('bcrypt')

const getUsers = (req, res) => {
  User.find()
    .then(items => {
      let filteredItems = []

      for (let i = 0; i < items.length; i++) {
        filteredItems.push({
          _id: items[i]._id,
          email: items[i].email,
          userType: items[i].userType
        })
      }

      res.json(filteredItems)
    })
    .catch(err => {
      res.sendStatus(500)
      console.log(err)
    });
}

const getUser = (req, res) => {
  User
    .find({email: req.params.email})
    .then((item) => res.json(item))
    .catch(err => {
      res.sendStatus(500)
      console.log(err)
    });
}

const createUser = (req, res) => {
  const email = req.body.email
  let password = req.body.password

  const hash = bcrypt.hashSync(password, 12)

  const newUser = new User({
    email: email,
    password: hash
  })

  newUser
    .save()
    .then((item) =>
      res.send({
        data: {
          email: item.email,
          userType: item.userType,
          id: item._id
        },
        accessToken: req.accessToken,
        refreshToken: req.refreshToken
      }))
    .catch(err => {
      res.sendStatus(500)
      console.log(err)
    })
}

const updateUser = (req, res) => {
  let email = req.params.email
  let password = req.body.password

  if (password !== undefined) {
    req.body.password = bcrypt.hashSync(password, 12)
  }

  let newData = req.body

  User
    .updateOne({email: email}, newData)
    .then((item) => res.json(item))
    .catch(err => {
      res.sendStatus(500)
      console.log(err)
    })
}

const deleteUser = (req, res) => {
  let email = req.params.email

  User
    .deleteOne({ email: email })
    .then(() => res.sendStatus(200))
    .catch(err => {
      res.sendStatus(500)

      console.log(err)
    });
}

const clearUserDB = (req, res) => {
  User
    .deleteMany({})
    .then(() => res.sendStatus(200))
    .catch(err => {
      res.sendStatus(500)
      console.log(err)
    })
}

module.exports = {

  getUsers: getUsers,
  getUser: getUser,
  createUser: createUser,
  updateUser: updateUser,
  deleteUser: deleteUser,
  clearUserDB: clearUserDB

}
