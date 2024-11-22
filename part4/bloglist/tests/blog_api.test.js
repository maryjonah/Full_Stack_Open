const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')

const helper = require('./testblog_helper')
const userHelper = require('./userblog_helper')

const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

describe('when there are some initial blogs saved', () => {

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
    
    describe('addition of a blog post', () => {
        test('succeeds with valid data and number of blogs increases by 1', async () => {
            const usersSaved = await api.post('/api/login').send({ username: 'jmary', password: 'Hello'})
            const token = usersSaved.body.token

            const newBlog = {
                title: "The gods are not be blamed",
                author: "Oluwatosin",
                url: "https://www.oreilly.com",
                likes: 500,
            }
            
            await api.post('/api/blogs').set('Authorization', `Bearer ${token}`).send(newBlog).expect(201)
        
            const currentBlogs = await helper.blogsInDb()
            assert.strictEqual(currentBlogs.length, helper.initialBlogs.length + 1)
        
            const blogTitles = currentBlogs.map(blog => blog.title)
            assert(blogTitles.includes('The gods are not be blamed'))
        })
        
        test('succeeds with 201 and likes 0 when data does not have likes data', async () => {
            const usersSaved = await api.post('/api/login').send({ username: 'maryj', password: 'World'})
            const token = usersSaved.body.token

            const newBlog = {
                title: "The gods are not be blamed",
                author: "Oluwatosin",
                url: "https://www.oreilly.com",
            }
            
            await api.post('/api/blogs').set('Authorization', `Bearer ${token}`).send(newBlog).expect(201)
        
            const currentBlogs = await helper.blogsInDb()
            const lastBlog = currentBlogs[currentBlogs.length - 1]
        
            assert.equal(lastBlog.likes, 0)
        })
        
        test('number of posts is not increased when data does nt include title', async () => {
            const users = await userHelper.usersInDb()

            const newBlog = {
                author: "Galvin Meld",
                url: "https://oreilly.com",
                likes: 10,
                userId: users[0].id
            }
            await api.post('/api/post').send(newBlog)
            
            const currentBlogs = await helper.blogsInDb()
            assert.strictEqual(currentBlogs.length, helper.initialBlogs.length)
        })
        
        test('number of posts is not increased when data does not include url', async () => {
            const users = await userHelper.usersInDb()

            const newBlog = {
                title: "My first copy book",
                author: "Galvin Meld",
                likes: 10000,
                userId: users[0].id
            }
            await api.post('/api/post').send(newBlog)
            
            const currentBlogs = await helper.blogsInDb()
            assert.strictEqual(currentBlogs.length, helper.initialBlogs.length)
        })    
    })
    
    describe('deletion of a blog', () => {
        test('succeeds with 204 when owner deletes blog', async () => {
            const usersSaved = await api.post('/api/login').send({ username: 'maryj', password: 'World'})
            const token = usersSaved.body.token

            const newBlog = {
                title: "The gods are not be blamed",
                author: "Oluwatosin",
                url: "https://www.oreilly.com",
            }
            
            const returnedBlog = await api.post('/api/blogs').set('Authorization', `Bearer ${token}`).send(newBlog).expect(201)
    
            await api.delete(`/api/blogs/${returnedBlog.body.id}`).set('Authorization', `Bearer ${token}`).expect(204)
    
            const blogsAtEnd = await helper.blogsInDb()

            // rather confirm the content does not have the recently added title
            const contents = blogsAtEnd.map(blog => blog.author)
            assert(!contents.includes('Oluwatosin'))
        })
    })
    
    describe('updating the likes of a blog', () => {
        test('likes of a blog is updated', async () => {
            const blogsAtStart = await helper.blogsInDb()
            const firstBlog = blogsAtStart[0]
            firstBlog.likes = 10
    
            await api.put(`/api/blogs/${firstBlog.id}`).send(firstBlog).expect(200)
    
            const blogsAtEnd = await helper.blogsInDb()
            const updatedBlog = blogsAtEnd.filter(blog => blog.id === `${firstBlog.id}`)
            
            assert.equal(updatedBlog[0].likes, 10)
        })
    })
    
})


after(async () => {
    await mongoose.connection.close()
})
