const User = require('../models/user')

const initialUsers = [
    {
        username: "jmary",
        name: "Mary",
        password: "Hello"
    },
    {
        username: "maryj",
        name: "Ekua",
        password: "World"
    },
    {
        username: "jonahmary",
        name: "Kuukua",
        password: "Hello World"
    }
]

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}

module.exports = { initialUsers, usersInDb }
