const mongoose = require('mongoose')

const usersCollectionName = 'users'

const usersMongoSchema = new mongoose.Schema({
    username: String,
    password: String
})

const UsersMongoModel = mongoose.model(usersCollectionName, usersMongoSchema)

module.exports = { UsersMongoModel }