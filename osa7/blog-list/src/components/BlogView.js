const Blog = ({ blog, onLikeBlog }) => {
    if (!blog) {
        return null;
    }
    return (
        <div>
            <h2>{blog.title}</h2>
            <p>{blog.url}</p>
            <p>
                {blog.likes} likes{" "}
                <button onClick={() => onLikeBlog(blog)}>like</button>
            </p>
            <p>added by {blog.user.name}</p>
        </div>
    );
};

export default Blog;
