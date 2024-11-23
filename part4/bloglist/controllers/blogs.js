const jwt = require('jsonwebtoken')
const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const middleware = require('../utils/middleware')

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})
    response.json(blogs)
  })

blogRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})
  
blogRouter.post('/', middleware.userExtractor, async (request, response) => {
    const body = request.body
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token invalid' })
    }

    const user = await request.user

    const blog = new Blog({
      title: body.title, 
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user
    })
  
    const savedBlog = await blog.save()
    
    // // Also update the user document with the od of the recent blog created
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
    // response.status(201).json(user)
})

blogRouter.put('/:id', async (request, response) => {
  const body = request.body
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.status(200).json(updatedBlog)
})

blogRouter.delete('/:id', middleware.userExtractor, async (request, response) => {

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  const user = await request.user

  if(user.id.toString() === decodedToken.id.toString()) {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } else {
    response.status(401).json({ error: 'token invalid' })
  }
})

module.exports = blogRouter
