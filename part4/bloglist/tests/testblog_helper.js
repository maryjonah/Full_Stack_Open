const Blog = require('../models/blog')

const initialBlogs = [
    {
        title: "It's Elementary",
        author: "Elise Bryant",
        url: "https://www.goodreads.com/book/show/202102044-it-s-elementary",
        likes: 440
    },
    {
        title: "Pardon my Frenchie",
        author: "Farrah Rochon",
        url: "https://www.goodreads.com/book/show/199450933-pardon-my-frenchie?ref=rae_0",
        likes: 543
    }
]

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

module.exports = { initialBlogs, blogsInDb }
