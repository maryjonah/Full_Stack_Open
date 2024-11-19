const { test, after, describe, beforeEach } = require('node:test')
const assert = require('assert')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const supertest = require('supertest')

const app = require('../app')
const api = supertest(app)

const helper = require('./userblog_helper')
const User = require('../models/user')

describe('when there is initially 1 user in db', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const userObjects = helper.initialUsers.map(async (user) => {
            const hashedPassword = await bcrypt.hash(user.password, 0)
            const userSaved = new User({ username: user.username, passwordHash: hashedPassword })
            return await userSaved.save()
          });
        await Promise.all(userObjects)

    })

    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'mluukkai',
            name: 'Matti Luukkainen',
            password: 'salainen'
        }

        await api.post('/api/users').send(newUser).expect(201).expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

        const usernames = usersAtEnd.map(user => user.username)
        assert(usernames.includes(newUser.username))
    })

    test('creation fails with proper statuscode and message when username has already been taken', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: "jonahmary",
            name: "Kuukua",
            password: "Hello World"    
        }
        const result = await api.post('/api/users').send(newUser).expect(400).expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        assert(result.body.error.includes('expected `username` to be unique'))

        assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    })

    test('creation fails with proper statuscode and message when username is less than 3 characters', async () => {
        const newUser = {
            username: "Hi",
            name: "Kuukua",
            password: "Hello World"    
        }
        const result = await api.post('/api/users').send(newUser).expect(400).expect('Content-Type', /application\/json/)
        console.log(result.body.error)
        
        assert(result.body.error.includes('User validation failed'))
    })
})

after ( async () => {
    await mongoose.connection.close()
})
