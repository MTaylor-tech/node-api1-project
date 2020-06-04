const express = require('express')
const cors = require('cors')
const db = require('./database')
const server = express()


server.use(express.json())
server.use(cors())

server.get('/api/users', (req, res)=>{
  let users = []
  try {
    users = db.getUsers()
    if (users.length>=1) {
      res.status(200).json(users)
    } else {
      res.status(500).json({ errorMessage: "The users information could not be retrieved." })
    }
  } catch (error) {
    res.status(500).json({ errorMessage: "The users information could not be retrieved." })
  }
})

server.get('/api/users/:id', (req, res)=>{
    let user
    try {
      user = db.getUserById(req.params.id)
      if (user) {
        res.status(200).json(user)
      } else {
        res.status(404).json({ message: "The user with the specified ID does not exist." })
      }
    } catch (error) {
      res.status(500).json({ errorMessage: "The user information could not be retrieved." })
    }
})

server.post('/api/users',(req, res)=>{
  if (req.body && req.body.name && req.body.bio){
    let newUser
    try {
      newUser = db.createUser({
        name: req.body.name,
        bio: req.body.bio
      })
      if (newUser) {
        res.status(201).json(newUser)
      } else {
        res.status(500).json({ errorMessage: "There was an error while saving the user to the database" })
      }
    } catch (error) {
      res.status(500).json({ errorMessage: "There was an error while saving the user to the database" })
    }
  } else {
    res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
  }
})

server.put('/api/users/:id',(req, res)=>{
  if (req.body && req.body.name && req.body.bio) {
    let user
    try {
      user = db.getUserById(req.params.id)
      if (user) {
        db.updateUser(req.params.id, {name: req.body.name || user.name, bio: req.body.bio || user.bio});
        res.status(200).json({
            message: "Updated successfully",
            user: user
          })
      } else {
        res.status(404).json({ message: "The user with the specified ID does not exist." })
      }
    } catch (error) {
      res.status(500).json({ errorMessage: "The user information could not be modified." })
    }
  } else {
      res.status(400).json(
        { errorMessage: "Please provide name and bio for the user." }
      )
    }
})

server.delete('/api/users/:id',(req, res)=> {
  let user
  try {
    user = db.getUserById(req.params.id)
    if (user) {
      const okay = db.deleteUser(req.params.id)
      if (okay) {
        res.status(200).json({
          message: "Deleted",
          user: user
        })
      } else {
        res.status(500).json({ errorMessage: "The user could not be removed" })
      }
    } else {
      res.status(404).json({ message: "The user with the specified ID does not exist." })
    }
  } catch (error) {
    res.status(500).json({ errorMessage: "The user could not be removed" })
  }
})

 module.exports = server
