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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
