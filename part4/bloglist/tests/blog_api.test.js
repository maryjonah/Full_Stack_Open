const { test, after, beforeEach, expect } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')

const helper = require('./testblog_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
})

test('blogs are returned as json', async () => {
    await api.get('/api/blogs').expect(200).expect('Content-Type', /application\/json/)
})

test('there are 2 notes initially saved automatically for each test', async () => {
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test('the default property __id is renamed to id', async () => {
    const response = await api.get('/api/blogs')
    const firstBlog = response.body[0]
    assert.ok(firstBlog.hasOwnProperty('id'))
})

test('a valid blog can be added and the total number of blogs increases by 1', async () => {
    const newBlog = {
        title: "The gods are not be blamed",
        author: "Oluwatosin",
        url: "https://www.oreilly.com",
        likes: 500
    }
    
    await api.post('/api/blogs').send(newBlog).expect(201)

    const currentBlogs = await helper.blogsInDb()
    assert.strictEqual(currentBlogs.length, helper.initialBlogs.length + 1)

    const blogTitles = currentBlogs.map(blog => blog.title)
    assert(blogTitles.includes('The gods are not be blamed'))
})

test('a valid blog with no likes defaults to 0 likes', async () => {
    const newBlog = {
        title: "The gods are not be blamed",
        author: "Oluwatosin",
        url: "https://www.oreilly.com",
    }
    
    await api.post('/api/blogs').send(newBlog).expect(201)

    const currentBlogs = await helper.blogsInDb()
    const lastBlog = currentBlogs[currentBlogs.length - 1]

    assert.equal(lastBlog.likes, 0)
})

test('a new blog without title is not saved', async () => {
    const newBlog = {
        author: "Galvin Meld",
        url: "https://oreilly.com",
        likes: 10
    }
    await api.post('/api/post').send(newBlog)
    
    const currentBlogs = await helper.blogsInDb()
    assert.strictEqual(currentBlogs.length, helper.initialBlogs.length)
})

test('a new blog without url is not saved', async () => {
    const newBlog = {
        title: "My first copy book",
        author: "Galvin Meld",
        likes: 10000
    }
    await api.post('/api/post').send(newBlog)
    
    const currentBlogs = await helper.blogsInDb()
    assert.strictEqual(currentBlogs.length, helper.initialBlogs.length)
})

after(async () => {
    await mongoose.connection.close()
})
