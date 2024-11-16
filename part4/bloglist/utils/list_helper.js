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

module.exports = { dummy, totalLikes, favoriteBlog }
