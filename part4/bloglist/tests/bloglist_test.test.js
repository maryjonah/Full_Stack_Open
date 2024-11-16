const { test, describe } = require('node:test')
const assert = require('node:assert')

const listHelper = require('../utils/list_helper')

describe('dummy', () => {
    test('dummy returns 1', () => {
        const blogs = []
        const result = listHelper.dummy(blogs)
        assert.strictEqual(result, 1)
    })

})

describe('total likes', () => {
    test('of empty list is zero', () => {
        const blogs = []
        assert.strictEqual(listHelper.totalLikes(blogs), 0)
    })

    test('when list has only 1 blog equals the likes of that', () => {
        const listWithOneBlog  = [
            {
                _id: '5a422aa71b54a676234d17f8',
                title: 'Go To Statement Considered Harmful',
                author: 'Edsger W. Dijkstra',
                url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
                likes: 5,
                __v: 0
              }
        ]
        assert.strictEqual(listHelper.totalLikes(listWithOneBlog), 5)
    })
    
    test('of a bigger list is calculated right', () => {
        const multipleBlogs = [
            {
                _id: '5a422aa71b54a676234d17f8',
                title: 'Go To Statement Considered Harmful',
                author: 'Edsger W. Dijkstra',
                url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
                likes: 5,
                __v: 0
            },
            {
                _id: '5a422aa71b54a67623412345',
                title: 'A beginners introduction to Bash',
                author: 'Mary Jonah',
                url: 'https:maryjonah.me',
                likes: 57,
                __v: 0
              }
        ]
        assert.strictEqual(listHelper.totalLikes(multipleBlogs), 62)
    })
})