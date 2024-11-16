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
module.exports = { dummy, totalLikes }
