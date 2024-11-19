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

        const passwordHash = await bcrypt.hash('sekret', 0)
        const user = new User({ username: 'root', passwordHash: passwordHash })

        await user.save()
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
})

after ( async () => {
    await mongoose.connection.close()
})
