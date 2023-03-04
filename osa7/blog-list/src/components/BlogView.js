import AddCommentForm from "./AddCommentForm";

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
            <h3>comments</h3>

            <AddCommentForm blogId={blog.id} />
            <ul>
                {blog.comments.map((c) => (
                    <li key={c.id}>{c.content}</li>
                ))}
            </ul>
        </div>
    );
};

export default Blog;
