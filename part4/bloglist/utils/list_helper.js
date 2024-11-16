const _ = require('lodash')

const dummy = blogs => {
    return 1
}

const totalLikes = blogs => {
    let sumLike = 0
    for(const objBlog of blogs) {
        sumLike += objBlog['likes']
    }
    return sumLike
}

const favoriteBlog = blogs => {
    const mostLikedBlog = blogs.reduce((acc, curr) => {
        return curr.likes > acc.likes ? curr : acc;
      }, blogs[0])
    return mostLikedBlog
}

const mostBlogs = blogs => {
    const groupedBlogs = _.groupBy(blogs, 'author')
    const countedBlogs = _.mapValues(groupedBlogs, (authorBlogs) => authorBlogs.length)
    const maxBlogsAuthor = _.maxBy(_.entries(countedBlogs), entry => entry[1])

    const result = {
        author: maxBlogsAuthor[0],
        blogs: maxBlogsAuthor[1]
    }
    return result
}

const mostLikes = blogs => {
    const groupedBlogs = _.groupBy(blogs, 'author')
    const summedLikes = _.mapValues(groupedBlogs, group => _.sumBy(group, 'likes'))
    const maxLikes = _.maxBy(_.entries(summedLikes), ([author, likes]) => likes)

    const result = {
        author: maxLikes[0],
        likes: maxLikes[1]
    }
    return result
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }
