const dummy = () => 1; // (blogs) later...

const totalLikes = (blogs) => blogs.reduce((accum, blog) => accum + (blog.likes || 0), 0);
// NOTE: since 'likes' key is not mandatory, add 0 if not present

module.exports = {
  dummy,
  totalLikes,
};
