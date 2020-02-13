const dummy = () => 1; // (blogs) later...

const totalLikes = blogs => blogs.reduce((accum, blog) => accum + (blog.likes || 0), 0);
// NOTE: since 'likes' key is not mandatory, add 0 if not present

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return {};
  }
  if (blogs.length === 1) {
    return blogs[0];
  }
  const mostLikes = blogs.reduce((maxSoFar, blog) => Math.max(maxSoFar, (blog.likes || 0)), 0)
  const mostLikesIndex = blogs.findIndex(blog => ((blog.likes || 0) === mostLikes)); // finds 1st blog with this many likes
  return blogs[mostLikesIndex];
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return {};
  }
  if (blogs.length === 1) {
    return {
      author: blogs[0].author,
      likes: blogs[0].likes || 0,
    };
  }
  // get array of authors, take the SET of that, then turn back into array
  const uniqAuthors = Array.from(new Set(blogs.map(blog => blog.author)));
  const authorStats = uniqAuthors
    .map(author => {
      const blogsForThisAuthor = blogs.filter(b => b.author === author);
      return ({
        author,
        likes: totalLikes(blogsForThisAuthor),
        blogCount: blogsForThisAuthor.length,
      })}
    );

  const mostBlogs = authorStats.reduce((maxSoFar, author) => Math.max(maxSoFar, (author.blogCount)), 0);
  const mostBlogsIndex = authorStats.findIndex(author => (author.blogCount === mostBlogs)); // finds 1st author with this many blogs
  const retVal = authorStats[mostBlogsIndex];
  delete retVal.blogCount;
  return retVal;
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
};
