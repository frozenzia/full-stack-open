import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Blog = ({ blog }) => {
    const { id, title, author } = blog;

    return (
        <div className="singleBlog" data-cy="blog">
            <Link to={`/blogs/${id}`}>
                {title} {author}
            </Link>
        </div>
    );
};

Blog.propTypes = {
    blog: PropTypes.shape({}).isRequired,
};

export default Blog;
